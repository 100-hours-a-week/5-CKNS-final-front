import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FindPage from './pages/findPage/searchingPage';
import FlightResultPage from'./pages/resultPage/flightResultPage';
import HotelResultPage from './pages/resultPage/hotelResultPage';
import MainPage from './pages/mainPage/mainPage';
import LoginPage from './pages/userPage/loginPage';
import Callback from './pages/userPage/callback';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/search" element={<FindPage />} />
        <Route path="/flight" element={<FlightResultPage />} />
        <Route path="/hotel" element={<HotelResultPage />} /> 
        <Route path="/auth/kakao/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default App;
