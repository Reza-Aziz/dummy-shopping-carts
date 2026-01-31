import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minDiscount: '',
  });
  const [sort, setSort] = useState({ sortBy: '', order: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Debounce Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch({ query, filters, sort });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query, filters, sort, onSearch]);

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
      const value = e.target.value;
      if (value === 'price-asc') setSort({ sortBy: 'price', order: 'asc' });
      else if (value === 'price-desc') setSort({ sortBy: 'price', order: 'desc' });
      else if (value === 'title-asc') setSort({ sortBy: 'title', order: 'asc' });
      else setSort({ sortBy: '', order: '' });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-6 z-40">
      <div className="flex items-center bg-white rounded-lg shadow-md border border-gray-200 p-1">
        
        {/* Search Input */}
        <div className="flex-grow flex items-center px-3">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none text-gray-700 py-2"
                value={query}
                onChange={handleInputChange}
            />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 mx-2"></div>

        {/* Sort Dropdown */}
        <div className="hidden sm:flex items-center mx-2 text-sm text-gray-600">
             <ArrowUpDown size={16} className="mr-1" />
             <select onChange={handleSortChange} className="bg-transparent outline-none cursor-pointer hover:text-blue-600">
                 <option value="">Sort By</option>
                 <option value="price-asc">Price: Low to High</option>
                 <option value="price-desc">Price: High to Low</option>
                 <option value="title-asc">Title: A-Z</option>
             </select>
        </div>

        {/* Filter Toggle */}
        <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors ml-2
                ${isFilterOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        >
            <SlidersHorizontal size={18} className="mr-2" />
            <span className="hidden sm:inline">Filters</span>
            {isFilterOpen ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </button>

      </div>

        {/* Dropdown Content */}
      {isFilterOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-5 z-50">
           {/* Mobile Sort */}
           <div className="sm:hidden mb-4 border-b pb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-2">Sort By</label>
              <select onChange={handleSortChange} className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm">
                 <option value="">Default</option>
                 <option value="price-asc">Price: Low to High</option>
                 <option value="price-desc">Price: High to Low</option>
                 <option value="title-asc">Title: A-Z</option>
             </select>
           </div>
           
           {/* Filters */}
            <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Price Range</label>
              <div className="flex gap-2">
                <input type="number" name="minPrice" placeholder="Min" value={filters.minPrice} onChange={handleFilterChange} className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm"/>
                <input type="number" name="maxPrice" placeholder="Max" value={filters.maxPrice} onChange={handleFilterChange} className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm"/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;