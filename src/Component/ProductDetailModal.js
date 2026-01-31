import React, { useState } from 'react';
import { X, ShoppingCart, Star, CheckCircle } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const ProductDetailModal = ({ product, onClose }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    if (!product) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300"
            onClick={handleBackdropClick}
        >
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 ring-1 ring-black/5 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
                
                <button    
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-all duration-200 backdrop-blur-sm"
                >
                    <X size={24} />
                </button>

                {/* Left: Image */}
                <div className="w-full md:w-1/2 bg-gray-50/80 p-6 md:p-8 flex flex-col items-center justify-center relative group min-h-[250px] md:min-h-[400px]">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-multiply"></div>
                    <img 
                        src={product.thumbnail} 
                        alt={product.title} 
                        className="max-h-[180px] md:max-h-[450px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 z-10" 
                    />
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                         {product.discountPercentage > 0 && (
                            <span className="bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg shadow-red-200 transform -rotate-2">
                                -{Math.round(product.discountPercentage)}% SALE
                            </span>
                         )}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col bg-white">
                    <div className="mb-auto">
                        <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide mb-3 md:mb-4">
                            {product.category}
                        </span>
                        
                        <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-3 md:mb-4 leading-tight">
                            {product.title}
                        </h2>

                        <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 text-sm">
                            <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                                <Star size={16} fill="currentColor" />
                                <span className="ml-1.5 font-bold text-gray-800">{product.rating}</span>
                                <span className="ml-1 text-gray-400">/ 5.0</span>
                            </div>
                            <span className="text-gray-400 font-light">|</span>
                            <span className="text-gray-500 font-medium text-xs md:text-sm">Stock: {product.stock}</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium line-clamp-4 md:line-clamp-none">
                            {product.description}
                        </p>
                    </div>

                    <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100 sticky bottom-0 bg-white md:static">
                         <div className="flex items-end gap-3 mb-6 md:mb-8">
                             <span className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
                                 ${product.price}
                             </span>
                             {product.discountPercentage > 0 && (
                                <span className="text-sm md:text-lg text-gray-400 line-through mb-1 md:mb-2 font-medium">
                                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                </span>
                             )}
                         </div>

                        <button 
                            onClick={handleAddToCart}
                            className={`w-full py-3 md:py-4 px-6 rounded-2xl font-bold flex items-center justify-center transition-all duration-300 transform active:scale-[0.98]
                                ${added 
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                                    : 'bg-gray-900 text-white hover:bg-blue-600 shadow-xl shadow-gray-200 hover:shadow-blue-200'}`}
                        >
                            {added ? (
                                <>
                                    <CheckCircle size={20} className="mr-2" />
                                    Added
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={20} className="mr-2" />
                                    Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
