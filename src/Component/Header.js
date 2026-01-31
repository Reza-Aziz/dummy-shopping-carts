import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Side: Title */}
        <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          Dump Online Shop
        </Link>

        {/* Right Side: Cart Icon */}
        <Link to="/carts" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <ShoppingCart size={24} />
          {/* Optional: Add a badge count if needed later */}
          {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span> */}
        </Link>
      </div>
    </header>
  );
};

export default Header;