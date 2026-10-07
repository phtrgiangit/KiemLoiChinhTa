# 🦁 FaunaPedia - Bách Khoa Toàn Thư Thế Giới Động Vật AI

> Ứng dụng tra cứu thông tin chi tiết, toàn diện về mọi loài động vật trên Trái Đất được hỗ trợ bởi trí tuệ nhân tạo **Google Gemini AI**.
> Tối ưu hóa 100% cho việc đưa lên **GitHub** và deploy lên **Vercel** hoàn toàn miễn phí.

---

## ✨ Tính năng nổi bật

- 🔍 **Tra cứu thông minh**: Hỗ trợ tìm kiếm theo tên tiếng Việt (ví dụ: *Sư tử*, *Cá voi xanh*, *Voọc chà vá chân nâu*, *Bạch tuộc Dumbo*), tên tiếng Anh (*Tiger*, *Axolotl*) hoặc tên khoa học danh pháp hai phần (*Panthera leo*).
- 🧬 **Cây phân loại học sinh học (Taxonomy)**: Đầy đủ 7 bậc phân loại: Giới (*Kingdom*) -> Ngành (*Phylum*) -> Lớp (*Class*) -> Bộ (*Order*) -> Họ (*Family*) -> Chi (*Genus*) -> Loài (*Species*).
- 🚨 **Hiện trạng bảo tồn IUCN chuẩn quốc tế**: Huy hiệu màu trực quan (EX, EW, CR, EN, VU, NT, LC, DD) kèm phân tích xu hướng quần thể.
- 📏 **Chỉ số sinh học chi tiết (Bio-Metrics)**: Kích thước, cân nặng, tốc độ chạy/bơi tối đa, tuổi thọ trong tự nhiên và nuôi nhốt, thời gian hoạt động.
- 🌍 **Sinh thái & Môi trường sống**: Hệ sinh thái (biomes), vùng địa lý phân bố toàn cầu, mô tả sinh cảnh.
- ⚡ **Tập tính & Săn mồi**: Cấu trúc bầy đàn, phương thức săn mồi/kiếm ăn, hình thức giao tiếp và sự thích nghi tiến hóa.
- 👶 **Sinh sản & Vòng đời**: Thời gian thai nghén, số con mỗi lứa, tập tính nuôi con non.
- 📸 **Hình ảnh chân thực**: Tích hợp API Wikipedia & Wikimedia Commons và bộ sưu tập nhiếp ảnh động vật hoang dã.
- ⚖️ **Infographic so sánh với con người**: Tỷ lệ kích thước, tốc độ và trọng lượng trực quan so với người trưởng thành.
- 🧠 **10 Sự thật kỳ thú & Mini Quiz**: Câu đố vui kiểm tra độ hiểu biết về loài vừa xem.
- 💬 **Hỏi đáp chuyên sâu với Gemini AI**: Đặt thêm bất kỳ câu hỏi nào về tập tính của loài đó.
- 🔊 **Đọc hồ sơ bằng giọng nói (Text-to-Speech)**: Đọc thông tin sinh học tự động bằng tiếng Việt.
- 🔑 **Quản lý API Key an toàn**: Hỗ trợ nhập trực tiếp qua giao diện (lưu trong `localStorage`) hoặc qua biến môi trường `VITE_GEMINI_API_KEY`.

---

## 🚀 Hướng dẫn Cài đặt & Chạy trên máy cục bộ (Local)

### Yêu cầu
- Node.js >= 18
- npm hoặc pnpm / yarn

### Các bước:
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy môi trường phát triển
npm run dev
```
Trang web sẽ mở tại địa chỉ `http://localhost:3000`.

---

## 🐙 Hướng dẫn Đẩy lên GitHub (Push to GitHub)

```bash
# 1. Khởi tạo Git
git init

# 2. Thêm toàn bộ mã nguồn
git add .

# 3. Tạo commit đầu tiên
git commit -m "feat: bách khoa động vật FaunaPedia tích hợp Gemini AI"

# 4. Đổi tên nhánh sang main
git branch -M main

# 5. Tạo một Repository mới trên GitHub của bạn, sau đó liên kết remote:
git remote add origin https://github.com/<USERNAME-CUA-BAN>/<TEN-REPO>.git

# 6. Đẩy mã nguồn lên GitHub
git push -u origin main
```

---

## ⚡ Hướng dẫn Deploy lên Vercel (1-Click)

Dự án này là một **Vite React SPA** chuẩn mực, đã có sẵn tệp cấu hình `vercel.json` phục vụ điều hướng router.

### Cách 1: Qua giao diện Vercel Dashboard (Khuyên dùng)
1. Đăng nhập vào [Vercel](https://vercel.com) (bằng tài khoản GitHub của bạn).
2. Nhấp vào **"Add New..."** -> **"Project"**.
3. Chọn Repository GitHub bạn vừa đẩy lên ở bước trên.
4. Vercel sẽ tự nhận diện cấu hình:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. *(Tùy chọn)* Nếu muốn gắn sẵn Gemini API Key cho toàn bộ người dùng trang web mà không cần họ tự nhập:
   - Mở rộng mục **Environment Variables**
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `AIzaSy...` (Mã khóa Gemini của bạn)
6. Nhấp **"Deploy"**. Sau khoảng 30 giây trang web của bạn sẽ chính thức trực tuyến!

### Cách 2: Qua Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

---

## 🔑 Hướng dẫn lấy Google Gemini API Key miễn phí

1. Truy cập vào [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Đăng nhập bằng tài khoản Google.
3. Nhấp vào nút **"Create API Key"**.
4. Sao chép chuỗi ký tự khóa (bắt đầu bằng `AIzaSy...`).
5. Dán vào ô cài đặt API Key trong ứng dụng FaunaPedia.
