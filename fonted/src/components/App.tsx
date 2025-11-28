import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import historyIcon from "../assets/image/history.png";
import TrackSearch from "feature/tracking/TrackSearch";
import './App.css'
import DetailPage from "feature/tracking/TrackDetail";

// Helper function
export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(" ");
}

// Navbar Component
function Navbar() {
  return (
    <header className="w-full">
      <nav className="px-20 py-4">
        <div className="flex items-center gap-1">
          <img src={historyIcon} alt="History Icon" />
          <p className="nav-logo">
            Price<span className="text-primary">Wise</span>
          </p>
        </div>
      </nav>
    </header>
  );
}

// Main App Component (default export อันเดียวเท่านั้น)
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
                  <Route path="/" element={<TrackSearch />} />
          <Route path="/productdetail/:id" element={<DetailPage />} />

      </Routes>
    </Router>
  );
}
