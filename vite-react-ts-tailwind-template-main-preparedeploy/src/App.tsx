import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Hero';
import DetailPage from './page/DetailPage';
import Test from './component/test';
import MoblieHome from './moblie/Hero';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <ScreenRedirect />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productdetail/:id" element={<DetailPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/mobile" element={<MoblieHome />} />
        </Routes>
      </Router>
    </div>
  );
}

function ScreenRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth <= 640) {
      navigate('/mobile');
    }
  }, [navigate]);

  return null;
}

export default App;
