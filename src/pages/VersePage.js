import { useParams, useNavigate } from "react-router-dom";
import data from "../data/verse.json";

export default function VersePage() {
  const { chapterId, verseId } = useParams();
  const navigate = useNavigate();

  const chapterNum = parseInt(chapterId);
  const verseNum = parseInt(verseId);

  // Find current verse
  const verse = data.find(
    (v) => v.chapter_number === chapterNum && v.verse_number === verseNum
  );

  // Total verses in chapter
  const totalVerses = data.filter((v) => v.chapter_number === chapterNum).length;

  if (!verse) return <p className="text-center mt-10">Verse not found</p>;

  // Navigation
  const goPrevious = () => {
    if (verseNum > 1) {
      navigate(`/chapter/${chapterNum}/verse/${verseNum - 1}`);
    }
  };

  const goNext = () => {
    if (verseNum < totalVerses) {
      navigate(`/chapter/${chapterNum}/verse/${verseNum + 1}`);
    }
  };
    // Format chapter & verse numbers for your audio file names
  const chapterStr = String(chapterNum).padStart(2, "0");
  const verseStr = String(verseNum).padStart(2, "0");
  const audioFile = `/audio/verse_${chapterStr}_${verseStr}_paused.wav`;

  return (
    <div className="flex flex-col items-center p-5 space-y-6 relative">

      {/* Desktop View - Side Arrows */}
      <div className="hidden md:block ">
        <button
          onClick={goPrevious}
          disabled={verseNum === 1}
          className="fixed top-1/2 left-40 flex h-10 items-center justify-center  rounded-full p-2  border bg-white hover:cursor-pointer hover:brightness-90 dark:border-grey-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          ◀
        </button>

        <button
          onClick={goNext}
          disabled={verseNum === totalVerses}
          className="fixed top-1/2 right-40 flex h-10 items-center justify-center  rounded-full p-2  border bg-white hover:cursor-pointer hover:brightness-90 dark:border-grey-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          ▶
        </button>
      </div>

      {/* Mobile View - Bottom Center Arrows */}
      <div className="fixed bottom-60 left-1/2 -translate-x-1/2 bg-white space-x-4 md:hidden">
        <button
          onClick={goPrevious}
          disabled={verseNum === 1}
          className=" rounded-full p-2  border bg-white hover:cursor-pointer hover:brightness-90 dark:border-grey-600 dark:bg-dark-100 dark:hover:bg-dark-bg "
        >
          ◀
        </button>

        <button
          onClick={goNext}
          disabled={verseNum === totalVerses}
          className=" rounded-full p-2  border bg-white hover:cursor-pointer hover:brightness-90 dark:border-grey-600 dark:bg-dark-100 dark:hover:bg-dark-bg
          "
        >
          ▶
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold">
        BG {verse.chapter_number}.{verse.verse_number}
      </h2>

      {/* Sanskrit Verse */}
    <p
        className="text-orange-500 text-center text-xl leading-relaxed font-serif"
        style={{ fontFamily: "'Noto Sans Devanagari', serif" }}
        >
        {verse.text.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>

      {/* Transliteration */}
      <p className="italic text-gray-700 text-center">{verse.transliteration}</p>

      {/* Word meanings */}
      <p className="text-gray-800 text-center max-w-2xl">{verse.word_meanings}</p>

      {/* English translation */}
      {verse.translation && (
        <p className="text-lg text-gray-900 text-center max-w-3xl leading-relaxed">
          {verse.translation}
        </p>
      )}

      {/* Audio Player */}
  <audio
    key={`${chapterNum}-${verseNum}`}
    controls
    className="mt-4"
  >
    <source
      src={`/audio/verse_${String(chapterNum).padStart(2, '0')}_${String(verseNum).padStart(2, '0')}_paused.wav`}
      type="audio/wav"
    />
    Your browser does not support the audio element.
  </audio>
    </div>
  );
}
