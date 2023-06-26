import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link, useParams } from "react-router-dom";

const TodoView = () => {
  const [todo, setTodo] = useState(null);
  const { id } = useParams();

  // Fetch the specific todo from the API
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await axiosReq.get(`/todos/${id}`);
        setTodo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();
  }, [id]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Todo Details</h2>
      <h3>Title: {todo.title}</h3>
      <h4>ID: {todo.id}</h4>
      <p>Description: {todo.description}</p>
      <Link to="/todolist">Back to Todo List</Link>
      
    </div>
  );
};

export default TodoView;