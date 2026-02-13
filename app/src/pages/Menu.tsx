import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, categories } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ImageWithFallback from '@/components/ImageWithFallback';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Product, SelectedOption } from '@/types';

// Product Card Component
function ProductCard({ 
  product, 
  onAddToCart 
}: { 
  product: Product; 
  onAddToCart: (product: Product) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          fallbackClassName="rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="absolute top-3 left-3 bg-[#C6A75E] text-[#3E2723] px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}

        {/* Quick Add Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-[#C6A75E] text-[#3E2723] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-lg font-bold text-[#3E2723]">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#C6A75E] fill-[#C6A75E]" />
            <span className="text-sm text-[#5D4037]">{product.rating}</span>
          </div>
        </div>

        <p className="text-[#5D4037] text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-serif text-xl font-bold text-[#C6A75E]">
              ${product.price.toFixed(2)}
            </span>
            {product.sizes && product.sizes.length > 0 && (
              <span className="text-xs text-[#D7B899] ml-1">
                from
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className="bg-[#3E2723] text-[#F5E6D3] hover:bg-[#C6A75E] hover:text-[#3E2723] transition-colors"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Product Detail Modal
function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, options?: SelectedOption[]) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize || undefined, selectedOptions);
    onClose();
    setQuantity(1);
    setSelectedSize('');
    setSelectedOptions([]);
  };

  const handleOptionChange = (optionName: string, choice: { name: string; price: number }) => {
    setSelectedOptions(prev => {
      const filtered = prev.filter(o => o.name !== optionName);
      return [...filtered, { name: optionName, choice: choice.name, price: choice.price }];
    });
  };

  const totalPrice = () => {
    let price = product.price;
    if (selectedSize && product.sizes) {
      const size = product.sizes.find(s => s.name === selectedSize);
      if (size) price = size.price;
    }
    selectedOptions.forEach(opt => {
      price += opt.price;
    });
    return price * quantity;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#FAF7F2] border-[#D7B899]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-[#3E2723]">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
              fallbackClassName="h-64"
            />
          </div>

          <div>
            <p className="text-[#5D4037] mb-4">{product.description}</p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <label className="text-sm font-medium text-[#3E2723] mb-2 block">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedSize === size.name
                          ? 'bg-[#C6A75E] text-[#3E2723]'
                          : 'bg-white border border-[#D7B899] text-[#5D4037] hover:border-[#C6A75E]'
                      }`}
                    >
                      {size.name} ({size.volume}) - ${size.price.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Options */}
            {product.options && product.options.map((option) => (
              <div key={option.name} className="mb-4">
                <label className="text-sm font-medium text-[#3E2723] mb-2 block">
                  {option.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.choices.map((choice) => (
                    <button
                      key={choice.name}
                      onClick={() => handleOptionChange(option.name, choice)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedOptions.find(o => o.name === option.name)?.choice === choice.name
                          ? 'bg-[#C6A75E] text-[#3E2723]'
                          : 'bg-white border border-[#D7B899] text-[#5D4037] hover:border-[#C6A75E]'
                      }`}
                    >
                      {choice.name}
                      {choice.price > 0 && ` +$${choice.price.toFixed(2)}`}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-4">
              <label className="text-sm font-medium text-[#3E2723] mb-2 block">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-white border border-[#D7B899] flex items-center justify-center hover:border-[#C6A75E]"
                >
                  -
                </button>
                <span className="font-medium text-[#3E2723] w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white border border-[#D7B899] flex items-center justify-center hover:border-[#C6A75E]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total & Add to Cart */}
            <div className="flex items-center justify-between pt-4 border-t border-[#D7B899]">
              <div>
                <span className="text-sm text-[#5D4037]">Total</span>
                <div className="font-serif text-2xl font-bold text-[#C6A75E]">
                  ${totalPrice().toFixed(2)}
                </div>
              </div>
              <Button
                onClick={handleAddToCart}
                className="bg-[#3E2723] text-[#F5E6D3] hover:bg-[#C6A75E] hover:text-[#3E2723]"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main Menu Component
export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    if (product.sizes?.length || product.options?.length) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } else {
      addToCart(product);
      toast.success(`Added ${product.name} to cart`);
    }
  };

  const handleModalAddToCart = (
    product: Product, 
    quantity: number, 
    size?: string, 
    options?: SelectedOption[]
  ) => {
    addToCart(product, quantity, size, options);
    toast.success(`Added ${quantity} x ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-[#C6A75E] font-medium tracking-wide uppercase text-sm">
            Our Selection
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3E2723] mt-4 mb-4">
            Our Menu
          </h1>
          <p className="text-[#5D4037] max-w-2xl mx-auto">
            Discover our carefully curated selection of coffees and treats, crafted with passion and served with love.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7B899]" />
            <Input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-[#D7B899] focus:border-[#C6A75E] text-[#3E2723]"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#C6A75E] text-[#3E2723]'
                : 'bg-white text-[#5D4037] hover:bg-[#C6A75E]/20 border border-[#D7B899]'
            }`}
          >
            All Items
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#C6A75E] text-[#3E2723]'
                  : 'bg-white text-[#5D4037] hover:bg-[#C6A75E]/20 border border-[#D7B899]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-[#D7B899]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-[#D7B899]" />
            </div>
            <h3 className="font-serif text-xl text-[#3E2723] mb-2">No items found</h3>
            <p className="text-[#5D4037]">Try adjusting your search or filter</p>
          </motion.div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleModalAddToCart}
      />
    </div>
  );
}
