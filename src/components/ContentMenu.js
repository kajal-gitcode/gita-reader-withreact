import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/** How many verses each chapter has */
const VERSE_COUNT = {
  1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28, 9: 34,
  10: 42, 11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78,
};

const CHAPTERS = Array.from({ length: 18 }, (_, i) => i + 1);

export default function ContentMegaMenu({ open, onClose, anchorRef }) {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const [selectedChapter, setSelectedChapter] = useState(1);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!panelRef.current) return;
      if (
        !panelRef.current.contains(e.target) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  const verseTotal = VERSE_COUNT[selectedChapter] ?? 0;

  const goToVerse = (v) => {
    onClose();
    navigate(`/chapter/${selectedChapter}/verse/${v}`);
  };

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 z-40 bg-black/20" />

      {/* panel */}
      <div
        ref={panelRef}
        className="
          absolute z-50 mt-2
          left-20 top-full
          w-[860px] max-w-[95vw]
          rounded-2xl border bg-white shadow-xl
          overflow-hidden
        "
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left: Chapters (two columns on desktop, scroll if long) */}
          <div className="md:w-1/2 p-4 md:p-6 border-b md:border-b-0 md:border-r bg-white">
            <h3 className="text-sm font-semibold text-orange-700 mb-3">
              Chapters
            </h3>

            <div
              className="
                grid grid-cols-2 gap-1
                md:max-h-[380px] md:overflow-auto
              "
            >
              {CHAPTERS.map((ch) => {
                const active = ch === selectedChapter;
                return (
                  <button
                    key={ch}
                    onClick={() => setSelectedChapter(ch)}
                    className={[
                      "text-left px-3 py-2 rounded-lg transition",
                      active
                        ? "bg-orange-100 text-orange-700 font-semibold"
                        : "hover:bg-gray-100",
                    ].join(" ")}
                  >
                    Chapter {ch}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Verse grid */}
          <div className="md:w-1/2 p-4 md:p-6 bg-orange-50">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-orange-800">
                Chapter {selectedChapter}
              </h3>
              <div className="space-x-2">
                <button
                  onClick={() =>
                    setSelectedChapter((c) => Math.max(1, c - 1))
                  }
                  className="px-2 py-1 text-sm rounded hover:bg-orange-100"
                >
                  ← Prev
                </button>
                <button
                  onClick={() =>
                    setSelectedChapter((c) => Math.min(18, c + 1))
                  }
                  className="px-2 py-1 text-sm rounded hover:bg-orange-100"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Verse buttons grid (responsive) */}
            <div
              className="
                grid gap-2
                grid-cols-8
                xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-7 sm:grid-cols-6 xs:grid-cols-5
              "
            >
              {Array.from({ length: verseTotal }, (_, i) => i + 1).map((v) => (
                <button
                  key={v}
                  onClick={() => goToVerse(v)}
                  className="
                    h-9 rounded border bg-white hover:bg-orange-100
                    text-sm font-medium text-orange-800
                    flex items-center justify-center
                    transition
                  "
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
