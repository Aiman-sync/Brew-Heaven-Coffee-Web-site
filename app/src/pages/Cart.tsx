import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  Coffee,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ImageWithFallback from '@/components/ImageWithFallback';
import { toast } from 'sonner';

export default function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-[#D7B899]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-[#D7B899]" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#3E2723] mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-[#5D4037] mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our menu and find something delicious!
            </p>
            <Link to="/menu">
              <Button 
                size="lg"
                className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3]"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Browse Menu
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl font-bold text-[#3E2723] mb-2">
            Shopping Cart
          </h1>
          <p className="text-[#5D4037]">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="p-4 border-b border-[#D7B899]/30 flex justify-between items-center">
                <h2 className="font-semibold text-[#3E2723]">Cart Items</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.product._id}-${item.size}-${JSON.stringify(item.options)}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 border-b border-[#D7B899]/30 last:border-b-0"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          fallbackClassName="w-full h-full"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-lg font-semibold text-[#3E2723]">
                              {item.product.name}
                            </h3>
                            {item.size && (
                              <p className="text-sm text-[#5D4037]">
                                Size: {item.size}
                              </p>
                            )}
                            {item.options && item.options.length > 0 && (
                              <div className="text-sm text-[#5D4037]">
                                {item.options.map((opt, i) => (
                                  <span key={i}>
                                    {opt.name}: {opt.choice}
                                    {i < item.options!.length - 1 && ', '}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="text-[#D7B899] hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-[#D7B899] flex items-center justify-center hover:border-[#C6A75E] hover:bg-[#C6A75E]/10 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium text-[#3E2723]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-[#D7B899] flex items-center justify-center hover:border-[#C6A75E] hover:bg-[#C6A75E]/10 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-serif text-lg font-bold text-[#C6A75E]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-[#D7B899]">
                              ${item.product.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Link to="/menu">
                <Button variant="outline" className="border-[#D7B899] text-[#5D4037]">
                  ← Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-[#3E2723] mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#5D4037]">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5D4037]">
                  <span>Tax (8%)</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5D4037]">
                  <span>Shipping</span>
                  <span>{totalPrice > 25 ? 'Free' : '$3.99'}</span>
                </div>
              </div>

              <div className="border-t border-[#D7B899]/30 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#3E2723]">Total</span>
                  <span className="font-serif text-2xl font-bold text-[#C6A75E]">
                    ${(totalPrice + totalPrice * 0.08 + (totalPrice > 25 ? 0 : 3.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3] py-6 text-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#5D4037]">
                <MapPin className="w-4 h-4" />
                <span>Free shipping on orders over $25</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
