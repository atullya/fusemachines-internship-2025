import React, { useState } from "react";

interface SubTodoData {
  title: string;
  description: string;
}

interface TodoData {
  title: string;
  description: string;
  subtodos?: SubTodoData[];
}

const Test = () => {
  const [todo, setTodo] = useState<TodoData[]>([]);

  // Add a new Todo
  const createTodoApp = () => {
    setTodo([...todo, { title: "", description: "", subtodos: [] }]);
  };

  // Add subTodo to a specific Todo (by index)
  const createSubTodo = (todoIndex: number) => {
    setTodo((prevTodos) => 
      prevTodos.map((t, i) =>
        i === todoIndex
          ? {
              ...t,
              subtodos: [...(t.subtodos || []), { title: "", description: "" }],
            }
          : t
      )
    );
  };

  return (
    <div>
      <h2>Tester</h2>
      <button onClick={createTodoApp}>Add Todo</button>

      {todo.map((v, i) => (
        <div key={i} className="border p-2 my-2">
          <input
            type="text"
            placeholder="Todo Title"
            className="border rounded p-1 w-full mb-2"
            value={v.title}
            onChange={(e) => {
              const value = e.target.value;
              setTodo((prev) =>
                prev.map((t, idx) =>
                  idx === i ? { ...t, title: value } : t
                )
              );
            }}
          />
          <input
            type="text"
            placeholder="Todo Description"
            className="border rounded p-1 w-full mb-2"
            value={v.description}
            onChange={(e) => {
              const value = e.target.value;
              setTodo((prev) =>
                prev.map((t, idx) =>
                  idx === i ? { ...t, description: value } : t
                )
              );
            }}
          />

          <button onClick={() => createSubTodo(i)}>Add SubTodo</button>

          {/* Show subtodos */}
          {v.subtodos?.map((sub, j) => (
            <div key={j} className="ml-4 border p-1 mt-1">
              <input
                type="text"
                placeholder="SubTodo Title"
                value={sub.title}
                onChange={(e) => {
                  const value = e.target.value;
                  setTodo((prev) =>
                    prev.map((t, idx) =>
                      idx === i
                        ? {
                            ...t,
                            subtodos: t.subtodos?.map((s, subIndex) =>
                              subIndex === j ? { ...s, title: value } : s
                            ),
                          }
                        : t
                    )
                  );
                }}
              />
              <input
                type="text"
                placeholder="SubTodo Description"
                value={sub.description}
                onChange={(e) => {
                  const value = e.target.value;
                  setTodo((prev) =>
                    prev.map((t, idx) =>
                      idx === i
                        ? {
                            ...t,
                            subtodos: t.subtodos?.map((s, subIndex) =>
                              subIndex === j ? { ...s, description: value } : s
                            ),
                          }
                        : t
                    )
                  );
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Test;