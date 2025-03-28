import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SimpleLogin: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (code.length !== 5) {
      setErrorMessage("Please enter a valid 5-digit code.");
    } else {
      setErrorMessage(""); 
      navigate("/home");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="text-center mb-4">Login</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter your secret code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <button className="btn btn-primary" onClick={handleLogin}>Submit</button>
    </div>
  );
};

export default SimpleLogin;