import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="pb-12">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/products/new" element={<CreateProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;