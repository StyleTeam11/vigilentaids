import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import TimeDate from './pages/TimeDate';
import RouteScreen from './pages/RouteScreen';
import NavigationScreen from './pages/RouteScreen';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/timeDate" element={<TimeDate />} />
        <Route path="/routes" element={<RouteScreen />} />
        <Route path="/navigation" element={<NavigationScreen />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
