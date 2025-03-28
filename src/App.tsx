import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./routes/WelcomeScreen";
import LoginScreen from "./routes/LoginScreen";
import HomeScreen from "./routes/HomeScreen";
import LocationScreen from "./routes/LocationScreen";
import CameraScreen from "./routes/CameraScreen";
import TimeDateScreen from "./routes/TimeDateScreen";
import SettingScreen from "./routes/SettingScreen";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/location" element={<LocationScreen />} />
        <Route path="/camera" element={<CameraScreen />} />
        <Route path="/timedate" element={<TimeDateScreen />} />
        <Route path="/settings" element={<SettingScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
