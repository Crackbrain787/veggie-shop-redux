import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ProductList } from './ProductList';
import { MantineProvider } from '@mantine/core';
import productsReducer from '../../store/slices/productsSlice';
import cartReducer from '../../store/slices/cartSlice';
import type { Product } from '../../types';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Carrot',
    price: 2.99,
    image: 'carrot.jpg',
    category: 'vegetables'
  },
  {
    id: 2,
    name: 'Tomato',
    price: 3.49,
    image: 'tomato.jpg',
    category: 'vegetables'
  },
  {
    id: 3,
    name: 'Cucumber',
    price: 1.99,
    image: 'cucumber.jpg',
    category: 'vegetables'
  },
  {
    id: 4,
    name: 'Potato',
    price: 4.99,
    image: 'potato.jpg',
    category: 'vegetables'
  }
];

const createMockStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer
    },
    preloadedState: {
      products: {
        items: mockProducts,
        loading: false,
        error: null
      },
      cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0
      }
    }
  });
};

const renderWithProviders = (component: React.ReactNode) => {
  const store = createMockStore();
  return render(
    <MantineProvider>
      <Provider store={store}>
        {component}
      </Provider>
    </MantineProvider>
  );
};

describe('ProductList', () => {
  it('отображает название каталога', () => {
    renderWithProviders(<ProductList />);
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('отображает все продукты в списке', () => {
    renderWithProviders(<ProductList />);
    
    expect(screen.getByText('Carrot')).toBeInTheDocument();
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText('Cucumber')).toBeInTheDocument();
    expect(screen.getByText('Potato')).toBeInTheDocument();
  });

  it('отображает правильное количество карточек товаров', () => {
    renderWithProviders(<ProductList />);
    
    const productCards = screen.getAllByText(/Carrot|Tomato|Cucumber|Potato/);
    expect(productCards).toHaveLength(4);
  });
});