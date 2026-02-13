import api from './axios';

// Get all products
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

// Get single product by ID
export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Get featured products
export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured');
  return response.data;
};

// Get product categories
export const getCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

// Create new product
export const createProduct = async (productData: any) => {
  const response = await api.post('/products', productData);
  return response.data;
};

// Update product
export const updateProduct = async (id: string, productData: any) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Delete product
export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
