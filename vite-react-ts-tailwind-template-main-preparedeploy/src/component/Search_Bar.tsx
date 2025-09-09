import React, { useState } from 'react';
import axios from 'axios';

const Searchbar: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [data, setData] = useState<any>(null); // ถ้า API response มีโครงสร้างแน่นอน แนะนำสร้าง interface
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setData(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/track', {
        product_url: url,
      });
      setData(response.data);
      // 👉 ลบ console.log เพื่อแก้ eslint no-console
      // ถ้าจะ debug ควรใช้ toast หรือ UI element แสดงแทน
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
      } else {
        setError('Unexpected error occurred.');
      }
    }
  };

  return (
    <div className="mt-12">
      <form className="flex awfx mr-4" onSubmit={handleSubmit}>
        <div className="w-full flex items-center">
          <div className="mr-auto ml-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="ใส่ลิงก์สินค้าที่ต้องการ"
              className="border border-gray-300 px-4 py-2 rounded w-[300px]"
            />
          </div>
          <div>
            <button type="submit" className="searchbar-btn">
              ค้นหา
            </button>
          </div>
        </div>
      </form>

      {/* ✅ แสดงข้อความ error ถ้ามี */}
      {error && <p className="text-red-500 text-sm mt-4 ml-4">⚠️ {error}</p>}

      {/* ✅ ถ้ามี data */}
      {data && (
        <div className="mt-4 ml-4 p-3 border rounded bg-gray-50">
          <p className="text-green-600 text-sm">✅ ดึงข้อมูลสำเร็จ</p>
          <pre className="text-xs mt-2 bg-white p-2 rounded overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
