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
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />
            
            <main className="container mx-auto px-4 py-8 relative">
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">
                         Shop 'Til You Drop
                    </h1>
                    <SearchBar onSearch={handleSearch} />
                </div>

                <ProductList 
                    searchQuery={searchState.query} 
                    filters={searchState.filters}
                    sort={searchState.sort}
                    onOpenModal={(product) => setSelectedProduct(product)}
                />

                {/* Modal Portal */}
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