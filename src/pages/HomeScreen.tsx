import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/HomeScreen.css";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  // Prevent Back Navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  // Check Internet Connection
  useEffect(() => {
    const checkInternet = () => {
      if (!navigator.onLine) {
        navigate("/error");
        setTimeout(() => {
          window.close(); 
        }, 5000); 
      }
    };

    checkInternet();
    window.addEventListener("offline", checkInternet);
    return () => {
      window.removeEventListener("offline", checkInternet);
    };
  }, [navigate]);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
   
  };
   
  const handleButtonHover = (text: string) => {
    speak(text);
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="title-group">
          <h1 className="main-title">
            Vigilent<span className="title-accent">Aids</span>
          </h1>
          <div className="animated-underline"></div>
          <p className="subtitle">Your Intelligent Assistance Portal</p>
        </div>

        
          <Link
            to="/location"
            className="nav-button direction-button"
            onMouseEnter={() => handleButtonHover("Current Location")}
            onFocus={() => handleButtonHover("Current Location")}
          >
            <span className="button-icon">📍</span>
            <span className="button-text">Current Location</span>
            <span className="button-hover-effect"></span>
          </Link>

          <Link
            to="/routes"
            className="nav-button direction-button"
            onMouseEnter={() => handleButtonHover("Get Routes")}
            onFocus={() => handleButtonHover("Get Routes")}
          >
            <span className="button-icon">🗺️</span>
            <span className="button-text">Get Routes</span>
            <span className="button-hover-effect"></span>
          </Link>

          <Link
            to="/camera"
            className="nav-button camera-button"
            onMouseEnter={() => handleButtonHover("Vigilent Eye")}
            onFocus={() => handleButtonHover("Vigilent Eye")}
          >
            <span className="button-icon">👁️</span>
            <span className="button-text">Vigilent Eye</span>
            <span className="button-hover-effect"></span>
          </Link>

          <Link
            to="/vee"
            className="nav-button settings-button"
            onMouseEnter={() => handleButtonHover("Vee Assistance")}
            onFocus={() => handleButtonHover("Vee Assistance")}
          >
            <span className="button-icon">🤖</span>
            <span className="button-text">Vee Assistance</span>
            <span className="button-hover-effect"></span>
          </Link>
          <Link
            to="/settings"
            className="nav-button settings-button"
            onMouseEnter={() => handleButtonHover("Account Settings")}
            onFocus={() => handleButtonHover("Account Settings")}
          >
          <span className="button-icon">⚙️</span>
            <span className="button-text">Account Settings</span>
            <span className="button-hover-effect"></span>
          </Link>
      </div>

      <div className="background-pattern"></div>
      <div className="corner-decoration top-left"></div>
      <div className="corner-decoration top-right"></div>
      <div className="corner-decoration bottom-left"></div>
      <div className="corner-decoration bottom-right"></div>
    </div>
  );
};

export default HomeScreen;