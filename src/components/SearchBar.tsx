import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Dices, X, Mic, ArrowRight } from 'lucide-react';
import { POPULAR_ANIMALS, CATEGORIES } from '../data/sampleAnimals';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onRandom: () => void;
  isLoading: boolean;
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  onSelectPreset: (animalName: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onRandom,
  isLoading,
  activeCategory,
  onSelectCategory,
  onSelectPreset,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);

  useEffect(() => {
    // Check for browser speech recognition support
    if (typeof window !== 'undefined') {
      const win = window as unknown as {
        webkitSpeechRecognition?: unknown;
        SpeechRecognition?: unknown;
      };
      if (win.webkitSpeechRecognition || win.SpeechRecognition) {
        setHasSpeechSupport(true);
      }
    }
  }, []);

  const handleVoiceSearch = () => {
    if (typeof window === 'undefined') return;
    const win = window as unknown as {
      webkitSpeechRecognition?: new () => {
        lang: string;
        start: () => void;
        onresult: (e: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void;
        onerror: () => void;
        onend: () => void;
      };
    };

    if (!win.webkitSpeechRecognition) return;

    try {
      const recognition = new win.webkitSpeechRecognition();
      recognition.lang = 'vi-VN';
      setIsListening(true);

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (text) {
          setSearchTerm(text);
          onSearch(text);
        }
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  // Filter popular suggestions based on active category
  const filteredPopular = POPULAR_ANIMALS.filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'mammal') return ['Thú săn mồi', 'Động vật có vú', 'Thú quý hiếm'].includes(item.category);
    if (activeCategory === 'marine') return item.category === 'Sinh vật biển' || item.category === 'Biển sâu bí ẩn';
    if (activeCategory === 'birds') return item.category === 'Chim Nam Cực' || item.category === 'Chim săn mồi';
    if (activeCategory === 'reptiles') return item.category.includes('Bò sát') || item.category.includes('Lưỡng cư');
    if (activeCategory === 'vietnam') return item.category.includes('Việt Nam');
    if (activeCategory === 'endangered') return item.category.includes('Quý hiếm') || item.category.includes('Việt Nam');
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Search Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/50 focus-within:border-emerald-500 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-sm transition-all p-1.5 sm:p-2">
          {/* Search Icon */}
          <div className="pl-3 pr-2 text-emerald-400">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* Text Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập tên con vật (ví dụ: Sư tử, Cá voi xanh, Hổ, Axolotl, Saola...)"
            className="w-full py-2.5 sm:py-3 px-2 bg-transparent text-slate-100 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
            disabled={isLoading}
          />

          {/* Clear Button */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Voice Search Button */}
          {hasSpeechSupport && (
            <button
              type="button"
              onClick={handleVoiceSearch}
              disabled={isLoading || isListening}
              className={`p-2 rounded-xl text-slate-400 hover:text-white transition mr-1 ${
                isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'hover:bg-slate-800'
              }`}
              title="Tìm kiếm bằng giọng nói tiếng Việt"
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          {/* Submit Search Button */}
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-40 transition shadow-lg shadow-emerald-500/25 shrink-0"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Đang tra cứu...</span>
              </>
            ) : (
              <>
                <span>Tra cứu</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Action Row: Random explorer & Category chips */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar text-xs">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Random Animal Button */}
        <button
          onClick={onRandom}
          disabled={isLoading}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition ml-auto shadow-sm"
          title="Xem một loài động vật ngẫu nhiên đầy bất ngờ"
        >
          <Dices className="w-4 h-4 text-amber-400" />
          <span>Khám phá ngẫu nhiên</span>
        </button>
      </div>

      {/* Popular suggestions list */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Gợi ý:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {filteredPopular.slice(0, 7).map((item) => (
            <button
              key={item.name}
              onClick={() => onSelectPreset(item.name)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-emerald-950/40 hover:text-emerald-300 text-slate-300 border border-slate-800 hover:border-emerald-500/30 transition text-xs flex items-center gap-1"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
