// Tạo đường dẫn trang chi tiết an toàn theo mã tài liệu.
function buildDetailUrl(docId) {
  return `detail.html?id=${encodeURIComponent(String(docId || ""))}`;
}

// Trả về hậu tố định dạng viết thường để gắn class màu sắc.
function getTypeSlug(type) {
  if (type === "PDF") {
    return "pdf";
  }

  if (type === "Video") {
    return "video";
  }

  return "link";
}

// Trả về class nhãn định dạng tương ứng với loại tài liệu.
function getTypeBadgeClass(type) {
  return `doc-item__badge doc-item__badge--${getTypeSlug(type)}`;
}

// Xử lý mở tài liệu: tăng lượt xem đúng 1 lần rồi chuyển tới trang chi tiết.
function handleDocumentOpen(event, docId) {
  if (typeof increaseViews === "function") {
    increaseViews(docId);
  }

  // Cho phép mở tab mới bằng phím bổ trợ mà vẫn tăng lượt xem.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return;
  }

  event.preventDefault();
  window.location.href = buildDetailUrl(docId);
}

// Tạo phần tử <article> cho một tài liệu trong danh sách chính.
function createDocumentCard(doc) {
  const article = document.createElement("article");
  article.className = `doc-item doc-item--${getTypeSlug(doc.type)}`;
  article.dataset.id = doc.id;

  const detailUrl = buildDetailUrl(doc.id);

  // Phần đầu: nhãn định dạng và ngày thêm.
  const header = document.createElement("div");
  header.className = "doc-item__header";

  const badge = document.createElement("span");
  badge.className = getTypeBadgeClass(doc.type);
  badge.textContent = doc.type;

  const dateText = document.createElement("span");
  dateText.className = "doc-item__date";
  dateText.textContent = doc.createdAt;

  header.append(badge, dateText);

  // Phần thân: tiêu đề (liên kết mở chi tiết), mô tả và danh sách tag.
  const body = document.createElement("div");
  body.className = "doc-item__body";

  const titleHeading = document.createElement("h4");
  titleHeading.className = "doc-item__title";

  const titleLink = document.createElement("a");
  titleLink.className = "doc-item__title-link";
  titleLink.href = detailUrl;
  titleLink.textContent = doc.title;
  titleLink.addEventListener("click", (event) => handleDocumentOpen(event, doc.id));
  titleHeading.append(titleLink);
  body.append(titleHeading);

  if (typeof doc.summary === "string" && doc.summary.trim() !== "") {
    const summary = document.createElement("p");
    summary.className = "doc-item__summary";
    summary.textContent = doc.summary;
    body.append(summary);
  }

  const tags = Array.isArray(doc.tags) ? doc.tags : [];

  if (tags.length > 0) {
    const tagList = document.createElement("ul");
    tagList.className = "doc-item__tags";
    tagList.setAttribute("aria-label", "Tag của tài liệu");

    tags.forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.className = "doc-item__tag";
      tagItem.textContent = tag;
      tagList.append(tagItem);
    });

    body.append(tagList);
  }

  // Phần chân: lượt xem, số ghi chú và nút mở chi tiết.
  const footer = document.createElement("div");
  footer.className = "doc-item__footer";

  const meta = document.createElement("div");
  meta.className = "doc-item__meta";

  const viewsText = document.createElement("span");
  viewsText.textContent = `${Number(doc.views) || 0} lượt xem`;
  meta.append(viewsText);

  const noteCount = Array.isArray(doc.notes) ? doc.notes.length : 0;

  if (noteCount > 0) {
    const notesText = document.createElement("span");
    notesText.textContent = `${noteCount} ghi chú`;
    meta.append(notesText);
  }

  const openLink = document.createElement("a");
  openLink.className = "doc-item__action";
  openLink.href = detailUrl;
  openLink.textContent = "Xem chi tiết";
  openLink.setAttribute("aria-label", `Xem chi tiết tài liệu ${doc.title}`);
  openLink.addEventListener("click", (event) => handleDocumentOpen(event, doc.id));

  footer.append(meta, openLink);
  article.append(header, body, footer);

  return article;
}

// Tạo một khung nổi bật ("Xem nhiều nhất" hoặc "Mới thêm").
function createFeaturedPanel(title, items, metaMode) {
  const panel = document.createElement("section");
  const panelTone = metaMode === "views"
    ? "featured-panel--popular"
    : "featured-panel--recent";
  panel.className = `featured-panel ${panelTone}`;

  const header = document.createElement("div");
  header.className = "featured-panel__header";

  const heading = document.createElement("h3");
  heading.className = "featured-panel__title";
  heading.textContent = title;

  const count = document.createElement("span");
  count.className = "featured-panel__count";
  count.textContent = `${items.length} tài liệu`;

  header.append(heading, count);
  panel.append(header);

  if (items.length === 0) {
    const emptyText = document.createElement("p");
    emptyText.className = "featured-panel__empty";
    emptyText.textContent = "Chưa có tài liệu nào.";
    panel.append(emptyText);
    return panel;
  }

  const list = document.createElement("div");
  list.className = "featured-list";

  items.forEach((doc, index) => {
    const item = document.createElement("article");
    item.className = "featured-item";
    item.dataset.id = doc.id;

    const topRow = document.createElement("div");
    topRow.className = "featured-item__top";

    const leadingGroup = document.createElement("div");
    leadingGroup.className = "featured-item__leading";

    const rank = document.createElement("span");
    rank.className = "featured-item__rank";
    rank.textContent = String(index + 1);
    rank.setAttribute("aria-hidden", "true");

    const badge = document.createElement("span");
    badge.className = getTypeBadgeClass(doc.type);
    badge.textContent = doc.type;

    leadingGroup.append(rank, badge);

    const meta = document.createElement("span");
    meta.className = "featured-item__meta";
    meta.textContent = metaMode === "views"
      ? `${Number(doc.views) || 0} lượt xem`
      : `Thêm ngày ${doc.createdAt}`;

    topRow.append(leadingGroup, meta);

    const itemTitle = document.createElement("h4");
    itemTitle.className = "featured-item__title";

    const link = document.createElement("a");
    link.className = "featured-item__link";
    link.href = buildDetailUrl(doc.id);
    link.textContent = doc.title;
    link.addEventListener("click", (event) => handleDocumentOpen(event, doc.id));

    itemTitle.append(link);
    item.append(topRow, itemTitle);
    list.append(item);
  });

  panel.append(list);
  return panel;
}

// Vẽ danh sách tài liệu vào doc-container theo chế độ xem Card hoặc List.
function renderDocuments(list, viewMode) {
  const container = document.getElementById("doc-container");
  const emptyMessage = document.getElementById("empty-message");
  const documents = Array.isArray(list) ? list : [];

  if (!container || !emptyMessage) {
    return;
  }

  const normalizedMode = viewMode === "list" ? "list" : "card";
  container.classList.toggle("doc-view--card", normalizedMode === "card");
  container.classList.toggle("doc-view--list", normalizedMode === "list");

  emptyMessage.hidden = documents.length > 0;

  if (documents.length === 0) {
    container.replaceChildren();
    return;
  }

  const fragment = document.createDocumentFragment();
  documents.forEach((doc) => {
    fragment.append(createDocumentCard(doc));
  });

  container.replaceChildren(fragment);
}

// Vẽ hai mục "Xem nhiều nhất" và "Mới thêm" vào featured-list.
function renderFeatured(mostViewed, recent) {
  const featuredList = document.getElementById("featured-list");

  if (!featuredList) {
    return;
  }

  const mostViewedDocs = Array.isArray(mostViewed) ? mostViewed : [];
  const recentDocs = Array.isArray(recent) ? recent : [];

  const fragment = document.createDocumentFragment();
  fragment.append(
    createFeaturedPanel("Xem nhiều nhất", mostViewedDocs, "views"),
    createFeaturedPanel("Mới thêm", recentDocs, "recent")
  );

  featuredList.replaceChildren(fragment);
}

// Đồng bộ trạng thái nút chuyển đổi Card/List theo chế độ hiện tại.
function updateViewSwitchButtons(mode) {
  const cardButton = document.getElementById("btn-card-view");
  const listButton = document.getElementById("btn-list-view");

  if (cardButton) {
    const isCard = mode === "card";
    cardButton.setAttribute("aria-pressed", String(isCard));
    cardButton.classList.toggle("view-switch__btn--active", isCard);
  }

  if (listButton) {
    const isList = mode === "list";
    listButton.setAttribute("aria-pressed", String(isList));
    listButton.classList.toggle("view-switch__btn--active", isList);
  }
}

// Đổi chế độ xem, cập nhật trạng thái nút và vẽ lại kết quả hiện tại.
function setViewMode(mode) {
  if (mode !== "card" && mode !== "list") {
    return;
  }

  state.viewMode = mode;
  updateViewSwitchButtons(mode);
  refreshUI();
}

// Gắn sự kiện chuyển Card/List khi tải trang.
function initViews() {
  const cardButton = document.getElementById("btn-card-view");
  const listButton = document.getElementById("btn-list-view");

  updateViewSwitchButtons(state.viewMode);

  if (cardButton) {
    cardButton.addEventListener("click", () => setViewMode("card"));
  }

  if (listButton) {
    listButton.addEventListener("click", () => setViewMode("list"));
  }
}
