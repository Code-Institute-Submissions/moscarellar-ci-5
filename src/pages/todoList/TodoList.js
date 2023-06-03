import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosReq.get("/todos/");
        setTodos(response.data.todos);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTodos();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Todo List</h2>
      {todos && todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
};

export default TodoList;
