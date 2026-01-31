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

export default api;
