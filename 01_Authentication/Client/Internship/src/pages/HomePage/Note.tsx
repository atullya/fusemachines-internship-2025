import React from "react";
//Store
interface CounterState {
  value: number;
}
interface UserState {
  isSignedIn: boolean;
}
// Action ->what it should do to state
//this is imp but is is just a pseudo code
//name of action     //payload:(it is optional) any data you want to send to action to peform job
// const increment={type:"INCREMENT",payload:1}
// const decrement={type:"DECREMENT",payload:1}
//in our case we don't need this payload because we don't wnat to increment state anything except by one
const increment = { type: "INCREMENT" };
const decrement = { type: "DECREMENT" };

//Reducers->responsible for taking a action and depending on type of action will actually go out and make update in redux store (it uses type of action and  knows what update to do and optionally  they use payload to do specific store)

//Reducer (#IMP concept -> they don't directly make an update to redux store )
// i.e  we are not allowed to directly mutate the state instead reducer take a state they make a copy of state and make change to that copy of the stae which will also have some unchanged property of the state and completely replace the state as a whole with the copy where changes are applied i.e we are not going to directly mutate the state

const Counter = () => {
  return <div></div>;
};

export default Counter;

// What is React Redux (Redux + React)
// Redux itself = a state management library.

// It gives you a “global store” → one place to keep and update important app-wide data (like user auth, cart, notifications, theme).
// It enforces predictable updates with “actions” (what happened) and “reducers” (how state changes).
// React Redux = the official library that lets React components interact with Redux.

// useSelector = read from store.
// useDispatch = send actions to update the store.
// 👉 Think of Redux as:

// Brain of your app → store holds the memory.
// Nerves (actions) → send signals/events.
// Muscles (reducers) → make changes predictably.
// Everything is hooked neatly into React via React-Redux.
