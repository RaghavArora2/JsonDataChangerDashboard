import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, deleteProduct } = useProducts();
  
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Product not found!</strong>
          <span className="block sm:inline"> The product you're looking for doesn't exist or has been removed.</span>
          <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(product._id);
      navigate('/');
    }
  };

  // Format date
  const formattedDate = new Date(product.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
          <ArrowLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {product.image && product.image.length > 0 ? (
              <img 
                src={product.image[0]} 
                alt={product.name} 
                className="w-full h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';
                }}
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          
          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-gray-600">Product ID: {product.productID}</p>
              </div>
              <div className="flex space-x-2">
                <Link 
                  to={`/products/edit/${product._id}`} 
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                >
                  <Edit size={20} />
                </Link>
                <button 
                  onClick={handleDelete}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-2xl font-bold text-indigo-600 mb-4">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Description</h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-700">Category</h2>
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-700">Sub Category</h2>
                  <p className="text-gray-600">{product.subCategory}</p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-700">Added On</h2>
                  <p className="text-gray-600">{formattedDate}</p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-700">Bestseller</h2>
                  <p className="text-gray-600">{product.bestseller ? 'Yes' : 'No'}</p>
                </div>
              </div>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-sm font-semibold text-gray-700">Available Sizes</h2>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.sizes.map(size => (
                      <span 
                        key={size} 
                        className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Additional images */}
        {product.image && product.image.length > 1 && (
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">More Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {product.image.slice(1).map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${product.name} - image ${index + 2}`} 
                  className="h-24 w-full object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=60';
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;