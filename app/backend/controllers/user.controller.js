/**
 * User Controller
 * Handles user management (admin operations)
 */

import User from '../models/User.js';
import { asyncHandler, APIError } from '../middleware/error.middleware.js';

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', role } = req.query;

  // Build query
  const query = {};
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  if (role) {
    query.role = role;
  }

  // Execute query with pagination
  const users = await User.find(query)
    .select('-password')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  // Get total count
  const total = await User.countDocuments(query);

  res.json({
    success: true,
    data: {
      users: users.map(user => user.toPublicJSON()),
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
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

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
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, isActive, phone, address } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new APIError('User not found', 404);
  }

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;
  if (phone) user.phone = phone;
  if (address) user.address = { ...user.address, ...address };

  const updatedUser = await user.save();

  res.json({
    success: true,
    message: 'User updated successfully',
    data: {
      user: updatedUser.toPublicJSON(),
    },
  });
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new APIError('User not found', 404);
  }

  // Prevent deleting own account
  if (user._id.toString() === req.user._id.toString()) {
    throw new APIError('Cannot delete your own account', 400);
  }

  await User.deleteOne({ _id: user._id });

  res.json({
    success: true,
    message: 'User deleted successfully',
  });
});

/**
 * @desc    Get user statistics
 * @route   GET /api/users/stats
 * @access  Private/Admin
 */
export const getUserStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const adminUsers = await User.countDocuments({ role: 'admin' });
  
  // Get users created in last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const newUsers = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

  res.json({
    success: true,
    data: {
      totalUsers,
      activeUsers,
      adminUsers,
      newUsers,
      inactiveUsers: totalUsers - activeUsers,
    },
  });
});

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
};
