import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getCategories
} from '../controllers/productController.js';

const router = express.Router();

// @route   GET /api/products/featured
router.get('/featured', getFeaturedProducts);

// @route   GET /api/products/categories
router.get('/categories', getCategories);

// @route   GET /api/products
router.get('/', getProducts);

// @route   GET /api/products/:id
router.get('/:id', getProductById);

// @route   POST /api/products
router.post('/', createProduct);

// @route   PUT /api/products/:id
router.put('/:id', updateProduct);

// @route   DELETE /api/products/:id
router.delete('/:id', deleteProduct);

export default router;
