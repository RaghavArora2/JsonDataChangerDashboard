export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subcategory: string;
  sizes: string[];
  bestseller: boolean;
  date: number;
  productid: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subcategory: string;
  sizes: string[];
  bestseller: boolean;
  productid: string;
}