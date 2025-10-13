import { apiService } from "@/services/apiServices";
import {createAsyncThunk, createSlice } from "@reduxjs/toolkit"


interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
}
// state
interface AuthState{
    user:User | null
    loading:boolean
    authorize:boolean
}
const initialState:AuthState={
    user:null,
    loading:true,
    authorize:false
}

//Async task (for api calls)
export const checkAuth=createAsyncThunk("auth/checkAuth",async()=>{
    const userData=await apiService.checkAuth();
    return userData || null
})

export const logout=createAsyncThunk("auth/logout",async()=>{
    await apiService.logout();
    return null
})

//slice
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(checkAuth.pending,(state)=>{
            state.loading=true
        }).addCase(checkAuth.fulfilled,(state,action)=>{
        state.user = action.payload;
        state.authorize = !!action.payload;
        state.loading = false;
        }).addCase(checkAuth.rejected,(state)=>{
        state.user = null;
        state.authorize = false;
        state.loading = false;
        })
        .addCase(logout.fulfilled,(state)=>{
              state.user = null;
        state.authorize = false;
        })
    }
})

export default authSlice.reducer;