import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({ username, password }), // Convert user data to JSON string
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        navigate("/private");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
