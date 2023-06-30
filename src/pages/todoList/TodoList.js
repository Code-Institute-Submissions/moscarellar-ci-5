import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newCompleted, setNewCompleted] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState([]); 

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
      const datetimeDeadline = `${newDeadline}T00:00:00`; // Add a time to the date
      const { data } = await axiosReq.post("/todos/", {
        title: newTodo,
        description: newDescription,
        deadline: datetimeDeadline, // Send the datetime string
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
      

      <div className="todo-list-section">
        <h2>Active Todos</h2>
        <ul>
          {activeTodos.map((todo, index) => (
            <li key={todo.id}>
              <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => {
      const newShowDescriptions = [...showDescriptions];
      newShowDescriptions[index] = !newShowDescriptions[index];
      setShowDescriptions(newShowDescriptions);
    }}>
      {showDescriptions[index] ? "-" : "+"}
    </button>
    {showDescriptions[index] && <p>Description: {todo.description}</p>}
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

      <div className="container">
      <div className="row justify-content-center mt-5">
      <div className="col-md-6">
      <div className="card">
        
      <div className="add-todo-section">
      <h2 className="card-title text-center">Add Todo</h2>
      <div className="form-group">
        <input
          type="text"
          value={newTodo}
          className="form-control"
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        </div>
        <div className="form-group">
        <textarea
          value={newDescription}
          className="form-control"
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter a description"
        ></textarea>
        </div>

        <div className="form-group">

        <input
          type="date"
          value={newDeadline}
          className="form-control"
          onChange={(e) => setNewDeadline(e.target.value)}
          placeholder="Enter a deadline"
        />
        </div>
        <button className="btn btn-primary btn-block" onClick={addTodo}>Add Todo</button>
      </div>
      </div>
      </div>
      </div>
      </div>

    </div>
  );
};

export default TodoList;
