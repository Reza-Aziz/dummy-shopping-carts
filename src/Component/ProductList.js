import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { getAllProducts, searchProducts, getProductsByCategory } from '../Api/Dummy';
import { Loader2, ChevronLeft, ChevronRight, PackageOpen } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const ProductList = ({ searchQuery, filters, sort, onOpenModal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const LIMIT = 9;

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        try {
            let data;
            const skip = (page - 1) * LIMIT;
            
            if (searchQuery) {
                const result = await searchProducts(searchQuery);
                data = result.products;
                setTotal(data.length);
            } else if (filters?.category) {
                const result = await getProductsByCategory(filters.category, LIMIT, skip);
                data = result.products;
                setTotal(result.total);
            } else {
                const result = await getAllProducts(LIMIT, skip, sort?.sortBy, sort?.order);
                data = result.products;
                setTotal(result.total);
            }

            if (filters) {
                if (filters.minPrice) data = data.filter(p => p.price >= Number(filters.minPrice));
                if (filters.maxPrice) data = data.filter(p => p.price <= Number(filters.maxPrice));
                if (filters.minDiscount) data = data.filter(p => p.discountPercentage >= Number(filters.minDiscount));
            }

            setProducts(data);
        } catch (err) {
            console.error(err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
  }, [searchQuery, filters, sort, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(total / LIMIT);

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center p-32">
            <Loader2 className="animate-spin text-indigo-500" size={50} />
            <p className="mt-4 text-indigo-300 font-medium animate-pulse">Finding treasures...</p>
        </div>
    );
  }

  if (products.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
              <div className="bg-indigo-50 p-6 rounded-full mb-6">
                <PackageOpen size={48} className="text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! No items found.</h3>
              <p className="text-gray-500 max-w-md">
                  We couldn't find any products matching your criteria. Try selecting a different category or clearing your filters.
              </p>
          </div>
      )
  }

  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
                <div key={product.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards" style={{ animationDelay: `${idx * 100}ms` }}>
                    <ProductItem product={product} onOpenModal={onOpenModal} />
                </div>
            ))}
        </div>

        {totalPages > 1 && (
            <div className="flex justify-center items-center mt-20 gap-3">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="p-3 rounded-2xl bg-white border border-gray-100 hover:bg-indigo-50 hover:border-indigo-200 text-indigo-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-indigo-100"
                >
                    <ChevronLeft size={24} />
                </button>
                
                <span className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-indigo-900 font-bold shadow-sm min-w-[140px] text-center">
                    Page {page} <span className="text-gray-300 mx-2">/</span> {totalPages}
                </span>

                <button
                     disabled={page >= totalPages}
                     onClick={() => handlePageChange(page + 1)}
                     className="p-3 rounded-2xl bg-white border border-gray-100 hover:bg-indigo-50 hover:border-indigo-200 text-indigo-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-indigo-100"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        )}
    </>
  );
};

export default ProductList;