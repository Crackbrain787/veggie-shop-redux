import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import { MantineProvider } from '@mantine/core'
import type { Product } from '../../types'

const mockProduct: Product = {
  id: 1,
  name: 'Test Vegetable',
  price: 15.99,
  image: 'test-image.jpg',
  category: 'vegetables'
};

const mockOnAddToCart = vi.fn();

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('ProductCard', () => {
 

  it('увеличивает количество при нажатии кнопки "плюс"', () => {
    renderWithProviders(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

 
    const plusButton = screen.getAllByRole('button').find(button => {
      const svg = button.querySelector('svg');
      return svg && svg.innerHTML.includes('M12 5l0 14'); 
    });
    
    expect(plusButton).toBeDefined();
    fireEvent.click(plusButton!);

    const numberInput = screen.getByDisplayValue('2');
    expect(numberInput).toBeInTheDocument();
  });

  it('уменьшает кол-во при нажатии "минус"', () => {
    renderWithProviders(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

   
    const plusButton = screen.getAllByRole('button').find(button => {
      const svg = button.querySelector('svg');
      return svg && svg.innerHTML.includes('M12 5l0 14');
    });
    fireEvent.click(plusButton!);

 
    const minusButton = screen.getAllByRole('button').find(button => {
      const svg = button.querySelector('svg');
      return svg && svg.innerHTML.includes('M5 12l14 0');
    });
    expect(minusButton).toBeDefined();
    fireEvent.click(minusButton!);

    const numberInput = screen.getByDisplayValue('1');
    expect(numberInput).toBeInTheDocument();
  });

  it('не уменьшается ниже 1', () => {
    renderWithProviders(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const minusButton = screen.getAllByRole('button').find(button => {
      const svg = button.querySelector('svg');
      return svg && svg.innerHTML.includes('M5 12l14 0');
    });
    
 
    expect(minusButton).toBeDefined();
    expect(minusButton).toBeDisabled();
  });

  it('сбрасывает количество до 1 после добавления в корзину', () => {
    renderWithProviders(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

   
    const plusButton = screen.getAllByRole('button').find(button => {
      const svg = button.querySelector('svg');
      return svg && svg.innerHTML.includes('M12 5l0 14');
    });
    
    expect(plusButton).toBeDefined();
    fireEvent.click(plusButton!);
    fireEvent.click(plusButton!);
    

    const addToCartButton = screen.getByText('Add to cart');
    fireEvent.click(addToCartButton);

  
    const numberInput = screen.getByDisplayValue('1');
    expect(numberInput).toBeInTheDocument();
  });
});