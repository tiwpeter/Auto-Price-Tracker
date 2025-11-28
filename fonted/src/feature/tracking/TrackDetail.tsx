import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import redHeartSvg from "../../assets/icon/red-heart.svg";
import bookmark from "../../assets/icon/bookmark.svg";
import share from "../../assets/icon/share.svg";
import star from "../../assets/icon/star.svg";
import comment from "../../assets/icon/comment.svg";

import { DetailPageViewModel } from "feature/hooks/ViewModel";
import { Product } from "feature/types";

import "./TrackDetail.css";
import Modalmail from "feature/components/ModalMail";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [vm] = useState(new DetailPageViewModel());

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await vm.loadProduct(id!);

      setProduct(vm.product);
      setError(vm.error);
      setLoading(vm.loading);
    };

    load();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">❌ {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        {/* Left Section: Image */}
        <div className="product-image">
          <img
            src={product.img_url}
            alt={product.title}
            className="mx-auto"
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              {/* Product Title */}
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>

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
                  <p className="text-base font-semibold text-[#D46F77]">
                    {product.hearts}
                  </p>
                </div>

                <button type="button" className="p-2 bg-white-200 rounded-10">
                  <img src={bookmark} alt="bookmark" width={20} height={20} />
                </button>

                <button type="button" className="p-2 bg-white-200 rounded-10">
                  <img src={share} alt="share" width={20} height={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Price Info */}
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.price}
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-3">
              <div className="flex gap-3">
                <div className="product-stars flex items-center gap-1">
                  <img src={star} alt="star" width={16} height={16} />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.rating}
                  </p>
                </div>

                <div className="product-reviews flex items-center gap-1">
                  <img src={comment} alt="comment" width={16} height={16} />
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviews}+
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">
                  {product.recommendation}
                </span>{" "}
                of buyers have recommended this
              </p>
            </div>
          </div>
          <Modalmail />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
