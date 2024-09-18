import { useEffect, useState } from "react";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import Create from "./Create";
import "./App.css";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: true } : todo
          )
        );
      })
      .catch((err) => console.log("Error:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Function to handle adding new tasks
  const handleAddTask = (newTask) => {
    setTodos((prevTodos) => [...prevTodos, newTask]);
  };

  return (
    <>
      <div className="home">
        <h2>Todo List</h2>
        {/* Pass the handleAddTask function to the Create component */}
        <Create onTaskAdd={handleAddTask} />
        {todos.length === 0 ? (
          <div>
            <h2>No Records</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div className="task" key={todo._id}>
              <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                {todo.done ? (
                  <BsFillCheckCircleFill className="icon" />
                ) : (
                  <BsCircleFill className="icon" />
                )}
                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              </div>
              <div>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
