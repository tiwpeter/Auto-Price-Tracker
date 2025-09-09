import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// กำหนด type ของ Product ชัดเจน
interface Product {
  id: number;
  title: string;
  img_url: string;
}

const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // ✅ mock data (เอามาจาก DetailPage)
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Wireless Bluetooth Headphones',
        img_url: 'https://img.lazcdn.com/g/p/9d0e3285a68e8584e371e06164c1ddef.jpg_720x720q80.jpg_.webp',
      },
      {
        id: 2,
        title: 'Wireless Mouse',
        img_url: 'https://img.lazcdn.com/g/p/86331ac261f4a55a4ed41d49b0107bd8.jpg_200x200q80.jpg',
      },
      {
        id: 3,
        title: 'Smart Watch Series 7',
        img_url: 'https://img.lazcdn.com/g/p/12345ac261f4a55a4ed41d49b0107bd8.jpg_200x200q80.jpg',
      },
    ];

    // จำลองโหลดข้อมูล (0.5 วินาที)
    const timer = setTimeout(() => {
      setProducts(mockProducts);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="product-cards-container">
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        products.map((product) => (
          <Link to={`/productdetail/${product.id}`} key={product.id} className="product-card">
            <div className="product-card_img-container">
              <img src={product.img_url} alt={product.title} width={200} height={200} className="product-card_img" />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="product-title">{product.title}</h3>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ProductCard;
