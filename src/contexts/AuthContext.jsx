
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AuthService } from '@/services/AuthService';
import { OrderService } from '@/services/OrderService';
import { Order } from '@/models/Order';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user on app load
    const currentUser = AuthService.getCurrentUser();
    const storedOrders = OrderService.getOrders();
    
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    if (storedOrders) {
      setOrders(storedOrders);
    }
    setIsLoading(false);
  }, []);

  const addOrder = (orderData) => {
    const newOrder = new Order(
      Date.now().toString(),
      user?.userId,
      orderData.items,
      orderData.total,
      new Date().toISOString(),
      'completed',
      'active',
      orderData.shippingInfo,
      orderData.paymentInfo
    );
    
    OrderService.saveOrder(newOrder);
    const updatedOrders = [newOrder.toJSON(), ...orders];
    setOrders(updatedOrders);
  };

  const cancelOrder = (orderId) => {
    const result = OrderService.cancelOrder(orderId);
    if (result.success) {
      const updatedOrders = OrderService.getOrders();
      setOrders(updatedOrders);
      
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled and payment refunded",
      });
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await AuthService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${result.user.name}!`,
        });
      } else {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        });
      }
      
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const result = await AuthService.register(name, email, password);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        
        toast({
          title: "Registration successful",
          description: `Welcome, ${result.user.name}!`,
        });
      } else {
        toast({
          title: "Registration failed",
          description: result.error,
          variant: "destructive",
        });
      }
      
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setOrders([]);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    orders,
    login,
    register,
    logout,
    addOrder,
    cancelOrder
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
