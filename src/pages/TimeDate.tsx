import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TimeDate: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString("en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
      setCurrentTime(now.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-date-container">
      <div className="time-date-background"></div>
      
      <h1 className="time-date-title">Time & Date</h1>
      
      <div className="time-date-display">
        <div className="date-box">
          <h2 className="section-label">Current Date</h2>
          <p className="date-text">{currentDate}</p>
        </div>
        
        <div className="time-box">
          <h2 className="section-label">Current Time</h2>
          <p className="time-text">{currentTime}</p>
        </div>
      </div>

      <Link to="/home" className="back-button" aria-label="Return to home screen">
        Back to Home
      </Link>
    </div>
  );
};

export default TimeDate;
