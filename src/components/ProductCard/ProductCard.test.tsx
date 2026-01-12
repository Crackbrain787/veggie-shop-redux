import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ProductCard } from './ProductCard';
import { MantineProvider } from '@mantine/core';
import cartReducer from '../../store/slices/cartSlice';
import type { Product } from '../../types';

const mockProduct: Product = {
  id: 1,
  name: 'Test Vegetable',
  price: 15.99,
  image: 'test-image.jpg',
  category: 'vegetables'
};

const createMockStore = () => {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState: {
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

describe('ProductCard', () => {
  it('отображает название и цену товара', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Vegetable')).toBeInTheDocument();
    expect(screen.getByText('15.99 $')).toBeInTheDocument();
  });

  it('увеличивает количество при нажатии кнопки "плюс"', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
  
    const buttons = screen.getAllByRole('button');
    
   
    const plusButton = buttons[1];
    
    fireEvent.click(plusButton);
    

    const numberInput = screen.getByDisplayValue('2');
    expect(numberInput).toBeInTheDocument();
  });
});