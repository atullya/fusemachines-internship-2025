import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../services/cartServices";

// ---- THUNKS ---- //
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const res = await cartService.getCart();

  return {
    cart: res?.items?.cart || { items: [] },
    totalPrice: res?.items?.totalPrice || 0,
  };
});

export const addToCart = createAsyncThunk(
  "cart/add-to-cart",
  async (
    { productId, quantity = 1 }: { productId: string; quantity?: number },
  ) => {
    const res = await cartService.addToCart(productId, quantity);
    return {
      cart: res?.items?.cart || { items: [] },
      totalPrice: res?.items?.totalPrice || 0,
    };
  }
);

interface CartItem {
  productId: any; 
  quantity: number;
}

interface Cart {
  userId: string;
  items: CartItem[];
}

interface CartState {
  cart: Cart | null;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

// ---- INITIAL STATE ---- //
const initialState: CartState = {
  cart: null,
  totalPrice: 0,
  loading: true,
  error: null,
};

// ---- SLICE ---- //
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
        state.loading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      });
  },
});

export default cartSlice.reducer;