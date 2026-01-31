import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { getAllProducts, searchProducts } from '../Api/Dummy';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const ProductList = ({ searchQuery, filters, sort, onOpenModal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  
  // Pagination State
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const LIMIT = 9;

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        try {
            let data;
            const skip = (page - 1) * LIMIT;

            // If searching, use search endpoint (Warning: DummyJSON search doesn't support pagination effectively combined with rich filters in one go usually, but let's try)
            // Or usually search endpoint just returns matches.
            if (searchQuery) {
                const result = await searchProducts(searchQuery);
                data = result.products;
                // Manual filtering/pagination for search results if API doesn't support it fully
                setTotal(data.length); 
                // Slice for client-side pagination if search returns all
                // But for valid "sort" logic with search, we might need client side for now.
            } else {
                const result = await getAllProducts(LIMIT, skip, sort?.sortBy, sort?.order);
                data = result.products;
                setTotal(result.total);
            }

            // Client-side filtering
            if (filters) {
                if (filters.minPrice) data = data.filter(p => p.price >= Number(filters.minPrice));
                if (filters.maxPrice) data = data.filter(p => p.price <= Number(filters.maxPrice));
            }
            // Note: If using search, mapped data needs standard array. If using getAllProducts, it respects LIMIT/SKIP.

            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
  }, [searchQuery, filters, sort, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(total / LIMIT);

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;
  }

  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
                <ProductItem key={product.id} product={product} onOpenModal={onOpenModal} />
            ))}
        </div>

        {/* Pagination Controls */}
        {products.length > 0 && (
            <div className="flex justify-center items-center mt-12 gap-4">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={24} />
                </button>
                <span className="text-gray-600 font-medium">Page {page} of {totalPages || 1}</span>
                <button
                     disabled={page >= totalPages}
                     onClick={() => handlePageChange(page + 1)}
                     className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        )}
    </>
  );
};

export default ProductList;