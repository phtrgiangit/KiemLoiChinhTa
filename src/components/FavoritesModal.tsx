import React from 'react';
import { Bookmark, X, Trash2, ArrowRight } from 'lucide-react';
import { AnimalProfile } from '../types/animal';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: AnimalProfile[];
  onSelectAnimal: (animal: AnimalProfile) => void;
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onSelectAnimal,
  onRemoveFavorite,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 text-slate-100 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Bộ Sưu Tập Yêu Thích
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {favorites.length}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Những loài động vật bạn đã đánh dấu lưu</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="my-4 flex-1 overflow-y-auto space-y-2.5 pr-1">
          {favorites.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-slate-600 mb-1 opacity-50" />
              <p className="font-semibold text-slate-400">Chưa có loài động vật nào được lưu</p>
              <p>Nhấp vào biểu tượng Bookmark trên hồ sơ loài để thêm vào đây</p>
            </div>
          ) : (
            favorites.map((animal) => (
              <div
                key={animal.id}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between gap-3 group"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1 overflow-hidden"
                  onClick={() => {
                    onSelectAnimal(animal);
                    onClose();
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                    {animal.imageUrl ? (
                      <img src={animal.imageUrl} alt={animal.commonNameVi} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">🐾</div>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition truncate">
                      {animal.commonNameVi}
                    </p>
                    <p className="text-xs font-serif italic text-slate-400 truncate">
                      {animal.scientificName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${animal.conservationStatus.badgeBg} ${animal.conservationStatus.color}`}>
                    {animal.conservationStatus.code}
                  </span>
                  <button
                    onClick={() => onRemoveFavorite(animal.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900 transition"
                    title="Bỏ lưu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectAnimal(animal);
                      onClose();
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <button
              onClick={onClearAll}
              className="text-slate-500 hover:text-red-400 transition flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa toàn bộ</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
