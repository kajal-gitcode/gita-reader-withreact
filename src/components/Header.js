// Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContentMenu from "./ContentMenu.js";

export default function Header() {
  const [showContentMenu, setShowContentMenu] = useState(false);

  return (
    <header className="flex items-center gap-6 p-2 bg-white shadow">
      <Link to="/">Home</Link>
      <div className="relative">
        <button
          onClick={() => setShowContentMenu((prev) => !prev)}
          className="hover:underline"
        >
          Content
        </button>

        {showContentMenu && (
          <div className="absolute left-0 mt-2 bg-white shadow-lg rounded p-4 z-50">
            <ContentMenu />
          </div>
        )}
      </div>
      <Link to="/appearance">Appearance</Link>
      <Link to="/source">Source</Link>
      <Link to="/audio">Play Audio</Link>
    </header>
  );
}
