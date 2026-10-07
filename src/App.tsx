import { useState, useEffect } from 'react';
import { AnimalProfile, SearchHistoryItem } from './types/animal';
import { 
  getStoredApiKey, 
  saveApiKey, 
  removeApiKey, 
  fetchAnimalDetails 
} from './services/geminiService';
import { POPULAR_ANIMALS, PRESET_PROFILES } from './data/sampleAnimals';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { AnimalDetail } from './components/AnimalDetail';
import { ApiKeyModal } from './components/ApiKeyModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { FavoritesModal } from './components/FavoritesModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { 
  Sparkles, 
  AlertCircle, 
  Key, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Compass, 
  Dna,
  HeartHandshake
} from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'faunapedia_favorites';
const HISTORY_STORAGE_KEY = 'faunapedia_history';

export default function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [activeAnimal, setActiveAnimal] = useState<AnimalProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Modals state
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Favorites and History persistence
  const [favorites, setFavorites] = useState<AnimalProfile[]>([]);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Initialize on mount
  useEffect(() => {
    const key = getStoredApiKey();
    setApiKey(key);

    try {
      const savedFavs = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedHist = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHist) setHistory(JSON.parse(savedHist));
    } catch {
      // ignore
    }

    // Load initial featured animal: Sư tử châu Phi
    setActiveAnimal(PRESET_PROFILES['su-tu-chau-phi']);
  }, []);

  // Save favorites to storage
  const handleToggleBookmark = () => {
    if (!activeAnimal) return;
    setFavorites((prev) => {
      const exists = prev.some((a) => a.id === activeAnimal.id);
      let updated: AnimalProfile[];
      if (exists) {
        updated = prev.filter((a) => a.id !== activeAnimal.id);
      } else {
        updated = [activeAnimal, ...prev];
      }
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  };

  // Add item to history
  const addToHistory = (animal: AnimalProfile) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.id !== animal.id);
      const updated: SearchHistoryItem[] = [
        {
          id: animal.id,
          nameVi: animal.commonNameVi,
          nameEn: animal.commonNameEn,
          scientificName: animal.scientificName,
          statusBadge: animal.conservationStatus.code,
          timestamp: Date.now(),
        },
        ...filtered.slice(0, 19),
      ];
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  // Key management
  const handleSaveKey = (newKey: string) => {
    saveApiKey(newKey);
    setApiKey(newKey);
    setSearchError(null);
  };

  const handleRemoveKey = () => {
    removeApiKey();
    setApiKey('');
  };

  // Search logic
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    const cleanQuery = query.trim();
    setIsLoading(true);
    setSearchError(null);

    // 1. Check if query matches our preset profiles directly
    const slug = cleanQuery.toLowerCase().replace(/\s+/g, '-');
    if (PRESET_PROFILES[slug]) {
      setActiveAnimal(PRESET_PROFILES[slug]);
      addToHistory(PRESET_PROFILES[slug]);
      setIsLoading(false);
      window.scrollTo({ top: 380, behavior: 'smooth' });
      return;
    }

    // Also check popular animals preset map
    for (const [key, preset] of Object.entries(PRESET_PROFILES)) {
      if (
        preset.commonNameVi.toLowerCase() === cleanQuery.toLowerCase() ||
        preset.commonNameEn.toLowerCase() === cleanQuery.toLowerCase() ||
        preset.scientificName.toLowerCase() === cleanQuery.toLowerCase()
      ) {
        setActiveAnimal(preset);
        addToHistory(preset);
        setIsLoading(false);
        window.scrollTo({ top: 380, behavior: 'smooth' });
        return;
      }
    }

    // 2. Otherwise require Gemini API Key
    const currentKey = apiKey || getStoredApiKey();
    if (!currentKey) {
      setIsLoading(false);
      setSearchError('Bạn cần nhập Google Gemini API Key để tra cứu loài này. Nhấp vào nút "Nhập API Key" bên dưới.');
      setIsKeyModalOpen(true);
      return;
    }

    try {
      const profile = await fetchAnimalDetails(cleanQuery, currentKey);
      setActiveAnimal(profile);
      addToHistory(profile);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định khi tra cứu.';
      if (message === 'MISSING_API_KEY') {
        setIsKeyModalOpen(true);
        setSearchError('Vui lòng nhập API Key để tiếp tục.');
      } else {
        setSearchError(`Không thể tra cứu: ${message}. Hãy kiểm tra lại API Key hoặc tên loài động vật.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Random animal discovery
  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * POPULAR_ANIMALS.length);
    const chosen = POPULAR_ANIMALS[randomIndex];
    handleSearch(chosen.name);
  };

  const isCurrentBookmarked = activeAnimal 
    ? favorites.some((f) => f.id === activeAnimal.id) 
    : false;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Header
        hasKey={Boolean(apiKey)}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        favoritesCount={favorites.length}
        historyCount={history.length}
        onHomeClick={() => {
          setActiveAnimal(PRESET_PROFILES['su-tu-chau-phi']);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 space-y-8">
        {/* Hero Banner Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trí tuệ nhân tạo Gemini AI • Dữ liệu sinh học toàn cầu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Tra Cứu Bách Khoa{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Thế Giới Động Vật
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Nhập tên bất kỳ loài sinh vật nào để khám phá phả hệ phân loại học 7 bậc, 
            hiện trạng bảo tồn IUCN, chỉ số sinh học, tập tính săn mồi và những sự thật kỳ thú.
          </p>

          {/* Missing API Key Warning Callout if user hasn't configured it yet */}
          {!apiKey && (
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-3 text-left max-w-xl mx-auto shadow-lg shadow-amber-950/20">
              <div className="flex items-center gap-2.5">
                <Key className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Ứng dụng yêu cầu nhập Gemini API Key</strong> để tra cứu tự do mọi loài trên hành tinh.
                </span>
              </div>
              <button
                onClick={() => setIsKeyModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition"
              >
                Nhập Key ngay
              </button>
            </div>
          )}
        </section>

        {/* Search Bar Section */}
        <section className="pt-2">
          <SearchBar
            onSearch={handleSearch}
            onRandom={handleRandom}
            isLoading={isLoading}
            activeCategory={activeCategory}
            onSelectCategory={(catId) => setActiveCategory(catId)}
            onSelectPreset={(animalName) => handleSearch(animalName)}
          />

          {/* Search Error Alert */}
          {searchError && (
            <div className="max-w-2xl mx-auto mt-4 p-4 rounded-2xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">Lỗi tra cứu:</p>
                <p className="opacity-90">{searchError}</p>
                <button
                  onClick={() => setIsKeyModalOpen(true)}
                  className="mt-2 inline-flex items-center gap-1 text-emerald-400 hover:underline font-bold"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Cấu hình hoặc thay đổi API Key</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Featured Showcase Quick Cards (if viewing top or switching) */}
        {!isLoading && (
          <section className="max-w-5xl mx-auto pt-2">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-400" />
                Loài tiêu biểu được chọn lọc:
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">Nhấp vào thẻ để xem hồ sơ tức thì</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-3">
              {/* Lion */}
              <div
                onClick={() => handleSearch('Sư tử châu Phi')}
                className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=300&q=80"
                    alt="Sư tử"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition truncate">
                      Sư tử châu Phi
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      VU
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-slate-400 truncate">Panthera leo</p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">Chúa tể thảo nguyên xavan</p>
                </div>
              </div>

              {/* Tiger */}
              <div
                onClick={() => handleSearch('Hổ Bengal')}
                className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=300&q=80"
                    alt="Hổ Bengal"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition truncate">
                      Hổ Bengal
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      EN
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-slate-400 truncate">Panthera tigris</p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">Chúa sơn lâm sọc vằn</p>
                </div>
              </div>

              {/* Red-shanked douc (Vietnam endemic) */}
              <div
                onClick={() => handleSearch('Voọc chà vá chân nâu')}
                className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=300&q=80"
                    alt="Voọc chà vá"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition truncate">
                      Voọc chà vá chân nâu
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                      CR
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-slate-400 truncate">Pygathrix nemaeus</p>
                  <p className="text-[11px] text-emerald-400/90 truncate mt-0.5">🇻🇳 Nữ hoàng linh trưởng VN</p>
                </div>
              </div>

              {/* Saola */}
              <div
                onClick={() => handleSearch('Sao La')}
                className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=300&q=80"
                    alt="Sao La"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition truncate">
                      Sao La
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                      CR
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-slate-400 truncate">Pseudoryx nghetinhensis</p>
                  <p className="text-[11px] text-emerald-400/90 truncate mt-0.5">🇻🇳 Kỳ lân đại ngàn Trường Sơn</p>
                </div>
              </div>

              {/* Blue whale */}
              <div
                onClick={() => handleSearch('Cá voi xanh')}
                className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=300&q=80"
                    alt="Cá voi xanh"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition truncate">
                      Cá voi xanh
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      EN
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-slate-400 truncate">Balaenoptera musculus</p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">Sinh vật lớn nhất lịch sử</p>
                </div>
              </div>

              {/* Giant Panda */}
              <div
                onClick={() => handleSearch('Gấu trúc lớn')}
                className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1527118732049-c88155f2107c?auto=format&fit=crop&w=300&q=80"
                    alt="Gấu trúc"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition truncate">
                      Gấu trúc lớn
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      VU
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-slate-400 truncate">Ailuropoda melanoleuca</p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">Sứ giả hòa bình & rừng tre</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Loading Spinner State */}
        {isLoading && (
          <div className="py-20 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-emerald-400 animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-slate-800 border-b-cyan-400 animate-spin animate-reverse" />
              <div className="w-full h-full flex items-center justify-center text-xl">🐾</div>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-200">
                Gemini AI đang tra cứu bách khoa sinh học...
              </h3>
              <p className="text-xs text-slate-400">
                Đang tổng hợp phân loại học, số liệu sinh trắc học và hình ảnh chân thực
              </p>
            </div>
          </div>
        )}

        {/* Animal Detail Dossier View */}
        {!isLoading && activeAnimal && (
          <AnimalDetail
            animal={activeAnimal}
            isBookmarked={isCurrentBookmarked}
            onToggleBookmark={handleToggleBookmark}
            apiKey={apiKey}
            onOpenKeyModal={() => setIsKeyModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-base">🐾</span>
            <span className="font-bold text-slate-100">FaunaPedia</span>
            <span>• Bách Khoa Động Vật AI Toàn Cầu</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Deploy lên Vercel & GitHub</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="text-slate-400 hover:text-slate-200"
            >
              Cài đặt API Key
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveKey}
        onRemoveKey={handleRemoveKey}
      />

      <DeployGuideModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onSelectAnimal={(animal) => {
          setActiveAnimal(animal);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
        onRemoveFavorite={handleRemoveFavorite}
        onClearAll={handleClearFavorites}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectSearch={(name) => handleSearch(name)}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
