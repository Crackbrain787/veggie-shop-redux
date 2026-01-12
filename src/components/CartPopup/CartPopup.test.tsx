import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CartPopup } from './CartPopup';
import cartReducer from '../../store/slices/cartSlice';
import { MantineProvider } from '@mantine/core';
import type { Product } from '../../types';

const mockProduct1: Product = {
  id: 1,
  name: 'Test Vegetable',
  price: 10.5,
  image: 'test-image.jpg',
  category: 'vegetables'
};

const mockProduct2: Product = {
  id: 2,
  name: 'Another Vegetable',
  price: 8.0,
  image: 'test-image2.jpg',
  category: 'vegetables'
};

const createMockStore = (withItems = false) => {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState: {
      cart: withItems ? {
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 }
        ],
        totalItems: 3,
        totalPrice: 29.0
      } : {
        items: [],
        totalItems: 0,
        totalPrice: 0
      }
    }
  });
};

const renderWithRedux = (component: React.ReactNode, withItems = false) => {
  const store = createMockStore(withItems);
  return render(
    <MantineProvider> 
      <Provider store={store}>
        {component}
      </Provider>
    </MantineProvider>
  );
};

describe('CartPopup', () => {
  it('отображает сообщение о пустой корзине, когда корзина пуста', () => {
    renderWithRedux(<CartPopup />);
    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });

  it('отображает элементы корзины, когда в корзине есть элементы', () => {
    renderWithRedux(<CartPopup />, true);
    expect(screen.getByText('Test Vegetable')).toBeInTheDocument();
    expect(screen.getByText('Another Vegetable')).toBeInTheDocument();
  });
});