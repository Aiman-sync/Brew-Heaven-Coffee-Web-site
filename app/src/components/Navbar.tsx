import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  ShoppingCart, 
  User, 
  Menu as MenuIcon, 
  X, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/location', label: 'Location' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled 
            ? 'bg-[#3E2723]/90 backdrop-blur-xl shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Coffee className="w-8 h-8 text-[#C6A75E]" />
              </motion.div>
              <span className={`font-serif text-xl font-bold transition-colors ${
                isScrolled ? 'text-[#F5E6D3]' : 'text-[#F5E6D3]'
              }`}>
                Brew Haven
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium transition-all duration-300 underline-animate ${
                    isActive(link.path) 
                      ? 'text-[#C6A75E]' 
                      : isScrolled 
                        ? 'text-[#F5E6D3] hover:text-[#C6A75E]' 
                        : 'text-[#F5E6D3] hover:text-[#C6A75E]'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C6A75E]"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link to="/cart" className="relative group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full transition-colors ${
                    isScrolled 
                      ? 'hover:bg-[#F5E6D3]/10' 
                      : 'hover:bg-[#F5E6D3]/10'
                  }`}
                >
                  <ShoppingCart className={`w-5 h-5 ${
                    isScrolled ? 'text-[#F5E6D3]' : 'text-[#F5E6D3]'
                  }`} />
                </motion.div>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#C6A75E] text-[#3E2723] text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                      isScrolled 
                        ? 'hover:bg-[#F5E6D3]/10' 
                        : 'hover:bg-[#F5E6D3]/10'
                    }`}
                  >
                    {user?.avatar ? (
                      <ImageWithFallback
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                        fallbackClassName="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className={`w-5 h-5 ${
                        isScrolled ? 'text-[#F5E6D3]' : 'text-[#F5E6D3]'
                      }`} />
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      isProfileOpen ? 'rotate-180' : ''
                    } ${isScrolled ? 'text-[#F5E6D3]' : 'text-[#F5E6D3]'}`} />
                  </button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-[#3E2723] rounded-xl shadow-xl border border-[#C6A75E]/20 overflow-hidden"
                      >
                        <div className="p-3 border-b border-[#F5E6D3]/10">
                          <p className="text-[#F5E6D3] font-medium">{user?.name}</p>
                          <p className="text-[#D7B899] text-sm">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-3 text-[#F5E6D3] hover:bg-[#F5E6D3]/10 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-4 py-3 text-[#F5E6D3] hover:bg-[#F5E6D3]/10 transition-colors"
                          >
                            <Coffee className="w-4 h-4" />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-3 text-[#F5E6D3] hover:bg-red-500/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/login">
                    <Button 
                      variant="ghost" 
                      className={`${
                        isScrolled 
                          ? 'text-[#F5E6D3] hover:text-[#C6A75E] hover:bg-[#F5E6D3]/10' 
                          : 'text-[#F5E6D3] hover:text-[#C6A75E] hover:bg-[#F5E6D3]/10'
                      }`}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#F5E6D3] transition-all duration-300"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-full transition-colors ${
                  isScrolled 
                    ? 'hover:bg-[#F5E6D3]/10' 
                    : 'hover:bg-[#F5E6D3]/10'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className={`w-6 h-6 ${
                    isScrolled ? 'text-[#F5E6D3]' : 'text-[#F5E6D3]'
                  }`} />
                ) : (
                  <MenuIcon className={`w-6 h-6 ${
                    isScrolled ? 'text-[#F5E6D3]' : 'text-[#F5E6D3]'
                  }`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#3E2723] shadow-2xl"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className={`block py-3 text-lg font-medium transition-colors ${
                          isActive(link.path)
                            ? 'text-[#C6A75E]'
                            : 'text-[#F5E6D3] hover:text-[#C6A75E]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {!isAuthenticated && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="pt-4 border-t border-[#F5E6D3]/10"
                      >
                        <Link to="/login">
                          <Button 
                            variant="outline" 
                            className="w-full border-[#F5E6D3] text-[#F5E6D3] hover:bg-[#F5E6D3] hover:text-[#3E2723]"
                          >
                            Login
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link to="/register">
                          <Button 
                            className="w-full bg-[#C6A75E] text-[#3E2723] hover:bg-[#F5E6D3]"
                          >
                            Sign Up
                          </Button>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
