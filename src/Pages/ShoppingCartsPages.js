import React, { useState } from 'react';
import Header from '../Component/Header';
import SearchBar from '../Component/SearchBar';
import ProductList from '../Component/ProductList';

const ShoppingCartsPages = () => {
    // State to hold search query and filters
    const [searchState, setSearchState] = useState({ 
        query: '', 
        filters: {} 
    });

    const handleSearch = ({ query, filters }) => {
        setSearchState({ query, filters });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                {/* Hero / Search Section */}
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Discover Amazing Products
                    </h1>
                    <p className="text-gray-500 mb-8 max-w-xl">
                        Search for your favorite items using our smart filter system below.
                    </p>
                    
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* Product Section */}
                <div>
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            {searchState.query ? `Results for "${searchState.query}"` : 'Recommended For You'}
                        </h2>
                     </div>
                     
                     <ProductList 
                        searchQuery={searchState.query} 
                        filters={searchState.filters} 
                     /> 
                </div>
            </main>
        </div>
    );
}

export default ShoppingCartsPages;