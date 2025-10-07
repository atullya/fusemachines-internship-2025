import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../services/productServices";
import { act } from "react";

export const fetchAllProduct = createAsyncThunk(
  "product/fetchAll",
  async () => {
    const res = await productService.getAllProduct();
    console.log(res);
    return res.product || null;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id: string) => {
    const res = await productService.getProductById(id);
    return res;
  }
);

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}
const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      });
  },
});

export default productSlice.reducer;
