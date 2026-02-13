import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, Eye, EyeOff, Loader2, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, email, password, phone });
      navigate('/');
    } catch (error) {
      // Error handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Coffee className="w-10 h-10 text-[#C6A75E]" />
            <span className="font-serif text-2xl font-bold text-[#3E2723]">
              Brew Haven
            </span>
          </Link>
          <h2 className="mt-6 font-serif text-3xl font-bold text-[#3E2723]">
            Create Account
          </h2>
          <p className="mt-2 text-[#5D4037]">
            Join us for exclusive offers and rewards
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#3E2723] mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7B899]" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 border-[#D7B899] focus:border-[#C6A75E] focus:ring-[#C6A75E]"
                  required
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 border-[#D7B899] focus:border-[#C6A75E] focus:ring-[#C6A75E]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3E2723] mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7B899]" />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full pl-10 border-[#D7B899] focus:border-[#C6A75E] focus:ring-[#C6A75E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3E2723] mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-[#D7B899] focus:border-[#C6A75E] focus:ring-[#C6A75E] pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D7B899] hover:text-[#5D4037]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-[#D7B899] mt-1">
                Must be at least 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3E2723] mb-2">
                Confirm Password
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-[#D7B899] focus:border-[#C6A75E] focus:ring-[#C6A75E]"
                required
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-[#D7B899] text-[#C6A75E] focus:ring-[#C6A75E]" 
                required
              />
              <span className="ml-2 text-sm text-[#5D4037]">
                I agree to the{' '}
                <Link to="#" className="text-[#C6A75E] hover:text-[#3E2723]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-[#C6A75E] hover:text-[#3E2723]">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <Button
              type="submit"
              disabled={isLoading || (password !== confirmPassword)}
              className="w-full bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3] py-6"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#5D4037]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#C6A75E] hover:text-[#3E2723] font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
