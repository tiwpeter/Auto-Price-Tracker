import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductListViewModel } from "feature/hooks/ViewModel";
import { Product } from "feature/types";

const ProductCard: React.FC = () => {
  const [, update] = useState({});
  const forceUpdate = () => update({}); // ให้ React re-render

  const vm = React.useMemo(() => new ProductListViewModel(), []);

  useEffect(() => {
    const load = async () => {
      await vm.loadProducts();
      forceUpdate();
    };
    load();
  }, [vm]);

  if (vm.loading) return <p>Loading products...</p>;
  if (vm.error) return <p className="text-red-500">{vm.error}</p>;

  return (
    <div className="flex flex-wrap gap-6">
      {vm.products.map((product: Product) => (
        <Link
          to={`/productdetail/${product.id}`}
          key={product.id}
          className="product-card flex flex-col gap-2 p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
        >
          <div className="product-card_img-container w-full h-[200px] flex items-center justify-center">
            <img
              src={product.img_url}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="product-title text-lg font-semibold truncate">
              {product.title}
            </h3>
            <p className="text-primary text-base font-bold">{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
