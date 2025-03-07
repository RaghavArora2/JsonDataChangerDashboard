import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Package size={24} />
          <span>Product Manager</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-indigo-200 transition-colors">
            Dashboard
          </Link>
          <Link to="/products/new" className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition-colors">
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;