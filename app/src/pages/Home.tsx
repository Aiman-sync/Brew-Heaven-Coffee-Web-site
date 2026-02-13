import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Coffee, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageWithFallback from '@/components/ImageWithFallback';
import { featuredProducts } from '@/data/products';

// Hero Section
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0A]/90 via-[#1A0F0A]/70 to-transparent" />
      </motion.div>

      {/* Floating Coffee Beans */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-4 bg-[#C6A75E]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Coffee className="w-6 h-6 text-[#C6A75E]" />
            <span className="text-[#D7B899] font-medium tracking-wide uppercase text-sm">
              Est. 2009
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F5E6D3] mb-6 leading-tight"
          >
            Freshly Brewed{' '}
            <span className="text-[#C6A75E]">Happiness</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-[#D7B899] mb-8 leading-relaxed"
          >
            Experience the perfect blend of craftsmanship and flavor in every cup. 
            From ethically sourced beans to skilled baristas, we craft moments of pure coffee bliss.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/menu">
              <Button 
                size="lg"
                className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#F5E6D3] transition-all duration-300 text-lg px-8 py-6 animate-pulse-glow"
              >
                Order Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/menu">
              <Button 
                size="lg"
                variant="outline"
                className="border-[#F5E6D3] text-[#F5E6D3] hover:bg-[#F5E6D3] hover:text-[#3E2723] transition-all duration-300 text-lg px-8 py-6"
              >
                Explore Menu
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-[#F5E6D3]/20"
          >
            {[
              { value: '15+', label: 'Years of Excellence' },
              { value: '50+', label: 'Coffee Varieties' },
              { value: '10K+', label: 'Happy Customers' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C6A75E]">
                  {stat.value}
                </div>
                <div className="text-sm text-[#D7B899] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#F5E6D3]/50 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#C6A75E] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Coffee cup with latte art"
                className="w-full h-[500px] object-cover"
                fallbackClassName="w-full h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/30 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-[#3E2723] p-6 rounded-xl shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#C6A75E] rounded-full flex items-center justify-center">
                  <Coffee className="w-7 h-7 text-[#3E2723]" />
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-[#F5E6D3]">15+</div>
                  <div className="text-[#D7B899]">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C6A75E] font-medium tracking-wide uppercase text-sm">
              Our Story
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#3E2723] mt-4 mb-6">
              Crafting Perfection in Every Cup
            </h2>
            <p className="text-[#5D4037] text-lg leading-relaxed mb-6">
              At Brew Haven, we believe every cup tells a story. From ethically sourced beans 
              to the skilled hands of our baristas, we're dedicated to crafting moments of pure 
              coffee bliss. Our journey began with a simple passion for exceptional coffee and 
              has evolved into a community gathering place where memories are made.
            </p>
            <p className="text-[#5D4037] leading-relaxed mb-8">
              We partner directly with farmers across the world's best coffee-growing regions, 
              ensuring fair prices and sustainable practices. Every batch is roasted to perfection 
              in small quantities to preserve the unique characteristics of each origin.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { icon: Coffee, label: 'Premium Beans' },
                { icon: Clock, label: 'Fresh Daily' },
                { icon: Users, label: 'Expert Baristas' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-[#C6A75E]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <item.icon className="w-6 h-6 text-[#C6A75E]" />
                  </div>
                  <div className="text-sm text-[#5D4037] font-medium">{item.label}</div>
                </div>
              ))}
            </div>

            <Link to="/menu">
              <Button 
                className="bg-[#3E2723] text-[#F5E6D3] hover:bg-[#C6A75E] hover:text-[#3E2723] transition-all duration-300"
              >
                Explore Our Menu
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Featured Products Section
function FeaturedProducts() {
  return (
    <section className="py-24 bg-[#3E2723] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5E6D3' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C6A75E] font-medium tracking-wide uppercase text-sm">
            Our Menu
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5E6D3] mt-4">
            Featured Favorites
          </h2>
          <p className="text-[#D7B899] mt-4 max-w-2xl mx-auto">
            Discover our most loved creations, crafted with passion and served with a smile.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-lg card-hover">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    fallbackClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-[#C6A75E] text-[#3E2723] px-3 py-1 rounded-full font-bold">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-[#3E2723] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[#5D4037] text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#C6A75E] fill-[#C6A75E]" />
                      <span className="text-sm text-[#5D4037]">{product.rating}</span>
                    </div>
                    <Link to="/menu">
                      <Button 
                        size="sm"
                        className="bg-[#3E2723] text-[#F5E6D3] hover:bg-[#C6A75E] hover:text-[#3E2723]"
                      >
                        Order
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/menu">
            <Button 
              size="lg"
              className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#F5E6D3] transition-all duration-300"
            >
              View Full Menu
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Coffee Enthusiast',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'The best coffee in town! I come here every morning. The baristas know my order by heart and always greet me with a smile.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Designer',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'Amazing atmosphere and even better lattes. This is my go-to spot for creative work. The WiFi is fast and the ambiance is perfect.',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Marketing Manager',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'My favorite spot for meetings. Great service, quiet corners for discussions, and the pastries are absolutely delicious!',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C6A75E] font-medium tracking-wide uppercase text-sm">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#3E2723] mt-4">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-[#C6A75E] rounded-full flex items-center justify-center">
                <span className="text-[#3E2723] text-2xl font-serif">&ldquo;</span>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#C6A75E] fill-[#C6A75E]" />
                ))}
              </div>

              <p className="text-[#5D4037] mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  fallbackClassName="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-[#3E2723]">{testimonial.name}</div>
                  <div className="text-sm text-[#D7B899]">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-[#3E2723]/80" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5E6D3] mb-6">
            Ready to Experience the Perfect Cup?
          </h2>
          <p className="text-[#D7B899] text-lg mb-8 max-w-2xl mx-auto">
            Visit us today or order online for pickup. Your perfect coffee moment awaits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu">
              <Button 
                size="lg"
                className="bg-[#C6A75E] text-[#3E2723] hover:bg-[#F5E6D3] transition-all duration-300 text-lg px-8"
              >
                Order Online
              </Button>
            </Link>
            <Link to="/location">
              <Button 
                size="lg"
                variant="outline"
                className="border-[#F5E6D3] text-[#F5E6D3] hover:bg-[#F5E6D3] hover:text-[#3E2723] transition-all duration-300 text-lg px-8"
              >
                Find Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Home Component
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProducts />
      <Testimonials />
      <CTASection />
    </main>
  );
}
