import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductFormData } from '../types/product';
import { mockProducts } from '../data/mockProducts';
import { v4 as uuidv4 } from 'uuid';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: ProductFormData) => Promise<void>;
  updateProduct: (id: string, product: ProductFormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  reorderProducts: (reorderedProducts: Product[]) => void;
  exportProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Get products from localStorage or return mock data
const getLocalProducts = (): Product[] => {
  const localData = localStorage.getItem('products');
  return localData ? JSON.parse(localData) : mockProducts;
};

// Save products to localStorage
const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial data
  useEffect(() => {
    const localProducts = getLocalProducts();
    setProducts(localProducts);
    setLoading(false);
  }, []);

  const addProduct = async (productData: ProductFormData) => {
    const newProduct: Product = {
      _id: uuidv4(),
      ...productData,
      date: Date.now()
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveLocalProducts(updatedProducts);
  };

  const updateProduct = async (id: string, productData: ProductFormData) => {
    const updatedProducts = products.map(product => 
      product._id === id 
        ? { ...product, ...productData } 
        : product
    );
    
    setProducts(updatedProducts);
    saveLocalProducts(updatedProducts);
  };

  const deleteProduct = async (id: string) => {
    const updatedProducts = products.filter(product => product._id !== id);
    setProducts(updatedProducts);
    saveLocalProducts(updatedProducts);
  };

  const getProductById = (id: string) => {
    return products.find(product => product._id === id);
  };

  // Function to reorder products (for drag and drop)
  const reorderProducts = (reorderedProducts: Product[]) => {
    setProducts(reorderedProducts);
    saveLocalProducts(reorderedProducts);
  };

  // Function to export products as JSON
  const exportProducts = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'products.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        loading,
        addProduct, 
        updateProduct, 
        deleteProduct,
        getProductById,
        reorderProducts,
        exportProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};