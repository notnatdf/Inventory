import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productAPI = {

    getAllProducts: () => api.get('/products'),

    getProductById: (id) => api.get(`/products/${id}`),

    createProduct: (productData) => api.post('/products', productData),

    updateProduct: (id, productData) => api.put(`/products/${id}`, productData),

    deleteProduct: (id) => api.delete(`/products/${id}`),

    getProductsByCategory: (category) => api.get(`/products/category/${category}`),

    searchProducts: (keyword) => api.get(`/products/search?keyword=${keyword}`),

    getLowStockProducts: () => api.get('/products/low-stock'),
};

export default api;