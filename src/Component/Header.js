import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-gray-900 tracking-tight hover:text-blue-600 transition-colors">
          DumpStore.
        </Link>
        
        <Link to="/carts" className="relative group p-2">
            <div className="bg-gray-100 group-hover:bg-blue-50 p-2 rounded-full transition-colors">
                 <ShoppingCart size={24} className="text-gray-700 group-hover:text-blue-600" />
            </div>
            {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full ring-2 ring-white">
                    {cartCount}
                </span>
            )}
        </Link>
      </div>
    </header>
  );
};

export default Header;