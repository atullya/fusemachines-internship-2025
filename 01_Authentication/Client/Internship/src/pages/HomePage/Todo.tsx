import { TodoService } from "@/services/todoServices";
import React, { useEffect, useState } from "react";

interface SubTodo {
  title: string;
  description: string;
}

interface TodoList {
  _id: string;
  title: string;
  description: string;
  subTodos?: SubTodo[];
}

const Todo = () => {
  const [todo, setTodo] = useState<TodoList[]>([]);

  useEffect(() => {
    getAllTodoList();
  }, []);

  // ------------------ GET ALL ------------------
  const getAllTodoList = async () => {
    try {
      const data = await TodoService.getAllTodo();
      console.log(data);
      if (data.success) {
        setTodo(data.todos);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ FORM STATE ------------------
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subTodos: [] as SubTodo[], // ✅ array of subtodos
  });

  // ------------------ FORM HANDLERS ------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // For subtodos
  const handleSubTodoChange = (index: number, field: string, value: string) => {
    const newSubs = [...formData.subTodos];
    newSubs[index] = { ...newSubs[index], [field]: value };
    setFormData({ ...formData, subTodos: newSubs });
  };

  const addSubTodoField = () => {
    setFormData({
      ...formData,
      subTodos: [...formData.subTodos, { title: "", description: "" }],
    });
  };

  // ------------------ SUBMIT ------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("👉 Sending:", formData);

    try {
      let res = await TodoService.createTodo(formData);
      console.log(res);
      if (res.success) {
        setFormData({ title: "", description: "", subTodos: [] });
        getAllTodoList();
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await TodoService.deleteTodo(id);
      if (res.success) {
        alert("Delete success");
        getAllTodoList();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ RENDER ------------------
  return (
    <div className="max-w-lg mx-auto p-6 font-sans">
      <h2 className="text-2xl font-bold text-center mb-6">Todo List</h2>

      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-4 rounded-lg mb-6 shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded p-2"
        />

        {/* Render SubTodo Inputs */}
        {formData.subTodos.map((sub, idx) => (
          <div key={idx} className="border p-2 rounded bg-gray-50">
            <input
              type="text"
              placeholder="SubTodo Title"
              value={sub.title}
              onChange={(e) =>
                handleSubTodoChange(idx, "title", e.target.value)
              }
              className="border rounded p-1 w-full mb-2"
            />
            <input
              type="text"
              placeholder="SubTodo Description"
              value={sub.description}
              onChange={(e) =>
                handleSubTodoChange(idx, "description", e.target.value)
              }
              className="border rounded p-1 w-full"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSubTodoField}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          + Add SubTodo
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Add Todo
        </button>
      </form>

      {/* LIST */}
      <div>
        {todo?.length > 0 ? (
          todo.map((ele) => (
            <div
              key={ele._id}
              className="bg-gray-100 border p-4 mb-3 rounded shadow-sm"
            >
              <h3 className="font-semibold text-lg">{ele.title}</h3>
              <p className="text-gray-700">{ele.description}</p>

              {/* Show subtodos */}
              {ele.subTodos && ele.subTodos.length > 0 && (
                <ul className="list-disc list-inside mt-2">
                  {ele.subTodos.map((sub, idx) => (
                    <li key={idx}>
                      <strong>{sub.title || "Untitled"}: </strong>
                      {sub.description}
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={() => handleDelete(ele._id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No todos yet 🚀</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
