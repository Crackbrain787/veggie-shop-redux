import { useState, useCallback } from 'react';
import type { Product, CartItem, CartState } from '../types';

export function useCart() {
  const [cart, setCart] = useState<CartState>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart((prev: CartState) => {
      const existingItemIndex = prev.items.findIndex(
        (item: CartItem) => item.product.id === product.id
      );
      
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        newItems = prev.items.map((item: CartItem, index: number) => 
          index === existingItemIndex 
            ? { 
                ...item, 
                quantity: item.quantity + quantity 
              }
            : item
        );
      } else {
        newItems = [...prev.items, { product, quantity }];
      }

      const totalItems = newItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum: number, item: CartItem) => sum + (item.product.price * item.quantity), 
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  }, []);

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCart((prev: CartState) => {
      let newItems: CartItem[];
      
      if (newQuantity <= 0) {
        newItems = prev.items.filter((item: CartItem) => item.product.id !== productId);
      } else {
        newItems = prev.items.map((item: CartItem) =>
          item.product.id === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        );
      }

      const totalItems = newItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum: number, item: CartItem) => sum + (item.product.price * item.quantity), 
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev: CartState) => {
      const newItems = prev.items.filter((item: CartItem) => item.product.id !== productId);
      const totalItems = newItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum: number, item: CartItem) => sum + (item.product.price * item.quantity), 
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  }, []);

  const clearCart = useCallback(() => {
  setCart({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
}, []);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}