/**
 * Authentication Controller
 * Handles user registration, login, and profile management
 */

import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateToken } from '../middleware/auth.middleware.js';
import { asyncHandler, APIError } from '../middleware/error.middleware.js';

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { name, email, password, phone } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new APIError('User already exists with this email', 400);
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    phone: phone || '',
  });

  if (user) {
    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toPublicJSON(),
        token,
      },
    });
  } else {
    throw new APIError('Invalid user data', 400);
  }
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new APIError('Invalid email or password', 401);
  }

  // Check if user is active
  if (!user.isActive) {
    throw new APIError('Account is deactivated. Please contact support.', 401);
  }

  // Check password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new APIError('Invalid email or password', 401);
  }

  // Update last login
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  // Generate token
  const token = generateToken(user._id);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: user.toPublicJSON(),
      token,
    },
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new APIError('User not found', 404);
  }

  res.json({
    success: true,
    data: {
      user: user.toPublicJSON(),
    },
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, address, avatar } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new APIError('User not found', 404);
  }

  // Update fields
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (avatar) user.avatar = avatar;
  if (address) {
    user.address = {
      ...user.address,
      ...address,
    };
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: updatedUser.toPublicJSON(),
    },
  });
});

/**
 * @desc    Change password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    throw new APIError('User not found', 404);
  }

  // Verify current password
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new APIError('Current password is incorrect', 400);
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password changed successfully',
  });
});

/**
 * @desc    Logout user (client-side token removal)
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  // In a stateless JWT system, logout is handled client-side
  // This endpoint can be used for logging or token blacklisting if implemented

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

export default {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
};
