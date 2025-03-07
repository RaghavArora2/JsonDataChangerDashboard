import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import { ProductFormData } from '../types/product';
import { ArrowLeft } from 'lucide-react';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const product = id ? getProductById(id) : undefined;

  const handleSubmit = async (data: ProductFormData) => {
    if (id) {
      try {
        setIsSubmitting(true);
        setError(null);
        await updateProduct(id, data);
        navigate(`/products/${id}`);
      } catch (err) {
        console.error('Error updating product:', err);
        setError('Failed to update product. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Product not found!</strong>
          <span className="block sm:inline"> The product you're trying to edit doesn't exist or has been removed.</span>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 inline-block text-indigo-600 hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate(`/products/${id}`)}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Product Details
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product: {product.name}</h1>
          
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <ProductForm 
            initialData={product} 
            onSubmit={handleSubmit} 
            isEditing={true} 
          />
          
          {isSubmitting && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;