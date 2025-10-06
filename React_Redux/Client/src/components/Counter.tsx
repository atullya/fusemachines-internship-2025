
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from "../store/store";
import { decrement, increment, incrementByAmount } from '../store/counterSlice';


const Counter = () => {
    const count=useSelector((state: RootState) => state.counter.value);
     const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
        <h1>This is the counter state</h1>
        {count}
        <button onClick={()=>dispatch(increment())}>Add</button>
        <button onClick={()=>dispatch(decrement())}>Subtract</button>
        <button onClick={()=>dispatch(incrementByAmount(10))}>Increase with 10</button>
      
    </div>
  )
}

export default Counter
