import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const ProductItem = ({ product, onOpenModal }) => {
  // onOpenModal is passed from parent instead of using internal navigation
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
     e.stopPropagation();
     addToCart(product);
     // Optional: Toast notification here
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 group relative">
      
      <div className="relative w-full h-48 p-4 flex items-center justify-center overflow-hidden bg-gray-50 rounded-t-xl cursor-pointer" onClick={() => onOpenModal(product)}>
        <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 mix-blend-multiply" 
        />
        {product.discountPercentage > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                -{Math.round(product.discountPercentage)}%
            </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 min-h-[40px] cursor-pointer hover:text-blue-600" onClick={() => onOpenModal(product)}>
            {product.title}
        </h3>
        
        <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                <span className="text-xs text-green-600 font-medium">Stock: {product.stock}</span>
            </div>
            
            <div className="flex gap-2">
                 <button 
                    onClick={() => onOpenModal(product)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    <Eye size={18} />
                </button>
                <button 
                    onClick={handleAddToCart}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-blue-200 hover:shadow-md transition-all active:scale-95"
                >
                    <ShoppingCart size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;