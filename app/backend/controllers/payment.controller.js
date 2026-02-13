/**
 * Payment Controller
 * Handles Stripe payment integration
 */

import Stripe from 'stripe';
import { asyncHandler, APIError } from '../middleware/error.middleware.js';
import Order from '../models/Order.js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_your_key_here');

/**
 * @desc    Create payment intent
 * @route   POST /api/payment/create-payment-intent
 * @access  Private
 */
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  // Get order
  const order = await Order.findById(orderId);

  if (!order) {
    throw new APIError('Order not found', 404);
  }

  // Check if user owns the order
  if (order.user.toString() !== req.user._id.toString()) {
    throw new APIError('Not authorized', 403);
  }

  // Check if order is already paid
  if (order.isPaid) {
    throw new APIError('Order is already paid', 400);
  }

  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: order._id.toString(),
        userId: req.user._id.toString(),
      },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error) {
    console.error('Stripe error:', error);
    throw new APIError('Error creating payment intent', 500);
  }
});

/**
 * @desc    Confirm payment and update order
 * @route   POST /api/payment/confirm-payment
 * @access  Private
 */
export const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  try {
    // Retrieve payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      throw new APIError('Payment not successful', 400);
    }

    // Get order
    const order = await Order.findById(orderId);

    if (!order) {
      throw new APIError('Order not found', 404);
    }

    // Mark order as paid
    order.markAsPaid({
      id: paymentIntent.id,
      status: paymentIntent.status,
      update_time: new Date().toISOString(),
      email_address: paymentIntent.receipt_email || '',
    });

    await order.save();

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      data: { order },
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    throw new APIError(error.message || 'Error confirming payment', 500);
  }
});

/**
 * @desc    Get Stripe publishable key
 * @route   GET /api/payment/config
 * @access  Public
 */
export const getStripeConfig = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here',
    },
  });
});

/**
 * @desc    Handle Stripe webhook
 * @route   POST /api/payment/webhook
 * @access  Public
 */
export const webhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent.id);
      
      // Update order if metadata contains orderId
      if (paymentIntent.metadata.orderId) {
        const order = await Order.findById(paymentIntent.metadata.orderId);
        if (order && !order.isPaid) {
          order.markAsPaid({
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: new Date().toISOString(),
            email_address: paymentIntent.receipt_email || '',
          });
          await order.save();
        }
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

/**
 * @desc    Create checkout session
 * @route   POST /api/payment/create-checkout-session
 * @access  Private
 */
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId).populate('orderItems.product');

  if (!order) {
    throw new APIError('Order not found', 404);
  }

  if (order.user.toString() !== req.user._id.toString()) {
    throw new APIError('Not authorized', 403);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.orderItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-success?orderId=${orderId}`,
      cancel_url: `${process.env.FRONTEND_URL}/order-cancelled?orderId=${orderId}`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    res.json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw new APIError('Error creating checkout session', 500);
  }
});

export default {
  createPaymentIntent,
  confirmPayment,
  getStripeConfig,
  webhook,
  createCheckoutSession,
};
