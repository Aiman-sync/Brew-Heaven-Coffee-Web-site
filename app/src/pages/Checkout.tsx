import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  MapPin, 
  Truck, 
  Store,
  Check,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('takeaway');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    tableNumber: '',
    specialInstructions: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    toast.success('Order placed successfully!');
    navigate('/order-success');
    setIsLoading(false);
  };

  const tax = totalPrice * 0.08;
  const shipping = orderType === 'delivery' ? (totalPrice > 25 ? 0 : 3.99) : 0;
  const total = totalPrice + tax + shipping;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-[#5D4037] hover:text-[#3E2723] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
          <h1 className="font-serif text-4xl font-bold text-[#3E2723]">
            Checkout
          </h1>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? 'bg-[#C6A75E] text-[#3E2723]'
                    : 'bg-[#D7B899]/30 text-[#5D4037]'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 rounded ${
                    step > s ? 'bg-[#C6A75E]' : 'bg-[#D7B899]/30'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-2xl font-bold text-[#3E2723] mb-6">
                  Order Type
                </h2>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { id: 'dine-in', icon: Store, label: 'Dine In' },
                    { id: 'takeaway', icon: Truck, label: 'Takeaway' },
                    { id: 'delivery', icon: MapPin, label: 'Delivery' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setOrderType(type.id as typeof orderType)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        orderType === type.id
                          ? 'border-[#C6A75E] bg-[#C6A75E]/10'
                          : 'border-[#D7B899]/30 hover:border-[#C6A75E]/50'
                      }`}
                    >
                      <type.icon className={`w-8 h-8 mx-auto mb-3 ${
                        orderType === type.id ? 'text-[#C6A75E]' : 'text-[#5D4037]'
                      }`} />
                      <span className={`font-medium ${
                        orderType === type.id ? 'text-[#3E2723]' : 'text-[#5D4037]'
                      }`}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>

                {orderType === 'dine-in' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#3E2723] mb-2">
                      Table Number
                    </label>
                    <Input
                      type="text"
                      name="tableNumber"
                      value={formData.tableNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., Table 5"
                      className="border-[#D7B899] focus:border-[#C6A75E]"
                    />
                  </div>
                )}

                {(orderType === 'delivery' || orderType === 'takeaway') && (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3E2723] mb-2">
                          Full Name
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border-[#D7B899] focus:border-[#C6A75E]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#3E2723] mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="border-[#D7B899] focus:border-[#C6A75E]"
                        />
                      </div>
                    </div>

                    {orderType === 'delivery' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-[#3E2723] mb-2">
                            Street Address
                          </label>
                          <Input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="border-[#D7B899] focus:border-[#C6A75E]"
                          />
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-[#3E2723] mb-2">
                              City
                            </label>
                            <Input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="border-[#D7B899] focus:border-[#C6A75E]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#3E2723] mb-2">
                              State
                            </label>
                            <Input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="border-[#D7B899] focus:border-[#C6A75E]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#3E2723] mb-2">
                              ZIP Code
                            </label>
                            <Input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className="border-[#D7B899] focus:border-[#C6A75E]"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="mt-6">
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any allergies or special requests?"
                    className="w-full px-4 py-2 rounded-lg border border-[#D7B899] focus:border-[#C6A75E] focus:ring-1 focus:ring-[#C6A75E] outline-none resize-none"
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3]"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-2xl font-bold text-[#3E2723] mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4 mb-8">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-6 rounded-xl border-2 flex items-center gap-4 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#C6A75E] bg-[#C6A75E]/10'
                        : 'border-[#D7B899]/30 hover:border-[#C6A75E]/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      paymentMethod === 'card' ? 'bg-[#C6A75E]' : 'bg-[#D7B899]/30'
                    }`}>
                      <CreditCard className={`w-6 h-6 ${
                        paymentMethod === 'card' ? 'text-[#3E2723]' : 'text-[#5D4037]'
                      }`} />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium ${
                        paymentMethod === 'card' ? 'text-[#3E2723]' : 'text-[#5D4037]'
                      }`}>
                        Credit/Debit Card
                      </p>
                      <p className="text-sm text-[#5D4037]">
                        Pay securely with your card
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-full p-6 rounded-xl border-2 flex items-center gap-4 transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-[#C6A75E] bg-[#C6A75E]/10'
                        : 'border-[#D7B899]/30 hover:border-[#C6A75E]/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      paymentMethod === 'cash' ? 'bg-[#C6A75E]' : 'bg-[#D7B899]/30'
                    }`}>
                      <span className={`text-xl font-bold ${
                        paymentMethod === 'cash' ? 'text-[#3E2723]' : 'text-[#5D4037]'
                      }`}>$</span>
                    </div>
                    <div className="text-left">
                      <p className={`font-medium ${
                        paymentMethod === 'cash' ? 'text-[#3E2723]' : 'text-[#5D4037]'
                      }`}>
                        Cash on {orderType === 'dine-in' ? 'Pickup' : 'Delivery'}
                      </p>
                      <p className="text-sm text-[#5D4037]">
                        Pay when you receive your order
                      </p>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3E2723] mb-2">
                        Card Number
                      </label>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="border-[#D7B899] focus:border-[#C6A75E]"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3E2723] mb-2">
                          Expiry Date
                        </label>
                        <Input
                          type="text"
                          placeholder="MM/YY"
                          className="border-[#D7B899] focus:border-[#C6A75E]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#3E2723] mb-2">
                          CVV
                        </label>
                        <Input
                          type="text"
                          placeholder="123"
                          className="border-[#D7B899] focus:border-[#C6A75E]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-[#D7B899]"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3]"
                  >
                    Review Order
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-2xl font-bold text-[#3E2723] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex justify-between items-center py-3 border-b border-[#D7B899]/20">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                          fallbackClassName="w-16 h-16 rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-[#3E2723]">{item.product.name}</p>
                          <p className="text-sm text-[#5D4037]">
                            Qty: {item.quantity}
                            {item.size && ` • ${item.size}`}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-[#3E2723]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#FAF7F2] rounded-xl p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#5D4037]">Order Type</span>
                    <span className="text-[#3E2723] font-medium capitalize">{orderType}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#5D4037]">Payment Method</span>
                    <span className="text-[#3E2723] font-medium capitalize">
                      {paymentMethod === 'card' ? 'Credit Card' : 'Cash'}
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-[#D7B899]"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-[#3E2723] mb-6">
                Order Total
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#5D4037]">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5D4037]">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-[#5D4037]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-[#D7B899]/30 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#3E2723]">Total</span>
                  <span className="font-serif text-2xl font-bold text-[#C6A75E]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#C6A75E]/10 rounded-xl">
                <p className="text-sm text-[#5D4037]">
                  By placing this order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
