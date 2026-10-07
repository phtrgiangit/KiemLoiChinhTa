import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Modern candidate models supported by Google Gemini
const SERVER_CANDIDATE_MODELS = [
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3-flash-preview',
];

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
    "labelVi": "Tên tiếng Việt của tình trạng",
    "labelEn": "Tên tiếng Anh",
    "description": "Mô tả chi tiết hiện trạng số lượng cá thể trong tự nhiên và xu hướng"
  },
  "taxonomy": {
    "kingdom": "Animalia (Động vật)",
    "phylum": "Ngành",
    "class": "Lớp",
    "order": "Bộ",
    "family": "Họ",
    "genus": "Chi",
    "species": "Loài"
  },
  "metrics": {
    "averageLength": "Kích thước chiều dài / chiều cao kèm đơn vị",
    "averageWeight": "Cân nặng kèm đơn vị",
    "lifespanInWild": "Tuổi thọ trong tự nhiên",
    "lifespanInCaptivity": "Tuổi thọ nuôi nhốt",
    "topSpeed": "Tốc độ tối đa",
    "dietType": "Loại hình dinh dưỡng",
    "activeTime": "Thời gian hoạt động"
  },
  "habitat": {
    "biomes": ["Hệ sinh thái chính"],
    "regions": ["Khu vực địa lý phân bố trên thế giới"],
    "description": "Mô tả chi tiết nơi ở, độ cao, địa hình ưa thích"
  },
  "physicalCharacteristics": {
    "description": "Mô tả chi tiết cấu tạo cơ thể, màu lông/da, giác quan, cấu trúc giải phẫu đặc trưng",
    "keyFeatures": ["3-5 đặc điểm hình thái nổi bật nhất"],
    "camouflageOrDefenses": "Khả năng ngụy trang hoặc cơ chế tự vệ đặc sắc"
  },
  "behaviorAndEcology": {
    "socialStructure": "Cấu trúc xã hội",
    "huntingOrForaging": "Chiến thuật săn mồi hoặc tìm kiếm thức ăn",
    "communication": "Phương thức giao tiếp",
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
    "mainThreats": ["3-4 mối đe dọa lớn nhất"],
    "conservationEfforts": ["Các biện pháp bảo tồn"],
    "populationTrend": "Suy giảm / Ổn định / Tăng / Chưa xác định"
  },
  "funFacts": [
    "4-6 sự thật kỳ thú đáng kinh ngạc"
  ],
  "humanComparison": {
    "weightVsHuman": "So sánh trọng lượng với người trưởng thành 70kg",
    "speedVsHuman": "So sánh tốc độ với người chạy nhanh nhất",
    "lifespanVsHuman": "So sánh tuổi thọ với tuổi thọ trung bình 75 năm",
    "sizeScaleText": "Mô tả trực quan tỷ lệ cơ thể so với người cao 1.75m"
  },
  "quiz": [
    {
      "question": "Câu hỏi trắc nghiệm thú vị 1?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctIndex": 0,
      "explanation": "Giải thích"
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

// API Route: Validate Gemini Key
app.post('/api/gemini/validate', async (req, res) => {
  const rawKey = req.body?.apiKey || process.env.GEMINI_API_KEY;
  const apiKey = typeof rawKey === 'string' ? rawKey.trim().replace(/^["']|["']$/g, '').trim() : '';

  if (!apiKey || apiKey.length < 10) {
    return res.status(400).json({
      valid: false,
      error: 'Mã API key không hợp lệ hoặc quá ngắn.',
    });
  }

  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!listRes.ok) {
      const errData = await listRes.json().catch(() => ({}));
      const rawMsg = errData?.error?.message || `HTTP ${listRes.status}`;
      return res.status(listRes.status).json({
        valid: false,
        error: rawMsg.includes('API_KEY_INVALID') || listRes.status === 400
          ? 'Mã API Key không hợp lệ. Vui lòng kiểm tra lại mã đã sao chép từ Google AI Studio (bắt đầu bằng AIzaSy...).'
          : `Lỗi kết nối từ Google: ${rawMsg}`,
      });
    }

    const listData = await listRes.json();
    const available = (listData.models || [])
      .filter((m: { supportedGenerationMethods?: string[] }) =>
        m.supportedGenerationMethods?.includes('generateContent')
      )
      .map((m: { name: string }) => m.name.replace(/^models\//, ''));

    // Pick top matched model
    let chosenModel = SERVER_CANDIDATE_MODELS.find(m => available.includes(m)) || available[0] || 'gemini-3.8-flash';

    return res.json({
      valid: true,
      model: chosenModel,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      valid: false,
      error: `Lỗi kết nối mạng: ${msg}`,
    });
  }
});

// API Route: Generate Animal Dossier
app.post('/api/gemini/generate', async (req, res) => {
  const { query } = req.body;
  const rawKey = req.body?.apiKey || process.env.GEMINI_API_KEY;
  const apiKey = typeof rawKey === 'string' ? rawKey.trim().replace(/^["']|["']$/g, '').trim() : '';

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Thiếu tên con vật cần tra cứu.' });
  }

  if (!apiKey) {
    return res.status(401).json({ error: 'MISSING_API_KEY' });
  }

  const prompt = `Hãy cung cấp hồ sơ sinh học chi tiết và toàn diện cho loài động vật: "${query}". Trả về CHÍNH XÁC định dạng JSON đã yêu cầu, không thêm văn bản giải thích.`;

  let lastError = '';
  for (const model of SERVER_CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const apiRes = await fetch(url, {
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

      if (apiRes.status === 404 || apiRes.status === 503 || apiRes.status === 429) {
        const errBody = await apiRes.json().catch(() => ({}));
        lastError = errBody?.error?.message || `HTTP ${apiRes.status}`;
        continue;
      }

      if (!apiRes.ok) {
        const errBody = await apiRes.json().catch(() => ({}));
        const rawMsg = errBody?.error?.message || `Lỗi HTTP ${apiRes.status}`;
        if (apiRes.status === 400 || apiRes.status === 403) {
          return res.status(apiRes.status).json({ error: rawMsg });
        }
        lastError = rawMsg;
        continue;
      }

      const data = await apiRes.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        let cleanJson = rawText.trim();
        if (cleanJson.startsWith('```json')) {
          cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanJson.startsWith('```')) {
          cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        const parsed = JSON.parse(cleanJson);
        return res.json({ profile: parsed, model });
      }
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  return res.status(500).json({
    error: lastError || 'Không thể tạo hồ sơ động vật từ Gemini AI.',
  });
});

// API Route: Ask Animal Question
app.post('/api/gemini/ask', async (req, res) => {
  const { animal, question } = req.body;
  const rawKey = req.body?.apiKey || process.env.GEMINI_API_KEY;
  const apiKey = typeof rawKey === 'string' ? rawKey.trim().replace(/^["']|["']$/g, '').trim() : '';

  if (!animal || !question) {
    return res.status(400).json({ error: 'Thiếu thông tin câu hỏi hoặc loài động vật.' });
  }

  if (!apiKey) {
    return res.status(401).json({ error: 'MISSING_API_KEY' });
  }

  const prompt = `Người dùng đang hỏi về loài động vật sau:
- Tên tiếng Việt: ${animal.commonNameVi}
- Tên khoa học: ${animal.scientificName}
- Tên tiếng Anh: ${animal.commonNameEn}
- Đặc điểm: ${animal.summary}

Câu hỏi của người dùng: "${question}"

Hãy trả lời bằng tiếng Việt một cách sâu sắc, chính xác về mặt sinh học, khoa học và cuốn hút. Trả lời trực tiếp, rõ ràng (khoảng 2-3 đoạn ngắn), có thể dùng gạch đầu dòng nếu cần.`;

  let lastError = '';
  for (const model of SERVER_CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const apiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 800,
          },
        }),
      });

      if (apiRes.status === 404 || apiRes.status === 503 || apiRes.status === 429) {
        continue;
      }

      if (!apiRes.ok) {
        const errBody = await apiRes.json().catch(() => ({}));
        lastError = errBody?.error?.message || `HTTP ${apiRes.status}`;
        continue;
      }

      const data = await apiRes.json();
      const ans = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (ans) {
        return res.json({ answer: ans, model });
      }
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  return res.status(500).json({
    error: lastError || 'Không thể nhận phản hồi từ Gemini AI.',
  });
});

// Vite Middleware for Development / Static Serve for Production
async function setupServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FaunaPedia server running on port ${PORT} (isProd: ${isProd})`);
  });
}

setupServer().catch(err => {
  console.error('Failed to start server:', err);
});
