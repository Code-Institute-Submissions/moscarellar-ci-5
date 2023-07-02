import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import Filter from '../../components/Filter'
import { Container} from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newCompleted, setNewCompleted] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState([]);
  const [filter, setFilter] = useState('All');

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

  // Filter todos
  const filterTodo = (filterValue) => {
    setFilter(filterValue);
  };

  let filteredTodos = todos;
  if (filter === 'Active') {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter === 'Completed') {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  return (
    <div >
      <Container className="row justify-content-center">
      
      <div className="card col-md-6 m-5">
      <div className="row justify-content-center mt-3">
          <Filter  filter_todo={filterTodo} />
      </div>
      </div>
      </Container>

      <div className="row justify-content-center container ">
  
        <div className="col-md-6">
          <div className="container card">
            <h4>{filter}</h4>
            <table className="table">
              <tbody>
                {filteredTodos.map((todo, index) => (
                  <tr key={todo.id}>
                    <td>
                      <Link to={`/todos/${todo.id}`}>{todo.title}{showDescriptions[index] && <p>{todo.deadline} <p>{todo.description}</p></p>}
                      </Link>
                      <p></p>
                      <button className={`${btnStyles.Button} ${btnStyles.Blue}`}
                        onClick={() => {
                          const newShowDescriptions = [...showDescriptions];
                          newShowDescriptions[index] = !newShowDescriptions[index];
                          setShowDescriptions(newShowDescriptions);
                        }}
                      >
                        {showDescriptions[index] ? '-' : '+'}
                      </button>
                      </td>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo.id, todo.completed)}
                        />
                      
                      </label>
                    </td>
                    <td>
                      <button className="btn"  onClick={() => deleteTodo(todo.id)}><i className="fas fa-trash-alt" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
        </div>
        {/* </Card>
        </Row> */}
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
          <div className="d-flex justify-content-center">
          <button className={`${btnStyles.Button} ${btnStyles.Blue}`} onClick={addTodo}>Add Todo</button>
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>

      </div>
    </div>
  );
};

export default TodoList;
