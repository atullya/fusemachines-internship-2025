import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { addTodo, removeTodo, toggleTodo } from "../store/todoSlice";
const TodoApp = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log(todos);
  }, []);
  const [data, setFormData] = useState<string>("");
  const addTodos = () => {
    dispatch(addTodo(data));
    setFormData("");
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Todo"
        value={data}
        onChange={(e) => setFormData(e.target.value)}
      />
      <button onClick={addTodos}>Add Todo</button>
      {todos.map((item, index) => (
        <div key={index}>
          <li
            style={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            {" "}
            {item.title}
          </li>

          <button onClick={() => dispatch(toggleTodo(item.id))}>
            {!item.completed ? "Done" : "Undo"}
          </button>
          <button onClick={() => dispatch(removeTodo(item.id))}> ❌ </button>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
