import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// GET /products with Pagination & Sorting
export const getAllProducts = async (limit = 9, skip = 0, sortBy = '', order = '') => {
  try {
    let url = `/products?limit=${limit}&skip=${skip}`;
    if (sortBy) {
        url += `&sortBy=${sortBy}&order=${order}`;
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
  }
}

export const searchProducts = async (query) => {
    try {
        const response = await api.get(`/products/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
}

export const getSingleProduct = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
}

// GET Categories
export const getAllCategories = async () => {
    try {
        const response = await api.get('/products/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// GET Products by Category
export const getProductsByCategory = async (category, limit = 9, skip = 0) => {
    try {
        const response = await api.get(`/products/category/${category}?limit=${limit}&skip=${skip}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category ${category}:`, error);
        throw error;
    }
}

// --- Cart API (Not used for Context, but kept for reference) ---
export const getAllCarts = async () => { /* ... */ }; 
// ... (Previous cart functions if needed, but we used Context)

export default api;
