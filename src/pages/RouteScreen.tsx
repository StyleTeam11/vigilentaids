import React, { useState } from "react";

const RouteScreen = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");

  const calculateRoute = () => {
    if (start.trim() && destination.trim()) {
            setRoute(`Route from ${start} to ${destination}`);
      setTimeEstimate(`${Math.floor(Math.random() * 60) + 10} mins`);
    } else {
      setRoute("");
      setTimeEstimate("");
    }
  };

  return (
    <div>
      <h2>Route Calculator</h2>
      <div>
        <label htmlFor="start">Starting Location</label>
        <input 
          id="start"
          type="text" 
          value={start} 
          onChange={(e) => setStart(e.target.value)} 
          placeholder="Enter starting location" 
        />
      </div>
      <div>
        <label htmlFor="destination">Destination</label>
        <input 
          id="destination"
          type="text" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
          placeholder="Enter destination" 
        />
      </div>
      <button onClick={calculateRoute}>Calculate Route</button>
      {route && (
        <div>
          <p>{route}</p>
          <p>Estimated Time: {timeEstimate}</p>
        </div>
      )}
    </div>
  );
};

export default RouteScreen;
