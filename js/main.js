const state = {
  keyword: "",
  type: "ALL",
  tag: "",
  viewMode: "card"
};

// Đặt tag đang lọc; bấm lại tag hiện tại sẽ bỏ lọc tag.
function setActiveTag(tag) {
  const selectedTag = typeof tag === "string" ? tag.trim() : "";
  const currentTag = state.tag.trim().toLocaleLowerCase("vi");
  const normalizedTag = selectedTag.toLocaleLowerCase("vi");

  state.tag = currentTag !== "" && currentTag === normalizedTag
    ? ""
    : selectedTag;

  refreshUI();
}

// Làm mới danh sách, nội dung nổi bật và bộ lọc tag theo state hiện tại.
function refreshUI() {
  const documents = getDocuments();
  const filteredDocuments = filterDocuments(
    documents,
    state.keyword,
    state.type,
    state.tag
  );
  const featuredLimit = 3;

  renderDocuments(filteredDocuments, state.viewMode);
  renderFeatured(
    getMostViewed(documents, featuredLimit),
    getRecentlyAdded(documents, featuredLimit)
  );
  renderTags(getAllTags(documents));
}

// Nối sự kiện trang chủ và gọi các hook của những phần giao diện.
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const typeFilters = document.getElementById("type-filters");

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.keyword = event.currentTarget.value;
      refreshUI();
    });
  }

  if (typeFilters) {
    typeFilters.addEventListener("click", (event) => {
      const target = event.target;
      const filterButton = target instanceof Element
        ? target.closest("button[data-type]")
        : null;

      if (!filterButton || !typeFilters.contains(filterButton)) {
        return;
      }

      state.type = filterButton.dataset.type;

      typeFilters.querySelectorAll("button[data-type]").forEach((button) => {
        button.setAttribute("aria-pressed", String(button === filterButton));
      });

      refreshUI();
    });
  }

  initViews();
  initTags();
  refreshUI();
});
