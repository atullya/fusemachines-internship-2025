import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
//state
interface TodoState {
  todos: Todo[];
}
//initial state
const initialState: TodoState = {
  todos: [{ id: Date.now(), title: "test", completed: false }],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTodo:(state,action:PayloadAction<number>)=>{
         const todo= state.todos.find((v)=>v.id===action.payload)
         if(todo) todo.completed=!todo.completed
   
    },
    removeTodo:(state,action:PayloadAction<number>)=>{
    state.todos= state.todos.filter((v)=>v.id!==action.payload)
    }
  },
  
});
// Export actions
export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
