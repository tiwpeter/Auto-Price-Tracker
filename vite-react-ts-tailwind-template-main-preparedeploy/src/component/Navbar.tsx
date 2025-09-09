import React from 'react';
import historyIcon from '../assets/image/history.png'; // เปลี่ยนเส้นทางไปยังไฟล์รูปภาพเพื่อให้ถูกต้อง

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

export default Navbar;
