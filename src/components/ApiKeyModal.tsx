import React, { useState } from 'react';
import { Key, CheckCircle2, AlertCircle, Eye, EyeOff, ExternalLink, ShieldCheck, Sparkles, Trash2, X } from 'lucide-react';
import { validateGeminiApiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
  onRemoveKey: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
  onRemoveKey,
}) => {
  const [inputValue, setInputValue] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ valid: boolean; model?: string; error?: string } | null>(null);

  if (!isOpen) return null;

  const handleTest = async () => {
    if (!inputValue.trim()) {
      setTestResult({ valid: false, error: 'Vui lòng nhập API key trước khi kiểm tra.' });
      return;
    }
    setTesting(true);
    setTestResult(null);
    const result = await validateGeminiApiKey(inputValue);
    setTesting(false);
    setTestResult(result);
  };

  const handleSave = () => {
    onSaveKey(inputValue.trim());
    onClose();
  };

  const handleClear = () => {
    setInputValue('');
    setTestResult(null);
    onRemoveKey();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Cấu hình Gemini API Key
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">Bắt buộc</span>
              </h3>
              <p className="text-xs text-slate-400">Dùng để tra cứu hồ sơ sinh học chi tiết mọi loài động vật</p>
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

        {/* Body */}
        <div className="mt-5 space-y-4">
          <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Bảo mật an toàn tuyệt đối</span>
            </div>
            <p>
              API Key được lưu trữ trực tiếp trong trình duyệt (<code className="text-emerald-300">localStorage</code>) của bạn. 
              Không bao giờ bị gửi về máy chủ bên thứ ba.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nhập mã Google Gemini API Key:
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setTestResult(null);
                }}
                placeholder="AIzaSy..."
                className="w-full pl-3.5 pr-20 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-slate-400 hover:text-slate-200 transition"
                  title={showKey ? 'Ẩn key' : 'Hiện key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {inputValue && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1.5 text-red-400 hover:text-red-300 transition"
                    title="Xóa key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Test Status feedback */}
          {testResult && (
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
              testResult.valid 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : 'bg-red-950/40 border-red-500/40 text-red-300'
            }`}>
              {testResult.valid ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              )}
              <div>
                <p className="font-semibold">
                  {testResult.valid ? 'Kết nối thành công!' : 'Kết nối thất bại'}
                </p>
                <p className="mt-0.5 opacity-90">
                  {testResult.valid 
                    ? `API key hoạt động tốt (Mô hình: ${testResult.model || 'gemini-3.8-flash'}). Bạn có thể tra cứu thông tin động vật ngay.`
                    : testResult.error}
                </p>
              </div>
            </div>
          )}

          {/* Guide to get free API Key */}
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs space-y-2">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Chưa có Gemini API Key? Lấy miễn phí trong 1 phút:
            </span>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1">
              <li>Truy cập vào <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-0.5 font-medium">Google AI Studio <ExternalLink className="w-3 h-3 inline" /></a></li>
              <li>Đăng nhập bằng tài khoản Google cá nhân</li>
              <li>Nhấp vào nút <span className="text-slate-200 font-semibold">"Create API Key"</span> (Tạo khóa API)</li>
              <li>Sao chép mã khóa bắt đầu bằng <code className="text-emerald-300">AIzaSy...</code> và dán vào ô bên trên</li>
            </ol>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleTest}
            disabled={testing || !inputValue.trim()}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-50 transition flex items-center gap-1.5"
          >
            {testing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                Đang kiểm tra...
              </>
            ) : (
              'Kiểm tra kết nối'
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!inputValue.trim()}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition"
            >
              Lưu & Bắt đầu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
