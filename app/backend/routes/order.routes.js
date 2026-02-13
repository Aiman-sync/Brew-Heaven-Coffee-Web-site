/**
 * Order Routes
 * Handles order operations
 */

import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderToPaid,
  updateOrderToDelivered,
  cancelOrder,
  getOrderStats,
} from '../controllers/order.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

// Validation middleware
const createOrderValidation = [
  body('orderItems')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('shippingAddress')
    .notEmpty()
    .withMessage('Shipping address is required'),
  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['card', 'cash', 'paypal'])
    .withMessage('Invalid payment method'),
];

const updateStatusValidation = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'processing', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'])
    .withMessage('Invalid status'),
];

const cancelValidation = [
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Reason cannot exceed 500 characters'),
];

// Protected routes (require authentication)
router.use(protect);

// User routes
router.post('/', createOrderValidation, createOrder);
router.get('/my-orders', getMyOrders);
router.get('/stats', adminOnly, getOrderStats);
router.get('/:id', getOrderById);
router.put('/:id/pay', updateOrderToPaid);
router.put('/:id/cancel', cancelValidation, cancelOrder);

// Admin only routes
router.get('/', adminOnly, getAllOrders);
router.put('/:id/status', adminOnly, updateStatusValidation, updateOrderStatus);
router.put('/:id/deliver', adminOnly, updateOrderToDelivered);

export default router;
