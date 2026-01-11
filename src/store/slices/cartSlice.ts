import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product, CartState } from '../../types';

const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );
  return { totalItems, totalPrice };
};


const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};


const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Ошибка сохранения корзины:', error);
  }
};


const initialItems = loadCartFromStorage();
const { totalItems, totalPrice } = calculateTotals(initialItems);

const initialState: CartState = {
  items: initialItems,
  totalItems,
  totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity }];
      }

      const { totalItems, totalPrice } = calculateTotals(newItems);
      state.items = newItems;
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      
      saveCartToStorage(newItems);
    },

    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      let newItems: CartItem[];

      if (quantity <= 0) {
        newItems = state.items.filter((item) => item.product.id !== productId);
      } else {
        newItems = state.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
      }

      const { totalItems, totalPrice } = calculateTotals(newItems);
      state.items = newItems;
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      
      saveCartToStorage(newItems);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const newItems = state.items.filter((item) => item.product.id !== productId);
      
      const { totalItems, totalPrice } = calculateTotals(newItems);
      state.items = newItems;
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      
      saveCartToStorage(newItems);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;