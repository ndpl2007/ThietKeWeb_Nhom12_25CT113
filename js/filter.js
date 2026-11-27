// Lọc tài liệu kết hợp từ khóa, định dạng và tag mà không sửa mảng gốc.
function filterDocuments(docs, keyword, type, tag) {
  const normalizeText = (value) => {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .toLocaleLowerCase("vi")
      .trim();
  };
  const normalizedKeyword = normalizeText(keyword || "");
  const normalizedType = typeof type === "string" ? type.trim() : "ALL";
  const normalizedTag = typeof tag === "string"
    ? tag.trim().toLocaleLowerCase("vi")
    : "";
  const documents = Array.isArray(docs) ? docs : [];

  return documents.filter((document) => {
    const matchesKeyword = normalizedKeyword === ""
      || normalizeText([
        document.title,
        ...(Array.isArray(document.tags) ? document.tags : []),
        document.summary
      ].join(" ")).includes(normalizedKeyword);
    const matchesType = normalizedType === "" || normalizedType === "ALL"
      || document.type === normalizedType;
    const matchesTag = normalizedTag === ""
      || (Array.isArray(document.tags) && document.tags.some((documentTag) => {
        return typeof documentTag === "string"
          && documentTag.trim().toLocaleLowerCase("vi") === normalizedTag;
      }));

    return matchesKeyword && matchesType && matchesTag;
  });
}

// Trả về bản sao sắp theo lượt xem giảm dần, rồi ngày thêm mới nhất.
function getMostViewed(docs, n) {
  const documents = Array.isArray(docs) ? docs.slice() : [];
  const requestedLimit = Number(n);
  const limit = Number.isFinite(requestedLimit)
    ? Math.max(0, Math.floor(requestedLimit))
    : 0;

  return documents
    .sort((first, second) => {
      const viewDifference = (Number(second.views) || 0) - (Number(first.views) || 0);

      if (viewDifference !== 0) {
        return viewDifference;
      }

      return String(second.createdAt || "").localeCompare(String(first.createdAt || ""));
    })
    .slice(0, limit);
}

// Trả về bản sao sắp theo ngày mới nhất, rồi số ID giảm dần.
function getRecentlyAdded(docs, n) {
  const documents = Array.isArray(docs) ? docs.slice() : [];
  const requestedLimit = Number(n);
  const limit = Number.isFinite(requestedLimit)
    ? Math.max(0, Math.floor(requestedLimit))
    : 0;
  const getDocumentNumber = (id) => {
    const match = /^doc-(\d+)$/.exec(String(id || ""));
    return match ? Number(match[1]) : 0;
  };

  return documents
    .sort((first, second) => {
      const dateDifference = String(second.createdAt || "")
        .localeCompare(String(first.createdAt || ""));

      if (dateDifference !== 0) {
        return dateDifference;
      }

      return getDocumentNumber(second.id) - getDocumentNumber(first.id);
    })
    .slice(0, limit);
}

// Trả về các tag duy nhất, không phân biệt hoa thường và sắp theo tiếng Việt.
function getAllTags(docs) {
  const uniqueTags = new Map();

  (Array.isArray(docs) ? docs : []).forEach((document) => {
    (Array.isArray(document.tags) ? document.tags : []).forEach((tag) => {
      if (typeof tag !== "string") {
        return;
      }

      const trimmedTag = tag.trim();
      const normalizedTag = trimmedTag.toLocaleLowerCase("vi");

      if (trimmedTag !== "" && !uniqueTags.has(normalizedTag)) {
        uniqueTags.set(normalizedTag, trimmedTag);
      }
    });
  });

  return Array.from(uniqueTags.values())
    .sort((first, second) => first.localeCompare(second, "vi", { sensitivity: "base" }));
}
