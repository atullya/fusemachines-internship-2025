import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

//defining state
interface CounterState{
    value:number
}
const initialState:CounterState={
    value:0
}
// for async task
export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);
//creating slice
const counterSlice=createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1
        },
        decrement:(state)=>{
            state.value-=1
        },
           incrementByAmount: (state, action:PayloadAction<number>) => {
      state.value += action.payload;
    },
    },
    //for async task
    extraReducers:(builder)=>{
        builder.addCase(incrementAsync.pending,()=>{
            console.log("incrementAsync.Pending")
        }).addCase(incrementAsync.fulfilled,(state,action:PayloadAction<number>)=>{
            state.value+=action.payload
        })
    }

})



export const{increment, decrement,incrementByAmount }=counterSlice.actions;
export default counterSlice.reducer