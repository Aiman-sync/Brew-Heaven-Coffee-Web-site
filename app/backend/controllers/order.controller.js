/**
 * Order Controller
 * Handles order operations
 */

import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { asyncHandler, APIError } from '../middleware/error.middleware.js';

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    orderType,
    tableNumber,
    specialInstructions,
  } = req.body;

  // Validate order items
  if (!orderItems || orderItems.length === 0) {
    throw new APIError('No order items', 400);
  }

  // Validate order items and calculate prices
  let itemsPrice = 0;
  const validatedItems = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new APIError(`Product not found: ${item.product}`, 404);
    }

    if (!product.isInStock()) {
      throw new APIError(`${product.name} is out of stock`, 400);
    }

    // Calculate item price with options
    const optionsPrice = item.options?.reduce((sum, opt) => sum + (opt.price || 0), 0) || 0;
    const itemTotal = (product.price + optionsPrice) * item.quantity;
    itemsPrice += itemTotal;

    validatedItems.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
      size: item.size || '',
      options: item.options || [],
    });

    // Update stock
    product.countInStock -= item.quantity;
    await product.save();
  }

  // Calculate totals
  const taxRate = 0.08;
  const taxPrice = Math.round(itemsPrice * taxRate * 100) / 100;
  const shippingPrice = itemsPrice > 25 ? 0 : 3.99;
  const totalPrice = Math.round((itemsPrice + taxPrice + shippingPrice) * 100) / 100;

  // Create order
  const order = await Order.create({
    user: req.user._id,
    orderItems: validatedItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderType,
    tableNumber,
    specialInstructions,
  });

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: { order },
  });
});

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    status, 
    isPaid, 
    isDelivered,
    orderType,
  } = req.query;

  // Build query
  const query = {};
  
  if (status) query.status = status;
  if (isPaid !== undefined) query.isPaid = isPaid === 'true';
  if (isDelivered !== undefined) query.isDelivered = isDelivered === 'true';
  if (orderType) query.orderType = orderType;

  const orders = await Order.find(query)
    .populate('user', 'name email')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Order.countDocuments(query);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

/**
 * @desc    Get user orders
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const orders = await Order.find({ user: req.user._id })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Order.countDocuments({ user: req.user._id });

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('orderItems.product', 'name image');

  if (!order) {
    throw new APIError('Order not found', 404);
  }

  // Check if user owns the order or is admin
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new APIError('Not authorized to view this order', 403);
  }

  res.json({
    success: true,
    data: { order },
  });
});

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, cancelReason } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new APIError('Order not found', 404);
  }

  try {
    order.updateStatus(status);
    
    if (status === 'cancelled' && cancelReason) {
      order.cancelReason = cancelReason;
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order },
    });
  } catch (error) {
    throw new APIError(error.message, 400);
  }
});

/**
 * @desc    Update order to paid
 * @route   PUT /api/orders/:id/pay
 * @access  Private
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new APIError('Order not found', 404);
  }

  // Check if user owns the order
  if (order.user.toString() !== req.user._id.toString()) {
    throw new APIError('Not authorized', 403);
  }

  order.markAsPaid({
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  });

  await order.save();

  res.json({
    success: true,
    message: 'Order marked as paid',
    data: { order },
  });
});

/**
 * @desc    Update order to delivered
 * @route   PUT /api/orders/:id/deliver
 * @access  Private/Admin
 */
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new APIError('Order not found', 404);
  }

  order.updateStatus('delivered');
  await order.save();

  res.json({
    success: true,
    message: 'Order marked as delivered',
    data: { order },
  });
});

/**
 * @desc    Cancel order
 * @route   PUT /api/orders/:id/cancel
 * @access  Private
 */
export const cancelOrder = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new APIError('Order not found', 404);
  }

  // Check if user owns the order or is admin
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new APIError('Not authorized', 403);
  }

  // Check if order can be cancelled
  const cancellableStatuses = ['pending', 'processing', 'preparing'];
  if (!cancellableStatuses.includes(order.status)) {
    throw new APIError('Order cannot be cancelled at this stage', 400);
  }

  try {
    order.updateStatus('cancelled');
    order.cancelReason = reason || 'Cancelled by user';
    await order.save();

    // Restore stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock += item.quantity;
        await product.save();
      }
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order },
    });
  } catch (error) {
    throw new APIError(error.message, 400);
  }
});

/**
 * @desc    Get order statistics
 * @route   GET /api/orders/stats
 * @access  Private/Admin
 */
export const getOrderStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);

  const statusCounts = await Order.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } });

  const pendingOrders = await Order.countDocuments({ 
    status: { $in: ['pending', 'processing', 'preparing'] } 
  });

  res.json({
    success: true,
    data: {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      todayOrders,
      pendingOrders,
      statusCounts: statusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
    },
  });
});

export default {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderToPaid,
  updateOrderToDelivered,
  cancelOrder,
  getOrderStats,
};
