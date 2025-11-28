// types.ts
export interface Product {
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

// models/ProductFollow.ts
export interface ProductFollow {
  follow_email: string;
  product_id: string | number;
}