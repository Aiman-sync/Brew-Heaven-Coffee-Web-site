import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginCredentials, RegisterData } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy user for demo
const DUMMY_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
  phone: '(555) 123-4567',
};

const ADMIN_USER: User = {
  id: '2',
  name: 'Admin User',
  email: 'admin@brewhaven.com',
  role: 'admin',
  avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
  phone: '(555) 987-6543',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const storedUser = localStorage.getItem('brewhaven_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('brewhaven_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login logic
      let loggedInUser: User;
      if (credentials.email === 'admin@brewhaven.com' && credentials.password === 'admin123') {
        loggedInUser = ADMIN_USER;
      } else if (credentials.email === 'john@example.com' && credentials.password === 'user123') {
        loggedInUser = DUMMY_USER;
      } else {
        // For demo, accept any email/password and create a user
        loggedInUser = {
          id: Math.random().toString(36).substr(2, 9),
          name: credentials.email.split('@')[0],
          email: credentials.email,
          role: 'user',
        };
      }
      
      setUser(loggedInUser);
      localStorage.setItem('brewhaven_user', JSON.stringify(loggedInUser));
      toast.success(`Welcome back, ${loggedInUser.name}!`);
    } catch (error) {
      toast.error('Login failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        email: data.email,
        role: 'user',
        phone: data.phone,
      };
      
      setUser(newUser);
      localStorage.setItem('brewhaven_user', JSON.stringify(newUser));
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('brewhaven_user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('brewhaven_user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
