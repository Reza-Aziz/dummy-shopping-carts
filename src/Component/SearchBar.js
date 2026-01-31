import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minDiscount: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Debounce Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      // Trigger search with current query and filters
      onSearch({ query, filters });
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [query, filters, onSearch]);

  // Handle outside click to close filter dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchClick = () => {
    onSearch({ query, filters });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        onSearch({ query, filters });
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6 z-50">
      <div className="flex items-center bg-white rounded-lg shadow-md border border-gray-200">
        {/* Search Input */}
        <div className="flex-grow flex items-center px-4 py-2">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
                type="text"
                placeholder="Search products..."
                className="w-full outline-none text-gray-700 font-medium"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        {/* Filter Toggle */}
        <div className="relative">
            <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center px-4 py-2 text-sm font-semibold transition-colors
                ${isFilterOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
            >
            <SlidersHorizontal size={18} className="mr-2" />
            Filters
            {isFilterOpen ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </button>
        </div>

        {/* Search Button (Explicit) */}
        <button
            onClick={handleSearchClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
            <Search size={20} />
        </button>
      </div>

      {/* Filter Dropdown */}
      {isFilterOpen && (
        <div
            ref={dropdownRef}
            className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-5 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Filter Rules</h4>
          
          <div className="space-y-4">
            {/* Price Range */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Price Range ($)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Discount */}
            <div>
               <label className="block text-xs font-semibold text-gray-500 mb-1">Min Discount Percentage (%)</label>
               <input
                  type="number"
                  name="minDiscount"
                  placeholder="e.g. 10"
                  value={filters.minDiscount}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
            </div>
          </div>
          
           {/* Quick Stats or Info (Optional) */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-center text-gray-400">
                    Press Enter or type to apply filters automatically.
                </p>
            </div>

        </div>
      )}
    </div>
  );
};

export default SearchBar;