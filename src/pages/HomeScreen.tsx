import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeScreen: React.FC = () => {
  return (
    <div>
      <div>
        <div>
          <h1>
            Vigilent<span>Aids</span>
          </h1>
          <div></div>
          <p>Your Intelligent Assistance Portal</p>
        </div>

        <div>
          <Link to="/navigation">
            <span>🧭</span>
            <span>Navigation</span>
          </Link>
          
          <Link to="/camera">
            <span>👁️</span>
            <span>Vigilent Eye</span>
          </Link>
          
          <Link to="/timedate">
            <span>⏱️</span>
            <span>Time & Date</span>
          </Link>

          <Link to="/routes">
            <span>🗺️</span>
            <span>Get Routes</span>
          </Link>

          <Link to="/vee">
            <span>🤖</span>
            <span>Vee Assistance</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;