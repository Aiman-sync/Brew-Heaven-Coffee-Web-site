import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Coffee, 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/location', label: 'Location' },
    { path: '/login', label: 'Login' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-[#1A0F0A] text-[#F5E6D3] relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6A75E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Coffee className="w-8 h-8 text-[#C6A75E]" />
              <span className="font-serif text-2xl font-bold">Brew Haven</span>
            </Link>
            <p className="text-[#D7B899] mb-6 leading-relaxed">
              Crafting moments of pure coffee bliss since 2009. Every cup tells a story of passion, quality, and warmth.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[#3E2723] flex items-center justify-center text-[#D7B899] hover:bg-[#C6A75E] hover:text-[#3E2723] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-serif text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#D7B899] hover:text-[#C6A75E] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-serif text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C6A75E] mt-0.5 flex-shrink-0" />
                <span className="text-[#D7B899]">
                  123 Coffee Street<br />
                  Brew City, BC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C6A75E] flex-shrink-0" />
                <a 
                  href="tel:+15551234567" 
                  className="text-[#D7B899] hover:text-[#C6A75E] transition-colors"
                >
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C6A75E] flex-shrink-0" />
                <a 
                  href="mailto:hello@brewhaven.com" 
                  className="text-[#D7B899] hover:text-[#C6A75E] transition-colors"
                >
                  hello@brewhaven.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C6A75E] mt-0.5 flex-shrink-0" />
                <span className="text-[#D7B899]">
                  Mon - Sun: 7AM - 8PM
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-serif text-xl font-semibold mb-6">Newsletter</h3>
            <p className="text-[#D7B899] mb-4">
              Subscribe for exclusive offers, new menu updates, and coffee tips!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#3E2723] border-[#D7B899]/30 text-[#F5E6D3] placeholder:text-[#D7B899]/50 focus:border-[#C6A75E]"
                required
              />
              <Button 
                type="submit"
                className="w-full bg-[#C6A75E] text-[#3E2723] hover:bg-[#F5E6D3] transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-[#F5E6D3]/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#D7B899] text-sm">
              &copy; {new Date().getFullYear()} Brew Haven. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="#" className="text-[#D7B899] hover:text-[#C6A75E] transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-[#D7B899] hover:text-[#C6A75E] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
