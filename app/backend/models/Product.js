/**
 * Product Model
 * Defines the schema for coffee shop menu items
 */

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    maxlength: 500,
  },
}, {
  timestamps: true,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: {
      values: ['hot-coffee', 'cold-coffee', 'pastries', 'snacks', 'specials'],
      message: 'Please select a valid category',
    },
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
    default: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400&h=400&fit=crop',
  },
  gallery: [{
    type: String,
  }],
  ingredients: [{
    type: String,
    trim: true,
  }],
  nutritionalInfo: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    caffeine: { type: Number, default: 0 }, // in mg
  },
  sizes: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    volume: { type: String }, // e.g., "12oz", "16oz"
  }],
  options: [{
    name: { type: String, required: true },
    choices: [{
      name: { type: String, required: true },
      price: { type: Number, default: 0 },
    }],
  }],
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be below 0'],
    max: [5, 'Rating cannot exceed 5'],
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  preparationTime: {
    type: Number, // in minutes
    default: 5,
  },
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

// Indexes for faster queries
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isAvailable: 1 });

/**
 * Calculate average rating from reviews
 */
productSchema.methods.calculateRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = Math.round((totalRating / this.reviews.length) * 10) / 10;
    this.numReviews = this.reviews.length;
  }
};

/**
 * Get price range (min and max based on sizes)
 */
productSchema.methods.getPriceRange = function () {
  if (!this.sizes || this.sizes.length === 0) {
    return { min: this.price, max: this.price };
  }
  
  const prices = this.sizes.map(size => size.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

/**
 * Check if product is in stock
 */
productSchema.methods.isInStock = function () {
  return this.isAvailable && this.countInStock > 0;
};

const Product = mongoose.model('Product', productSchema);

export default Product;
