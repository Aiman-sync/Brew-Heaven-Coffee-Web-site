/**
 * Product Controller
 * Handles product/menu item operations
 */

import Product from '../models/Product.js';
import { asyncHandler, APIError } from '../middleware/error.middleware.js';

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    category,
    search,
    minPrice,
    maxPrice,
    sortBy = 'createdAt',
    order = 'desc',
    isAvailable,
    isFeatured,
  } = req.query;

  // Build query
  const query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$text = { $search: search };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = parseFloat(minPrice);
    if (maxPrice !== undefined) query.price.$lte = parseFloat(maxPrice);
  }

  if (isAvailable !== undefined) {
    query.isAvailable = isAvailable === 'true';
  }

  if (isFeatured !== undefined) {
    query.isFeatured = isFeatured === 'true';
  }

  // Build sort
  const sortOptions = {};
  sortOptions[sortBy] = order === 'asc' ? 1 : -1;

  // Execute query
  const products = await Product.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort(sortOptions);

  const total = await Product.countDocuments(query);

  res.json({
    success: true,
    data: {
      products,
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
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new APIError('Product not found', 404);
  }

  res.json({
    success: true,
    data: { product },
  });
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    image,
    gallery,
    ingredients,
    nutritionalInfo,
    sizes,
    options,
    countInStock,
    isAvailable,
    isFeatured,
    preparationTime,
    tags,
  } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    category,
    image,
    gallery,
    ingredients,
    nutritionalInfo,
    sizes,
    options,
    countInStock,
    isAvailable,
    isFeatured,
    preparationTime,
    tags,
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: { product },
  });
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new APIError('Product not found', 404);
  }

  // Update fields
  const updatableFields = [
    'name', 'description', 'price', 'category', 'image', 'gallery',
    'ingredients', 'nutritionalInfo', 'sizes', 'options',
    'countInStock', 'isAvailable', 'isFeatured', 'preparationTime', 'tags',
  ];

  updatableFields.forEach(field => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  const updatedProduct = await product.save();

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: { product: updatedProduct },
  });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new APIError('Product not found', 404);
  }

  await Product.deleteOne({ _id: product._id });

  res.json({
    success: true,
    message: 'Product deleted successfully',
  });
});

/**
 * @desc    Add product review
 * @route   POST /api/products/:id/reviews
 * @access  Private
 */
export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new APIError('Product not found', 404);
  }

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.find(
    review => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    throw new APIError('You have already reviewed this product', 400);
  }

  // Add review
  product.reviews.push({
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  });

  // Update product rating
  product.calculateRating();

  await product.save();

  res.status(201).json({
    success: true,
    message: 'Review added successfully',
    data: { product },
  });
});

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;

  const products = await Product.find({ isFeatured: true, isAvailable: true })
    .limit(parseInt(limit))
    .sort({ rating: -1 });

  res.json({
    success: true,
    data: { products },
  });
});

/**
 * @desc    Get products by category
 * @route   GET /api/products/category/:category
 * @access  Public
 */
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 12 } = req.query;

  const products = await Product.find({ category, isAvailable: true })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments({ category, isAvailable: true });

  res.json({
    success: true,
    data: {
      products,
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
 * @desc    Get product categories
 * @route   GET /api/products/categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');

  const categoryData = categories.map(cat => ({
    id: cat,
    name: cat.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    count: 0,
  }));

  // Get count for each category
  for (let cat of categoryData) {
    cat.count = await Product.countDocuments({ 
      category: cat.id, 
      isAvailable: true 
    });
  }

  res.json({
    success: true,
    data: { categories: categoryData },
  });
});

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getFeaturedProducts,
  getProductsByCategory,
  getCategories,
};
