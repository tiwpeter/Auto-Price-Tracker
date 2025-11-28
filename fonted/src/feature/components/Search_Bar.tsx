import React, { useState } from "react";
import "./Search_Bar.css";
import { SearchViewModel } from "feature/hooks/ViewModel";

const viewModel = new SearchViewModel();

const Searchbar: React.FC = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    viewModel.setUrl(url);
    const result = await viewModel.searchProduct();

    console.log("Result from viewModel:", result);
  };

  return (
    <div className="mt-12 px-8">
      <form onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="ใส่ลิงก์สินค้าที่ต้องการ"
            className="border border-gray-300 px-4 py-3 rounded-[30px] w-full pr-[140px]"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="submit"
            className="searchbar-btn absolute right-2 top-1/2 -translate-y-1/2"
          >
            ค้นหา
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
