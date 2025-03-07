import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import { ProductFormData } from '../types/product';
import { ArrowLeft } from 'lucide-react';

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await addProduct(data);
      navigate('/');
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Product</h1>
          
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <ProductForm 
            onSubmit={handleSubmit} 
            isEditing={false} 
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

export default CreateProduct;