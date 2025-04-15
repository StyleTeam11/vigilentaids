import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginConnetions from './pages/LoginConnetions';
import HomeScreen from './pages/HomeScreen';
import RouteScreen from './pages/RouteScreen';
import ErrorScreen from './pages/ErrorScreen';
import LocationScreen from './pages/LocationScreen';
import VeeScreen from './pages/VeeScreen';
import CheckInternetPag from './pages/CheckInternetPage';
import AccountSettings from './pages/AccountSettings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginConnetions />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/routes" element={<RouteScreen />} />
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="/location" element={<LocationScreen />} />
        <Route path="/vee" element={<VeeScreen />} />
        <Route path="/camera" element={<CheckInternetPag />} />
        <Route path="/settings" element={<AccountSettings/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
