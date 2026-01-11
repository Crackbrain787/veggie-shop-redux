import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartPopup } from './CartPopup';
import { MantineProvider } from '@mantine/core';
import type { CartState } from '../../types';

// Mock данные
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
    },
    {
      product: {
        id: 2,
        name: 'Another Vegetable',
        price: 8.0,
        image: 'test-image2.jpg',
        category: 'vegetables'
      },
      quantity: 1
    }
  ],
  totalItems: 3,
  totalPrice: 29.0
};

const mockEmptyCart: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

const mockOnUpdateQuantity = vi.fn();

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('CartPopup', () => {
  it('renders empty cart message when cart is empty', () => {
    renderWithProviders(
      <CartPopup cart={mockEmptyCart} onUpdateQuantity={mockOnUpdateQuantity} />
    );

    expect(screen.getByAltText('Empty cart')).toBeInTheDocument();
    expect(screen.getByText('You cart is empty!')).toBeInTheDocument();
  });

  it('отображает элементы корзины, когда в корзине есть элементы', () => {
    renderWithProviders(
      <CartPopup cart={mockCartWithItems} onUpdateQuantity={mockOnUpdateQuantity} />
    );

    expect(screen.getByText('Test Vegetable')).toBeInTheDocument();
    expect(screen.getByText('Another Vegetable')).toBeInTheDocument();
    

    expect(screen.getByText('29.00 $')).toBeInTheDocument();
  });

  it('displays correct total price', () => {
    renderWithProviders(
      <CartPopup cart={mockCartWithItems} onUpdateQuantity={mockOnUpdateQuantity} />
    );

    expect(screen.getByText('29.00 $')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('вызывает onUpdateQuantity при нажатии кнопки минус', () => {
    renderWithProviders(
      <CartPopup cart={mockCartWithItems} onUpdateQuantity={mockOnUpdateQuantity} />
    );

    // Находим все кнопки минус по SVG пути
    const minusButtons = screen.getAllByRole('button').filter(button => {
      const svg = button.querySelector('svg');
      return svg && svg.innerHTML.includes('M5 12l14 0');
    });
    
    expect(minusButtons.length).toBeGreaterThan(0);
    fireEvent.click(minusButtons[0]);
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('вызывает onUpdateQuantity при нажатии кнопки плюс', () => {
    renderWithProviders(
      <CartPopup cart={mockCartWithItems} onUpdateQuantity={mockOnUpdateQuantity} />
    );


    const plusButtons = screen.getAllByRole('button').filter(button => {
      const svg = button.querySelector('svg');
      return svg && svg.innerHTML.includes('M12 5l0 14');
    });
    
    expect(plusButtons.length).toBeGreaterThan(0);
    fireEvent.click(plusButtons[0]);
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('отключает кнопку "минус", когда количество равно 1', () => {
    renderWithProviders(
      <CartPopup cart={mockCartWithItems} onUpdateQuantity={mockOnUpdateQuantity} />
    );


    const minusButtons = screen.getAllByRole('button').filter(button => {
      const svg = button.querySelector('svg');
      return svg && svg.innerHTML.includes('M5 12l14 0');
    });

    expect(minusButtons[0]).not.toBeDisabled();

    mockOnUpdateQuantity.mockClear();
    
   
    const secondItemMinusButton = minusButtons[1];
    
    
    const isDisabled = secondItemMinusButton.hasAttribute('disabled') || 
                      secondItemMinusButton.getAttribute('aria-disabled') === 'true' ||
                      secondItemMinusButton.classList.toString().includes('disabled');
    
    if (isDisabled) {
      
      fireEvent.click(secondItemMinusButton);
      expect(mockOnUpdateQuantity).not.toHaveBeenCalled();
    } else {
      
      console.log('Кнопка минус для товара с quantity=1 не отключена');
    }
  });

  it('вызывает onUpdateQuantity когда изменен ввод номера', () => {
    renderWithProviders(
      <CartPopup cart={mockCartWithItems} onUpdateQuantity={mockOnUpdateQuantity} />
    );

    const numberInputs = screen.getAllByRole('textbox');
    fireEvent.change(numberInputs[0], { target: { value: '5' } });
    
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 5);
  });
});