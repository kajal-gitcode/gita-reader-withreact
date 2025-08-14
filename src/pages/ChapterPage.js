// src/pages/ChapterPage.js
import { Link, useParams } from "react-router-dom";
import data from "../data/verse.json";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const verses = data.filter((v) => v.chapter_number === parseInt(chapterId));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Chapter {chapterId} Verses</h2>
      <ul className="space-y-2">
        {verses.map((v) => (
          <li key={v.id}>
            <Link
              to={`/chapter/${chapterId}/verse/${v.verse_number}`}
              className="block p-3 bg-gray-100 hover:bg-gray-300 rounded shadow"
            >
              Verse {v.verse_number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
