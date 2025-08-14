import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChapterPage from "./pages/ChapterPage";
import VersePage from "./pages/VersePage";
import Header from "./components/Header"; // ⬅️ Import Header here

function App() {
  return (
    <Router>
      <Header /> {/* ⬅️ Add Header just above the Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chapter/:chapterId" element={<ChapterPage />} />
        <Route path="/chapter/:chapterId/verse/:verseId" element={<VersePage />} />
      </Routes>
    </Router>
  );
}
export default App;



