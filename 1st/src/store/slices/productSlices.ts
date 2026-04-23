import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

// 1. Define the Product Type
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface ProductState {
  items: Product[];
  filteredItems: Product[]; // Used for sorting/filtering
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  status: 'idle',
};

// 2. Fetching Logic (AsyncThunk)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // You can replace this URL with your local JSON path or FakeStoreAPI
  const response = await fetch('https://fakestoreapi.com/products');
  return (await response.json()) as Product[];
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // 3. Sorting Logic
    sortProducts: (state, action: PayloadAction<'high-to-low' | 'low-to-high' | 'name'>) => {
      const type = action.payload;
      if (type === 'low-to-high') {
        state.filteredItems.sort((a, b) => a.price - b.price);
      } else if (type === 'high-to-low') {
        state.filteredItems.sort((a, b) => b.price - a.price);
      } else if (type === 'name') {
        state.filteredItems.sort((a, b) => a.title.localeCompare(b.title));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload; // Set both initially
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { sortProducts } = productSlice.actions;
export default productSlice.reducer;