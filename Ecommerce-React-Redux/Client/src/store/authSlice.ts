import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../services/apiServices";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

//defining state
interface AuthState {
  user: User | null;
  loading: boolean;
  authorize: boolean;
}
const initialState: AuthState = {
  user: null,
  loading: true,
  authorize: false,
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const userData = await apiService.checkAuth();
  return userData || null;
});
export const logout = createAsyncThunk("auth/logout", async () => {
  await apiService.logout();
  return null;
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorize = !!action.payload;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        (state.user = null), (state.authorize = false), (state.loading = false);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.authorize = false;
      });
  },
});

export default authSlice.reducer;
