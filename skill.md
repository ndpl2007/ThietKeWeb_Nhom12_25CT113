# AI Skill và phạm vi kỹ thuật của dự án Personal Knowledge Base

## 0. Mục đích và mức ưu tiên

Đây là tài liệu chỉ dẫn dành cho AI khi phân tích, thiết kế, viết code, sửa lỗi hoặc đề xuất thay đổi cho dự án. AI phải tuân thủ tài liệu này cùng với yêu cầu cụ thể của người dùng.

Dự án: **Hệ thống Kho lưu trữ Tài liệu cá nhân (Personal Knowledge Base)**, một "Bộ não thứ hai" (Second Brain) chạy hoàn toàn trên trình duyệt. Nhóm 3 người làm trong buổi hackathon trên lớp (khoảng 1h30 đến 2h), vì vậy cần giải pháp đơn giản, rõ ràng, chạy đúng ngay.

Mô hình làm việc của nhóm:

- **Nhóm trưởng (Leader)** giữ phần lõi trên nhánh `main` và là người duy nhất gộp code vào `main`.
- **Hai thành viên** làm trên nhánh riêng, tách từ `main`, chỉ bổ sung phần việc được giao.
- Dự án không có backend. "Phần lõi" gồm dữ liệu, logic lọc và khởi tạo, chạy hoàn toàn trong trình duyệt.

Thứ tự ưu tiên khi có mâu thuẫn:

1. Yêu cầu mới nhất và rõ ràng của người dùng.
2. Yêu cầu của đề bài, quy chế buổi thi và quy định của giảng viên.
3. Các quy tắc bắt buộc (`MUST` và `MUST NOT`) trong tài liệu này.
4. Convention và cấu trúc hiện có của repository.
5. Các quy tắc khuyến nghị (`SHOULD` và `SHOULD NOT`).

Nếu yêu cầu mới có thể làm vi phạm mục 2, 3, 4, 6 hoặc 7, AI `MUST` dừng triển khai phần đó, nêu rủi ro và hỏi xác nhận.

Quy ước từ khóa:

- `MUST` / `MUST NOT`: bắt buộc / cấm tuyệt đối.
- `SHOULD` / `SHOULD NOT`: nên / không nên. Có thể bỏ qua nếu có lý do rõ ràng và phải nêu lý do.

## 1. Vai trò người hỏi và nguyên tắc làm việc

### 1.1 Xác định vai trò

- `MUST` xác định người đang hỏi là Leader, Thành viên 1 hay Thành viên 2 và đang làm file nào, dựa vào yêu cầu, tên nhánh hoặc ngữ cảnh hội thoại. Nếu chưa rõ, `MUST` hỏi trước khi viết code.
- `MUST` chỉ sửa các file thuộc phần việc của người đang hỏi (mục 7). Nếu cần sửa file của người khác, `MUST` nói rõ và viết đoạn code đề xuất kèm vị trí đặt để người phụ trách tự áp dụng.
- Khi người hỏi là **thành viên (không phải Leader)**:
  - `MUST` chỉ *thêm mới* hoặc *thay thân các hàm stub* trong file của thành viên đó.
  - `MUST NOT` sửa `index.html`, `base.css`, `data.js`, `filter.js`, `main.js` và `skill.md`.
  - Nếu cần thêm id, thẻ HTML, hàm hoặc sự kiện ở file lõi, `MUST` viết đoạn code đề xuất để thành viên gửi cho Leader.
- Khi người hỏi là **Leader**:
  - `MUST` giữ đúng tên, tham số và kiểu trả về của các hàm stub/hook (mục 6.2) để nhánh thành viên gắn vào được.
  - Sau khi khung dự án đã chốt và thành viên đã tách nhánh, `MUST NOT` đổi chữ ký hàm, id hoặc schema khi chưa được người dùng xác nhận. Nếu có đổi, `MUST` nhắc người dùng báo cả nhóm.

### 1.2 Nguyên tắc chung

- `MUST` đọc các tài liệu và code liên quan trước khi thay đổi.
- `MUST` xác định file, hàm, id HTML và dữ liệu đầu vào/đầu ra bị ảnh hưởng trước khi sửa.
- `MUST` thay đổi nhỏ, đúng phạm vi; không tự ý refactor hoặc đổi kiến trúc toàn hệ thống.
- `MUST` giữ tương thích với cấu trúc thư mục, schema dữ liệu, tên id, tên hàm và thứ tự script đã chốt (mục 3, 4, 6).
- `MUST` hỏi lại khi yêu cầu thiếu thông tin quan trọng hoặc mâu thuẫn với tài liệu này, thay vì tự đoán.
- `MUST NOT` tự bịa tên hàm, id, trường dữ liệu, API, thư viện hoặc file chưa tồn tại mà không nói rõ đó là đề xuất mới.
- `MUST NOT` đánh dấu một việc là hoàn thành khi chưa kiểm chứng. Nếu không chạy được code, `MUST` nói rõ chưa kiểm chứng và mô tả chính xác cách kiểm tra.
- `MUST NOT` xóa code, file hoặc dữ liệu mẫu hiện có khi chưa được yêu cầu.
- `MUST NOT` viết lại toàn bộ một file khi chỉ cần sửa một phần (ngoại lệ ở mục 13).
- `SHOULD` giải thích ngắn gọn nguyên nhân khi sửa lỗi.
- `SHOULD` ưu tiên giải pháp đơn giản nhất chạy đúng; viết code dễ đọc, có chú thích tiếng Việt rõ ràng để người dùng đọc hiểu được.

## 2. Phạm vi công nghệ được phép

### 2.1 Công nghệ chuẩn (duy nhất được dùng)

- **HTML5**: thẻ ngữ nghĩa (`header`, `main`, `section`, `article`, `nav`, `footer`), `<input type="search">` cho ô tìm kiếm.
- **CSS3** thuần: CSS Grid, Flexbox, biến CSS (`:root`), media query. Không dùng preprocessor.
- **JavaScript thuần** (Vanilla JS, ES6+): DOM API, các phương thức mảng (`filter`, `map`, `sort`, `some`, `includes`), template literal, `addEventListener`.
- **Web Storage API có sẵn** (`localStorage`) để lưu dữ liệu cục bộ.

### 2.2 Công nghệ bị cấm

- `MUST NOT` dùng framework hoặc thư viện JavaScript (React, Vue, Angular, Svelte, jQuery, Lodash, Alpine, v.v.).
- `MUST NOT` dùng framework hoặc thư viện CSS (Bootstrap, Tailwind, Bulma, Materialize, v.v.).
- `MUST NOT` dùng CDN, `npm`, `package.json`, bundler (Webpack, Vite), TypeScript, Sass/SCSS hoặc bất kỳ bước build nào.
- `MUST NOT` dùng backend, server, database hoặc API ngoài (PHP, Node.js, MySQL, Firebase, `fetch` tới dịch vụ bên ngoài).
- `MUST NOT` dùng icon font hoặc font tải từ internet; dùng ký tự Unicode/emoji hoặc SVG viết trực tiếp.
- `MUST NOT` thêm bất kỳ thư viện ngoài nào để giải quyết việc nhỏ; mọi logic đều phải tự viết bằng JS thuần.
- `MUST NOT` đề xuất công nghệ ngoài mục 2.1. Nếu thấy cần, `MUST` tự viết lại bằng HTML/CSS/JS thuần.

### 2.3 Ràng buộc chạy trực tiếp trên trình duyệt

- `MUST` chạy được khi mở `index.html` trực tiếp qua giao thức `file://` hoặc bằng Live Server.
- `MUST NOT` dùng ES Modules (`import`/`export`, `type="module"`) vì bị chặn khi mở bằng `file://`.
- `MUST NOT` dùng `fetch()` hoặc `XMLHttpRequest` để đọc file JSON cục bộ vì bị chặn CORS. Dữ liệu mẫu phải đặt trong `js/data.js`.
- `MUST` nạp script bằng thẻ `<script src="...">` thường, đúng thứ tự ở mục 3, đặt cuối `<body>` (hoặc dùng `defer`) để DOM sẵn sàng.
- `MUST` để các file JS chỉ khai báo hàm và hằng ở cấp cao nhất. Không chạy logic có tác dụng phụ ngay khi nạp file; mọi khởi tạo trang chủ đi qua `main.js` (mục 6.3). Ngoại lệ duy nhất: `detail.js` tự khởi tạo khi `DOMContentLoaded` vì `detail.html` không nạp `main.js` (mục 6.4).
- `SHOULD` chạy tốt trên Chrome và Edge bản mới. Một số trình duyệt (như Firefox) có thể tách `localStorage` giữa các file khi mở bằng `file://`, khiến `detail.html` không thấy dữ liệu của `index.html`; khi kiểm thử luồng nhiều trang, ưu tiên Chrome/Edge hoặc Live Server.

## 3. Cấu trúc thư mục chuẩn

```text
personal-knowledge-base/
├── index.html          # Trang chủ + khung giao diện chính (Leader)
├── detail.html         # Trang chi tiết tài liệu (Thành viên 2, nếu cần)
├── skill.md            # File quy tắc này
├── css/
│   ├── base.css        # Reset, biến màu :root, font, layout chung, kiểu focus, giảm chuyển động (Leader)
│   ├── views.css       # Card view và List view (Thành viên 1)
│   └── components.css  # Tag, nút lọc, form thêm, modal (Thành viên 2)
└── js/
    ├── data.js         # Schema, dữ liệu mẫu, đọc/ghi localStorage, ghi chú (Leader)
    ├── filter.js       # Tìm kiếm, lọc Tag, lọc định dạng, sắp xếp (Leader)
    ├── render.js       # Render Card/List, trang chủ, đổi chế độ xem (Thành viên 1)
    ├── tags.js         # Giao diện Tag, form thêm tài liệu (Thành viên 2)
    ├── detail.js       # Logic trang chi tiết và ghi chú (Thành viên 2, chỉ có khi có detail.html)
    └── main.js         # Khởi tạo, state, nối sự kiện (Leader)
```

Thứ tự nạp script trong `index.html` (bắt buộc):

```html
<script src="js/data.js"></script>
<script src="js/filter.js"></script>
<script src="js/render.js"></script>
<script src="js/tags.js"></script>
<script src="js/main.js"></script>
```

Thứ tự nạp trong `detail.html`: `css/base.css`, `css/components.css`, rồi `js/data.js`, `js/detail.js`.

- `MUST NOT` tự ý thêm, xóa, đổi tên file hoặc thư mục ngoài cấu trúc trên khi chưa có xác nhận của Leader.
- `MUST NOT` gộp toàn bộ HTML, CSS, JS vào chung một file.
- `MUST NOT` dùng thẻ `<style>`, thuộc tính `style=""` inline hoặc `onclick=""` inline; tách CSS ra file riêng và gắn sự kiện bằng `addEventListener`. (Trạng thái ẩn/hiện dùng thuộc tính `hidden` hoặc class CSS.)

## 4. Schema dữ liệu (đã chốt, không tự đổi)

Mỗi tài liệu là một object có đúng 9 trường sau:

```js
{
  id: "doc-1",             // string, duy nhất, dạng "doc-<số>"
  title: "Tên tài liệu",   // string, không rỗng
  type: "PDF",             // string, CHỈ nhận "PDF" | "Video" | "Link"
  tags: ["HTML", "CSS"],   // mảng string, có thể rỗng []
  views: 0,                // number nguyên >= 0, lượt xem
  createdAt: "2026-11-25", // string ngày dạng YYYY-MM-DD
  url: "#",                // string, "#" hoặc đường dẫn http(s)
  summary: "Mô tả ngắn",   // string, có thể rỗng ""
  notes: []                // mảng ghi chú nhanh (Note), có thể rỗng []
}
```

Mỗi ghi chú (Note) trong `notes` là một object có đúng 3 trường sau:

```js
{
  id: "note-1",             // string, duy nhất trong tài liệu, dạng "note-<số>"
  text: "Nội dung ghi chú", // string, không rỗng sau trim()
  createdAt: "2026-11-25"   // string ngày dạng YYYY-MM-DD
}
```

- Khóa `localStorage`: `pkb_documents` (chuỗi JSON của mảng tài liệu).
- `MUST` giữ đúng tên trường, kiểu dữ liệu và ba giá trị hợp lệ của `type`.
- `MUST NOT` tự thêm, xóa hoặc đổi tên trường. Cần trường mới thì dừng lại và hỏi xác nhận.
- `MUST` bảo đảm `tags` và `notes` luôn là mảng (kể cả khi rỗng `[]`), không để `undefined` hoặc `null`.
- `MUST` sinh `id` mới theo quy tắc `doc-<số lớn nhất hiện có + 1>`; `MUST` sinh `createdAt` là ngày hôm nay theo giờ máy dạng `YYYY-MM-DD` (không dùng `toISOString()` vì lệch múi giờ).
- `MUST` lưu dữ liệu bằng `JSON.stringify` và đọc bằng `JSON.parse` bọc trong `try/catch`. `MUST` bọc cả `localStorage.setItem` trong `try/catch`.
- `MUST` có ít nhất 5 tài liệu mẫu, đủ cả `PDF`, `Video`, `Link`, có nhiều tag và lượt xem khác nhau để demo được mục "Xem nhiều nhất". Ít nhất một tài liệu mẫu `MUST` có sẵn 1 đến 2 ghi chú để demo `notes`; các tài liệu còn lại có `notes: []`.
- Khi `localStorage` trống, bị xóa hoặc dữ liệu hỏng, `MUST` tự nạp lại dữ liệu mẫu, không được để trắng trang. Dữ liệu cũ thiếu `notes` hoặc có `notes` sai kiểu `MUST` được chuẩn hóa thành `[]` khi đọc (trong `getDocuments()`), không được làm hỏng cả bộ dữ liệu.

## 5. Quy ước đặt tên và phong cách code

- File: chữ thường, ngắn gọn (`filter.js`, `views.css`).
- Biến và hàm JS: `camelCase`, tiếng Anh, có nghĩa (`filterDocuments`, `currentViewMode`). Hằng số: `UPPER_SNAKE_CASE` (`STORAGE_KEY`).
- Class CSS: chữ thường, nối bằng dấu gạch ngang (`doc-card`, `tag-chip`). `SHOULD` dùng thống nhất một kiểu, ví dụ `doc-card`, `doc-card__title`.
- Id HTML: chữ thường, nối bằng dấu gạch ngang (`search-input`).
- `SHOULD` đặt tiền tố class theo từng phần việc để không đè CSS khi ghép (ví dụ `tag-...`, `form-...`, `doc-...`).
- `MUST` có chú thích tiếng Việt ngắn gọn cho từng hàm và từng khối chức năng.
- `MUST` dùng `const`/`let` (không dùng `var`), kết thúc câu lệnh JS bằng dấu chấm phẩy, thụt lề thống nhất 2 hoặc 4 dấu cách.
- `MUST NOT` đặt tên vô nghĩa (`a`, `x1`, `abc`, `test`) hoặc trộn tiếng Việt không dấu với tiếng Anh trong tên biến.
- `MUST NOT` để lại code chết, khối code bị comment, comment thừa hoặc `console.log` debug trong code hoàn chỉnh.
- `MUST NOT` tạo biến hoặc hàm toàn cục mới mà file khác có thể gọi, ngoài các hàm ở mục 6.2 và một đối tượng `state` duy nhất (mục 6.3). Hàm và hằng phụ trợ chỉ dùng trong chính file của mình thì được phép, nhưng không để file khác gọi.
- `SHOULD` giữ mỗi hàm ngắn gọn, đảm nhiệm một việc rõ ràng.

## 6. Hợp đồng giữa các phần (id HTML và hàm)

### 6.1 Id HTML cố định

| Id | Vai trò |
|---|---|
| `search-input` | Ô `<input type="search">` tìm kiếm nhanh |
| `type-filters` | Vùng nút lọc định dạng (`data-type="ALL"`, `"PDF"`, `"Video"`, `"Link"`) |
| `tag-filters` | Vùng nút/tag lọc theo Tag |
| `btn-card-view` | Nút chuyển sang Card view |
| `btn-list-view` | Nút chuyển sang List view |
| `featured-list` | Vùng "Xem nhiều nhất" và "Mới thêm" ở trang chủ |
| `doc-container` | Vùng hiển thị toàn bộ tài liệu sau khi lọc |
| `empty-message` | Thông báo "Không tìm thấy tài liệu" (ẩn/hiện bằng thuộc tính `hidden`) |
| `add-form` | Thẻ `<form>` thêm tài liệu; các ô nhập dùng thuộc tính `name`: `title`, `type`, `tags` (ngăn cách bằng dấu phẩy), `url`, `summary` |
| `form-message` | Vùng hiện thông báo lỗi hoặc thành công của form thêm |

- `MUST NOT` đổi, xóa hoặc đặt trùng các id trên sau khi khung dự án đã chốt. Cần id mới thì đặt thêm, không sửa id cũ.

Id trong `detail.html` (Thành viên 2 sở hữu và đặt đúng các id sau):

| Id | Vai trò |
|---|---|
| `detail-content` | Vùng hiển thị thông tin tài liệu (tên, định dạng, tag, lượt xem, ngày thêm, mô tả) |
| `note-form` | Thẻ `<form>` thêm ghi chú; ô nhập có `name="text"` |
| `note-list` | Thẻ `<ul>` chứa danh sách ghi chú, mỗi ghi chú là một `<li>` có `data-note-id` |
| `note-message` | Vùng thông báo lỗi hoặc trạng thái của phần ghi chú |

### 6.2 Hàm giao tiếp giữa các phần

| Hàm | File | Người viết | Mô tả |
|---|---|---|---|
| `getDocuments()` | `data.js` | Leader | Trả về mảng tài liệu (từ `localStorage` hoặc dữ liệu mẫu); nếu dữ liệu trống hoặc hỏng thì nạp lại dữ liệu mẫu; chuẩn hóa `notes` thiếu hoặc sai kiểu thành `[]` |
| `saveDocuments(docs)` | `data.js` | Leader | Lưu mảng tài liệu vào `localStorage` |
| `isSafeUrl(url)` | `data.js` | Leader | Trả về `true` nếu `url` là đúng `"#"` hoặc bắt đầu bằng `http://` hoặc `https://`; ngược lại `false` |
| `addNote(docId, text)` | `data.js` | Leader | Thêm ghi chú vào tài liệu `docId`: `trim()` `text` và từ chối nếu rỗng (nên giới hạn tối đa 500 ký tự); sinh `id` dạng `note-<số lớn nhất trong notes của tài liệu đó + 1>` và `createdAt` là ngày hôm nay theo giờ máy; lưu bằng `saveDocuments`; trả về ghi chú mới, hoặc `null` nếu không hợp lệ hoặc không tìm thấy tài liệu |
| `deleteNote(docId, noteId)` | `data.js` | Leader | Xóa ghi chú `noteId` khỏi tài liệu `docId` và lưu; trả về `true` nếu xóa được, `false` nếu không tìm thấy |
| `filterDocuments(docs, keyword, type, tag)` | `filter.js` | Leader | Trả về mảng đã lọc; `keyword` rỗng, `type = "ALL"` và `tag = ""` nghĩa là không lọc theo tiêu chí đó |
| `getMostViewed(docs, n)` | `filter.js` | Leader | Trả về `n` tài liệu nhiều lượt xem nhất (`views` giảm dần; bằng nhau thì `createdAt` giảm dần) |
| `getRecentlyAdded(docs, n)` | `filter.js` | Leader | Trả về `n` tài liệu mới thêm nhất (`createdAt` giảm dần; bằng nhau thì số trong `id` giảm dần) |
| `getAllTags(docs)` | `filter.js` | Leader | Trả về mảng tag không trùng (không phân biệt hoa thường), sắp theo chữ cái |
| `renderDocuments(list, viewMode)` | `render.js` | Thành viên 1 | Vẽ danh sách vào `doc-container`; `viewMode` là `"card"` hoặc `"list"`; bật/tắt `empty-message` khi `list` rỗng; mỗi tài liệu là một `<article>` có `data-id`, bên trong có `<button>` hoặc `<a>` để mở tài liệu theo mục 6.4 |
| `renderFeatured(mostViewed, recent)` | `render.js` | Thành viên 1 | Vẽ hai mục "Xem nhiều nhất" và "Mới thêm" vào `featured-list` |
| `setViewMode(mode)` | `render.js` | Thành viên 1 | Đặt `state.viewMode`, cập nhật trạng thái nút Card/List, gọi `refreshUI()`; không reload |
| `initViews()` | `render.js` | Thành viên 1 | Hook khởi tạo: gắn sự kiện cho `btn-card-view` và `btn-list-view`; được `main.js` gọi khi tải trang |
| `renderTags(tags)` | `tags.js` | Thành viên 2 | Vẽ các nút Tag vào `tag-filters`, tô sáng tag đang chọn (`state.tag`); bấm một tag thì gọi `setActiveTag(tag)` |
| `initTags()` | `tags.js` | Thành viên 2 | Hook khởi tạo: vẽ Tag lần đầu, gắn sự kiện `submit` cho `add-form` (có `preventDefault()`); được `main.js` gọi khi tải trang |
| `addDocument(doc)` | `tags.js` | Thành viên 2 | Thêm tài liệu mới và lưu (quy tắc ở dưới bảng) |
| `increaseViews(id)` | `tags.js` | Thành viên 2 | Tăng `views` của tài liệu lên 1 và lưu; trả về `true` nếu tìm thấy, `false` nếu không |
| `setActiveTag(tag)` | `main.js` | Leader | Đặt `state.tag` (bấm lại tag đang chọn thì về `""`), rồi gọi `refreshUI()` |
| `refreshUI()` | `main.js` | Leader | Đọc `getDocuments()`, lọc theo `state`, rồi gọi `renderDocuments`, `renderFeatured` và `renderTags` |

Quy tắc cho `addDocument(doc)`:

- `doc` chỉ gồm `title`, `type`, `tags`, `url`, `summary` (lấy từ `add-form`).
- Hàm tự sinh `id`, `createdAt`, `views: 0` và `notes: []` theo mục 4.
- Chuẩn hóa `tags`: `trim()`, bỏ phần tử rỗng, bỏ trùng không phân biệt hoa thường.
- Kiểm tra dữ liệu theo mục 9; `url` rỗng thì dùng `"#"`.
- Lưu bằng `saveDocuments`, trả về tài liệu mới; nếu không hợp lệ thì không lưu gì và trả về `null`.
- Trình xử lý `submit` trong `initTags()` hiện lỗi hoặc thành công ở `form-message` bằng `textContent`, rồi gọi `refreshUI()` khi thêm thành công.

Quy tắc chung của hợp đồng:

- `MUST` giữ nguyên tên, thứ tự tham số và kiểu trả về của các hàm trên.
- `MUST` viết các hàm lọc và sắp xếp dưới dạng hàm thuần: không làm biến đổi mảng gốc (tạo bản sao trước khi `sort`).
- `MUST NOT` gọi chéo hàm nội bộ giữa các file ngoài danh sách ở bảng trên.
- Cần đổi chữ ký hàm hoặc thêm hàm vào bảng thì `MUST` hỏi xác nhận và nhắc người dùng báo cả nhóm.
- Khi Leader dựng khung, AI `MUST` tạo sẵn mọi hàm của thành viên (`renderDocuments`, `renderFeatured`, `setViewMode`, `initViews`, `renderTags`, `initTags`, `addDocument`, `increaseViews`) ở dạng stub chạy được (không lỗi, in tạm nội dung đơn giản), cùng đủ id (mục 6.1) và `state`, để đẩy lên `main` trước khi thành viên tách nhánh.
- Khi thành viên thay thân stub, AI `MUST` giữ nguyên tên và tham số của hàm.

### 6.3 State và luồng làm mới giao diện

`main.js` định nghĩa đúng một đối tượng `state`:

```js
const state = {
  keyword: "",       // nội dung ô tìm kiếm
  type: "ALL",       // "ALL" | "PDF" | "Video" | "Link"
  tag: "",           // "" nghĩa là không lọc theo tag
  viewMode: "card"   // "card" | "list"
};
```

- Leader `MUST` gắn sự kiện cho `search-input` và `type-filters` trong `main.js`: cập nhật `state.keyword` hoặc `state.type` rồi gọi `refreshUI()`.
- Nếu Leader chưa nối `initViews()` và `initTags()` vào `main.js`, `MUST` nối ngay: `main.js` gọi `initViews()`, `initTags()` rồi `refreshUI()` khi `DOMContentLoaded`, để phần của thành viên tự chạy sau khi gộp mà không phải sửa lại `main.js`.
- Thành viên `MUST` chỉ ghi vào `state.viewMode` (Thành viên 1, trong `setViewMode`); mọi thay đổi `state` khác đi qua hàm của Leader (`setActiveTag`) hoặc đề xuất cho Leader.
- Mọi thay đổi dữ liệu hoặc bộ lọc `MUST` kết thúc bằng `refreshUI()`, không tự gọi lọc và vẽ riêng lẻ ở nơi khác.

### 6.4 Mở tài liệu, trang chi tiết và ghi chú

- Khi người dùng kích hoạt nút (hoặc liên kết) mở tài liệu trong một mục (xử lý trong `renderDocuments`): gọi `increaseViews(id)` đúng một lần, rồi chuyển tới `detail.html?id=<id>` (dùng `encodeURIComponent`).
- Nếu dự án không có `detail.html`: bấm tài liệu thì `increaseViews(id)`, gọi `refreshUI()` và mở `url` ở tab mới (khi `url` khác `"#"` và `isSafeUrl(url)` là `true`).
- `detail.js` tự khởi tạo khi `DOMContentLoaded`: đọc `id` bằng `new URLSearchParams(location.search).get("id")`, tìm tài liệu bằng `getDocuments()`, hiển thị vào `detail-content` bằng `textContent`. Không tìm thấy (hoặc thiếu `id`) thì hiện thông báo "Không tìm thấy tài liệu" và liên kết về `index.html`.
- Trang chi tiết có liên kết quay lại `index.html`, và nút mở `url` (chỉ khi `isSafeUrl(url)` là `true`).
- Ghi chú trên trang chi tiết (yêu cầu chi tiết ở mục 8.2): `detail.js` vẽ `doc.notes` vào `note-list`; gắn sự kiện `submit` cho `note-form` (có `preventDefault()`) để gọi `addNote(id, text)`; gắn một sự kiện `click` duy nhất lên `note-list` (event delegation) để gọi `deleteNote(id, noteId)` khi bấm nút xóa; sau mỗi thay đổi vẽ lại danh sách mà không reload.
- `MUST NOT` gọi `increaseViews` trong trang chi tiết (tránh đếm đôi khi tải lại trang). Thêm hoặc xóa ghi chú `MUST NOT` làm đổi `views`.

## 7. Phân công file và ranh giới sửa code

| Vai trò | Nhiệm vụ | File được sửa | Nhánh Git |
|---|---|---|---|
| Leader | Phần lõi (`main`): khung dự án, dữ liệu, logic lọc, state, khởi tạo, gộp code | `index.html`, `base.css`, `data.js`, `filter.js`, `main.js`, `skill.md` | `main` |
| Thành viên 1 | Giao diện, Card/List view, trang chủ | `views.css`, `render.js` | `feature/ui-views` |
| Thành viên 2 | Tag, thêm tài liệu, trang chi tiết, ghi chú | `components.css`, `tags.js`, `detail.html`, `detail.js` | `feature/tags-crud` |

- `MUST` chỉ sửa các file thuộc đúng vai trò của người đang hỏi.
- `MUST NOT` sửa chung một file giữa hai người. Khi hai phần cần ghép vào cùng một chỗ, dùng id có sẵn (mục 6.1) và đổ nội dung bằng JS.
- `MUST NOT` sửa trực tiếp file lõi của Leader từ phía thành viên; mọi tích hợp giao diện đi qua id (mục 6.1) và hàm (mục 6.2).
- `MUST` chỉ tạo file mới ngoài cấu trúc mục 3 khi đã có xác nhận của Leader.
- `SHOULD` đặt class CSS có tiền tố riêng để không trùng với `base.css`.

## 8. Yêu cầu chức năng và chất lượng giao diện (phải đáp ứng đầy đủ)

### 8.1 Yêu cầu theo đề bài

Phân hệ: **Hệ thống Kho lưu trữ Tài liệu cá nhân (Personal Knowledge Base)**. Tầm nhìn dài hạn: "Bộ não thứ hai" (Second Brain) với tự động tóm tắt tài liệu bằng AI và sơ đồ liên kết ý tưởng.

Yêu cầu cụ thể của đề:

- **HTML5 và CSS3**: giao diện quản lý file dạng thẻ (Card view) và dạng danh sách (List view); dùng `<input type="search">` làm bộ lọc tìm kiếm nhanh.
- **JavaScript**: phân loại tài liệu theo Tag (nhãn); hàm lọc tài liệu theo từ khóa hoặc định dạng file (PDF, Video, Link) mà không load lại trang.
- **Các trang tối thiểu**: trang chủ hiển thị tài liệu được xem nhiều nhất hoặc vừa mới thêm.

Quy tắc áp dụng:

- `MUST` đối chiếu từng gạch đầu dòng của đề trước khi báo hoàn thành.
- `MUST` hỏi người dùng để xác nhận nếu đề gốc còn các trang hoặc yêu cầu khác ngoài phần đã liệt kê (mục "Các trang tối thiểu" có thể còn nhiều hơn); `MUST NOT` tự bịa thêm yêu cầu.
- `MUST` ưu tiên hoàn thiện luồng cốt lõi (hiển thị, tìm kiếm, lọc, Card/List, lưu `localStorage`) trước tính năng phụ.
- `MUST NOT` tự ý làm tính năng tầm nhìn dài hạn (tóm tắt AI, sơ đồ liên kết) hoặc tính năng ngoài đề (riêng Ghi chú ở mục 8.2 là yêu cầu bổ sung của nhóm nên được làm). Chỉ làm khi người dùng yêu cầu rõ ràng và phần bắt buộc đã xong; khi đó chỉ dùng JS thuần, không gọi dịch vụ AI bên ngoài.
- `MUST` cập nhật giao diện qua DOM cho mọi thao tác tìm kiếm, lọc, đổi chế độ xem; `MUST NOT` gây reload trang (nếu dùng `<form>`, bắt buộc `preventDefault()`).
- `MUST` hỗ trợ lọc kết hợp đồng thời: từ khóa + định dạng + Tag.
- `MUST` tìm kiếm không phân biệt hoa thường, `trim()` khoảng trắng thừa hai đầu, khớp trên cả `title`, `tags` và `summary`. Chuỗi chỉ toàn dấu cách coi như từ khóa rỗng.
- `SHOULD` tìm kiếm không phân biệt dấu tiếng Việt (gõ "lap trinh" vẫn khớp "Lập trình"): chuẩn hóa cả hai vế bằng `normalize("NFD")`, bỏ ký tự dấu tổ hợp bằng `/[\u0300-\u036f]/g` và đổi `đ`/`Đ` thành `d`.
- Quy tắc Tag: so khớp không phân biệt hoa thường sau `trim()`; chỉ chọn một tag tại một thời điểm; bấm lại tag đang chọn thì bỏ lọc; hiển thị tag giữ nguyên chữ gốc. `SHOULD` có nút bỏ lọc tag.
- `MUST` hiển thị thông báo ở `empty-message` khi không có kết quả phù hợp.
- `MUST` có Card view và List view tách biệt rõ ràng, chuyển qua lại được mà giữ nguyên trạng thái bộ lọc đang áp dụng.
- `MUST` hiển thị mục "Xem nhiều nhất" (`views` giảm dần) và "Mới thêm" (`createdAt` giảm dần) trên trang chủ.
- `MUST` tăng `views` khi mở tài liệu (mục 6.4) và lưu ngay vào `localStorage`.

### 8.2 Ghi chú (Note): yêu cầu bổ sung của nhóm

- `MUST` cho phép thêm và xóa ghi chú nhanh cho từng tài liệu ngay trên `detail.html`, lưu trong trường `notes` của tài liệu (mục 4), dùng chung khóa `pkb_documents`.
- `MUST` cập nhật danh sách ghi chú trực tiếp qua DOM, không reload trang.
- `MUST` giữ ghi chú sau khi nhấn `F5`; `MUST NOT` lưu ghi chú ở khóa `localStorage` riêng hay chỉ trong biến tạm.
- `MUST` từ chối ghi chú rỗng hoặc chỉ toàn dấu cách và báo lỗi ở `note-message`; hiển thị nội dung ghi chú bằng `textContent` (mục 9).
- `MUST` hiện "Chưa có ghi chú nào." khi `notes` rỗng.
- Nút xóa mỗi ghi chú `MUST` là `<button type="button">` có `aria-label` rõ nghĩa (ví dụ "Xóa ghi chú").

### 8.3 Chất lượng giao diện: HTML, CSS, DOM

**Nhóm bắt buộc (giữ chặt):**

- **Semantic HTML5**:
  - `MUST` dùng đúng thẻ ngữ nghĩa theo vai trò: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<form>`, `<label>`, `<footer>`.
  - `MUST NOT` lạm dụng `<div>` hoặc `<span>` thay cho thẻ đã có ngữ nghĩa. Chỉ dùng `<div>` làm khung bố cục khi không có thẻ phù hợp và không lồng quá sâu.
  - Mỗi tài liệu (cả Card view và List view) `MUST` là một `<article>`; danh sách ghi chú dùng `<ul>` và `<li>`.
  - Mỗi trang `MUST` có đúng một `<h1>`, thứ bậc tiêu đề không nhảy cấp.
  - `MUST` khai báo `<html lang="vi">`, `<meta charset="UTF-8">` và `<meta name="viewport" content="width=device-width, initial-scale=1">`.
  - Mọi ô nhập `MUST` có `<label>` gắn bằng `for` và `id`. Nếu muốn ẩn nhãn, dùng class `visually-hidden` trong `base.css`, không dùng `display: none`.
- **Flexbox và Grid**:
  - Flexbox cho thanh điều hướng, hàng nút lọc (kèm `flex-wrap: wrap`), từng dòng của List view và form ghi chú.
  - Grid cho Card view và khu "Xem nhiều nhất / Mới thêm", ví dụ `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))`.
  - `MUST NOT` dùng `float`, `<table>` hoặc `position: absolute` để dàn bố cục chính.
- **Responsive**:
  - `MUST` viết theo hướng mobile-first: CSS cơ sở cho màn hình nhỏ, mở rộng bằng `@media (min-width: ...)`. `SHOULD` dùng thống nhất hai mốc `600px` và `900px`.
  - `MUST` không tràn ngang từ độ rộng 320px trở lên; dùng `max-width`, `%`, `rem`, `fr`, `minmax()`; `MUST NOT` đặt chiều rộng cố định bằng `px` cho container chính.
  - `SHOULD` để nút và liên kết có vùng bấm đủ lớn (cao tối thiểu khoảng 40px) trên màn hình cảm ứng.
- **JavaScript DOM**: `MUST` thao tác giao diện bằng DOM API; mọi thao tác tìm kiếm, lọc kết hợp, đổi chế độ xem, thêm tài liệu, mở chi tiết, thêm/xóa ghi chú cập nhật ngay, không reload trang (mục 8.1 và 8.2).

**Nhóm có chọn lọc (làm vừa phải):**

- **Animation** (`SHOULD`, chỉ CSS thuần):
  - Chỉ dùng `transition` nhẹ cho hover/focus của nút và thẻ, đổi trạng thái bộ lọc đang chọn, hiện thông báo; thời lượng 150 ms đến 300 ms.
  - Chỉ animate `opacity`, `transform`, `background-color`, `border-color`, `box-shadow`; `MUST NOT` animate `width`, `height`, `top`, `left`.
  - `MUST NOT` dùng thư viện animation, `@keyframes` lặp vô hạn, hiệu ứng dài hơn 500 ms hoặc hiệu ứng chặn thao tác.
  - Leader `MUST` đặt một khối dùng chung trong `base.css`, tắt chuyển động khi người dùng bật chế độ giảm chuyển động: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; } }`.
  - Khi thời gian gấp, `MUST` ưu tiên chức năng và bỏ animation trước.

### 8.4 Truy cập và trạng thái rỗng/lỗi

- **Bàn phím**: mọi thao tác (lọc, đổi chế độ xem, chọn tag, mở tài liệu, gửi form, thêm/xóa ghi chú) `MUST` làm được bằng `Tab`, `Enter`, `Space`. Phần tử bấm được `MUST` là `<button>` hoặc `<a>`; `MUST NOT` gắn sự kiện click lên `<div>`, `<span>` hoặc `<article>` không focus được.
- **Focus**: `MUST` có kiểu `:focus-visible` rõ ràng trong `base.css`; `MUST NOT` dùng `outline: none` mà không thay bằng kiểu focus khác.
- **Trạng thái bật/tắt**: nút lọc định dạng, tag và Card/List `SHOULD` có `aria-pressed="true"` hoặc `"false"`, cập nhật cùng lúc với class đang chọn.
- **Thông báo**: `empty-message`, `form-message` và `note-message` `MUST` có `role="status"` và `aria-live="polite"` (lỗi nghiêm trọng dùng `role="alert"`).
- **Độ tương phản**: `SHOULD` đạt tỉ lệ tối thiểu 4.5:1 cho chữ thường.
- **Trạng thái rỗng và lỗi**: `MUST` có nội dung tiếng Việt cụ thể, không để vùng trống:
  - Không có tài liệu khớp bộ lọc: `empty-message` hiện "Không tìm thấy tài liệu phù hợp." (`SHOULD` gợi ý đổi từ khóa hoặc bỏ bộ lọc).
  - Thiếu hoặc sai dữ liệu ở form thêm tài liệu: `form-message` nêu rõ trường nào sai (ví dụ "Tiêu đề không được để trống.", "Đường dẫn phải bắt đầu bằng http:// hoặc https://.").
  - Ghi chú rỗng: "Vui lòng nhập nội dung ghi chú."; chưa có ghi chú: "Chưa có ghi chú nào."
  - Không tìm thấy tài liệu ở trang chi tiết: thông báo kèm liên kết về trang chủ.
  - Dữ liệu `localStorage` hỏng: nạp lại dữ liệu mẫu (mục 4), không để trắng trang.

## 9. Quy tắc bảo mật và an toàn dữ liệu

- `MUST` đưa nội dung do người dùng nhập (`title`, `tags`, `summary`, `url`, `notes[].text`) vào giao diện bằng `textContent` hoặc `setAttribute` trên phần tử tạo bằng `createElement`. Nếu bắt buộc dùng `innerHTML`, `MUST` escape ký tự HTML trước.
- `MUST` kiểm tra dữ liệu đầu vào của form thêm tài liệu: `title` không rỗng sau `trim()`, `type` thuộc `["PDF", "Video", "Link"]`, `url` rỗng thì dùng `"#"`, còn lại phải qua `isSafeUrl`. Với ghi chú, nội dung phải không rỗng sau `trim()`.
- `MUST` chỉ gán `url` vào `href` khi `isSafeUrl(url)` là `true`; `MUST NOT` cho phép `javascript:`, `data:` hoặc scheme khác. Khi dùng `target="_blank"`, `MUST` thêm `rel="noopener noreferrer"`.
- `MUST NOT` dùng `eval()`, `new Function()`, `document.write()`.
- `MUST NOT` nhúng script, ảnh, font hoặc liên kết tài nguyên từ internet (kể cả ảnh trực tuyến), vì vi phạm ràng buộc đề bài và dễ lỗi khi mất mạng.
- `MUST NOT` đưa mật khẩu, khóa API, token hoặc thông tin cá nhân thật vào mã nguồn hay dữ liệu mẫu.
- `MUST NOT` sao chép nguyên văn code từ nguồn có bản quyền mà không hiểu rõ.

## 10. Git và xử lý conflict (khi AI hỗ trợ)

- Chỉ Leader được commit và gộp vào `main`. Khi hướng dẫn thao tác Git cho thành viên, AI `MUST NOT` đề xuất commit hoặc push thẳng lên `main`; thành viên làm trên nhánh `feature/...` theo mục 7, tách từ `main` mới nhất.
- Khi cần lấy phần lõi mới nhất vào nhánh của thành viên, AI `MUST` hướng dẫn `git pull origin main` ngay trên nhánh đó.
- Khi hướng dẫn gộp, AI `MUST` gộp từng nhánh một vào `main` và nhắc kiểm tra sau mỗi lần gộp; `MUST NOT` đề xuất gộp nhiều nhánh cùng lúc.
- Thông điệp commit do AI đề xuất `MUST` mô tả đã làm gì (ví dụ `Them ham filterDocuments loc theo tag`); `MUST NOT` dùng `fix`, `update`, `abc`.
- Khi hỗ trợ xử lý conflict, AI `MUST`:
  - Phân tích kỹ đoạn giữa `<<<<<<<`, `=======`, `>>>>>>>`.
  - Giữ đúng logic hợp lệ của cả hai bên. Khi một bên là stub và một bên là hàm hoàn chỉnh, giữ hàm hoàn chỉnh và giữ nguyên tên, tham số theo mục 6.2.
  - Xóa sạch các dòng đánh dấu conflict.
  - `MUST NOT` xóa code của bên kia chỉ để hết conflict mà không hỏi.
  - Giải thích rõ phần đã giữ và phần đã bỏ, rồi nhắc chạy thử trước khi `git add` và `git commit`.
- `MUST NOT` đề xuất `git push --force`, `git reset --hard` hoặc bất kỳ lệnh nào ghi đè hay phá hủy lịch sử.

## 11. Checklist kiểm thử kỹ thuật

Khi kiểm tra code hoặc hướng dẫn người dùng kiểm thử, AI `MUST` đối chiếu đủ các tình huống sau:

1. **Console và Network**: không có lỗi đỏ JS khi tải trang và sau khi thao tác; các file `css/*.css` và `js/*.js` tải đúng đường dẫn, kể cả khi mở bằng `file://`.
2. **Trang chủ**: hiển thị đúng "Xem nhiều nhất" và "Mới thêm".
3. **Chế độ xem**: chuyển Card/List không vỡ layout, không tràn ngang, không mất nút và giữ nguyên kết quả đang lọc.
4. **Tìm kiếm**: khớp từ khóa hoa/thường lẫn lộn, xử lý chuỗi chỉ toàn dấu cách, hiện `empty-message` khi không có kết quả, khôi phục đủ danh sách khi xóa trắng ô tìm kiếm.
5. **Lọc kết hợp**: lọc theo định dạng, theo Tag, và kết hợp cùng từ khóa; bấm lại tag đang chọn thì bỏ lọc.
6. **Không reload**: mọi thao tác tìm kiếm, lọc, đổi chế độ xem, thêm tài liệu đều không tải lại trang.
7. **Thêm tài liệu**: form báo lỗi khi `title` rỗng hoặc `url` không hợp lệ; thêm hợp lệ thì tài liệu và tag mới hiện ngay trong danh sách.
8. **Mở tài liệu**: `views` tăng đúng 1 mỗi lần mở; trang chi tiết hiển thị đúng; tải lại trang chi tiết không làm tăng `views`.
9. **Ghi chú**: thêm ghi chú hợp lệ hiện ngay; ghi chú rỗng bị từ chối kèm thông báo; xóa ghi chú hoạt động; nhấn F5 trên `detail.html` vẫn giữ ghi chú và `views` không đổi; thêm hoặc xóa ghi chú không làm đổi `views`.
10. **Lưu trữ `localStorage`**: thêm tài liệu hoặc tăng `views` rồi nhấn F5 vẫn giữ nguyên; xóa `localStorage` rồi F5 vẫn tự nạp lại dữ liệu mẫu; dữ liệu cũ không có `notes` vẫn đọc được và `notes` được chuẩn hóa thành `[]`.
11. **Trường hợp biên**: tài liệu có `tags: []` hoặc `notes: []`, tiêu đề, tag hay ghi chú rất dài, co giãn kích thước cửa sổ.
12. **Giao diện và truy cập**: dùng `Tab`, `Enter`, `Space` thao tác được mọi nút và thấy rõ viền focus; không tràn ngang ở 320px; Card, List và lưới nổi bật hiển thị hợp lý ở 320px, 600px, 900px trở lên; hiệu ứng nhẹ và bị tắt khi bật chế độ giảm chuyển động.
13. **Semantic HTML**: một `<h1>` mỗi trang, mọi ô nhập có `<label>`, mỗi tài liệu là `<article>`, không lạm dụng `<div>`.
14. **Đề bài**: đối chiếu lại từng gạch đầu dòng ở mục 8.1 và các yêu cầu bổ sung ở mục 8.2.

## 12. Tiêu chí hoàn thành tác vụ

Một thay đổi hoặc chức năng chỉ được AI xác nhận hoàn thành khi:

- Đáp ứng đúng yêu cầu ở mục 8 và qua được các kịch bản liên quan ở mục 11 (hoặc đã nói rõ phần nào chưa kiểm chứng).
- Tuân thủ đầy đủ ràng buộc công nghệ (mục 2), schema (mục 4), hợp đồng id/hàm (mục 6) và ranh giới file (mục 7).
- Code sạch: có chú thích tiếng Việt, không còn `console.log` debug hay code thừa.

## 13. Định dạng phản hồi của AI

- `MUST` trả lời bằng tiếng Việt, ngắn gọn, đi thẳng vào kỹ thuật; chú thích code bằng tiếng Việt, tên biến và hàm bằng tiếng Anh theo mục 5.
- `MUST` chỉ trả về đoạn code cần thay đổi kèm vị trí đặt rõ ràng. Chỉ trả toàn bộ file khi tạo file mới hoàn toàn hoặc được yêu cầu trực tiếp.
- Khi viết code: nêu tên file, vị trí đặt đoạn code, rồi đưa code trong khối mã.
- Khi sửa lỗi: nêu nguyên nhân trong 1 đến 2 câu trước khi đưa đoạn sửa.
- Cuối mỗi phản hồi có thay đổi code, AI `MUST` liệt kê:
  1. Giả định đã dùng (nếu có).
  2. File đã sửa hoặc đề xuất sửa.
  3. Cách kiểm tra trực tiếp trên trình duyệt (bấm gì, nhìn gì).
  4. Vấn đề còn tồn tại hoặc điểm cần Leader xác nhận (nếu có).
- Mọi đoạn code AI sinh ra `MUST` tuân thủ công nghệ thuần (mục 2), schema (mục 4), hợp đồng id/hàm (mục 6) và ranh giới file (mục 7).
- Nếu yêu cầu vi phạm tài liệu này, AI `MUST` dừng lại, nêu rõ mục bị vi phạm và hỏi xác nhận trước khi thực hiện.
