/**
 * TypeScript Type Definitions
 * Brew Haven Coffee Shop
 */

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  address?: Address;
  createdAt?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Product Types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  gallery?: string[];
  ingredients?: string[];
  nutritionalInfo?: NutritionalInfo;
  sizes?: ProductSize[];
  options?: ProductOption[];
  reviews?: Review[];
  rating?: number;
  numReviews?: number;
  countInStock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  preparationTime?: number;
  tags?: string[];
}

export type ProductCategory = 'hot-coffee' | 'cold-coffee' | 'pastries' | 'snacks' | 'specials';

export interface ProductSize {
  name: string;
  price: number;
  volume?: string;
}

export interface ProductOption {
  name: string;
  choices: OptionChoice[];
}

export interface OptionChoice {
  name: string;
  price: number;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  caffeine: number;
}

export interface Review {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  options?: SelectedOption[];
}

export interface SelectedOption {
  name: string;
  choice: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Order Types
export interface Order {
  _id: string;
  user: string | User;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'cash' | 'paypal';
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  status: OrderStatus;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  tableNumber?: string;
  specialInstructions?: string;
  estimatedReadyTime?: string;
  cancelledAt?: string;
  cancelReason?: string;
  createdAt: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'preparing' 
  | 'ready' 
  | 'out-for-delivery' 
  | 'delivered' 
  | 'cancelled';

export interface OrderItem {
  product: string | Product;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  options?: SelectedOption[];
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Category Type
export interface Category {
  id: ProductCategory;
  name: string;
  count: number;
}

// Toast Notification Type
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'cash' | 'paypal';
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  tableNumber?: string;
  specialInstructions?: string;
}
