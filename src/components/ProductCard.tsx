import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product._id);
    }
  };

  // Ensure price is a number and format it
  const formattedPrice = typeof product.price === 'string' 
    ? parseFloat(product.price).toFixed(2)
    : Number(product.price).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image[0] || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'} 
          alt={product.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.productid}</p>
          </div>
          <div className="text-lg font-bold text-indigo-600">
            ${formattedPrice}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
            {product.category}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {product.subcategory}
          </span>
          {product.bestseller && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Bestseller
            </span>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Link 
            to={`/products/${product._id}`} 
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            View Details
          </Link>
          <div className="flex space-x-2">
            <Link 
              to={`/products/edit/${product._id}`} 
              className="p-1 text-blue-600 hover:text-blue-800"
            >
              <Edit size={18} />
            </Link>
            <button 
              onClick={handleDelete}
              className="p-1 text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;