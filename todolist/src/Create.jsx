import { useState } from "react";
import axios from "axios";

const Create = ({ onTaskAdd }) => {
  const [task, setTask] = useState(""); // Initialize state with an empty string

  const handleAdd = () => {
    if (task.trim()) {
      // Only add the task if it's not an empty string
      axios
        .post("http://localhost:3001/add", { task })
        .then((result) => {
          onTaskAdd(result.data); // Call the callback function to update the parent state
          setTask(""); // Clear the input field after adding the task
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Task cannot be empty");
    }
  };

  return (
    <div className="create-form">
      <input
        type="text"
        placeholder="Enter task"
        value={task} // Bind input value to task state
        onChange={(e) => setTask(e.target.value)} // Update state on input change
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Create;
