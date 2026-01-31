import React, { useState } from 'react';
import Header from '../Component/Header';
import SearchBar from '../Component/SearchBar';
import ProductList from '../Component/ProductList';
import ProductDetailModal from '../Component/ProductDetailModal';

const ShoppingCartsPages = () => {
    const [searchState, setSearchState] = useState({ query: '', filters: {}, sort: {} });
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleSearch = (params) => {
        setSearchState(params);
    };

    return (
        <div className="min-h-screen bg-[#F0F4FF] font-sans selection:bg-indigo-200 selection:text-indigo-900 overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-purple-200/40 to-indigo-200/40 rounded-full blur-3xl opacity-60 mix-blend-multiply filter animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-pink-200/40 to-blue-200/40 rounded-full blur-3xl opacity-60 mix-blend-multiply filter"></div>
            </div>

            <Header />
            
            <main className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col items-center justify-center mb-16 text-center mt-12">
                    <span className="inline-flex items-center gap-2 text-indigo-600 font-extrabold tracking-widest text-[10px] md:text-xs uppercase mb-6 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg shadow-indigo-500/10 border border-white/50">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
                        New Collection 2026
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 mb-6 tracking-tight leading-[1.1] drop-shadow-sm">
                         Find What Moves You.
                    </h1>
                    <p className="text-gray-500/90 mb-12 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
                        Curated quality products with styles that match your vibe. 
                        Start your journey below.
                    </p>
                    
                    <SearchBar onSearch={handleSearch} />
                </div>

                <div className="w-full">
                     <ProductList 
                        searchQuery={searchState.query} 
                        filters={searchState.filters}
                        sort={searchState.sort}
                        onOpenModal={(product) => setSelectedProduct(product)}
                    />
                </div>

                {selectedProduct && (
                    <ProductDetailModal 
                        product={selectedProduct} 
                        onClose={() => setSelectedProduct(null)} 
                    />
                )}
            </main>
        </div>
    );
}

export default ShoppingCartsPages;