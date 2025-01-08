import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivatePage from "./components/PrivatePage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const handleLogin = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    console.log("User logged out!");
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={handleLogin} />} />
        <Route
          path="/private"
          element={
            isLoggedIn ? (
              <PrivatePage token={token} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        ></Route>
        <Route path="/" element={<h1>Welcome</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
