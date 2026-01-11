import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { MantineProvider } from '@mantine/core';
import type { CartState } from '../../types';

const mockCartWithItems: CartState = {
  items: [
    {
      product: {
        id: 1,
        name: 'Test Vegetable',
        price: 10.5,
        image: 'test-image.jpg',
        category: 'vegetables'
      },
      quantity: 2
    }
  ],
  totalItems: 2,
  totalPrice: 21.0
};

const mockEmptyCart: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

const mockOnCartItemUpdate = vi.fn();
const mockOnCartItemRemove = vi.fn();
const mockOnClearCart = vi.fn();

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('Header', () => {
  it('корректное отображение текста логотипа', () => {
    renderWithProviders(
      <Header 
        cart={mockEmptyCart}
        onCartItemUpdate={mockOnCartItemUpdate}
        onCartItemRemove={mockOnCartItemRemove}
        onClearCart={mockOnClearCart}
      />
    );

    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
  });

  it('отображает кнопку корзины с правильным текстом', () => {
    renderWithProviders(
      <Header 
        cart={mockEmptyCart}
        onCartItemUpdate={mockOnCartItemUpdate}
        onCartItemRemove={mockOnCartItemRemove}
        onClearCart={mockOnClearCart}
      />
    );

    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('отображает значок количества товаров, когда в корзине есть товары', () => {
    renderWithProviders(
      <Header 
        cart={mockCartWithItems}
        onCartItemUpdate={mockOnCartItemUpdate}
        onCartItemRemove={mockOnCartItemRemove}
        onClearCart={mockOnClearCart}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('не отображает значок количества товаров, когда корзина пуста', () => {
    renderWithProviders(
      <Header 
        cart={mockEmptyCart}
        onCartItemUpdate={mockOnCartItemUpdate}
        onCartItemRemove={mockOnCartItemRemove}
        onClearCart={mockOnClearCart}
      />
    );

    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('открывает всплывающее окно корзины при нажатии на кнопку корзины', () => {
    renderWithProviders(
      <Header 
        cart={mockCartWithItems}
        onCartItemUpdate={mockOnCartItemUpdate}
        onCartItemRemove={mockOnCartItemRemove}
        onClearCart={mockOnClearCart}
      />
    );

    const cartButton = screen.getByText('Cart').closest('button');
    fireEvent.click(cartButton!);

    expect(screen.getByText('Test Vegetable')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('закрывает всплывающее окно корзины при повторном нажатии на кнопку корзины', () => {
    renderWithProviders(
      <Header 
        cart={mockCartWithItems}
        onCartItemUpdate={mockOnCartItemUpdate}
        onCartItemRemove={mockOnCartItemRemove}
        onClearCart={mockOnClearCart}
      />
    );

    const cartButton = screen.getByText('Cart').closest('button');
    
    fireEvent.click(cartButton!);
    expect(screen.getByText('Test Vegetable')).toBeInTheDocument();
    
    
    fireEvent.click(cartButton!);
    expect(screen.queryByText('Test Vegetable')).not.toBeInTheDocument();
  });
});