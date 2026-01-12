import { describe, it, expect } from 'vitest';
import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Header } from './Header';
import cartReducer from '../../store/slices/cartSlice';
import { MantineProvider } from '@mantine/core';

const createMockStore = (withItems = false) => {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState: {
      cart: withItems ? {
        items: [{
          product: {
            id: 1,
            name: 'Test Vegetable',
            price: 10.5,
            image: 'test-image.jpg',
            category: 'vegetables'
          },
          quantity: 2
        }],
        totalItems: 2,
        totalPrice: 21.0
      } : {
        items: [],
        totalItems: 0,
        totalPrice: 0
      }
    }
  });
};

const renderWithProviders = (component: React.ReactNode, withItems = false) => {
  const store = createMockStore(withItems);
  return render(
    <MantineProvider>
      <Provider store={store}>
        {component}
      </Provider>
    </MantineProvider>
  );
};

describe('Header', () => {
  it('корректное отображение текста логотипа', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
  });

  it('отображает кнопку корзины с правильным текстом', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('отображает значок количества товаров, когда в корзине есть товары', () => {
    renderWithProviders(<Header />, true);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('не отображает значок количества товаров, когда корзина пуста', () => {
    renderWithProviders(<Header />);
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });
});