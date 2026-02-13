import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
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
            Welcome Back
          </h2>
          <p className="mt-2 text-[#5D4037]">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#3E2723] mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-[#D7B899] focus:border-[#C6A75E] focus:ring-[#C6A75E]"
                required
              />
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D7B899] hover:text-[#5D4037]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-[#D7B899] text-[#C6A75E] focus:ring-[#C6A75E]" />
                <span className="ml-2 text-sm text-[#5D4037]">Remember me</span>
              </label>
              <Link to="#" className="text-sm text-[#C6A75E] hover:text-[#3E2723]">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C6A75E] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#F5E6D3] py-6"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-[#FAF7F2] rounded-lg">
            <p className="text-sm text-[#5D4037] font-medium mb-2">Demo Credentials:</p>
            <div className="text-sm text-[#5D4037] space-y-1">
              <p><span className="font-medium">User:</span> john@example.com / user123</p>
              <p><span className="font-medium">Admin:</span> admin@brewhaven.com / admin123</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#5D4037]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#C6A75E] hover:text-[#3E2723] font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
