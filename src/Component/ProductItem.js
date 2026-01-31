import React, { memo } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const ProductItem = memo(({ product, onOpenModal }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
     e.stopPropagation();
     addToCart(product);
  };

  return (
    <div 
        className="bg-white rounded-[2rem] p-4 group relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 border border-transparent hover:border-indigo-100 flex flex-col h-full"
    >
      
      <div 
        className="relative w-full h-64 bg-gray-50 rounded-[1.5rem] overflow-hidden cursor-pointer mb-5" 
        onClick={() => onOpenModal(product)}
      >
         <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/5 transition-colors duration-300 z-10"></div>
         
         <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-full object-contain mix-blend-multiply p-6 transition-transform duration-500 group-hover:scale-110" 
        />
        
        {product.discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm z-20">
                SALE -{Math.round(product.discountPercentage)}%
            </div>
        )}

        <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 flex gap-2">
            <button className="bg-white text-gray-800 p-2.5 rounded-xl shadow-lg hover:text-indigo-600 transition-colors">
                <Eye size={18} />
            </button>
        </div>
      </div>

      <div className="px-2 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
             <div className="flex gap-2">
                 <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-md">
                     {product.category}
                 </span>
                 <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                     Stock: {product.stock}
                 </span>
             </div>
             
             <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                 <span>★</span> {product.rating}
             </div>
        </div>

        <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight cursor-pointer hover:text-indigo-600 transition-colors line-clamp-2" onClick={() => onOpenModal(product)}>
            {product.title}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-dashed border-gray-100">
            <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium line-through decoration-red-300">
                    {product.discountPercentage > 0 ? `$${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}` : ''}
                </span>
                <span className="text-2xl font-black text-gray-900">${product.price}</span>
            </div>
            
            <button 
                onClick={handleAddToCart}
                className="bg-gray-900 hover:bg-indigo-600 text-white p-3 rounded-xl transition-all shadow-lg hover:shadow-indigo-300 active:scale-90"
            >
                <ShoppingCart size={20} />
            </button>
        </div>
      </div>
    </div>
  );
});

export default ProductItem;