import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import authReducer from "./authSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
