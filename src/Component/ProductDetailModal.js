import React from 'react';
import { X, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const ProductDetailModal = ({ product, onClose }) => {
    const { addToCart } = useCart();

    if (!product) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
                
                {/* Close Button Mobile */}
                <button    
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 md:hidden"
                >
                    <X size={20} />
                </button>

                {/* Left: Images */}
                <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-50 flex flex-col items-center justify-center">
                    <img 
                        src={product.thumbnail} 
                        alt={product.title} 
                        className="max-h-[300px] md:max-h-[400px] object-contain mix-blend-multiply" 
                    />
                    <div className="flex gap-2 mt-6 overflow-x-auto w-full px-2">
                        {product.images?.slice(0,4).map((img, idx) => (
                            <img key={idx} src={img} className="w-16 h-16 object-cover rounded border border-gray-200 bg-white" alt="" />
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
                    <div className="flex justify-between items-start">
                         <div>
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{product.category}</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-2">{product.title}</h2>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span className="ml-1 text-sm font-medium text-gray-700">{product.rating}</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <span className="text-sm text-green-600">{product.stock} in stock</span>
                            </div>
                         </div>
                         <button onClick={onClose} className="hidden md:block text-gray-400 hover:text-gray-600">
                             <X size={24} />
                         </button>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                        {product.description}
                    </p>

                    <div className="mt-auto border-t border-gray-100 pt-6">
                        <div className="flex items-end gap-3 mb-6">
                             <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                             {product.discountPercentage > 0 && (
                                <span className="text-sm text-red-500 bg-red-50 px-2 py-1 rounded font-bold">
                                    {Math.round(product.discountPercentage)}% OFF
                                </span>
                             )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => addToCart(product)}
                                className="col-span-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-blue-200"
                            >
                                <ShoppingCart size={20} className="mr-2" />
                                Add to Cart
                            </button>
                            <button 
                                onClick={onClose}
                                className="col-span-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-xl font-bold transition-colors"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
