import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-toggler-icon"></span>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-item-text">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/log" className="nav-link nav-item-text">
                Log
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link nav-item-text">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
