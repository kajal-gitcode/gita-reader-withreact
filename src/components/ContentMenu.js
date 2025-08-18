import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VERSE_COUNT = {
  1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28, 9: 34,
  10: 42, 11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78,
};
const CHAPTERS = Array.from({ length: 18 }, (_, i) => i + 1);

export default function FinalGitaMenu() {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const navigate = useNavigate();
  const verseTotal = VERSE_COUNT[selectedChapter];
  const goToVerse = (verse) => {
    navigate(`/chapter/${selectedChapter}/verse/${verse}`);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-2">
      {/* Heading BG X.1 */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-8 text-gray-800 tracking-wide">
        BG {selectedChapter}.1
      </h1>
      {/* Responsive Panel container */}
      <div className="
        rounded-2xl shadow-lg border border-gray-200
        flex flex-col md:flex-row
        overflow-hidden w-full max-w-[98vw] md:max-w-[900px]
      ">
        {/* Chapters list */}
        <div className="
          bg-white py-4 px-2 md:p-6
          w-full md:w-1/3
          border-b md:border-b-0 md:border-r border-gray-200
        ">
          <h2 className="text-orange-700 font-semibold mb-2 md:mb-4 text-sm md:text-base text-center md:text-left">Chapters</h2>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-3 max-h-[240px] md:max-h-[380px] overflow-auto">
            {CHAPTERS.map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChapter(ch)}
                className={`text-left px-2 py-2 md:px-4 md:py-2 rounded-lg transition font-medium text-xs md:text-base
                  ${ch === selectedChapter
                    ? "bg-orange-100 text-orange-700 font-semibold shadow-inner"
                    : "hover:bg-orange-50 text-gray-900"
                }`}
              >
                Chapter {ch}
              </button>
            ))}
          </div>
        </div>
        {/* Verses grid */}
        <div className="bg-orange-50 py-4 px-2 md:p-6 w-full md:w-2/3">
          <div className="flex flex-col md:flex-row justify-between items-center mb-2 md:mb-6">
            <h2 className="text-orange-800 font-semibold text-base md:text-lg mb-2 md:mb-0 text-center md:text-left">
              Chapter {selectedChapter}
            </h2>
            <div className="space-x-2 flex mb-2 md:mb-0">
              <button
                onClick={() => setSelectedChapter((c) => Math.max(1, c - 1))}
                disabled={selectedChapter === 1}
                className="px-2 py-1 rounded hover:bg-orange-200 disabled:opacity-50 disabled:pointer-events-none transition text-xs md:text-sm"
              >
                ← Prev
              </button>
              <button
                onClick={() => setSelectedChapter((c) => Math.min(18, c + 1))}
                disabled={selectedChapter === 18}
                className="px-2 py-1 rounded hover:bg-orange-200 disabled:opacity-50 disabled:pointer-events-none transition text-xs md:text-sm"
              >
                Next →
              </button>
            </div>
          </div>
          {/* Responsive Verses grid buttons */}
          <div className="
            grid gap-2
            grid-cols-5 sm:grid-cols-6 md:grid-cols-8
          ">
            {Array.from({ length: verseTotal }, (_, i) => i + 1).map((verse) => (
              <button
                key={verse}
                onClick={() => goToVerse(verse)}
                className="
                  h-8 w-8 md:h-9 md:w-9 bg-white rounded border border-gray-300
                  hover:bg-orange-100 text-orange-700 font-medium flex items-center justify-center
                  transition text-xs md:text-sm"
              >
                {verse}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
