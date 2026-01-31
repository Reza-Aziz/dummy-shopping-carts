import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
     e.stopPropagation();
     // TODO: Implement actual add to cart logic
     alert(`Added ${product.title} to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-100 p-4 flex items-center justify-center group overflow-hidden">
        <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" 
        />
        
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                -{Math.round(product.discountPercentage)}%
            </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-800 line-clamp-2 mb-1" title={product.title}>
            {product.title}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
             <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">Stock: {product.stock}</span>
             <span className="flex items-center">⭐ {product.rating}</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto">
            <div className="flex items-baseline mb-3">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                {product.discountPercentage > 0 && (
                     <span className="ml-2 text-sm text-gray-400 line-through">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                     </span>
                )}
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2">
                <button 
                    onClick={handleViewDetail}
                    className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                >
                    <Eye size={16} className="mr-1" />
                    Detail
                </button>
                <button 
                    onClick={handleAddToCart}
                    className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                    <ShoppingCart size={16} className="mr-1" />
                    Add
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;