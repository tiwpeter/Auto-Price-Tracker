import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import redHeartSvg from '../assets/icon/red-heart.svg';
import bookmark from '../assets/icon/bookmark.svg';
import share from '../assets/icon/share.svg';
import star from '../assets/icon/star.svg';
import comment from '../assets/icon/comment.svg';
import Modalmail from '../component/Modalmail';

interface Product {
  id: number;
  title: string;
  img_url: string;
  price: string;
  hearts: number;
  bookmark: boolean;
  share: boolean;
  rating: number;
  reviews: number;
  recommendation: string;
  visit_url: string;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Mock data
    const mockData: Product = {
      id: 1,
      title: 'Wireless Bluetooth Headphones',
      img_url: 'https://img.lazcdn.com/g/p/9d0e3285a68e8584e371e06164c1ddef.jpg_720x720q80.jpg_.webp',
      price: '฿1,290',
      hearts: 100,
      bookmark: false,
      share: true,
      rating: 4.8,
      reviews: 125,
      recommendation: '93%',
      visit_url: 'https://www.lazada.co.th/products/wireless-bluetooth-headphones',
    };

    const timer = setTimeout(() => {
      setProduct(mockData);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (error) {
    return <p className="text-red-500">❌ Error: {error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        {/* Left Section: Image */}
        <div className="product-image">
          <img
            src={product.img_url}
            alt={product.title} // ✅ fixed: use expression, not string literal
            className="mx-auto"
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              {/* Product Title */}
              <p className="text-[28px] text-secondary font-semibold">{product.title}</p>

              <a
                href={product.visit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </a>

              {/* Icons */}
              <div className="flex items-center gap-3">
                <div className="product-hearts flex items-center gap-1">
                  <img src={redHeartSvg} alt="heart" width={20} height={20} />
                  <p className="text-base font-semibold text-[#D46F77]">{product.hearts}</p>
                </div>

                <button type="button" className="p-2 bg-white-200 rounded-10" aria-label="Bookmark">
                  <img src={bookmark} alt="bookmark" width={20} height={20} />
                </button>

                <button type="button" className="p-2 bg-white-200 rounded-10" aria-label="Share">
                  <img src={share} alt="share" width={20} height={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Price Info */}
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">{product.price}</p>
            </div>

            <div className="flex flex-col gap-4 mt-3">
              <div className="flex gap-3">
                <div className="product-stars flex items-center gap-1">
                  <img src={star} alt="star" width={16} height={16} />
                  <p className="text-sm text-primary-orange font-semibold">{product.rating}</p>
                </div>

                <div className="product-reviews flex items-center gap-1">
                  <img src={comment} alt="comment" width={16} height={16} />
                  <p className="text-sm text-secondary font-semibold">{product.reviews}+</p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">{product.recommendation}</span> of buyers have
                recommended this
              </p>
            </div>
          </div>

          {/* Email Subscribe Modal */}
          <Modalmail />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
