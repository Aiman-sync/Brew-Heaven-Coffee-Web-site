import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Coffee, 
  ShoppingBag, 
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  DollarSign,
  Package,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageWithFallback from '@/components/ImageWithFallback';
import { products } from '@/data/products';
import { toast } from 'sonner';

// Mock data
const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 24.50, status: 'pending', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 18.00, status: 'processing', date: '2024-01-15' },
  { id: 'ORD-003', customer: 'Mike Johnson', total: 32.00, status: 'delivered', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Sarah Williams', total: 15.50, status: 'preparing', date: '2024-01-14' },
];

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', orders: 12 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', orders: 8 },
  { id: 3, name: 'Admin User', email: 'admin@brewhaven.com', role: 'admin', orders: 0 },
];

const stats = [
  { label: 'Total Revenue', value: '$12,450', icon: DollarSign, change: '+12%' },
  { label: 'Total Orders', value: '156', icon: ShoppingBag, change: '+8%' },
  { label: 'Products', value: '24', icon: Package, change: '0%' },
  { label: 'Customers', value: '89', icon: UserCheck, change: '+15%' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteProduct = (_id: string) => {
    toast.success('Product deleted successfully');
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'preparing':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#C6A75E] rounded-full flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-[#3E2723]" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#3E2723]">Admin Panel</h2>
                  <p className="text-xs text-[#5D4037]">Manage your shop</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { id: 'products', icon: Coffee, label: 'Products' },
                  { id: 'orders', icon: ShoppingBag, label: 'Orders' },
                  { id: 'users', icon: Users, label: 'Users' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as typeof activeTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#C6A75E]/20 text-[#3E2723]'
                        : 'text-[#5D4037] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-serif text-3xl font-bold text-[#3E2723] mb-8">
                  Dashboard
                </h1>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-sm p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#C6A75E]/20 rounded-full flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-[#C6A75E]" />
                        </div>
                        <span className={`text-sm font-medium ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-[#3E2723]">{stat.value}</p>
                      <p className="text-sm text-[#5D4037]">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-xl font-bold text-[#3E2723]">
                      Recent Orders
                    </h2>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-[#C6A75E] hover:text-[#3E2723]"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#D7B899]/20">
                          <th className="text-left py-3 text-sm font-medium text-[#5D4037]">Order ID</th>
                          <th className="text-left py-3 text-sm font-medium text-[#5D4037]">Customer</th>
                          <th className="text-left py-3 text-sm font-medium text-[#5D4037]">Total</th>
                          <th className="text-left py-3 text-sm font-medium text-[#5D4037]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.slice(0, 4).map((order) => (
                          <tr key={order.id} className="border-b border-[#D7B899]/10 last:border-b-0">
                            <td className="py-3 text-[#3E2723]">{order.id}</td>
                            <td className="py-3 text-[#5D4037]">{order.customer}</td>
                            <td className="py-3 text-[#3E2723]">${order.total.toFixed(2)}</td>
                            <td className="py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'products' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h1 className="font-serif text-3xl font-bold text-[#3E2723]">
                    Products
                  </h1>
                  <Button className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-[#D7B899]/20">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7B899]" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-[#D7B899] focus:border-[#C6A75E]"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#D7B899]/20">
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Product</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Category</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Price</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Stock</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id} className="border-b border-[#D7B899]/10 last:border-b-0">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <ImageWithFallback
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                  fallbackClassName="w-10 h-10 rounded-lg"
                                />
                                <span className="text-[#3E2723] font-medium">{product.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-[#5D4037] capitalize">
                              {product.category.replace('-', ' ')}
                            </td>
                            <td className="py-4 px-6 text-[#3E2723]">${product.price.toFixed(2)}</td>
                            <td className="py-4 px-6">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                product.countInStock > 20 
                                  ? 'bg-green-100 text-green-700' 
                                  : product.countInStock > 0 
                                    ? 'bg-yellow-100 text-yellow-700' 
                                    : 'bg-red-100 text-red-700'
                              }`}>
                                {product.countInStock} in stock
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex gap-2">
                                <button className="p-2 text-[#C6A75E] hover:bg-[#C6A75E]/10 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(product._id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-serif text-3xl font-bold text-[#3E2723] mb-8">
                  Orders
                </h1>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#D7B899]/20">
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Order ID</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Customer</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Date</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Total</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Status</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.map((order) => (
                          <tr key={order.id} className="border-b border-[#D7B899]/10 last:border-b-0">
                            <td className="py-4 px-6 text-[#3E2723] font-medium">{order.id}</td>
                            <td className="py-4 px-6 text-[#5D4037]">{order.customer}</td>
                            <td className="py-4 px-6 text-[#5D4037]">{order.date}</td>
                            <td className="py-4 px-6 text-[#3E2723]">${order.total.toFixed(2)}</td>
                            <td className="py-4 px-6">
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(order.status)}`}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-4 px-6">
                              <button className="text-[#C6A75E] hover:text-[#3E2723]">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-serif text-3xl font-bold text-[#3E2723] mb-8">
                  Users
                </h1>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#D7B899]/20">
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">User</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Email</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Role</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Orders</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-[#5D4037]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers.map((user) => (
                          <tr key={user.id} className="border-b border-[#D7B899]/10 last:border-b-0">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#C6A75E]/20 rounded-full flex items-center justify-center">
                                  <span className="text-[#C6A75E] font-medium">
                                    {user.name.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-[#3E2723] font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-[#5D4037]">{user.email}</td>
                            <td className="py-4 px-6">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-[#5D4037]">{user.orders}</td>
                            <td className="py-4 px-6">
                              <button className="text-[#C6A75E] hover:text-[#3E2723]">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
