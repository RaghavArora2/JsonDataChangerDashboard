import { Product } from '../types/product';
import { productData } from './productData';

// Use the imported product data instead of the mock data
export const mockProducts: Product[] = productData.length > 0 ? productData : [
  {
    _id: "1",
    name: "Sample Product",
    description: "This is a sample product",
    price: 29.99,
    image: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    category: "electronics",
    subcategory: "Audio",
    sizes: [],
    bestseller: true,
    date: Date.now(),
    productid: "SAMPLE-001"
  }
];