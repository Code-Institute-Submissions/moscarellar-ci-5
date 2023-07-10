import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link, useParams } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Row";

import styles from "../../styles/TodoView.module.css";
import btnStyles from "../../styles/Button.module.css";
import Loading from "../../animations/Loading";

const TodoView = () => {
  const [todo, setTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDeadline, setUpdatedDeadline] = useState(""); // Initialize as empty string
  const [updatedCompleted, setUpdatedCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state variable
  const { id } = useParams();

  // Fetch the specific todo from the API
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await axiosReq.get(`/todos/${id}`);
        setTodo(data);
        setUpdatedTitle(data.title);
        setUpdatedDescription(data.description);
        // If data.deadline exists, format it to 'YYYY-MM-DD'. If not, set to current date.
        setUpdatedDeadline(data.deadline ? new Date(data.deadline).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
        setUpdatedCompleted(data.completed);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();
  }, [id]);

  const updateTodo = async () => {
    try {
      const datetimeDeadline = `${updatedDeadline}T00:00:00`;
      setIsLoading(true); // Set loading state to true
      const { data } = await axiosReq.put(`/todos/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
        deadline: datetimeDeadline,
        completed: updatedCompleted,
      });
      setTodo(data);
      setIsLoading(false); // Set loading state back to false after the API request is complete
    } catch (error) {
      console.log(error);
    }
  };

  if (!todo) {
    return <div>Loading...</div>;
  }



  return (
    <div >
      <Container className="row justify-content-center">
      <div className="card col-md-6 m-5">
      <div className="row justify-content-center mt-3">
  
      <Row className={styles.Row}>
        <h2>Todo Details</h2>
        <table className="table">
          <tbody>
            <tr>
              <th>Title</th>
              <td>{todo.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{todo.description}</td>
            </tr>
            <tr>
              <th>Deadline</th>
              <td>{todo.deadline}</td>
            </tr>
          </tbody>
        </table>
      </Row>
      </div>
      </div>
      </Container>

      <Container className="row justify-content-center">
      <div className="card col-md-6 m-5">
      <div className="justify-content-center mt-3">
              
      <Row className={styles.Row}>
        <h2>Update Todo</h2>
        <table className="table">
          <tbody>
            <tr>
              <th>Title</th>
              <td>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className={styles.Input}
                />
              </td>
            </tr>
            <tr>
              <th>Description</th>
              <td>
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className={styles.Textarea}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>Deadline</th>
              <td>
                <input
                  type="date"
                  value={updatedDeadline}
                  onChange={(e) => setUpdatedDeadline(e.target.value)}
                  className={styles.Input}
                />
              </td>
            </tr>
            <tr>
              <th>Completed</th>
              <td>
                <input
                  type="checkbox"
                  checked={updatedCompleted}
                  onChange={(e) => setUpdatedCompleted(e.target.checked)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={updateTodo}
          disabled={isLoading}>
          {isLoading ? <Loading /> : 'Update'}
        
        </button>

       

      </Row>
      <Row className={styles.Row}>
        <button className="btn btn-secondary">
          <Link to="/todolist">Back to Todo List</Link>
        </button>
      </Row>
      </div>
      </div>
      </Container>
    </div>
  );
};

export default TodoView;
