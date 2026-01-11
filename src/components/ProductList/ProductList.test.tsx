import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductList } from './ProductList';
import { MantineProvider } from '@mantine/core';
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

const mockOnAddToCart = vi.fn();

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('ProductList', () => {
  it('отображает название каталога', () => {
    renderWithProviders(
      <ProductList products={mockProducts} onAddToCart={mockOnAddToCart} />
    );

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('отображает все продукты в списке', () => {
    renderWithProviders(
      <ProductList products={mockProducts} onAddToCart={mockOnAddToCart} />
    );

    expect(screen.getByText('Carrot')).toBeInTheDocument();
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText('Cucumber')).toBeInTheDocument();
    expect(screen.getByText('Potato')).toBeInTheDocument();
  });

  it('отображает правильное количество карточек товаров', () => {
    renderWithProviders(
      <ProductList products={mockProducts} onAddToCart={mockOnAddToCart} />
    );

    const productCards = screen.getAllByText(/Carrot|Tomato|Cucumber|Potato/);
    expect(productCards).toHaveLength(4);
  });

  it('отображает пустое состояние, когда продукты не предоставляются', () => {
    renderWithProviders(
      <ProductList products={[]} onAddToCart={mockOnAddToCart} />
    );

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.queryByText('Carrot')).not.toBeInTheDocument();
  });
});