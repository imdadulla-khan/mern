import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout }) => (
  <nav>
    <Link to="/register"> Register </Link>
    <Link to="/login">Login</Link>
    {isLoggedIn && <button onClick={handleLogout}> Logout</button>}
  </nav>
);

export default Navbar;
