import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
} from "@/store/counter/counterSlice";
import type { AppDispatch, RootState } from "@/store/store"; // 👈 use 'import type'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const [amount, setAmount] = useState(0);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>(); //<AppDispatch for async task

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementAsync(10))}>
        Increment Async
      </button>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
      />
      <button onClick={() => dispatch(incrementByAmount(amount))}>
        Add Amount
      </button>
    </div>
  );
};

export default Counter;
