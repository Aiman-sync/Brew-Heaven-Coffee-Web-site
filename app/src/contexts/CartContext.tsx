import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem, Product, SelectedOption } from '@/types';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number, size?: string, options?: SelectedOption[]) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('brewhaven_cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch {
        localStorage.removeItem('brewhaven_cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('brewhaven_cart', JSON.stringify(items));
  }, [items]);

  const calculateItemPrice = (item: CartItem): number => {
    let price = item.product.price;
    
    // Add size price difference if applicable
    if (item.size && item.product.sizes) {
      const sizeOption = item.product.sizes.find(s => s.name === item.size);
      if (sizeOption) {
        price = sizeOption.price;
      }
    }
    
    // Add options price
    if (item.options) {
      item.options.forEach(opt => {
        price += opt.price;
      });
    }
    
    return price * item.quantity;
  };

  const addToCart = (
    product: Product, 
    quantity: number = 1, 
    size?: string, 
    options?: SelectedOption[]
  ) => {
    setItems(prevItems => {
      // Check if item already exists with same product, size, and options
      const existingItemIndex = prevItems.findIndex(item => {
        const sameProduct = item.product._id === product._id;
        const sameSize = item.size === size;
        const sameOptions = JSON.stringify(item.options) === JSON.stringify(options);
        return sameProduct && sameSize && sameOptions;
      });

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Updated ${product.name} quantity`);
        return updatedItems;
      } else {
        // Add new item
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { product, quantity, size, options }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.product._id === productId);
      if (item) {
        toast.success(`Removed ${item.product.name} from cart`);
      }
      return prevItems.filter(item => item.product._id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.product._id === productId);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    return sum + calculateItemPrice(item);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
