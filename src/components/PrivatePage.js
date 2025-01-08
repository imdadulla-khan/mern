import React, { useEffect, useState } from "react";

const PrivatePage = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err.message);
    }
  };

  // Add a new task to the API
  const addTask = async () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
        body: JSON.stringify({ task: newTask }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setNewTask(""); // Clear input field
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error("Failed to add task:", err.message);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  });

  return (
    <div>
      <h2>Your Tasks</h2>
      <div>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default PrivatePage;
