const STORAGE_KEY = "pkb_documents";

// Đọc dữ liệu đã lưu, khôi phục dữ liệu mẫu và chuẩn hóa schema.
function getDocuments() {
  const sampleDocuments = [
    {
      id: "doc-1",
      title: "Tóm tắt HTML và CSS căn bản",
      type: "PDF",
      tags: ["HTML", "CSS", "Cơ bản"],
      views: 42,
      createdAt: "2026-11-20",
      url: "#",
      summary: "Tài liệu tham khảo nhanh về cấu trúc HTML và các quy tắc CSS nền tảng.",
      notes: [
        {
          id: "note-1",
          text: "Ôn lại semantic HTML trước khi bắt đầu dựng trang.",
          createdAt: "2026-11-21"
        },
        {
          id: "note-2",
          text: "Thử áp dụng Flexbox cho thanh điều hướng.",
          createdAt: "2026-11-22"
        }
      ]
    },
    {
      id: "doc-2",
      title: "Học Flexbox qua ví dụ",
      type: "Video",
      tags: ["CSS", "Flexbox", "Bố cục"],
      views: 31,
      createdAt: "2026-11-21",
      url: "https://www.youtube.com/",
      summary: "Video minh họa cách căn chỉnh và sắp xếp thành phần với Flexbox.",
      notes: []
    },
    {
      id: "doc-3",
      title: "Tài liệu tham khảo JavaScript",
      type: "Link",
      tags: ["JavaScript", "DOM", "Tham khảo"],
      views: 18,
      createdAt: "2026-11-22",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      summary: "Trang tra cứu cú pháp và tính năng JavaScript trên MDN.",
      notes: []
    },
    {
      id: "doc-4",
      title: "Nguyên tắc thiết kế giao diện dễ truy cập",
      type: "PDF",
      tags: ["UI", "Accessibility", "Thiết kế"],
      views: 9,
      createdAt: "2026-11-24",
      url: "#",
      summary: "Ghi nhớ tương phản, nhãn biểu mẫu và thao tác bằng bàn phím.",
      notes: []
    },
    {
      id: "doc-5",
      title: "Hướng dẫn CSS Grid",
      type: "Link",
      tags: ["CSS", "Grid", "Bố cục"],
      views: 3,
      createdAt: "2026-11-25",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
      summary: "Tài liệu nhập môn về bố cục hai chiều với CSS Grid.",
      notes: []
    }
  ];

  let storedValue;

  try {
    storedValue = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("Không thể đọc dữ liệu từ localStorage.", error);
    return sampleDocuments;
  }

  if (storedValue === null || storedValue.trim() === "") {
    saveDocuments(sampleDocuments);
    return sampleDocuments;
  }

  let storedDocuments;

  try {
    storedDocuments = JSON.parse(storedValue);
  } catch (error) {
    console.warn("Dữ liệu localStorage không hợp lệ; đang nạp lại dữ liệu mẫu.", error);
    saveDocuments(sampleDocuments);
    return sampleDocuments;
  }

  if (!Array.isArray(storedDocuments) || storedDocuments.length === 0) {
    console.warn("Dữ liệu tài liệu rỗng hoặc sai cấu trúc; đang nạp lại dữ liệu mẫu.");
    saveDocuments(sampleDocuments);
    return sampleDocuments;
  }

  const hasValidDocuments = storedDocuments.every((document) => {
    return document !== null
      && typeof document === "object"
      && !Array.isArray(document)
      && typeof document.id === "string"
      && /^doc-\d+$/.test(document.id)
      && typeof document.title === "string"
      && document.title.trim() !== ""
      && ["PDF", "Video", "Link"].includes(document.type)
      && Number.isInteger(document.views)
      && document.views >= 0
      && typeof document.createdAt === "string"
      && /^\d{4}-\d{2}-\d{2}$/.test(document.createdAt)
      && isSafeUrl(document.url)
      && typeof document.summary === "string";
  });

  if (!hasValidDocuments) {
    console.warn("Schema tài liệu không hợp lệ; đang nạp lại dữ liệu mẫu.");
    saveDocuments(sampleDocuments);
    return sampleDocuments;
  }

  const normalizedDocuments = storedDocuments.map((document) => {
    const tags = Array.isArray(document.tags)
      ? document.tags.filter((tag) => typeof tag === "string")
      : [];
    const notes = Array.isArray(document.notes)
      ? document.notes
        .filter((note) => {
          return note !== null
            && typeof note === "object"
            && !Array.isArray(note)
            && typeof note.id === "string"
            && /^note-\d+$/.test(note.id)
            && typeof note.text === "string"
            && note.text.trim() !== ""
            && typeof note.createdAt === "string"
            && /^\d{4}-\d{2}-\d{2}$/.test(note.createdAt);
        })
        .map((note) => ({
          id: note.id,
          text: note.text,
          createdAt: note.createdAt
        }))
      : [];

    return {
      id: document.id,
      title: document.title,
      type: document.type,
      tags,
      views: document.views,
      createdAt: document.createdAt,
      url: document.url,
      summary: document.summary,
      notes
    };
  });

  if (JSON.stringify(normalizedDocuments) !== JSON.stringify(storedDocuments)) {
    saveDocuments(normalizedDocuments);
  }

  return normalizedDocuments;
}

// Lưu mảng tài liệu và báo rõ nếu trình duyệt từ chối thao tác.
function saveDocuments(docs) {
  if (!Array.isArray(docs)) {
    console.error("Không thể lưu tài liệu: dữ liệu đầu vào phải là một mảng.");
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
    return true;
  } catch (error) {
    console.error("Không thể lưu dữ liệu vào localStorage.", error);
    return false;
  }
}

// Chỉ chấp nhận liên kết nội bộ dạng # hoặc URL HTTP(S).
function isSafeUrl(url) {
  return typeof url === "string" && (url === "#" || /^https?:\/\//i.test(url));
}

// Thêm ghi chú hợp lệ vào tài liệu và lưu lại dữ liệu.
function addNote(docId, text) {
  if (typeof docId !== "string" || typeof text !== "string") {
    return null;
  }

  const trimmedText = text.trim();

  if (trimmedText === "" || trimmedText.length > 500) {
    return null;
  }

  const documents = getDocuments();
  const document = documents.find((item) => item.id === docId);

  if (!document) {
    return null;
  }

  let highestNoteId = 0;

  document.notes.forEach((note) => {
    const match = /^note-(\d+)$/.exec(note.id);

    if (match) {
      highestNoteId = Math.max(highestNoteId, Number(match[1]));
    }
  });

  const currentDate = new Date();
  const createdAt = [
    currentDate.getFullYear(),
    String(currentDate.getMonth() + 1).padStart(2, "0"),
    String(currentDate.getDate()).padStart(2, "0")
  ].join("-");
  const newNote = {
    id: `note-${highestNoteId + 1}`,
    text: trimmedText,
    createdAt
  };

  document.notes.push(newNote);

  if (!saveDocuments(documents)) {
    return null;
  }

  return newNote;
}

// Xóa ghi chú theo ID và chỉ báo thành công nếu lưu được thay đổi.
function deleteNote(docId, noteId) {
  if (typeof docId !== "string" || typeof noteId !== "string") {
    return false;
  }

  const documents = getDocuments();
  const document = documents.find((item) => item.id === docId);

  if (!document) {
    return false;
  }

  const noteIndex = document.notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return false;
  }

  document.notes.splice(noteIndex, 1);
  return saveDocuments(documents);
}
