import React, { useEffect, useState } from 'react';
import { getAllCarts } from '../Api/Dummy';

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
        try {
            const data = await getAllCarts();
            setCarts(data.carts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    
    fetchCarts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading Carts...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Carts</h2>
      <div className="space-y-4">
        {carts.map((cart) => (
            <div key={cart.id} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Cart #{cart.id}</h3>
                <p className="text-gray-600">User ID: {cart.userId}</p>
                <p className="text-gray-600">Total Products: {cart.totalProducts}</p>
                 <p className="text-gray-600">Total Quantity: {cart.totalQuantity}</p>
                <div className="mt-2 text-right">
                    <span className="font-bold text-green-600 text-xl">${cart.total}</span>
                    {cart.discountedTotal && <span className="ml-2 text-sm text-gray-500 line-through">${cart.total}</span>} {/* Just showing structure */}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Carts;
