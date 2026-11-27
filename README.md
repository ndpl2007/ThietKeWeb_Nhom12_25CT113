# 🌐 ĐỒ ÁN MÔN THIẾT KẾ WEB - NHÓM 12

> **Môn học:** Thiết Kế Web  
> **Lớp học phần:** 25CT113  
> **Nhóm thực hiện:** Nhóm 12
> **Tên đề tài:** Hệ thống Kho lưu trữ Tài liệu cá nhân (Personal Knowledge Base)

---

## 📖 Giới thiệu dự án

**Personal Knowledge Base** là ứng dụng web giúp lưu trữ và tìm lại tài liệu cá nhân như PDF, video và liên kết. Người dùng có thể phân loại tài liệu bằng tag, tìm kiếm/lọc trong thư viện và ghi chú nhanh ở trang chi tiết. Dữ liệu được lưu ngay trên trình duyệt bằng `localStorage`, không cần backend.

## 🎯 Mục tiêu đồ án

- **Về sản phẩm:** Xây dựng website hoàn thiện về cấu trúc, giao diện trực quan và tích hợp các luồng tương tác thực tế.
- **Về kỹ thuật:**
  - Ứng dụng chuẩn ngữ nghĩa **HTML5** (Semantic Web) giúp tối ưu khả năng tiếp cận và chuẩn SEO.
  - Sử dụng **CSS** hiện đại (Flexbox, CSS Grid, Media Queries) đảm bảo giao diện thích ứng tốt trên mọi kích thước màn hình (Responsive Web Design).
  - Tích hợp **JavaScript** để xử lý các logic tương tác động, biểu mẫu và dữ liệu người dùng.
- **Về quy trình làm việc:** Rèn luyện kỹ năng làm việc nhóm, phân chia công việc và quản lý mã nguồn chuyên nghiệp bằng **Git/GitHub**.



## 👥 Thành viên nhóm & Phân công nhiệm vụ

| STT | Họ và tên | MSSV | Vai trò / nhiệm vụ | File phụ trách | Nhánh Git |
| :---: | :--- | :---: | :--- | :--- | :--- |
| 1 | **Nguyễn Duy Phúc Lộc** | 125001712 | **Leader — Kiến trúc lõi & tích hợp.** Dựng khung, schema và localStorage; viết lọc, state; tích hợp nhánh và kiểm thử. | `index.html`, `detail.html`, `css/base.css`, `js/data.js`, `js/filter.js`, `js/main.js`, `skill.md` | `main` |
| 2 | **Hà Minh Hiếu** | 125002170 | **Thành viên 1 — Giao diện & chế độ xem.** Thiết kế khu nổi bật, Card/List và luồng mở trang chi tiết. | `css/views.css`, `js/render.js` | `feature/ui-views` |
| 3 | **Mạch Tài Phú** | 125001352 | **Thành viên 2 — Tag, thêm tài liệu, chi tiết & ghi chú.** Làm bộ lọc tag, form, trang chi tiết và ghi chú lưu cục bộ. | `css/components.css`, `js/tags.js`, `js/detail.js`, `detail.html` | `feature/tags-crud` |

### Các tính năng chính

- **Trang chủ và thư viện tài liệu:** hiển thị tài liệu xem nhiều và mới thêm.
- **Tìm kiếm và lọc kết hợp:** theo từ khóa, định dạng PDF/Video/Link và tag; cập nhật không tải lại trang, hỗ trợ tìm kiếm không dấu tiếng Việt.
- **Hai chế độ hiển thị:** Card và List, giữ nguyên bộ lọc khi chuyển đổi.
- **Thêm tài liệu:** kiểm tra tiêu đề, định dạng và đường dẫn an toàn.
- **Chi tiết và ghi chú nhanh:** thêm/xóa ghi chú, lưu bền vững trong `localStorage`.
- **Lượt xem:** tăng một lần khi mở tài liệu; tải lại trang chi tiết không tăng lượt xem lần nữa.
- **Responsive và truy cập:** bố cục phù hợp nhiều kích thước màn hình, hỗ trợ thao tác bàn phím và trạng thái thông báo.

Trang chủ và kho tài liệu nằm trong `index.html`; trang chi tiết tài liệu và ghi chú nằm trong `detail.html`.


## 🛠️ Công nghệ & Công cụ sử dụng

- **Nền tảng:** HTML5, CSS3 và JavaScript thuần (Vanilla JS).
- **Lưu trữ:** Web Storage API (`localStorage`); không sử dụng backend.
- **Tương thích:** mở trực tiếp bằng `file://` hoặc chạy với Live Server.
- **Quản lý phiên bản & làm việc nhóm:** Git và GitHub, phát triển theo các nhánh phân công.
- **Công cụ:** Visual Studio Code.
- **Thư viện/framework ngoài:** Không sử dụng.

---

## 🌐 Trải nghiệm trực tuyến (Deployment)

Dự án được triển khai và phát hành tự động thông qua **GitHub Pages**:

🔗 **Website trực tiếp:** [https://ndpl2007.github.io/ThietKeWeb_Nhom12_25CT113/](https://ndpl2007.github.io/ThietKeWeb_Nhom12_25CT113/)


## 💻 Hướng dẫn chạy thử cục bộ (Local Development)

Dành cho thành viên muốn kiểm thử hoặc phát triển tính năng trên máy cá nhân:

1. **Sao chép mã nguồn về máy:**
   ```bash
   git clone https://github.com/ndpl2007/ThietKeWeb_Nhom12_25CT113.git
   ```

2. **Khởi chạy:**
   - Mở thư mục dự án bằng **Visual Studio Code**.
   - Mở `index.html` trực tiếp bằng trình duyệt hoặc dùng **Open with Live Server**.


## 📌 Kế hoạch & Tiến độ phát triển

- [x] Chốt đề tài, phân công 8 đầu việc và quy ước nhánh Git.
- [x] Dựng khung trang, schema dữ liệu, localStorage, lọc và state lõi.
- [ ] Hoàn thiện giao diện và render Card/List, khu vực tài liệu nổi bật.
- [ ] Hoàn thiện tag, thêm tài liệu, trang chi tiết và ghi chú.
- [ ] Tích hợp các nhánh, kiểm thử Console/Network, `file://`, responsive và luồng ghi chú.
- [ ] Chuẩn bị demo và hoàn thiện báo cáo.


## 📄 Bản quyền & Mục đích

Dự án phục vụ mục đích học tập và đánh giá đồ án môn **Thiết Kế Web**.  
© 2026 Nhóm 12 - Lớp 25CT113. Bảo lưu mọi quyền.

