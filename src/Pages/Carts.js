import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { Trash2, ArrowLeft, Plus, Minus, ShoppingBag, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Carts = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
      setCheckedOut(true);
      setTimeout(() => {
          clearCart();
          setCheckedOut(false);
          // alert("Checkout Successful! Thank you for your purchase."); 
      }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF] font-sans selection:bg-indigo-200">
       <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-indigo-50 sticky top-0 z-40">
         <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-gray-500 hover:text-indigo-600 font-bold flex items-center transition-colors">
                <ArrowLeft size={18} className="mr-2" />
                Continue Shopping
            </Link>
            <h1 className="text-xl font-black text-gray-900">Your Bag</h1>
         </div>
       </div>

       <div className="container mx-auto px-6 py-10">
          {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div className="bg-indigo-50 p-8 rounded-full mb-6 animate-bounce-slow">
                     <ShoppingBag size={64} className="text-indigo-300" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">Your Bag is Empty</h2>
                  <p className="text-gray-500 mb-8 font-medium">Looks like you haven't found your style yet.</p>
                  <Link to="/" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all">
                      Start Exploring
                  </Link>
              </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col sm:flex-row gap-6 items-center hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-2">
                                <img src={item.thumbnail} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                            </div>
                            
                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                                <p className="text-gray-400 text-sm font-medium mb-3">Unit Price: ${item.price}</p>
                                <div className="inline-flex items-center gap-4 bg-gray-50 rounded-xl p-1">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-2 rounded-lg bg-white shadow text-gray-600 hover:text-blue-600 disabled:opacity-50"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-2 rounded-lg bg-white shadow text-gray-600 hover:text-blue-600"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="min-w-[100px] text-right">
                                <p className="font-black text-2xl text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>

                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-500/5 border border-indigo-50 sticky top-28">
                        <h3 className="text-xl font-black text-gray-900 mb-6">Order Summary</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Estimates Tax</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between text-green-600 font-bold bg-green-50 p-2 rounded-lg">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                        </div>
                        
                        <div className="border-t border-dashed border-gray-200 pt-6 mb-8">
                            <div className="flex justify-between items-end">
                                <span className="text-gray-500 font-bold">Total</span>
                                <span className="text-4xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <button 
                            onClick={handleCheckout}
                            disabled={checkedOut}
                            className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center
                                ${checkedOut 
                                    ? 'bg-green-500 text-white shadow-green-300' 
                                    : 'bg-gray-900 text-white hover:bg-indigo-600 hover:shadow-indigo-300'}`}
                        >
                            {checkedOut ? (
                                <>
                                    <CheckCircle size={20} className="mr-2" />
                                    Processing...
                                </>
                            ) : (
                                "Proceed to Checkout"
                            )}
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
