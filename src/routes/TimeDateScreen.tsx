import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const TimeDateScreen: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString("en-US"));
      setCurrentTime(now.toLocaleTimeString("en-US"));
    };

   
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    
    if ("speechSynthesis" in window) {
      const now = new Date();
      const initialDate = now.toLocaleDateString("en-US");
      const initialTime = now.toLocaleTimeString("en-US");

      const utterance = new SpeechSynthesisUtterance(
        `The current date is ${initialDate} and the time is ${initialTime}`
      );
      utterance.rate = 1;
      speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis is not supported in this browser.");
    }


    return () => {
      clearInterval(interval);
      speechSynthesis.cancel();
    };
  }, []); 

  const handleBackToHome = () => {
    
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
  };

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
        Time & Date 
      </h1>
      <p
        className="text-center mb-3"
        style={{
          fontSize: "1.5rem",
          color: "white",
        }}
      >
        Current Date: {currentDate}
      </p>
      <p
        className="text-center mb-4"
        style={{
          fontSize: "1.5rem",
          color: "white",
        }}
      >
        Current Time: {currentTime}
      </p>
      <Link
        to="/home"
        className="btn btn-outline-light btn-lg custom-button"
        style={{ color: "white", borderColor: "red" }}
        onClick={handleBackToHome}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default TimeDateScreen;