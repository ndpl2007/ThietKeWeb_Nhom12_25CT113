// Stub: hiển thị trạng thái tạm cho danh sách tài liệu.
function renderDocuments(list, viewMode) {
  const container = document.getElementById("doc-container");
  const emptyMessage = document.getElementById("empty-message");
  const documents = Array.isArray(list) ? list : [];

  if (!container || !emptyMessage) {
    return;
  }

  emptyMessage.hidden = documents.length > 0;
  container.replaceChildren();

  if (documents.length > 0) {
    const placeholder = document.createElement("p");
    const modeLabel = viewMode === "list" ? "danh sách" : "thẻ";
    placeholder.textContent = `Đang chờ phần hiển thị ${modeLabel} (${documents.length} tài liệu).`;
    container.append(placeholder);
  }
}

// Stub: hiển thị số lượng tài liệu nổi bật.
function renderFeatured(mostViewed, recent) {
  const featuredList = document.getElementById("featured-list");

  if (!featuredList) {
    return;
  }

  const mostViewedCount = Array.isArray(mostViewed) ? mostViewed.length : 0;
  const recentCount = Array.isArray(recent) ? recent.length : 0;
  featuredList.textContent =
    `Đang chờ phần hiển thị nổi bật (${mostViewedCount} xem nhiều, ${recentCount} mới thêm).`;
}

// Đổi chế độ xem, cập nhật trạng thái nút và vẽ lại kết quả hiện tại.
function setViewMode(mode) {
  if (mode !== "card" && mode !== "list") {
    return;
  }

  state.viewMode = mode;

  const cardButton = document.getElementById("btn-card-view");
  const listButton = document.getElementById("btn-list-view");

  if (cardButton) {
    cardButton.setAttribute("aria-pressed", String(mode === "card"));
  }

  if (listButton) {
    listButton.setAttribute("aria-pressed", String(mode === "list"));
  }

  refreshUI();
}

// Gắn sự kiện chuyển Card/List.
function initViews() {
  const cardButton = document.getElementById("btn-card-view");
  const listButton = document.getElementById("btn-list-view");

  if (cardButton) {
    cardButton.addEventListener("click", () => setViewMode("card"));
  }

  if (listButton) {
    listButton.addEventListener("click", () => setViewMode("list"));
  }
}
