import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data: Product[] = await response.json();
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки продуктов';
      return rejectWithValue(errorMessage);
    }
  }
);

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Ошибка загрузки продуктов';
      });
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;