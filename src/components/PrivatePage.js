import React, { useEffect, useState } from "react";

const PrivatePage = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task: newTask }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]); // Added dependency array

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
