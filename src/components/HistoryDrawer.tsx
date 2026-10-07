import React from 'react';
import { History, X, Trash2, ArrowRight } from 'lucide-react';
import { SearchHistoryItem } from '../types/animal';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: SearchHistoryItem[];
  onSelectSearch: (name: string) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectSearch,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 text-slate-100 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Lịch Sử Tra Cứu
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {history.length}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Các loài động vật đã tìm gần đây</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History List */}
        <div className="my-4 flex-1 overflow-y-auto space-y-2 pr-1">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs space-y-2">
              <History className="w-8 h-8 mx-auto text-slate-600 mb-1 opacity-50" />
              <p className="font-semibold text-slate-400">Chưa có lịch sử tra cứu</p>
              <p>Các loài bạn tìm kiếm sẽ xuất hiện tại đây để tiện xem lại</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectSearch(item.nameVi);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 transition cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div>
                  <p className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition">
                    {item.nameVi}
                  </p>
                  <p className="text-xs font-serif italic text-slate-400">
                    {item.scientificName}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <button
              onClick={onClearHistory}
              className="text-slate-500 hover:text-red-400 transition flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa lịch sử</span>
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
