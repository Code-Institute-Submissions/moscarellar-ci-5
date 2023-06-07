import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch the user's todos from the API
  useEffect(() => {
    const fetchTodos = async () => {
       
        try {
          const { data } = await axiosReq.get(`/todos`);
          setTodos(data.results);
        } catch (error) {
          console.log(error);
        
      }
    };

    fetchTodos();
  }, []);


  

  // Add a new todo
  const addTodo = async () => {
    try {
        const { data } = await axiosReq.post("/todos/", {
          title: newTodo,
          
        });
        setTodos([...todos, data]);
        setNewTodo("");

    } catch (error) {
      console.log(error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axiosReq.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
