/**
 * Order Model
 * Defines the schema for customer orders
 */

import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
  },
  size: {
    type: String,
    default: '',
  },
  options: [{
    name: { type: String },
    choice: { type: String },
    price: { type: Number, default: 0 },
  }],
}, {
  _id: false,
});

const shippingAddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: 'USA',
  },
  phone: {
    type: String,
  },
}, {
  _id: false,
});

const paymentResultSchema = new mongoose.Schema({
  id: { type: String },
  status: { type: String },
  update_time: { type: String },
  email_address: { type: String },
}, {
  _id: false,
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'cash', 'paypal'],
    default: 'card',
  },
  paymentResult: paymentResultSchema,
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  orderType: {
    type: String,
    enum: ['dine-in', 'takeaway', 'delivery'],
    default: 'takeaway',
  },
  tableNumber: {
    type: String,
  },
  specialInstructions: {
    type: String,
    maxlength: 500,
  },
  estimatedReadyTime: {
    type: Date,
  },
  cancelledAt: {
    type: Date,
  },
  cancelReason: {
    type: String,
  },
}, {
  timestamps: true,
});

// Indexes for faster queries
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ isPaid: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ orderType: 1 });

/**
 * Calculate order totals
 */
orderSchema.methods.calculateTotals = function () {
  // Calculate items price
  this.itemsPrice = this.orderItems.reduce((acc, item) => {
    const optionsPrice = item.options.reduce((sum, opt) => sum + (opt.price || 0), 0);
    return acc + (item.price + optionsPrice) * item.quantity;
  }, 0);

  // Calculate tax (assuming 8% tax rate)
  const taxRate = 0.08;
  this.taxPrice = Math.round(this.itemsPrice * taxRate * 100) / 100;

  // Calculate shipping (free for orders over $25)
  this.shippingPrice = this.itemsPrice > 25 ? 0 : 3.99;

  // Calculate total
  this.totalPrice = Math.round((this.itemsPrice + this.taxPrice + this.shippingPrice) * 100) / 100;
};

/**
 * Update order status
 */
orderSchema.methods.updateStatus = function (newStatus) {
  const validTransitions = {
    'pending': ['processing', 'cancelled'],
    'processing': ['preparing', 'cancelled'],
    'preparing': ['ready', 'cancelled'],
    'ready': ['out-for-delivery', 'delivered'],
    'out-for-delivery': ['delivered'],
    'delivered': [],
    'cancelled': [],
  };

  if (!validTransitions[this.status].includes(newStatus)) {
    throw new Error(`Invalid status transition from ${this.status} to ${newStatus}`);
  }

  this.status = newStatus;

  if (newStatus === 'delivered') {
    this.isDelivered = true;
    this.deliveredAt = new Date();
  }

  if (newStatus === 'cancelled') {
    this.cancelledAt = new Date();
  }
};

/**
 * Mark order as paid
 */
orderSchema.methods.markAsPaid = function (paymentResult) {
  this.isPaid = true;
  this.paidAt = new Date();
  this.paymentResult = paymentResult;
};

/**
 * Get order summary for display
 */
orderSchema.methods.getSummary = function () {
  return {
    id: this._id,
    orderNumber: this._id.toString().slice(-6).toUpperCase(),
    status: this.status,
    totalPrice: this.totalPrice,
    itemCount: this.orderItems.reduce((sum, item) => sum + item.quantity, 0),
    createdAt: this.createdAt,
    isPaid: this.isPaid,
    isDelivered: this.isDelivered,
  };
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
