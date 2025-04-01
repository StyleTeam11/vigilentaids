import React, { useState } from "react";

const NavigationScreen = () => {
  return (
    <div>
      <h2>Route Finder</h2>
      <form>
        <label htmlFor="destination">Enter Destination:</label>
        <input id="destination" type="text" name="destination" placeholder="Enter destination" required />
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default NavigationScreen;
