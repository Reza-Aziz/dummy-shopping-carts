import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleProduct } from '../Api/Dummy';
import { ArrowLeft, ShoppingCart, Star, Share2, Heart } from 'lucide-react';
import Header from './Header'; // Optional: include header if this is a full page view, or just the card.

const ProductCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getSingleProduct(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if(id) fetchDetail();
    }, [id]);

    if(loading) return <div className="flex h-screen items-center justify-center">Loading Detail...</div>;
    if(!product) return <div className="flex h-screen items-center justify-center">Product not found</div>;

    return (
     <div className="min-h-screen bg-gray-50 pb-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
            >
                <ArrowLeft size={20} className="mr-2" />
                Back to Products
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6 md:p-10">
                    
                    {/* Image Gallery Area (Simple) */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
                             <img src={product.thumbnail} alt={product.title} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                             {product.images?.slice(0, 4).map((img, idx) => (
                                 <div key={idx} className="aspect-square border rounded-lg overflow-hidden cursor-pointer hover:border-blue-500">
                                     <img src={img} alt="" className="w-full h-full object-cover" />
                                 </div>
                             ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-3 flex flex-col">
                        <div className="flex justify-between items-start">
                             <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.title}</h1>
                                <p className="text-gray-500 text-sm mb-4">Brand: <span className="font-semibold text-gray-700">{product.brand}</span> • Category: <span className="font-semibold text-gray-700 capitalize">{product.category}</span></p>
                             </div>
                             <div className="flex gap-2">
                                 <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500"><Share2 size={20} /></button>
                                 <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500"><Heart size={20} /></button>
                             </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-lg">
                                <Star className="text-yellow-500 fill-yellow-500 w-5 h-5 mr-1" />
                                <span className="font-bold text-yellow-700">{product.rating}</span>
                            </div>
                            <span className="text-sm text-gray-400">|</span>
                            <span className="text-green-600 font-medium">In Stock: {product.stock} items</span>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-8 border-b pb-8">
                            {product.description}
                        </p>

                        <div className="mt-auto">
                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                                {product.discountPercentage > 0 && (
                                    <>
                                        <span className="text-lg text-gray-400 line-through mb-1">
                                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                        </span>
                                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded font-bold text-sm mb-2">
                                            {Math.round(product.discountPercentage)}% OFF
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    className="flex-1 bg-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-blue-200"
                                    onClick={() => alert('Add to cart clicked')}
                                >
                                    <ShoppingCart className="mr-2" />
                                    Add to Cart
                                </button>
                                <button className="px-8 py-4 border-2 border-gray-200 font-bold rounded-xl hover:border-gray-300 text-gray-700 transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    );
};

export default ProductCard;
