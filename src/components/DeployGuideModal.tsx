import React, { useState } from 'react';
import { Github, Globe, Copy, Check, X, Terminal, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = `# 1. Khởi tạo Git và thêm toàn bộ tệp nguồn
git init
git add .
git commit -m "feat: bách khoa động vật FaunaPedia tích hợp Gemini AI"

# 2. Đổi tên nhánh sang main
git branch -M main

# 3. Tạo repo trên GitHub và liên kết remote (thay USERNAME và REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main`;

  const vercelEnvNote = `// Trong cài đặt Vercel (Project Settings > Environment Variables):
// Thêm biến môi trường này nếu bạn muốn ứng dụng tự động có API key:
VITE_GEMINI_API_KEY = "AIzaSy..."`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 text-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white border border-slate-700 flex items-center gap-1.5">
              <Github className="w-5 h-5 text-white" />
              <span className="text-slate-500 font-bold">+</span>
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Hướng Dẫn Publish Lên GitHub & Deploy Vercel
              </h3>
              <p className="text-xs text-slate-400">Ứng dụng đã được tối ưu sẵn 100% chuẩn Vite SPA để deploy mượt mà trên Vercel</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-6">
          {/* Status summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-emerald-300">Vite React SPA</p>
                <p className="text-slate-400">Tương thích 100% Vercel</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-emerald-300">vercel.json</p>
                <p className="text-slate-400">Đã cấu hình routing SPA</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-emerald-300">Client-Side Key</p>
                <p className="text-slate-400">Nhập trực tiếp hoặc qua env</p>
              </div>
            </div>
          </div>

          {/* Bước 1: GitHub */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs">1</span>
                <span>Đẩy mã nguồn lên GitHub</span>
              </div>
              <button
                onClick={() => copyToClipboard(gitCommands, 1)}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 1 ? 'Đã sao chép!' : 'Sao chép lệnh'}
              </button>
            </div>
            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-3.5 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto">
              <pre>{gitCommands}</pre>
            </div>
          </div>

          {/* Bước 2: Vercel */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">2</span>
              <span>Deploy lên Vercel (Miễn phí 100%)</span>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-3">
              <p className="text-slate-300">Có 2 cách cực kỳ nhanh:</p>
              <div className="space-y-2 pl-2 border-l-2 border-slate-800">
                <div>
                  <p className="font-semibold text-slate-200">Cách A: Dùng giao diện Web Vercel (Khuyên dùng)</p>
                  <ol className="list-decimal list-inside text-slate-400 space-y-1 mt-1 pl-1">
                    <li>Vào <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-0.5">vercel.com/new <ExternalLink className="w-3 h-3 inline" /></a></li>
                    <li>Chọn kho lưu trữ (Repository) GitHub bạn vừa đẩy lên</li>
                    <li>Vercel sẽ tự động phát hiện Framework: <strong className="text-slate-200">Vite</strong> và Build Command: <code className="text-emerald-300">vite build</code>, Output: <code className="text-emerald-300">dist</code></li>
                    <li>Nhấp nút <strong className="text-emerald-400">Deploy</strong>. Trang web sẽ chạy sau 30 giây!</li>
                  </ol>
                </div>

                <div className="pt-2">
                  <p className="font-semibold text-slate-200">Cách B: Dùng Vercel CLI</p>
                  <code className="block mt-1 p-2 rounded bg-slate-900 text-emerald-300 font-mono">
                    npm i -g vercel && vercel --prod
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Bước 3: Cấu hình API Key trên Vercel */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs">3</span>
                <span>(Tùy chọn) Cài đặt VITE_GEMINI_API_KEY trên Vercel</span>
              </div>
              <button
                onClick={() => copyToClipboard(vercelEnvNote, 2)}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 2 ? 'Đã sao chép!' : 'Sao chép'}
              </button>
            </div>
            
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
              <p>
                Nếu bạn muốn trang web khi mở lên đã có sẵn key (không cần người dùng nhập), hãy thêm biến môi trường trong mục <strong>Settings &gt; Environment Variables</strong> của dự án trên Vercel:
              </p>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-300">
                VITE_GEMINI_API_KEY = AIzaSy...
              </div>
              <p className="text-slate-400">
                Nếu không cài đặt biến này, ứng dụng vẫn hoạt động bình thường nhờ tính năng <strong>nhập trực tiếp API Key qua giao diện</strong> có sẵn!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition shadow-lg shadow-emerald-500/20"
          >
            Đã hiểu, sẵn sàng Deploy!
          </button>
        </div>
      </div>
    </div>
  );
};
