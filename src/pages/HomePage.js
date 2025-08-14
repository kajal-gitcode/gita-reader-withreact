// src/pages/HomePage.js
import { Link } from "react-router-dom";

const chapters = Array.from({ length: 18 }, (_, i) => i + 1);

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📘 Bhagavad Gita Chapters</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {chapters.map((num) => (
          <li key={num}>
            <Link
              to={`/chapter/${num}`}
              className="block bg-blue-100 hover:bg-blue-300 text-center p-4 rounded shadow"
            >
              Chapter {num}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
