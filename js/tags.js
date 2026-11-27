// Stub: vẽ các tag thành nút lọc có thể thao tác bằng bàn phím.
function renderTags(tags) {
  const tagFilters = document.getElementById("tag-filters");

  if (!tagFilters) {
    return;
  }

  const availableTags = Array.isArray(tags) ? tags : [];
  const fragment = document.createDocumentFragment();

  if (availableTags.length === 0) {
    tagFilters.textContent = "Chưa có tag trong thư viện.";
    return;
  }

  availableTags.forEach((tag) => {
    const button = document.createElement("button");
    const isActive = state.tag.trim().toLocaleLowerCase("vi")
      === tag.trim().toLocaleLowerCase("vi");

    button.type = "button";
    button.textContent = tag;
    button.setAttribute("aria-pressed", String(isActive));
    button.addEventListener("click", () => setActiveTag(tag));
    fragment.append(button);
  });

  tagFilters.replaceChildren(fragment);
}

// Stub: vẽ tag ban đầu và ngăn form tải lại trang khi gửi.
function initTags() {
  renderTags(getAllTags(getDocuments()));

  const addForm = document.getElementById("add-form");

  if (!addForm) {
    return;
  }

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formMessage = document.getElementById("form-message");

    if (formMessage) {
      formMessage.textContent = "Chức năng thêm tài liệu đang được hoàn thiện.";
    }

    const formData = new FormData(addForm);
    addDocument({
      title: formData.get("title"),
      type: formData.get("type"),
      tags: String(formData.get("tags") || "").split(","),
      url: formData.get("url"),
      summary: formData.get("summary")
    });
  });
}

// Stub: điểm nối để phần form thêm tài liệu được hoàn thiện sau.
function addDocument(doc) {
  return null;
}

// Stub: điểm nối để phần mở tài liệu tăng lượt xem được hoàn thiện sau.
function increaseViews(id) {
  return false;
}
