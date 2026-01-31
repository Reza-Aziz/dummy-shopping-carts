import React from 'react';
import { useCart } from '../Context/CartContext';
import { Trash2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Carts = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       <div className="bg-white shadow">
         <div className="container mx-auto px-4 py-4 flex items-center">
            <Link to="/" className="text-gray-500 hover:text-gray-800 flex items-center mr-4">
                <ArrowLeft size={20} className="mr-1" />
                Back
            </Link>
            <h1 className="text-xl font-bold">Your Shopping Cart</h1>
         </div>
       </div>

       <div className="container mx-auto px-4 py-8 flex-grow">
          {cartItems.length === 0 ? (
              <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-300 mb-4">Cart is Empty</h2>
                  <Link to="/" className="text-blue-600 hover:underline">Start Shopping</Link>
              </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
                                <img src={item.thumbnail} alt={item.title} className="max-w-full max-h-full object-contain" />
                            </div>
                            
                            <div className="flex-grow">
                                <h3 className="font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                                <p className="text-gray-500 text-sm mb-2">${item.price}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-semibold w-6 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="min-w-[80px] text-right">
                                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>

                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                        <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                        <div className="space-y-2 mb-4 border-b pb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
          )}
       </div>
    </div>
  );
};

export default Carts;
