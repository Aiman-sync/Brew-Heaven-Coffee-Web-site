import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { products as staticProducts, featuredProducts as staticFeaturedProducts } from '@/data/products';
import type { Product } from '@/types';
// @ts-ignore
import { getProducts, getFeaturedProducts } from '@/api/productService';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(staticFeaturedProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to fetch from backend API
      const [productsRes, featuredRes] = await Promise.all([
        getProducts(),
        getFeaturedProducts()
      ]);
      
      if (productsRes.success && productsRes.data) {
        setProducts(productsRes.data);
      }
      
      if (featuredRes.success && featuredRes.data) {
        setFeaturedProducts(featuredRes.data);
      }
    } catch (err) {
      // If API fails, use static data (already set as default)
      console.log('Using static product data (API not available)');
      setError('Using offline data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        isLoading,
        error,
        refetch: fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
