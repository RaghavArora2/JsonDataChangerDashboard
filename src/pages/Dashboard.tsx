import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import { Package } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { products, loading, deleteProduct } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Package className="mr-2" size={24} />
          Product Dashboard
        </h1>
        <div className="text-sm text-gray-600">
          Total Products: <span className="font-semibold">{products.length}</span>
        </div>
      </div>

      <ProductList products={products} onDelete={deleteProduct} />
    </div>
  );
};

export default Dashboard;