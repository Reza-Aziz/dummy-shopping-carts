import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, ChevronDown, ArrowUpDown } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minDiscount: '',
    category: '', 
  });
  
  const [sort, setSort] = useState({ sortBy: '', order: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (
              isFilterOpen &&
              dropdownRef.current &&
              !dropdownRef.current.contains(event.target) &&
              buttonRef.current &&
              !buttonRef.current.contains(event.target)
          ) {
              setIsFilterOpen(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch({ query, filters, sort });
    }, 500);
    return () => clearTimeout(handler);
  }, [query, filters, sort, onSearch]);

  const handleInputChange = (e) => {
      setQuery(e.target.value);
  };

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
    <div className="relative w-full max-w-4xl mx-auto mb-10 z-40">
      
      <div className="flex flex-col md:flex-row gap-3 items-stretch shadow-xl shadow-indigo-500/10 bg-white/70 backdrop-blur-xl border border-white/50 p-2 rounded-3xl ring-4 ring-white/30">
        
        <div className="flex-grow flex items-center bg-indigo-50/50 rounded-2xl px-5 border border-transparent focus-within:bg-white focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300">
            <Search className="text-indigo-400 mr-3" size={22} />
            <input
                type="text"
                placeholder="Find something extraordinary..."
                className="w-full bg-transparent outline-none text-gray-800 font-semibold py-4 placeholder-indigo-300"
                value={query}
                onChange={handleInputChange}
            />
        </div>

        <div className="flex items-center gap-2">
            <div className="relative hidden md:block h-full">
                 <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                     <ArrowUpDown size={16} className="text-indigo-400" />
                 </div>
                 <select 
                    onChange={handleSortChange} 
                    className="h-full appearance-none bg-indigo-50/50 hover:bg-white border border-transparent hover:border-indigo-200 rounded-2xl py-3 pl-10 pr-10 text-sm font-bold text-indigo-900 outline-none cursor-pointer transition-all"
                >
                     <option value="">Sort</option>
                     <option value="price-asc">Price: Low to High</option>
                     <option value="price-desc">Price: High to Low</option>
                     <option value="title-asc">Title: A-Z</option>
                 </select>
                 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
            </div>

            <button
                ref={buttonRef}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center justify-center px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 border h-full whitespace-nowrap
                    ${isFilterOpen 
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent shadow-lg shadow-indigo-300' 
                        : 'bg-white text-gray-600 border-indigo-100 hover:border-indigo-300 hover:text-indigo-600'}`}
            >
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
                {(filters.minPrice || filters.minDiscount) && <span className="ml-2 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>}
            </button>
        </div>
      </div>

      {isFilterOpen && (
        <div 
            ref={dropdownRef}
            className="absolute top-full mt-4 left-0 right-0 bg-white/80 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-white/60 p-6 md:p-8 animate-in fade-in slide-in-from-top-6 duration-300 ring-1 ring-black/5"
        >
           <div className="flex flex-col md:flex-row gap-8">
               
               <div className="flex-1 space-y-4">
                    <label className="block text-xs font-extrabold text-indigo-300 uppercase tracking-wider mb-2">Price Range</label>
                    <div className="flex gap-3">
                        <input 
                            type="number" 
                            name="minPrice" 
                            placeholder="Min $" 
                            value={filters.minPrice} 
                            onChange={handleFilterChange} 
                            className="w-full px-4 py-3 bg-indigo-50/50 border border-transparent focus:bg-white focus:border-indigo-300 rounded-xl text-sm font-bold outline-none transition-colors"
                        />
                        <input 
                            type="number" 
                            name="maxPrice" 
                            placeholder="Max $" 
                            value={filters.maxPrice} 
                            onChange={handleFilterChange} 
                            className="w-full px-4 py-3 bg-indigo-50/50 border border-transparent focus:bg-white focus:border-indigo-300 rounded-xl text-sm font-bold outline-none transition-colors"
                        />
                    </div>
               </div>

               <div className="flex-1 space-y-4">
                   <label className="block text-xs font-extrabold text-indigo-300 uppercase tracking-wider mb-2">Deals & Offers</label>
                   <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Min</span>
                       <input
                          type="number"
                          name="minDiscount"
                          placeholder="0"
                          value={filters.minDiscount}
                          onChange={handleFilterChange}
                          className="w-full pl-12 pr-12 py-3 bg-indigo-50/50 border border-transparent focus:bg-white focus:border-indigo-300 rounded-xl text-sm font-bold outline-none transition-colors"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 font-bold text-xs">% OFF</span>
                   </div>
               </div>

           </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;