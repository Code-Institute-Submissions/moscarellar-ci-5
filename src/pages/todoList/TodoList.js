import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newCompleted, setNewCompleted] = useState(false);

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
        description: newDescription,
        deadline: newDeadline,
        completed: newCompleted,
      });
      setTodos([...todos, data]);
      setNewTodo("");
      setNewDescription("");
      setNewDeadline("");
      setNewCompleted(false);
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

  // Toggle completion status of a todo
  const toggleComplete = async (id, completed) => {
    try {
      const { data } = await axiosReq.patch(`/todos/${id}`, {
        completed: !completed,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? data : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter completed and active todos
  const completedTodos = todos.filter((todo) => todo.completed);
  const activeTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      <div className="add-todo-section">
        <h2>Add Todo</h2>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter a description"
        ></textarea>
        <input
          type="date"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          placeholder="Enter a deadline"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div className="todo-list-section">
        <h2>Active Todos</h2>
        <ul>
          {activeTodos.map((todo) => (
            <li key={todo.id}>
              <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id, todo.completed)}
                />
                Completed
              </label>
              <p>Deadline: {todo.deadline}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="completed-todos-section">
        <h2>Completed Todos</h2>
        <ul>
          {completedTodos.map((todo) => (
            <li key={todo.id}>
              <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id, todo.completed)}
                />
                Completed
              </label>
              <p>Deadline: {todo.deadline}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
