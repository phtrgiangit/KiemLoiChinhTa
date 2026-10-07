import { AnimalProfile, ConservationStatusCode } from '../types/animal';
import { fetchAnimalImages } from './imageService';

const STORAGE_KEY = 'faunapedia_gemini_api_key';
const STORAGE_MODEL_KEY = 'faunapedia_gemini_active_model';

// Clean and sanitize API key from any spaces, newlines or quotes
export function cleanApiKey(key: string): string {
  if (!key) return '';
  return key.trim().replace(/^["']|["']$/g, '').trim();
}

// Helper to get active Gemini API key
export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  const local = localStorage.getItem(STORAGE_KEY);
  if (local && local.trim()) return cleanApiKey(local);
  
  // Also check Vite environment variable (useful when deploying on Vercel with env vars)
  const envKey = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim()) return cleanApiKey(envKey);

  return '';
}

export function saveApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  const sanitized = cleanApiKey(key);
  if (!sanitized) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_MODEL_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, sanitized);
  }
}

export function removeApiKey(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_MODEL_KEY);
}

// Active modern models supported by Google Gemini
export const CANDIDATE_MODELS = [
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3-flash-preview',
];

// Helper to map API error to Vietnamese user-friendly message
export function parseGeminiError(status: number, message: string): string {
  const lowerMsg = (message || '').toLowerCase();
  
  if (status === 400 || lowerMsg.includes('api_key_invalid') || lowerMsg.includes('api key not valid') || lowerMsg.includes('invalid api key')) {
    return 'Mã API Key không hợp lệ. Vui lòng kiểm tra lại mã đã sao chép từ Google AI Studio (thường bắt đầu bằng AIzaSy...).';
  }
  if (status === 403 || lowerMsg.includes('permission_denied') || lowerMsg.includes('consumer suspended') || lowerMsg.includes('has not been used')) {
    return 'Tài khoản hoặc API Key bị hạn chế quyền truy cập từ Google (Permission Denied). Hãy thử tạo một API Key mới trong Google AI Studio.';
  }
  if (status === 429 || lowerMsg.includes('quota') || lowerMsg.includes('resource_exhausted')) {
    return 'Đã đạt giới hạn số lượt gọi miễn phí của Google (Rate limit / Quota exceeded). Hệ thống đang tự động thử mô hình dự phòng hoặc bạn có thể thử lại sau giây lát.';
  }
  if (status === 503 || lowerMsg.includes('high demand') || lowerMsg.includes('unavailable')) {
    return 'Máy chủ Google AI đang trong thời gian cao tải tạm thời. Hệ thống đang tự động luân chuyển mô hình.';
  }
  if (status === 404 || lowerMsg.includes('not found') || lowerMsg.includes('no longer available')) {
    return 'Mô hình AI hiện đang được chuyển đổi phiên bản. Đang tự động kết nối mô hình thay thế.';
  }
  if (lowerMsg.includes('failed to fetch') || lowerMsg.includes('network') || lowerMsg.includes('cors')) {
    return 'Lỗi kết nối mạng hoặc chặn trình duyệt: Không thể gửi yêu cầu trực tiếp tới máy chủ Google Gemini. Vui lòng kiểm tra kết nối Internet hoặc tiện ích chặn quảng cáo.';
  }

  return message || `Lỗi từ Google Gemini (Mã phản hồi: ${status})`;
}

// Test key validity with server proxy or Google Generative Language API
export async function validateGeminiApiKey(
  apiKey: string
): Promise<{ valid: boolean; model?: string; error?: string }> {
  const cleanKey = cleanApiKey(apiKey);
  if (!cleanKey || cleanKey.length < 10) {
    return { valid: false, error: 'Mã API key quá ngắn hoặc không đúng định dạng.' };
  }

  // 1. First, attempt validation via backend proxy route if available
  try {
    const proxyRes = await fetch('/api/gemini/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: cleanKey }),
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.valid) {
        if (typeof window !== 'undefined' && data.model) {
          localStorage.setItem(STORAGE_MODEL_KEY, data.model);
        }
        return { valid: true, model: data.model };
      }
    } else if (proxyRes.status === 400 || proxyRes.status === 403) {
      const data = await proxyRes.json().catch(() => ({}));
      return { valid: false, error: data.error || parseGeminiError(proxyRes.status, '') };
    }
    // If proxyRes is 404 or 500, proceed to direct client validation below
  } catch {
    // Backend proxy not available (static host / offline server), fallback to direct call
  }

  // 2. Direct client validation: query Google Generative Language API models endpoint
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
    if (!listRes.ok) {
      const errData = await listRes.json().catch(() => ({}));
      const rawMsg = errData?.error?.message || `HTTP ${listRes.status}`;
      return {
        valid: false,
        error: parseGeminiError(listRes.status, rawMsg),
      };
    }

    // Google API successfully returned 200 OK! The key is 100% genuine and authenticated.
    const listData = await listRes.json();
    const available = (listData.models || [])
      .filter((m: { supportedGenerationMethods?: string[] }) =>
        m.supportedGenerationMethods?.includes('generateContent')
      )
      .map((m: { name: string }) => m.name.replace(/^models\//, ''));

    // Determine the best candidate model available on this key
    let chosenModel = CANDIDATE_MODELS.find(m => available.includes(m)) || available[0] || 'gemini-3.8-flash';

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_MODEL_KEY, chosenModel);
    }

    return {
      valid: true,
      model: chosenModel,
    };
  } catch (netErr: unknown) {
    const rawMsg = netErr instanceof Error ? netErr.message : String(netErr);
    return {
      valid: false,
      error: parseGeminiError(0, rawMsg),
    };
  }
}

const SYSTEM_INSTRUCTION = `Bạn là Bách khoa toàn thư Động vật học (Zoology & Wildlife Biology) hàng đầu thế giới.
Khi người dùng nhập vào tên một loài động vật (bằng tiếng Việt, tiếng Anh, hoặc tên khoa học La-tinh):
Nhiệm vụ của bạn là tra cứu và xuất dữ liệu CHÍNH XÁC, CHI TIẾT và TOÀN DIỆN về loài đó dưới định dạng JSON duy nhất.
Tất cả nội dung văn bản mô tả phải bằng TIẾNG VIỆT tự nhiên, chuẩn mực khoa học sinh học.

Cấu trúc JSON yêu cầu chính xác như sau (KHÔNG thêm markdown nào khác ngoài JSON):
{
  "id": "chuỗi slug không dấu ví dụ: su-tu-chau-phi",
  "commonNameVi": "Tên tiếng Việt chuẩn",
  "commonNameEn": "Common English Name",
  "scientificName": "Tên khoa học La-tinh chuẩn (vd: Panthera leo)",
  "otherNames": ["Các tên gọi khác hoặc tên địa phương"],
  "tagline": "Khẩu hiệu ngắn gọn, ấn tượng làm nổi bật loài này",
  "summary": "Đoạn tóm tắt tổng quan hấp dẫn từ 2-3 câu",
  "conservationStatus": {
    "code": "Mã IUCN chuẩn: EX, EW, CR, EN, VU, NT, LC, hoặc DD",
    "labelVi": "Tên tiếng Việt của tình trạng (ví dụ: Sắp nguy cấp, Cực kỳ nguy cấp, Ít quan tâm...)",
    "labelEn": "Tên tiếng Anh (Vulnerable, Endangered, etc.)",
    "description": "Mô tả chi tiết hiện trạng số lượng cá thể trong tự nhiên và xu hướng"
  },
  "taxonomy": {
    "kingdom": "Animalia (Động vật)",
    "phylum": "Ngành (ví dụ: Chordata / Dây sống)",
    "class": "Lớp (ví dụ: Mammalia / Thú)",
    "order": "Bộ (ví dụ: Carnivora / Ăn thịt)",
    "family": "Họ (ví dụ: Felidae / Họ Mèo)",
    "genus": "Chi (ví dụ: Panthera)",
    "species": "Loài (ví dụ: Panthera leo)"
  },
  "metrics": {
    "averageLength": "Kích thước chiều dài / chiều cao kèm đơn vị",
    "averageWeight": "Cân nặng kèm đơn vị",
    "lifespanInWild": "Tuổi thọ trong tự nhiên",
    "lifespanInCaptivity": "Tuổi thọ nuôi nhốt",
    "topSpeed": "Tốc độ tối đa",
    "dietType": "Loại hình dinh dưỡng (Ăn thịt, Ăn thực vật, Ăn tạp...)",
    "activeTime": "Thời gian hoạt động (Ban ngày, Ban đêm, Hoàng hôn/Bình minh)"
  },
  "habitat": {
    "biomes": ["Hệ sinh thái chính, ví dụ: Thảo nguyên xavan, Rừng nhiệt đới..."],
    "regions": ["Khu vực địa lý phân bố trên thế giới"],
    "description": "Mô tả chi tiết nơi ở, độ cao, địa hình ưa thích"
  },
  "physicalCharacteristics": {
    "description": "Mô tả chi tiết cấu tạo cơ thể, màu lông/da, giác quan, cấu trúc giải phẫu đặc trưng",
    "keyFeatures": ["3-5 đặc điểm hình thái nổi bật nhất"],
    "camouflageOrDefenses": "Khả năng ngụy trang hoặc cơ chế tự vệ đặc sắc"
  },
  "behaviorAndEcology": {
    "socialStructure": "Cấu trúc xã hội (sống đơn độc, bầy đàn, gia đình...)",
    "huntingOrForaging": "Chiến thuật săn mồi hoặc tìm kiếm thức ăn",
    "communication": "Phương thức giao tiếp (âm thanh gầm hú, tín hiệu mùi, ngôn ngữ cơ thể...)",
    "specialAdaptations": "Những sự thích nghi tiến hóa kỳ diệu"
  },
  "diet": {
    "category": "Ăn thịt / Ăn thực vật / Ăn tạp",
    "primaryFoods": ["Các con mồi hoặc thức ăn ưa thích"],
    "description": "Khẩu phần ăn hàng ngày và nhu cầu nước"
  },
  "reproduction": {
    "gestationPeriod": "Thời gian thai nghén hoặc ấp trứng",
    "litterSize": "Số con/trứng mỗi lứa",
    "parentalCare": "Hành vi bảo vệ và dạy dỗ con non của bố mẹ"
  },
  "threatsAndConservation": {
    "mainThreats": ["3-4 mối đe dọa lớn nhất (săn trộm, mất sinh cảnh, biến đổi khí hậu...)"],
    "conservationEfforts": ["Các biện pháp bảo tồn, vườn quốc gia, chương trình nhân giống..."],
    "populationTrend": "Suy giảm / Ổn định / Tăng / Chưa xác định"
  },
  "funFacts": [
    "4-6 sự thật kỳ thú đáng kinh ngạc và ít người biết về loài này"
  ],
  "humanComparison": {
    "weightVsHuman": "So sánh trọng lượng với người trưởng thành 70kg (ví dụ: Nặng gấp 3 lần một người)",
    "speedVsHuman": "So sánh tốc độ với người chạy nhanh nhất (khoảng 37-44 km/h)",
    "lifespanVsHuman": "So sánh tuổi thọ với tuổi thọ trung bình 75 năm của con người",
    "sizeScaleText": "Mô tả trực quan tỷ lệ cơ thể so với một người cao 1.75m"
  },
  "quiz": [
    {
      "question": "Câu hỏi trắc nghiệm thú vị 1 về đặc tính của loài này?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctIndex": 0,
      "explanation": "Giải thích ngắn gọn tại sao đáp án đó đúng"
    },
    {
      "question": "Câu hỏi trắc nghiệm thú vị 2?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctIndex": 1,
      "explanation": "Giải thích"
    },
    {
      "question": "Câu hỏi trắc nghiệm thú vị 3?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctIndex": 2,
      "explanation": "Giải thích"
    }
  ]
}`;

// Format conservation status colors
function getStatusVisuals(code: ConservationStatusCode): { color: string; badgeBg: string } {
  switch (code) {
    case 'EX':
      return { color: 'text-neutral-300', badgeBg: 'bg-neutral-800 border-neutral-600' };
    case 'EW':
      return { color: 'text-purple-400', badgeBg: 'bg-purple-950/80 border-purple-500/50' };
    case 'CR':
      return { color: 'text-red-400', badgeBg: 'bg-red-950/80 border-red-500/60' };
    case 'EN':
      return { color: 'text-orange-400', badgeBg: 'bg-orange-950/80 border-orange-500/60' };
    case 'VU':
      return { color: 'text-amber-400', badgeBg: 'bg-amber-950/80 border-amber-500/60' };
    case 'NT':
      return { color: 'text-yellow-300', badgeBg: 'bg-yellow-950/80 border-yellow-500/60' };
    case 'LC':
      return { color: 'text-emerald-400', badgeBg: 'bg-emerald-950/80 border-emerald-500/60' };
    case 'DD':
    default:
      return { color: 'text-slate-400', badgeBg: 'bg-slate-800 border-slate-600' };
  }
}

function buildProfileFromParsed(parsed: Partial<AnimalProfile>, query: string): AnimalProfile {
  const code = (parsed.conservationStatus?.code || 'LC') as ConservationStatusCode;
  const visuals = getStatusVisuals(code);

  return {
    id: parsed.id || query.toLowerCase().replace(/\s+/g, '-'),
    commonNameVi: parsed.commonNameVi || query,
    commonNameEn: parsed.commonNameEn || '',
    scientificName: parsed.scientificName || '',
    otherNames: parsed.otherNames || [],
    tagline: parsed.tagline || 'Sinh vật kỳ diệu của tự nhiên',
    summary: parsed.summary || 'Thông tin chi tiết về loài sinh vật đang được cập nhật.',
    conservationStatus: {
      code,
      labelVi: parsed.conservationStatus?.labelVi || 'Ít quan tâm',
      labelEn: parsed.conservationStatus?.labelEn || 'Least Concern',
      description: parsed.conservationStatus?.description || 'Quần thể hiện đang ở trạng thái tương đối ổn định.',
      ...visuals,
    },
    taxonomy: {
      kingdom: parsed.taxonomy?.kingdom || 'Animalia (Động vật)',
      phylum: parsed.taxonomy?.phylum || 'Chordata (Dây sống)',
      class: parsed.taxonomy?.class || 'Không xác định',
      order: parsed.taxonomy?.order || 'Không xác định',
      family: parsed.taxonomy?.family || 'Không xác định',
      genus: parsed.taxonomy?.genus || 'Không xác định',
      species: parsed.taxonomy?.species || 'Không xác định',
    },
    metrics: {
      averageLength: parsed.metrics?.averageLength || 'Đang cập nhật',
      averageWeight: parsed.metrics?.averageWeight || 'Đang cập nhật',
      lifespanInWild: parsed.metrics?.lifespanInWild || 'Đang cập nhật',
      lifespanInCaptivity: parsed.metrics?.lifespanInCaptivity || 'Đang cập nhật',
      topSpeed: parsed.metrics?.topSpeed || 'Đang cập nhật',
      dietType: parsed.metrics?.dietType || 'Đang cập nhật',
      activeTime: parsed.metrics?.activeTime || 'Đang cập nhật',
    },
    habitat: {
      biomes: parsed.habitat?.biomes || ['Môi trường sống tự nhiên'],
      regions: parsed.habitat?.regions || ['Toàn cầu'],
      description: parsed.habitat?.description || 'Phân bố rộng khắp trong các sinh cảnh phù hợp.',
    },
    physicalCharacteristics: {
      description: parsed.physicalCharacteristics?.description || 'Hình thái cơ thể đặc trưng.',
      keyFeatures: parsed.physicalCharacteristics?.keyFeatures || [],
      camouflageOrDefenses: parsed.physicalCharacteristics?.camouflageOrDefenses,
    },
    behaviorAndEcology: {
      socialStructure: parsed.behaviorAndEcology?.socialStructure || 'Đang cập nhật',
      huntingOrForaging: parsed.behaviorAndEcology?.huntingOrForaging || 'Đang cập nhật',
      communication: parsed.behaviorAndEcology?.communication || 'Đang cập nhật',
      specialAdaptations: parsed.behaviorAndEcology?.specialAdaptations,
    },
    diet: {
      category: parsed.diet?.category || 'Đa dạng',
      primaryFoods: parsed.diet?.primaryFoods || [],
      description: parsed.diet?.description || 'Chế độ ăn phù hợp với sinh thái.',
    },
    reproduction: {
      gestationPeriod: parsed.reproduction?.gestationPeriod || 'Đang cập nhật',
      litterSize: parsed.reproduction?.litterSize || 'Đang cập nhật',
      parentalCare: parsed.reproduction?.parentalCare || 'Đang cập nhật',
    },
    threatsAndConservation: {
      mainThreats: parsed.threatsAndConservation?.mainThreats || ['Mất môi trường sống'],
      conservationEfforts: parsed.threatsAndConservation?.conservationEfforts || ['Đang được theo dõi và bảo tồn'],
      populationTrend: parsed.threatsAndConservation?.populationTrend || 'Chưa xác định',
    },
    funFacts: parsed.funFacts && parsed.funFacts.length > 0 ? parsed.funFacts : [
      'Loài động vật này đóng vai trò quan trọng trong việc cân bằng hệ sinh thái khu vực.',
      'Sở hữu những giác quan nhạy bén giúp thích nghi tốt với môi trường sống.',
      'Là đối tượng nghiên cứu sinh học quý giá về tiến hóa và thích nghi tự nhiên.'
    ],
    humanComparison: {
      weightVsHuman: parsed.humanComparison?.weightVsHuman || 'Tương đương thể trọng bình thường',
      speedVsHuman: parsed.humanComparison?.speedVsHuman || 'Di chuyển linh hoạt',
      lifespanVsHuman: parsed.humanComparison?.lifespanVsHuman || 'Tuổi thọ đặc trưng của loài',
      sizeScaleText: parsed.humanComparison?.sizeScaleText || 'Tỷ lệ kích thước thích ứng với môi trường sống',
    },
    quiz: parsed.quiz && parsed.quiz.length > 0 ? parsed.quiz : [
      {
        question: `Loài ${parsed.commonNameVi || query} thuộc lớp động vật nào?`,
        options: [
          parsed.taxonomy?.class || 'Động vật có vú (Mammalia)',
          'Bò sát (Reptilia)',
          'Lưỡng cư (Amphibia)',
          'Chim (Aves)'
        ],
        correctIndex: 0,
        explanation: `Theo phân loại sinh học, loài này thuộc lớp ${parsed.taxonomy?.class || 'Mammalia'}.`
      }
    ]
  };
}

// Fetch animal information from Gemini
export async function fetchAnimalDetails(
  query: string,
  providedKey?: string
): Promise<AnimalProfile> {
  const apiKey = cleanApiKey(providedKey || getStoredApiKey());

  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  let parsed: Partial<AnimalProfile> | null = null;
  let lastErrorMessage = '';

  // 1. First, attempt fetch via backend proxy route if available
  try {
    const proxyRes = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, apiKey }),
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.profile) {
        parsed = data.profile;
      }
    } else if (proxyRes.status === 400 || proxyRes.status === 401 || proxyRes.status === 403) {
      const errData = await proxyRes.json().catch(() => ({}));
      throw new Error(errData.error || parseGeminiError(proxyRes.status, ''));
    }
  } catch (proxyErr: unknown) {
    if (proxyErr instanceof Error && (proxyErr.message.includes('Mã API Key không hợp lệ') || proxyErr.message.includes('hạn chế quyền'))) {
      throw proxyErr;
    }
    // Otherwise fallback to client-side direct fetch
  }

  // 2. Direct client fetch fallback
  if (!parsed) {
    const prompt = `Hãy cung cấp hồ sơ sinh học chi tiết và toàn diện cho loài động vật: "${query}". Trả về CHÍNH XÁC định dạng JSON đã yêu cầu, không thêm văn bản giải thích.`;

    // Prioritize active model saved previously if present
    const savedModel = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_MODEL_KEY) : null;
    const modelOrder = savedModel && CANDIDATE_MODELS.includes(savedModel)
      ? [savedModel, ...CANDIDATE_MODELS.filter(m => m !== savedModel)]
      : CANDIDATE_MODELS;

    for (const model of modelOrder) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          }),
        });

        if (response.status === 404 || response.status === 503 || response.status === 429) {
          const errorJson = await response.json().catch(() => ({}));
          lastErrorMessage = parseGeminiError(response.status, errorJson?.error?.message || '');
          continue; // Try next model in candidate list
        }

        if (!response.ok) {
          const errorJson = await response.json().catch(() => ({}));
          const rawMsg = errorJson?.error?.message || `Lỗi Gemini API (Mã: ${response.status})`;
          lastErrorMessage = parseGeminiError(response.status, rawMsg);
          
          if (response.status === 400 || response.status === 403) {
            throw new Error(lastErrorMessage);
          }
          continue;
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          let cleanJson = rawText.trim();
          if (cleanJson.startsWith('```json')) {
            cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
          } else if (cleanJson.startsWith('```')) {
            cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
          }
          parsed = JSON.parse(cleanJson);
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_MODEL_KEY, model);
          }
          break;
        }
      } catch (err: unknown) {
        if (err instanceof Error && (err.message.includes('Mã API Key không hợp lệ') || err.message.includes('hạn chế quyền'))) {
          throw err;
        }
        lastErrorMessage = err instanceof Error ? parseGeminiError(0, err.message) : String(err);
      }
    }
  }

  if (!parsed) {
    throw new Error(lastErrorMessage || 'Mô hình Gemini không phản hồi nội dung. Vui lòng kiểm tra lại API Key hoặc thử lại sau vài giây.');
  }

  const profile = buildProfileFromParsed(parsed, query);

  // Fetch encyclopedic photographs from Wikipedia/Wikimedia Commons
  try {
    const images = await fetchAnimalImages(
      profile.scientificName,
      profile.commonNameEn,
      profile.commonNameVi
    );
    profile.imageUrl = images.imageUrl;
    profile.imageCaption = images.imageCaption;
    profile.imageSource = 'Wikipedia / Wikimedia Commons';
    profile.galleryImages = images.galleryImages;
  } catch (imgErr) {
    console.warn('Image fetch failed:', imgErr);
  }

  return profile;
}

// Q&A for specific animal
export async function askAnimalQuestion(
  animal: AnimalProfile,
  question: string,
  providedKey?: string
): Promise<string> {
  const apiKey = cleanApiKey(providedKey || getStoredApiKey());
  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  // 1. First, attempt via backend proxy
  try {
    const proxyRes = await fetch('/api/gemini/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ animal, question, apiKey }),
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.answer) return data.answer;
    }
  } catch {
    // Fallback to client-side direct call
  }

  // 2. Direct client call
  const prompt = `Người dùng đang hỏi về loài động vật sau:
- Tên tiếng Việt: ${animal.commonNameVi}
- Tên khoa học: ${animal.scientificName}
- Tên tiếng Anh: ${animal.commonNameEn}
- Đặc điểm: ${animal.summary}

Câu hỏi của người dùng: "${question}"

Hãy trả lời bằng tiếng Việt một cách sâu sắc, chính xác về mặt sinh học, khoa học và cuốn hút. Trả lời trực tiếp, rõ ràng (khoảng 2-3 đoạn ngắn), có thể dùng gạch đầu dòng nếu cần.`;

  const savedModel = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_MODEL_KEY) : null;
  const modelOrder = savedModel && CANDIDATE_MODELS.includes(savedModel)
    ? [savedModel, ...CANDIDATE_MODELS.filter(m => m !== savedModel)]
    : CANDIDATE_MODELS;

  for (const model of modelOrder) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 800,
          }
        })
      });

      if (response.status === 404 || response.status === 503 || response.status === 429) {
        continue;
      }

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        const rawMsg = errorJson?.error?.message || `Lỗi Gemini API (Mã: ${response.status})`;
        throw new Error(parseGeminiError(response.status, rawMsg));
      }

      const data = await response.json();
      const ans = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (ans) return ans;
    } catch (err: unknown) {
      if (model === modelOrder[modelOrder.length - 1]) {
        throw err;
      }
    }
  }

  return 'Không nhận được câu trả lời từ Gemini AI.';
}
