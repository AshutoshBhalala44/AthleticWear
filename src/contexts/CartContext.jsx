
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CartService } from '@/services/CartService';
import { ProductStore } from '@/stores/ProductStore';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadedCart = CartService.loadCart();
    setCart(loadedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart) {
      CartService.saveCart(cart);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    // Check stock before adding
    if (!ProductStore.checkProductStock(product.productId, quantity)) {
      toast({
        title: "Insufficient stock",
        description: `Only ${product.stock || 0} items available`,
        variant: "destructive",
      });
      return false;
    }

    setCart(prev => {
      const newCart = new (prev.constructor)(prev.cartId, [...prev.items]);
      
      const existingItem = newCart.items.find(item => 
        item.productId === product.productId && 
        (item.selectedSize || 'default') === (product.selectedSize || 'default')
      );
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (!ProductStore.checkProductStock(product.productId, newQuantity)) {
          toast({
            title: "Insufficient stock",
            description: `Only ${product.stock || 0} items available`,
            variant: "destructive",
          });
          return prev;
        }
        newCart.updateQuantity(product.productId, product.selectedSize, newQuantity);
      } else {
        newCart.addItem(product, quantity, product.selectedSize);
      }
      
      return newCart;
    });

    toast({
      title: "Added to cart",
      description: `${product.name}${product.selectedSize ? ` (${product.selectedSize})` : ''} added to cart`,
    });
    return true;
  };

  const removeFromCart = (productId, selectedSize = null) => {
    setCart(prev => {
      const newCart = new (prev.constructor)(prev.cartId, [...prev.items]);
      newCart.removeItem(productId, selectedSize);
      return newCart;
    });
    
    toast({
      title: "Removed from cart",
      description: "Item removed from cart",
    });
  };

  const updateQuantity = (productId, selectedSize = null, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    // Check stock before updating
    if (!ProductStore.checkProductStock(productId, quantity)) {
      toast({
        title: "Insufficient stock",
        description: "Not enough items in stock",
        variant: "destructive",
      });
      return;
    }

    setCart(prev => {
      const newCart = new (prev.constructor)(prev.cartId, [...prev.items]);
      newCart.updateQuantity(productId, selectedSize, quantity);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart(prev => {
      const newCart = new (prev.constructor)(prev.cartId, []);
      return newCart;
    });
    CartService.clearCart();
    
    toast({
      title: "Cart cleared",
      description: "All items removed from cart",
    });
  };

  // Provide the interface expected by components
  const value = {
    cartItems: cart?.items || [],
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalAmount: () => cart?.getTotalAmount() || 0,
    getCartCount: () => cart?.getCartCount() || 0,
    getShipping: () => cart?.getShipping() || 0,
    getFinalTotal: () => cart?.getFinalTotal() || 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
