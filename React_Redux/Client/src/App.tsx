import { useState } from "react";

import "./App.css";
import TodoApp from "./components/TodoApp";
import Counter from "./components/Counter";

function App() {
  return (
    <>
      <TodoApp />
      <Counter/>
    </>
  );
}

export default App;
