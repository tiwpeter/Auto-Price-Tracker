import React, { useState } from 'react';
import axios from 'axios';

const MobileSearchBar = () => {
  return (
    <div className="mt-12">
      <div className="flex justify-center">
        <div className="relative w-full max-w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchBar;
