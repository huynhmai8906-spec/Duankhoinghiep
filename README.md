# MediCare Connect — Nền Tảng Y Tế Số Kết Nối Điều Dưỡng CCHN

Dự án Web Application xây dựng bằng **React 19 + TypeScript + Vite + Tailwind CSS**.

---

## 🚀 Hướng Dẫn Kết Nối GitHub & Chạy Thành Trang Web Trực Tuyến

### Cách 1: Xuất Trực Tiếp Từ Google AI Studio lên GitHub (Khuyên Dùng)
1. Ở góc trên bên phải giao diện **Google AI Studio**, chọn menu **Settings (hoặc biểu tượng 3 chấm / Export)**.
2. Chọn **Export to GitHub** (hoặc **Push to Repository**).
3. Sau khi code đã được đưa lên kho lưu trữ GitHub của bạn:
   - Vào repository trên GitHub -> Chọn tab **Settings**.
   - Ở cột bên trái, chọn mục **Pages**.
   - Tại mục **Build and deployment** -> phần **Source**, chọn: **GitHub Actions**.
   - Quy trình tự động cấu hình sẵn trong `.github/workflows/deploy.yml` sẽ tự động build và xuất bản trang web lên địa chỉ `https://<tên-user>.github.io/<tên-repo>/` hoàn toàn miễn phí!

---

### Cách 2: Đẩy Code Từ Máy Tính Lên GitHub Bằng Git CLI
Nếu bạn tải file ZIP về máy:
```bash
# 1. Khởi tạo kho git
git init
git add .
git commit -m "Initial commit - MediCare Connect"

# 2. Đổi tên nhánh chính thành main
git branch -M main

# 3. Liên kết với repository GitHub của bạn
git remote add origin https://github.com/<tên-username-của-bạn>/<tên-repo>.git

# 4. Đẩy code lên GitHub
git push -u origin main
```
Sau đó vào GitHub Repository: **Settings** -> **Pages** -> **Source: GitHub Actions**. Trang web sẽ tự động chạy!

---

### Cách 3: Chạy Dự Án Ở Máy Cục Bộ (Localhost)
```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Khởi động môi trường phát triển (Dev server)
npm run dev

# Mở trình duyệt truy cập: http://localhost:3000
```

---

### Cách 4: Build Sản Phẩm (Production)
```bash
npm run build
```
Thư mục `dist/` được tạo ra chứa toàn bộ mã nguồn tĩnh (HTML, CSS, JS) đã được tối ưu hóa đường dẫn tương đối (`base: './'`), có thể đưa lên bất kỳ hosting nào (GitHub Pages, Vercel, Netlify, Firebase Hosting, Cloudflare Pages, Nginx,...).

---

## 🛠️ Cấu Trúc Dự Án
- `src/components/`:
  - `StartupOverview.tsx`: Giới thiệu đề án khởi nghiệp y tế, vấn đề thị trường & đội ngũ sáng lập.
  - `NurseDirectory.tsx`: Danh sách điều dưỡng có Chứng Chỉ Hành Nghề (CCHN), bộ lọc đa chiều, đặt lịch & đánh giá sau ca.
  - `PricingCalculator.tsx`: Báo cáo khảo sát 120 gia đình, so sánh 4 mô hình & công cụ dự toán chi phí.
  - `NursePortal.tsx`: Cổng lâm sàng bảo mật Gmail (`huynhmai8906@gmail.com`), biểu mẫu theo dõi sinh tồn thời gian thực & cảnh báo lâm sàng.
  - `PrintableCareSheet.tsx`: Phiếu theo dõi chức năng sống chuẩn Mẫu 08/BV-ĐD sẵn sàng in ấn.
  - `PitchDeckModal.tsx`: Slide thuyết trình nhà đầu tư (TAM $2.4B, SOM $72M).
- `vite.config.ts`: Cấu hình đường dẫn tương đối `base: './'` tương thích 100% với GitHub Pages.
- `.github/workflows/deploy.yml`: Workflow CI/CD tự động deploy lên GitHub Pages mỗi khi push code.
