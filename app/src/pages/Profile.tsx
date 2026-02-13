import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package,
  Settings,
  Loader2,
  Edit3,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useAuth } from '@/contexts/AuthContext';

// Mock order history
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    total: 24.50,
    status: 'delivered',
    items: ['Cappuccino', 'Butter Croissant'],
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    total: 18.00,
    status: 'delivered',
    items: ['Iced Latte', 'Blueberry Muffin'],
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    total: 32.00,
    status: 'delivered',
    items: ['Caramel Macchiato', 'Avocado Toast'],
  },
];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: 'USA',
        },
      });
      setIsEditing(false);
    } catch (error) {
      // Error handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl font-bold text-[#3E2723]">
            My Account
          </h1>
          <p className="text-[#5D4037] mt-2">
            Manage your profile, orders, and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  {user?.avatar ? (
                    <ImageWithFallback
                      src={user.avatar}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto"
                      fallbackClassName="w-24 h-24 rounded-full mx-auto"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-[#C6A75E]/20 rounded-full flex items-center justify-center mx-auto">
                      <User className="w-12 h-12 text-[#C6A75E]" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#C6A75E] rounded-full flex items-center justify-center text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3] transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#3E2723] mt-4">
                  {user?.name}
                </h3>
                <p className="text-[#5D4037] text-sm">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-[#C6A75E]/20 text-[#C6A75E] rounded-full text-xs font-medium capitalize">
                  {user?.role}
                </span>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-[#C6A75E]/20 text-[#3E2723]'
                      : 'text-[#5D4037] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-[#C6A75E]/20 text-[#3E2723]'
                      : 'text-[#5D4037] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-[#C6A75E]/20 text-[#3E2723]'
                      : 'text-[#5D4037] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-2xl font-bold text-[#3E2723]">
                    Profile Information
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-[#C6A75E] hover:text-[#3E2723] transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#3E2723] mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7B899]" />
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-[#D7B899] disabled:bg-[#FAF7F2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#3E2723] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7B899]" />
                      <Input
                        type="email"
                        value={formData.email}
                        disabled
                        className="pl-10 border-[#D7B899] disabled:bg-[#FAF7F2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#3E2723] mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7B899]" />
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-[#D7B899] disabled:bg-[#FAF7F2]"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#3E2723] mb-2">
                      Street Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7B899]" />
                      <Input
                        type="text"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-[#D7B899] disabled:bg-[#FAF7F2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#3E2723] mb-2">
                      City
                    </label>
                    <Input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      disabled={!isEditing}
                      className="border-[#D7B899] disabled:bg-[#FAF7F2]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3E2723] mb-2">
                        State
                      </label>
                      <Input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        disabled={!isEditing}
                        className="border-[#D7B899] disabled:bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#3E2723] mb-2">
                        ZIP Code
                      </label>
                      <Input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        disabled={!isEditing}
                        className="border-[#D7B899] disabled:bg-[#FAF7F2]"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-[#D7B899]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3]"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="font-serif text-2xl font-bold text-[#3E2723] mb-6">
                  Order History
                </h2>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#D7B899]/30 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-[#3E2723]">
                              {order.id}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-[#5D4037]">
                            {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-[#5D4037] mt-1">
                            {order.items.join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-xl font-bold text-[#C6A75E]">
                            ${order.total.toFixed(2)}
                          </p>
                          <button className="text-sm text-[#C6A75E] hover:text-[#3E2723] mt-1">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="font-serif text-2xl font-bold text-[#3E2723] mb-6">
                  Account Settings
                </h2>

                <div className="space-y-6">
                  <div className="border-b border-[#D7B899]/30 pb-6">
                    <h3 className="font-semibold text-[#3E2723] mb-2">
                      Change Password
                    </h3>
                    <p className="text-sm text-[#5D4037] mb-4">
                      Update your password to keep your account secure
                    </p>
                    <Button
                      variant="outline"
                      className="border-[#D7B899] text-[#5D4037]"
                    >
                      Change Password
                    </Button>
                  </div>

                  <div className="border-b border-[#D7B899]/30 pb-6">
                    <h3 className="font-semibold text-[#3E2723] mb-2">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-[#5D4037] mb-4">
                      Manage your email notification preferences
                    </p>
                    <div className="space-y-3">
                      {['Order updates', 'Promotions and offers', 'Newsletter'].map((item) => (
                        <label key={item} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-[#D7B899] text-[#C6A75E] focus:ring-[#C6A75E]"
                          />
                          <span className="ml-2 text-[#5D4037]">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-red-600 mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-[#5D4037] mb-4">
                      Once you delete your account, there is no going back
                    </p>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
