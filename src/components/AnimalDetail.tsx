import React, { useState, useEffect } from 'react';
import { 
  AnimalProfile, 
  ConservationStatusCode 
} from '../types/animal';
import { 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share2, 
  Sparkles, 
  ShieldAlert, 
  Scale, 
  Zap, 
  Clock, 
  Heart, 
  HelpCircle, 
  Send, 
  Compass, 
  CheckCircle, 
  Layers, 
  Dna, 
  Info,
  Check,
  ChevronRight,
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';
import { askAnimalQuestion } from '../services/geminiService';

interface AnimalDetailProps {
  animal: AnimalProfile;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  apiKey: string;
  onOpenKeyModal: () => void;
}

export const AnimalDetail: React.FC<AnimalDetailProps> = ({
  animal,
  isBookmarked,
  onToggleBookmark,
  apiKey,
  onOpenKeyModal,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'ecology' | 'conservation' | 'quiz' | 'ask'>('overview');
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({});

  // Follow-up Q&A state
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'gemini'; text: string }[]>([]);

  // Selected gallery image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset states on animal change
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted({});
    setChatMessages([]);
    setChatQuestion('');
    setCurrentImageIndex(0);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [animal.id]);

  // Audio Reader using Web Speech Synthesis
  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng đọc âm thanh.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${animal.commonNameVi}. Tên khoa học: ${animal.scientificName}. ${animal.tagline}. ${animal.summary}. Hiện trạng bảo tồn: ${animal.conservationStatus.labelVi}. ${animal.funFacts.slice(0, 2).join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Copy share summary
  const handleShare = () => {
    const text = `🐾 ${animal.commonNameVi} (${animal.scientificName})\n` +
      `🏷️ Tình trạng bảo tồn: ${animal.conservationStatus.labelVi} (${animal.conservationStatus.code})\n` +
      `📌 ${animal.tagline}\n` +
      `✨ ${animal.summary}\n` +
      `Tra cứu trên FaunaPedia!`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Quiz answer selection
  const handleSelectQuizOption = (qIndex: number, optIndex: number) => {
    if (quizSubmitted[qIndex]) return;
    setQuizAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    setQuizSubmitted(prev => ({ ...prev, [qIndex]: true }));
  };

  // Handle asking Gemini AI a custom question about this animal
  const handleAskGemini = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim()) return;

    if (!apiKey) {
      onOpenKeyModal();
      return;
    }

    const q = chatQuestion.trim();
    setChatQuestion('');
    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setChatLoading(true);

    try {
      const answer = await askAnimalQuestion(animal, q, apiKey);
      setChatMessages(prev => [...prev, { sender: 'gemini', text: answer }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Có lỗi khi liên hệ với Gemini.';
      setChatMessages(prev => [...prev, { 
        sender: 'gemini', 
        text: `⚠️ Không thể phản hồi: ${msg}. Vui lòng kiểm tra lại API Key.` 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const imagesList = animal.galleryImages && animal.galleryImages.length > 0
    ? animal.galleryImages
    : [{ url: animal.imageUrl || '', title: animal.commonNameVi, source: 'Wikipedia' }];

  const activeImage = imagesList[currentImageIndex] || imagesList[0];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in pb-16">
      {/* Top Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        {/* Background Image Container */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
          <img
            src={activeImage.url}
            alt={animal.commonNameVi}
            className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
            onError={(e) => {
              // Fallback image if error loading
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          {/* Gradient Overlay for high readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Top Floating Badges & Action Buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
            {/* IUCN Status Badge */}
            <div className={`px-3 py-1.5 rounded-full border backdrop-blur-md flex items-center gap-2 shadow-lg ${animal.conservationStatus.badgeBg}`}>
              <ShieldAlert className={`w-4 h-4 ${animal.conservationStatus.color}`} />
              <div className="text-xs font-bold leading-tight">
                <span className={animal.conservationStatus.color}>{animal.conservationStatus.labelVi}</span>
                <span className="text-slate-400 ml-1 font-mono text-[10px]">({animal.conservationStatus.code})</span>
              </div>
            </div>

            {/* Quick Actions (Audio, Bookmark, Share) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className={`p-2.5 rounded-full backdrop-blur-md border transition shadow-lg ${
                  isPlayingAudio 
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse' 
                    : 'bg-slate-900/80 text-slate-200 border-slate-700/80 hover:bg-slate-800'
                }`}
                title={isPlayingAudio ? 'Dừng đọc' : 'Đọc hồ sơ bằng giọng nói'}
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onToggleBookmark}
                className={`p-2.5 rounded-full backdrop-blur-md border transition shadow-lg ${
                  isBookmarked
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900/80 text-slate-200 border-slate-700/80 hover:bg-slate-800 hover:text-amber-400'
                }`}
                title={isBookmarked ? 'Bỏ lưu' : 'Lưu vào danh sách yêu thích'}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-slate-900/80 text-slate-200 border border-slate-700/80 hover:bg-slate-800 backdrop-blur-md transition shadow-lg"
                title="Sao chép tóm tắt để chia sẻ"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Bottom Title & Binomial on Hero */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-10 space-y-2">
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {animal.commonNameVi}
              </h1>
              <span className="text-lg sm:text-2xl font-serif italic text-emerald-300 drop-shadow">
                {animal.scientificName}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
              <span className="text-slate-400 font-medium">Tên tiếng Anh:</span>
              <span className="text-white font-semibold">{animal.commonNameEn}</span>
              {animal.otherNames && animal.otherNames.length > 0 && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">Tên gọi khác:</span>
                  <span className="text-slate-300">{animal.otherNames.join(', ')}</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/90 font-medium italic drop-shadow max-w-3xl">
              "{animal.tagline}"
            </p>
          </div>
        </div>

        {/* Image Gallery thumbnails row if multiple */}
        {imagesList.length > 1 && (
          <div className="px-4 sm:px-8 py-3 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-slate-400 shrink-0 font-medium">Bộ sưu tập ảnh:</span>
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                    currentImageIndex === idx 
                      ? 'border-emerald-400 scale-105 shadow-md shadow-emerald-500/20' 
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 shrink-0 hidden sm:inline">
              Nguồn: {activeImage.source || 'Wikipedia'}
            </span>
          </div>
        )}

        {/* Summary Description Box */}
        <div className="p-4 sm:p-8 bg-slate-900 border-t border-slate-800/80">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {animal.summary}
          </p>
        </div>
      </div>

      {/* Key Bio-Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Kích thước</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm font-bold text-slate-100 line-clamp-2">
            {animal.metrics.averageLength}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Cân nặng</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm font-bold text-slate-100 line-clamp-2">
            {animal.metrics.averageWeight}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Tốc độ tối đa</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm font-bold text-slate-100 line-clamp-2">
            {animal.metrics.topSpeed}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Tuổi thọ hoang dã</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm font-bold text-slate-100 line-clamp-2">
            {animal.metrics.lifespanInWild}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Khẩu phần ăn</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm font-bold text-slate-100 line-clamp-2">
            {animal.metrics.dietType}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Thời gian hoạt động</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm font-bold text-slate-100 line-clamp-2">
            {animal.metrics.activeTime}
          </p>
        </div>
      </div>

      {/* Interactive Biological Taxonomy Hierarchy (Phân loại học 7 bậc) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Phân Loại Học Sinh Học (Taxonomy)
              </h3>
              <p className="text-xs text-slate-400">
                Cây phả hệ phân loại 7 bậc chuẩn khoa học quốc tế
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
            {animal.scientificName}
          </span>
        </div>

        {/* Responsive taxonomy flowchart */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">1. Giới (Kingdom)</span>
            <span className="font-semibold text-slate-200 mt-1 block truncate" title={animal.taxonomy.kingdom}>
              {animal.taxonomy.kingdom}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">2. Ngành (Phylum)</span>
            <span className="font-semibold text-slate-200 mt-1 block truncate" title={animal.taxonomy.phylum}>
              {animal.taxonomy.phylum}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">3. Lớp (Class)</span>
            <span className="font-semibold text-slate-200 mt-1 block truncate" title={animal.taxonomy.class}>
              {animal.taxonomy.class}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">4. Bộ (Order)</span>
            <span className="font-semibold text-slate-200 mt-1 block truncate" title={animal.taxonomy.order}>
              {animal.taxonomy.order}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">5. Họ (Family)</span>
            <span className="font-semibold text-slate-200 mt-1 block truncate" title={animal.taxonomy.family}>
              {animal.taxonomy.family}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">6. Chi (Genus)</span>
            <span className="font-semibold text-slate-200 mt-1 block truncate" title={animal.taxonomy.genus}>
              {animal.taxonomy.genus}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <span className="text-emerald-400 text-[10px] uppercase font-bold block">7. Loài (Species)</span>
            <span className="font-bold text-emerald-300 mt-1 block font-serif italic truncate" title={animal.taxonomy.species}>
              {animal.taxonomy.species}
            </span>
          </div>
        </div>
      </div>

      {/* Infographic: So sánh với Con người */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              So Sánh Trực Quan Với Con Người
              <span className="text-xs font-normal text-cyan-400">(Người lớn tiêu chuẩn ~70kg, 1.75m)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Đo lường sự khác biệt về kích thước, sức mạnh và tuổi thọ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Tỷ lệ Cân nặng:
            </span>
            <p className="text-sm font-bold text-slate-100">
              {animal.humanComparison.weightVsHuman}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Tốc độ di chuyển:
            </span>
            <p className="text-sm font-bold text-slate-100">
              {animal.humanComparison.speedVsHuman}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Tuổi thọ trung bình:
            </span>
            <p className="text-sm font-bold text-slate-100">
              {animal.humanComparison.lifespanVsHuman}
            </p>
          </div>
        </div>

        {animal.humanComparison.sizeScaleText && (
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{animal.humanComparison.sizeScaleText}</span>
          </div>
        )}
      </div>

      {/* Navigation Tabs for Deep Dive Information */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto no-scrollbar pb-1 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-t-xl transition flex items-center gap-2 border-b-2 ${
            activeTab === 'overview'
              ? 'text-emerald-400 border-emerald-400 bg-emerald-500/10'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Hình thái & Môi trường</span>
        </button>

        <button
          onClick={() => setActiveTab('ecology')}
          className={`px-4 py-2.5 rounded-t-xl transition flex items-center gap-2 border-b-2 ${
            activeTab === 'ecology'
              ? 'text-emerald-400 border-emerald-400 bg-emerald-500/10'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Tập tính & Sinh sản</span>
        </button>

        <button
          onClick={() => setActiveTab('conservation')}
          className={`px-4 py-2.5 rounded-t-xl transition flex items-center gap-2 border-b-2 ${
            activeTab === 'conservation'
              ? 'text-emerald-400 border-emerald-400 bg-emerald-500/10'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Hiện trạng & Bảo tồn</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 rounded-t-xl transition flex items-center gap-2 border-b-2 ${
            activeTab === 'quiz'
              ? 'text-emerald-400 border-emerald-400 bg-emerald-500/10'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Mini Quiz Trắc nghiệm</span>
        </button>

        <button
          onClick={() => setActiveTab('ask')}
          className={`px-4 py-2.5 rounded-t-xl transition flex items-center gap-2 border-b-2 ${
            activeTab === 'ask'
              ? 'text-emerald-400 border-emerald-400 bg-emerald-500/10'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Hỏi đáp Gemini AI</span>
        </button>
      </div>

      {/* Tab 1: Overview & Habitat */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Physical Characteristics Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Đặc Điểm Hình Thái & Cấu Tạo Cơ Thể
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {animal.physicalCharacteristics.description}
            </p>

            {animal.physicalCharacteristics.keyFeatures.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Đặc điểm nhận dạng nổi bật:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {animal.physicalCharacteristics.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {animal.physicalCharacteristics.camouflageOrDefenses && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-emerald-300">Cơ chế ngụy trang & tự vệ:</span>
                <p>{animal.physicalCharacteristics.camouflageOrDefenses}</p>
              </div>
            )}
          </div>

          {/* Habitat & Distribution */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Môi Trường Sống & Vùng Phân Bố
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {animal.habitat.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Hệ sinh thái chính (Biomes):</span>
                <div className="flex flex-wrap gap-1.5">
                  {animal.habitat.biomes.map((biome, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 text-xs font-medium">
                      {biome}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Khu vực địa lý phân bố:</span>
                <div className="flex flex-wrap gap-1.5">
                  {animal.habitat.regions.map((reg, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 text-xs font-medium">
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ecology & Behavior */}
      {activeTab === 'ecology' && (
        <div className="space-y-6">
          {/* Behavior & Social */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Tập Tính Xã Hội & Săn Mồi
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-semibold text-amber-400 uppercase">Cấu trúc xã hội:</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {animal.behaviorAndEcology.socialStructure}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-semibold text-rose-400 uppercase">Chiến thuật kiếm ăn / Săn mồi:</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {animal.behaviorAndEcology.huntingOrForaging}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-semibold text-purple-400 uppercase">Giao tiếp & Ngôn ngữ:</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {animal.behaviorAndEcology.communication}
                </p>
              </div>

              {animal.behaviorAndEcology.specialAdaptations && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-semibold text-emerald-400 uppercase">Thích nghi tiến hóa đặc biệt:</span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {animal.behaviorAndEcology.specialAdaptations}
                  </p>
                </div>
              )}
            </div>

            {/* Diet breakdown */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Thức ăn yêu thích:</span>
              <div className="flex flex-wrap gap-2">
                {animal.diet.primaryFoods.map((food, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-medium flex items-center gap-1.5">
                    <span className="text-emerald-400">•</span>
                    {food}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 pt-1">{animal.diet.description}</p>
            </div>
          </div>

          {/* Reproduction & Life Cycle */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
              Sinh Sản & Vòng Đời
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">Thời gian mang thai / ấp trứng</span>
                <p className="mt-1 text-sm font-bold text-slate-100">{animal.reproduction.gestationPeriod}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">Số con mỗi lứa</span>
                <p className="mt-1 text-sm font-bold text-slate-100">{animal.reproduction.litterSize}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 sm:col-span-1 col-span-1">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">Chăm sóc con non</span>
                <p className="mt-1 text-xs text-slate-200">{animal.reproduction.parentalCare}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Conservation & Threats */}
      {activeTab === 'conservation' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              Hiện Trạng Bảo Tồn & Mối Đe Dọa Sinh Học
            </h4>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${animal.conservationStatus.badgeBg} ${animal.conservationStatus.color}`}>
              {animal.conservationStatus.labelVi} ({animal.conservationStatus.code})
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">Tình trạng quần thể ngoài tự nhiên:</span>
            <p className="text-sm text-slate-200 leading-relaxed">
              {animal.conservationStatus.description}
            </p>
            <div className="flex items-center gap-2 text-xs pt-2">
              <span className="text-slate-400">Xu hướng quần thể:</span>
              <span className="font-bold text-amber-400">{animal.threatsAndConservation.populationTrend}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
              <span className="text-xs font-bold text-red-400 uppercase flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Mối đe dọa sinh tồn chính:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {animal.threatsAndConservation.mainThreats.map((threat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>{threat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                Hành động & Nỗ lực bảo tồn:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {animal.threatsAndConservation.conservationEfforts.map((effort, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{effort}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Interactive Quiz */}
      {activeTab === 'quiz' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100">
                  Thử Thách Hiểu Biết Về Loài {animal.commonNameVi}
                </h4>
                <p className="text-xs text-slate-400">3 câu đố vui trắc nghiệm kiến thức sinh học</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {animal.quiz.map((q, qIndex) => {
              const isAnswered = quizSubmitted[qIndex];
              const selectedOpt = quizAnswers[qIndex];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={qIndex} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                      {qIndex + 1}
                    </span>
                    <p className="text-sm font-bold text-slate-100">{q.question}</p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pl-8">
                    {q.options.map((opt, optIndex) => {
                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white';
                      if (isAnswered) {
                        if (optIndex === q.correctIndex) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                        } else if (selectedOpt === optIndex) {
                          btnStyle = 'bg-red-950/80 border-red-500 text-red-300';
                        } else {
                          btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-600';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectQuizOption(qIndex, optIndex)}
                          disabled={isAnswered}
                          className={`p-3 rounded-xl border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIndex === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback */}
                  {isAnswered && (
                    <div className={`mt-2 p-3 rounded-xl text-xs pl-8 border ${
                      isCorrect 
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
                        : 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                    }`}>
                      <p className="font-semibold">{isCorrect ? '🎉 Chính xác!' : '💡 Chưa chính xác!'}</p>
                      <p className="mt-0.5 opacity-90">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Ask Gemini AI Deep Dive Q&A */}
      {activeTab === 'ask' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100">
                  Hỏi Đáp Chuyên Sâu Về {animal.commonNameVi} Với Gemini AI
                </h4>
                <p className="text-xs text-slate-400">
                  Đặt bất kỳ câu hỏi nào về tập tính, trí thông minh hoặc cách sống sót
                </p>
              </div>
            </div>
            {!apiKey && (
              <button
                onClick={onOpenKeyModal}
                className="text-xs px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold hover:bg-amber-500/30 transition"
              >
                Nhập API Key
              </button>
            )}
          </div>

          {/* Quick suggested prompt buttons */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium">Hỏi nhanh:</span>
            {[
              `Cách loài này giao tiếp với nhau thế nào?`,
              `Loài này có ngủ đông hay di cư không?`,
              `Kẻ thù tự nhiên đáng sợ nhất của loài này là gì?`,
              `Tại sao chúng lại có màu sắc và cấu tạo như vậy?`
            ].map((presetQ, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setChatQuestion(presetQ);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition"
              >
                {presetQ}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="space-y-3 min-h-[140px] max-h-[400px] overflow-y-auto p-4 rounded-2xl bg-slate-950 border border-slate-800">
            {chatMessages.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs space-y-1">
                <HelpCircle className="w-6 h-6 mx-auto text-slate-600 mb-2" />
                <p>Chưa có câu hỏi nào. Hãy gõ thắc mắc của bạn bên dưới!</p>
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                  }`}>
                    {msg.sender === 'gemini' && (
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Gemini Sinh Học</span>
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))
            )}

            {chatLoading && (
              <div className="flex justify-start">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span>Gemini đang tra cứu kiến thức sinh học...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input form */}
          <form onSubmit={handleAskGemini} className="flex items-center gap-2">
            <input
              type="text"
              value={chatQuestion}
              onChange={(e) => setChatQuestion(e.target.value)}
              placeholder={`Đặt câu hỏi về ${animal.commonNameVi}...`}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              disabled={chatLoading}
            />
            <button
              type="submit"
              disabled={chatLoading || !chatQuestion.trim()}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs disabled:opacity-40 transition flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Gửi</span>
            </button>
          </form>
        </div>
      )}

      {/* 10 Sự Thật Kỳ Thú (Fun & Mind-Blowing Facts) Grid */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Những Sự Thật Kỳ Thú Ít Người Biết
            </h3>
            <p className="text-xs text-slate-400">Những điều thú vị và đáng kinh ngạc về loài này</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {animal.funFacts.map((fact, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/30 transition flex items-start gap-3 group"
            >
              <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {fact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
