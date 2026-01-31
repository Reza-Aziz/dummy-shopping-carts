// ... existing code ...
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// ... existing carts functions ...
export const getAllCarts = async () => {
  try {
    const response = await api.get('/carts');
    return response.data;
  } catch (error) {
    console.error('Error fetching all carts:', error);
    throw error;
  }
};

export const getSingleCart = async (id) => {
  try {
    const response = await api.get(`/carts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cart ${id}:`, error);
    throw error;
  }
};

export const addCart = async (products) => {
  try {
    const response = await api.post('/carts/add', {
      userId: 1, 
      products,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding cart:', error);
    throw error;
  }
};

export const updateCart = async (id, products) => {
  try {
    const response = await api.put(`/carts/${id}`, {
      merge: true, 
      products,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating cart ${id}:`, error);
    throw error;
  }
};

export const deleteCart = async (id) => {
  try {
    const response = await api.delete(`/carts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting cart ${id}:`, error);
    throw error;
  }
};

// --- PRODUCTS ---

// GET /products
export const getAllProducts = async (limit = 20, skip = 0) => {
  try {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
  } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
  }
}

// GET /products/search?q=phone
export const searchProducts = async (query) => {
    try {
        const response = await api.get(`/products/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
}

// GET /products/{id}
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
