// Tạo liên kết quay lại trang chủ khi không tìm thấy tài liệu.
function createBackLink() {
  const link = document.createElement("a");
  link.href = "index.html";
  link.textContent = "Quay lại trang chủ";
  return link;
}

// Hiển thị thông tin tài liệu bằng DOM và textContent để tránh chèn HTML từ dữ liệu người dùng.
function renderDetail(documentData) {
  const detailContent = document.getElementById("detail-content");

  if (!detailContent) {
    return;
  }

  detailContent.replaceChildren();

  if (!documentData) {
    const message = document.createElement("p");
    message.className = "detail-not-found";
    message.textContent = "Không tìm thấy tài liệu.";
    detailContent.append(message, createBackLink());
    return;
  }

  const header = document.createElement("header");
  header.className = "detail-card__header";

  const badge = document.createElement("span");
  badge.className = "detail-card__badge";
  badge.textContent = documentData.type;

  const views = document.createElement("span");
  views.className = "detail-card__views";
  views.textContent = `${Number(documentData.views) || 0} lượt xem`;
  header.append(badge, views);

  const title = document.createElement("h2");
  title.className = "detail-card__title";
  title.textContent = documentData.title;

  const metadata = document.createElement("p");
  metadata.className = "detail-card__meta";
  metadata.textContent = `Ngày thêm: ${documentData.createdAt}`;

  const summary = document.createElement("p");
  summary.className = "detail-card__summary";
  summary.textContent = documentData.summary || "Chưa có mô tả cho tài liệu này.";

  const tagList = document.createElement("ul");
  tagList.className = "detail-card__tags";
  tagList.setAttribute("aria-label", "Tag của tài liệu");

  (Array.isArray(documentData.tags) ? documentData.tags : []).forEach((tag) => {
    const tagItem = document.createElement("li");
    tagItem.className = "detail-card__tag";
    tagItem.textContent = tag;
    tagList.append(tagItem);
  });

  const actions = document.createElement("div");
  actions.className = "detail-card__actions";

  const backLink = createBackLink();
  backLink.className = "detail-card__back";
  actions.append(backLink);

  if (isSafeUrl(documentData.url) && documentData.url !== "#") {
    const openLink = document.createElement("a");
    openLink.className = "detail-card__open";
    openLink.href = documentData.url;
    openLink.textContent = "Mở tài liệu";
    openLink.target = "_blank";
    openLink.rel = "noopener noreferrer";
    actions.append(openLink);
  }

  detailContent.append(header, title, metadata, summary, tagList, actions);
}

// Vẽ lại danh sách ghi chú bằng textContent và nút xóa có nhãn rõ ràng.
function renderNotes(documentData) {
  const noteList = document.getElementById("note-list");

  if (!noteList) {
    return;
  }

  noteList.replaceChildren();

  const notes = documentData && Array.isArray(documentData.notes)
    ? documentData.notes
    : [];

  if (notes.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "note-item note-item--empty";
    emptyItem.textContent = "Chưa có ghi chú nào.";
    noteList.append(emptyItem);
    return;
  }

  notes.forEach((note) => {
    const item = document.createElement("li");
    item.className = "note-item";
    item.dataset.noteId = note.id;

    const content = document.createElement("div");
    content.className = "note-item__content";

    const text = document.createElement("p");
    text.className = "note-item__text";
    text.textContent = note.text;

    const date = document.createElement("time");
    date.className = "note-item__date";
    date.textContent = note.createdAt;

    content.append(text, date);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "note-item__delete";
    deleteButton.dataset.action = "delete-note";
    deleteButton.setAttribute("aria-label", "Xóa ghi chú");
    deleteButton.textContent = "Xóa";

    item.append(content, deleteButton);
    noteList.append(item);
  });
}

// Khởi tạo trang chi tiết, thêm ghi chú và xóa ghi chú bằng event delegation.
function initDetail() {
  const detailContent = document.getElementById("detail-content");

  if (!detailContent) {
    return;
  }

  const searchParams = new URLSearchParams(location.search);
  const documentId = searchParams.get("id");

  if (!documentId) {
    renderDetail(null);
    return;
  }

  let documentData = getDocuments().find((item) => item.id === documentId);

  if (!documentData) {
    renderDetail(null);
    return;
  }

  renderDetail(documentData);
  renderNotes(documentData);

  const noteForm = document.getElementById("note-form");
  const noteMessage = document.getElementById("note-message");
  const noteList = document.getElementById("note-list");

  if (noteForm) {
    noteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(noteForm);
      const text = String(formData.get("text") || "");

      if (text.trim() === "") {
        if (noteMessage) {
          noteMessage.textContent = "Vui lòng nhập nội dung ghi chú.";
        }
        noteForm.elements.text.focus();
        return;
      }

      if (text.trim().length > 500) {
        if (noteMessage) {
          noteMessage.textContent = "Ghi chú không được vượt quá 500 ký tự.";
        }
        noteForm.elements.text.focus();
        return;
      }

      const newNote = addNote(documentId, text);

      if (!newNote) {
        if (noteMessage) {
          noteMessage.textContent = "Không thể thêm ghi chú. Vui lòng thử lại.";
        }
        return;
      }

      documentData = getDocuments().find((item) => item.id === documentId);
      renderNotes(documentData);
      noteForm.reset();

      if (noteMessage) {
        noteMessage.textContent = "Đã thêm ghi chú.";
      }
    });
  }

  if (noteList) {
    noteList.addEventListener("click", (event) => {
      const target = event.target;
      const deleteButton = target instanceof Element
        ? target.closest("button[data-action='delete-note']")
        : null;

      if (!deleteButton || !noteList.contains(deleteButton)) {
        return;
      }

      const noteItem = deleteButton.closest("li[data-note-id]");

      if (!noteItem) {
        return;
      }

      if (deleteNote(documentId, noteItem.dataset.noteId)) {
        documentData = getDocuments().find((item) => item.id === documentId);
        renderNotes(documentData);

        if (noteMessage) {
          noteMessage.textContent = "Đã xóa ghi chú.";
        }
      }
    });
  }
}

// Trang chi tiết tự khởi tạo độc lập, không nạp main.js.
document.addEventListener("DOMContentLoaded", initDetail);
