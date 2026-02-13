/**
 * Payment Routes
 * Handles Stripe payment integration
 */

import express from 'express';
import { body } from 'express-validator';
import {
  createPaymentIntent,
  confirmPayment,
  getStripeConfig,
  webhook,
  createCheckoutSession,
} from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Validation middleware
const paymentIntentValidation = [
  body('orderId')
    .notEmpty()
    .withMessage('Order ID is required'),
];

const confirmPaymentValidation = [
  body('paymentIntentId')
    .notEmpty()
    .withMessage('Payment intent ID is required'),
  body('orderId')
    .notEmpty()
    .withMessage('Order ID is required'),
];

// Public routes
router.get('/config', getStripeConfig);

// Stripe webhook (needs raw body)
router.post('/webhook', express.raw({ type: 'application/json' }), webhook);

// Protected routes (require authentication)
router.use(protect);

router.post('/create-payment-intent', paymentIntentValidation, createPaymentIntent);
router.post('/confirm-payment', confirmPaymentValidation, confirmPayment);
router.post('/create-checkout-session', paymentIntentValidation, createCheckoutSession);

export default router;
