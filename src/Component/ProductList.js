import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { getAllProducts, searchProducts } from '../Api/Dummy';
import { Loader2 } from 'lucide-react';

// ProductList can accepts 'filters' and 'searchQuery' as props if we want to control it from outside (Parent)
// But for now, let's keep it simple or assume independent fetching if no props provided.
// To link with SearchBar, we'll likely pass params down.
const ProductList = ({ searchQuery, filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (searchQuery) {
                const result = await searchProducts(searchQuery);
                data = result.products;
            } else {
                const result = await getAllProducts(100); // Get more for demo
                data = result.products;
            }

            // Client-side filtering implementation (since DummyJSON API is limited on complex filtering)
            if (filters) {
                if (filters.minPrice) {
                    data = data.filter(p => p.price >= Number(filters.minPrice));
                }
                if (filters.maxPrice) {
                    data = data.filter(p => p.price <= Number(filters.maxPrice));
                }
                if (filters.minDiscount) {
                     data = data.filter(p => p.discountPercentage >= Number(filters.minDiscount));
                }
            }

            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
  }, [searchQuery, filters]); // Re-fetch/filter when these change

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  if (products.length === 0) {
      return <div className="text-center text-gray-500 py-10">No products found matching your criteria.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
            <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;