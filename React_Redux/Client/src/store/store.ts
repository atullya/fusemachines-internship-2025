import {configureStore} from "@reduxjs/toolkit"
import todoReducer from "./todoSlice";
import counterReducer from './counterSlice'
export const store=configureStore({
    reducer:{
        todo:todoReducer,
        counter:counterReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
