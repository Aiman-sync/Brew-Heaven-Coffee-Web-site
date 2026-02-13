/**
 * Product Routes
 * Handles product/menu item operations
 */

import express from 'express';
import { body } from 'express-validator';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getFeaturedProducts,
  getProductsByCategory,
  getCategories,
} from '../controllers/product.controller.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Validation middleware
const createProductValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['hot-coffee', 'cold-coffee', 'pastries', 'snacks', 'specials'])
    .withMessage('Invalid category'),
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Image URL is required'),
  body('countInStock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
];

const reviewValidation = [
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters'),
];

// Public routes
router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (require authentication)
router.post('/:id/reviews', protect, reviewValidation, addReview);

// Admin only routes
router.post('/', protect, adminOnly, createProductValidation, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
