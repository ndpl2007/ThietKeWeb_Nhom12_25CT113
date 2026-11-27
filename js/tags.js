// Lấy ngày hiện tại theo giờ máy để lưu theo định dạng YYYY-MM-DD.
function getTodayString() {
  const currentDate = new Date();

  return [
    currentDate.getFullYear(),
    String(currentDate.getMonth() + 1).padStart(2, "0"),
    String(currentDate.getDate()).padStart(2, "0")
  ].join("-");
}

// Vẽ các nút Tag và nút bỏ lọc, đồng thời giữ trạng thái tag đang chọn.
function renderTags(tags) {
  const tagFilters = document.getElementById("tag-filters");

  if (!tagFilters) {
    return;
  }

  const availableTags = Array.isArray(tags) ? tags : [];
  const fragment = document.createDocumentFragment();
  const currentTag = typeof state.tag === "string"
    ? state.tag.trim().toLocaleLowerCase("vi")
    : "";

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "tag-filter tag-filter--clear";
  clearButton.textContent = "Tất cả tag";
  clearButton.setAttribute("aria-pressed", String(currentTag === ""));
  clearButton.addEventListener("click", () => setActiveTag(""));
  fragment.append(clearButton);

  if (availableTags.length === 0) {
    tagFilters.replaceChildren(fragment);
    return;
  }

  availableTags.forEach((tag) => {
    const button = document.createElement("button");
    const isActive = currentTag !== ""
      && currentTag === tag.trim().toLocaleLowerCase("vi");

    button.type = "button";
    button.className = "tag-filter";
    button.textContent = tag;
    button.setAttribute("aria-pressed", String(isActive));
    button.addEventListener("click", () => setActiveTag(tag));
    fragment.append(button);
  });

  tagFilters.replaceChildren(fragment);
}

// Gắn sự kiện khởi tạo cho danh sách tag và form thêm tài liệu.
function initTags() {
  renderTags(getAllTags(getDocuments()));

  const addForm = document.getElementById("add-form");

  if (!addForm) {
    return;
  }

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formMessage = document.getElementById("form-message");
    const formData = new FormData(addForm);
    const documentData = {
      title: formData.get("title"),
      type: formData.get("type"),
      tags: String(formData.get("tags") || "").split(","),
      url: formData.get("url"),
      summary: formData.get("summary")
    };

    const title = typeof documentData.title === "string"
      ? documentData.title.trim()
      : "";

    if (title === "") {
      if (formMessage) {
        formMessage.textContent = "Tiêu đề không được để trống.";
      }
      addForm.elements.title.focus();
      return;
    }

    if (!["PDF", "Video", "Link"].includes(documentData.type)) {
      if (formMessage) {
        formMessage.textContent = "Vui lòng chọn định dạng PDF, Video hoặc Link.";
      }
      addForm.elements.type.focus();
      return;
    }

    const url = typeof documentData.url === "string"
      ? documentData.url.trim()
      : "";

    if (url !== "" && !isSafeUrl(url)) {
      if (formMessage) {
        formMessage.textContent = "Đường dẫn phải bắt đầu bằng http:// hoặc https://.";
      }
      addForm.elements.url.focus();
      return;
    }

    const newDocument = addDocument(documentData);

    if (!newDocument) {
      if (formMessage) {
        formMessage.textContent = "Không thể lưu tài liệu. Vui lòng kiểm tra lại thông tin.";
      }
      return;
    }

    if (formMessage) {
      formMessage.textContent = `Đã thêm tài liệu \"${newDocument.title}\".`;
    }

    addForm.reset();
    refreshUI();
  });
}

// Thêm tài liệu hợp lệ, tự sinh ID và chuẩn hóa dữ liệu trước khi lưu.
function addDocument(doc) {
  if (doc === null || typeof doc !== "object" || Array.isArray(doc)) {
    return null;
  }

  const title = typeof doc.title === "string" ? doc.title.trim() : "";
  const type = typeof doc.type === "string" ? doc.type : "";
  const url = typeof doc.url === "string" && doc.url.trim() !== ""
    ? doc.url.trim()
    : "#";
  const summary = typeof doc.summary === "string" ? doc.summary.trim() : "";

  if (title === "") {
    return null;
  }

  if (!["PDF", "Video", "Link"].includes(type)) {
    return null;
  }

  if (!isSafeUrl(url)) {
    return null;
  }

  const uniqueTags = new Map();
  (Array.isArray(doc.tags) ? doc.tags : []).forEach((tag) => {
    if (typeof tag !== "string") {
      return;
    }

    const trimmedTag = tag.trim();

    if (trimmedTag !== "") {
      const normalizedTag = trimmedTag.toLocaleLowerCase("vi");

      if (!uniqueTags.has(normalizedTag)) {
        uniqueTags.set(normalizedTag, trimmedTag);
      }
    }
  });

  const documents = getDocuments();
  let highestDocumentId = 0;

  documents.forEach((document) => {
    const match = /^doc-(\d+)$/.exec(document.id);

    if (match) {
      highestDocumentId = Math.max(highestDocumentId, Number(match[1]));
    }
  });

  const newDocument = {
    id: `doc-${highestDocumentId + 1}`,
    title,
    type,
    tags: Array.from(uniqueTags.values()),
    views: 0,
    createdAt: getTodayString(),
    url,
    summary,
    notes: []
  };

  documents.push(newDocument);

  if (!saveDocuments(documents)) {
    return null;
  }

  return newDocument;
}

// Tăng số lượt xem của tài liệu và lưu ngay khi tìm thấy tài liệu.
function increaseViews(id) {
  if (typeof id !== "string") {
    return false;
  }

  const documents = getDocuments();
  const document = documents.find((item) => item.id === id);

  if (!document) {
    return false;
  }

  document.views = (Number(document.views) || 0) + 1;
  return saveDocuments(documents);
}
