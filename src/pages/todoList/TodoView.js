import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link, useParams } from "react-router-dom";

const TodoView = () => {
  const [todo, setTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDeadline, setUpdatedDeadline] = useState("");
  const [updatedCompleted, setUpdatedCompleted] = useState(false);
  const { id } = useParams();

  // Fetch the specific todo from the API
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await axiosReq.get(`/todos/${id}`);
        setTodo(data);
        setUpdatedTitle(data.title);
        setUpdatedDescription(data.description);
        setUpdatedDeadline(data.deadline);
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
      const { data } = await axiosReq.put(`/todos/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
        deadline: datetimeDeadline,
        completed: updatedCompleted,
      });
      setTodo(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Todo Details</h2>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <textarea
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      ></textarea>
      <input
        type="date"
        value={updatedDeadline}
        onChange={(e) => setUpdatedDeadline(e.target.value)}
      />
      <input
        type="checkbox"
        checked={updatedCompleted}
        onChange={(e) => setUpdatedCompleted(e.target.checked)}
      />
      <button onClick={updateTodo}>Update Todo</button>
      <button>
        <Link to="/todolist">Back to Todo List</Link>
      </button>
    </div>
  );
};

export default TodoView;
