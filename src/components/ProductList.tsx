import React, { useState, useMemo, useRef } from 'react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';
import { Search, ArrowUpDown, Download, GripVertical } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

type SortField = 'name' | 'price' | 'date';
type SortDirection = 'asc' | 'desc';

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  const { reorderProducts, exportProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [bestsellerFilter, setBestsellerFilter] = useState<boolean | null>(null);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isManualSortMode, setIsManualSortMode] = useState(false);
  
  const draggedItemRef = useRef<HTMLDivElement | null>(null);
  const dragOverItemRef = useRef<number | null>(null);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(product => product.category));
    return Array.from(uniqueCategories);
  }, [products]);

  // Handle sort toggle
  const handleSort = (field: SortField) => {
    if (isManualSortMode) {
      setIsManualSortMode(false);
    }
    
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // If in manual sort mode, just filter without sorting
    const filtered = products.filter(product => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productid.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
      
      // Bestseller filter
      const matchesBestseller = bestsellerFilter === null || product.bestseller === bestsellerFilter;
      
      return matchesSearch && matchesCategory && matchesBestseller;
    });
    
    if (isManualSortMode) {
      return filtered;
    }
    
    // Sort by selected field
    return filtered.sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'price') {
        return sortDirection === 'asc' 
          ? a.price - b.price
          : b.price - a.price;
      } else {
        return sortDirection === 'asc' 
          ? a.date - b.date
          : b.date - a.date;
      }
    });
  }, [products, searchTerm, categoryFilter, bestsellerFilter, sortField, sortDirection, isManualSortMode]);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setIsDragging(true);
    setDraggedIndex(index);
    draggedItemRef.current = e.currentTarget;
    e.currentTarget.classList.add('opacity-50');
    
    // Required for Firefox
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    dragOverItemRef.current = index;
    
    // Add visual indicator for drop target
    const items = document.querySelectorAll('.product-card-container');
    items.forEach(item => item.classList.remove('border-indigo-500', 'border-2'));
    
    if (draggedIndex !== index) {
      e.currentTarget.classList.add('border-indigo-500', 'border-2');
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.classList.remove('opacity-50');
    
    // Remove all visual indicators
    const items = document.querySelectorAll('.product-card-container');
    items.forEach(item => item.classList.remove('border-indigo-500', 'border-2'));
    
    // If we have valid indices, reorder the products
    if (draggedIndex !== null && dragOverItemRef.current !== null && draggedIndex !== dragOverItemRef.current) {
      const reordered = [...filteredProducts];
      const [movedItem] = reordered.splice(draggedIndex, 1);
      reordered.splice(dragOverItemRef.current, 0, movedItem);
      
      // Update the products in context
      reorderProducts(reordered);
    }
    
    setDraggedIndex(null);
    dragOverItemRef.current = null;
  };

  const toggleManualSortMode = () => {
    setIsManualSortMode(!isManualSortMode);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          {/* Category filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Bestseller filter */}
          <div>
            <select
              value={bestsellerFilter === null ? '' : bestsellerFilter.toString()}
              onChange={(e) => {
                const value = e.target.value;
                setBestsellerFilter(value === '' ? null : value === 'true');
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Products</option>
              <option value="true">Bestsellers Only</option>
              <option value="false">Non-Bestsellers</option>
            </select>
          </div>
        </div>
        
        {/* Sort buttons and actions */}
        <div className="mt-4 flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap space-x-2 mb-2 sm:mb-0">
            <button
              onClick={() => handleSort('name')}
              className={`flex items-center space-x-1 px-3 py-1 rounded ${
                sortField === 'name' && !isManualSortMode ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
              }`}
            >
              <span>Name</span>
              {sortField === 'name' && !isManualSortMode && (
                <ArrowUpDown size={16} className={sortDirection === 'asc' ? 'rotate-180' : ''} />
              )}
            </button>
            
            <button
              onClick={() => handleSort('price')}
              className={`flex items-center space-x-1 px-3 py-1 rounded ${
                sortField === 'price' && !isManualSortMode ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
              }`}
            >
              <span>Price</span>
              {sortField === 'price' && !isManualSortMode && (
                <ArrowUpDown size={16} className={sortDirection === 'asc' ? 'rotate-180' : ''} />
              )}
            </button>
            
            <button
              onClick={() => handleSort('date')}
              className={`flex items-center space-x-1 px-3 py-1 rounded ${
                sortField === 'date' && !isManualSortMode ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
              }`}
            >
              <span>Date</span>
              {sortField === 'date' && !isManualSortMode && (
                <ArrowUpDown size={16} className={sortDirection === 'asc' ? 'rotate-180' : ''} />
              )}
            </button>
            
            <button
              onClick={toggleManualSortMode}
              className={`flex items-center space-x-1 px-3 py-1 rounded ${
                isManualSortMode ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
              }`}
            >
              <GripVertical size={16} className="mr-1" />
              <span>Manual Sort</span>
            </button>
          </div>
          
          <button
            onClick={exportProducts}
            className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
          >
            <Download size={16} />
            <span>Export JSON</span>
          </button>
        </div>
        
        {isManualSortMode && (
          <div className="mt-2 p-2 bg-yellow-50 text-sm text-yellow-700 rounded">
            <p>Drag and drop products to reorder them. Your custom order will be saved automatically.</p>
          </div>
        )}
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={`${product._id}-${index}`}
              className={`product-card-container ${isManualSortMode ? 'cursor-move border border-gray-200' : ''}`}
              draggable={isManualSortMode}
              onDragStart={isManualSortMode ? (e) => handleDragStart(e, index) : undefined}
              onDragOver={isManualSortMode ? (e) => handleDragOver(e, index) : undefined}
              onDragEnd={isManualSortMode ? handleDragEnd : undefined}
            >
              {isManualSortMode && (
                <div className="flex justify-center items-center bg-gray-100 py-1 text-gray-500 text-sm">
                  <GripVertical size={16} className="mr-1" />
                  <span>Drag to reorder</span>
                </div>
              )}
              <ProductCard 
                product={product} 
                onDelete={onDelete} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;