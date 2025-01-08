import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const response = await fetch("http://localhost:4000/api/users/register", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ username, password }), // Convert user data to JSON string
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
