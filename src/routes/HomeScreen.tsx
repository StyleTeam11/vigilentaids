import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const HomeScreen: React.FC = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-black text-white">
      <h1
        className="text-center animated-text mb-4"
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "red",
        }}
      >
        VigilentAids
      </h1>
      <p
        className="text-center animated-text mb-4"
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "red",
        }}
      >
        HOME
      </p>

      <div className="d-flex flex-column gap-3">
        <Link
          to="/location"
          className="btn btn-outline-light btn-lg custom-button"
        >
          Find Directions
        </Link>
        <Link
          to="/camera"
          className="btn btn-outline-light btn-lg custom-button"
        >
          Take Pictures
        </Link>
        <Link
          to="/timedate"
          className="btn btn-outline-light btn-lg custom-button"
        >
          Time & Date
        </Link>
        <Link
          to="/settings"
          className="btn btn-outline-light btn-lg custom-button"
        >
          Settings
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;