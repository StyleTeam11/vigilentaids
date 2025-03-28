import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    
    const utterance = new SpeechSynthesisUtterance("Welcome to VigilentAids, Press anywhere on the screen to proceed.");
    utterance.rate = 0.9; 
    speechSynthesis.speak(utterance);

    return () => {
      clearTimeout(timer);
      speechSynthesis.cancel(); 
    };
  }, []);

  const handleScreenClick = (): void => {
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-black text-white"
      onClick={handleScreenClick}
      style={{ cursor: "pointer" }}
    >
      <h1
        className="text-center animated-text"
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          color: "red",
        }}
      >
        VigilentAids
      </h1>
      {showMessage && <p className="text-white mt-2">Press anywhere on the screen to proceed.</p>}
    </div>
  );
};

export default WelcomeScreen;