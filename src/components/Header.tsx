import React from 'react';
import { Key, Sparkles, Bookmark, History, Github, Globe } from 'lucide-react';

interface HeaderProps {
  hasKey: boolean;
  onOpenKeyModal: () => void;
  onOpenDeployModal: () => void;
  onOpenHistory: () => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
  historyCount: number;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  hasKey,
  onOpenKeyModal,
  onOpenDeployModal,
  onOpenHistory,
  onOpenFavorites,
  favoritesCount,
  historyCount,
  onHomeClick,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-xl">🐾</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                FaunaPedia
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                AI Bách Khoa
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Khám phá thế giới động vật toàn diện
            </p>
          </div>
        </button>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition flex items-center gap-1.5"
            title="Lịch sử tra cứu"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline">Lịch sử</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                {historyCount}
              </span>
            )}
          </button>

          {/* Bookmarks Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition flex items-center gap-1.5"
            title="Loài đã lưu"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Đã lưu</span>
            {favoritesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Deploy Guide button */}
          <button
            onClick={onOpenDeployModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 text-xs font-medium transition"
            title="Hướng dẫn Deploy Vercel & GitHub"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="text-slate-600 font-bold">/</span>
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Deploy</span>
          </button>

          {/* API Key Status Pill */}
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              hasKey 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50' 
                : 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/50 animate-pulse'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasKey ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${hasKey ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </span>
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {hasKey ? 'Gemini API: Đã kích hoạt' : 'Nhập Gemini Key'}
            </span>
            <span className="sm:hidden">
              {hasKey ? 'API OK' : 'Nhập Key'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
