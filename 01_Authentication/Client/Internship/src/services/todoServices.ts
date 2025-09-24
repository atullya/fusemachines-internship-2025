import axios from "axios"

const API_BASE_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies (JWT in cookies)
  headers: {
    "Content-Type": "application/json",
  },
});

interface SubTodoType {
  title: string;
  description: string;
  isCompleted?: boolean;
}

interface TodoData {
  title: string;
  description: string;
  isCompleted?: boolean;
  subTodos?: SubTodoType[]; // array of subtasks, not just one
}

class TODOService {
  async request(config: any) {
    try {
      const response = await axiosInstance(config);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "An error occurred";
      throw new Error(message);
    }
  }

  createTodo(todoData: TodoData) {
    return this.request({
      url: '/v1/todo/create',
      method: 'POST',
      data: todoData,
    });
  }
  getAllTodo() {
    return this.request({
      url: '/v1/todo/read',
      method: 'GET',

    });
  }

deleteTodo(id:string){
    return this.request({
        url:`v1/todo/delete/${id}`,
        method:'DELETE'
    })
}
}

export const TodoService = new TODOService();