import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Home, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderSuccess() {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check className="w-12 h-12 text-green-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-4xl font-bold text-[#3E2723] mb-4"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[#5D4037] mb-6"
        >
          Thank you for your order! We've received it and will start preparing it right away.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-8"
        >
          <div className="flex justify-between items-center py-3 border-b border-[#D7B899]/20">
            <span className="text-[#5D4037]">Order Number</span>
            <span className="font-mono font-medium text-[#3E2723]">#{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[#D7B899]/20">
            <span className="text-[#5D4037]">Estimated Ready Time</span>
            <span className="font-medium text-[#3E2723]">15-20 minutes</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-[#5D4037]">Status</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              Processing
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/menu">
            <Button
              variant="outline"
              className="border-[#D7B899] text-[#5D4037] hover:bg-[#3E2723] hover:text-[#F5E6D3] hover:border-[#3E2723]"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Order More
            </Button>
          </Link>
          <Link to="/">
            <Button className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3]">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-sm text-[#5D4037]"
        >
          A confirmation email has been sent to your inbox.
        </motion.p>
      </motion.div>
    </div>
  );
}
