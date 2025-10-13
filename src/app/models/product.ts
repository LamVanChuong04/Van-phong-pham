import { ProductImage } from "./product.image";
export interface Product {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
  category_id: number;
  url: string;
  product_images: ProductImage[];
  // Optional UI fields used by listing templates
  original_price?: number;
  discount?: number;
  is_new?: boolean;
  sold_count?: number;
  rating_count?: number;
}

  
  