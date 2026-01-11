import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCart } from './useCart'
import type { Product } from '../types'  

// Mock данные для тестов
const mockProduct: Product = {
  id: 1,
  name: 'Test Vegetable',
  price: 10.0,
  image: 'test.jpg',
  category: 'vegetables'
}

describe('useCart', () => {
  it('следует инициализировать с пустой корзиной', () => {
    const { result } = renderHook(() => useCart())

    expect(result.current.cart.items).toHaveLength(0)
    expect(result.current.cart.totalItems).toBe(0)
    expect(result.current.cart.totalPrice).toBe(0)
  })

  it('необходимо добавить товар в корзину', () => {
    const { result } = renderHook(() => useCart())

    act(() => {
      result.current.addToCart(mockProduct, 2)
    })

    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.items[0].product).toEqual(mockProduct)
    expect(result.current.cart.items[0].quantity).toBe(2)
    expect(result.current.cart.totalItems).toBe(2)
    expect(result.current.cart.totalPrice).toBe(20.0)
  })
})