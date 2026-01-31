import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Header = () => {
  const { cartCount } = useCart();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > 10) {
              setIsScrolled(true);
          } else {
              setIsScrolled(false);
          }

          if (currentScrollY > lastScrollY && currentScrollY > 50) {
              // Scrolling Down
              setIsVisible(false);
          } else {
              // Scrolling Up
              setIsVisible(true);
          }

          setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 transform 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-indigo-50 shadow-sm py-3' 
            : 'bg-transparent border-transparent py-5'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-200 group-hover:shadow-indigo-400 transition-all">
                D
            </div>
            <span className={`text-2xl font-black tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-800'}`}>
                Dump<span className="text-indigo-600">Store.</span>
            </span>
        </Link>
        
        <Link to="/carts" className="relative group">
            <div className={`p-3 rounded-2xl transition-all duration-300
                 ${isScrolled 
                    ? 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100' 
                    : 'bg-white/50 text-gray-800 hover:bg-white shadow-sm'}`}>
                 <ShoppingCart size={22} />
            </div>
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full ring-2 ring-white shadow-md">
                    {cartCount}
                </span>
            )}
        </Link>
      </div>
    </header>
  );
};

export default Header;