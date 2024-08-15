import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FindPage from './pages/findPage/searchingPage';
import FlightResultPage from'./pages/resultPage/flightResultPage';
import HotelResultPage from './pages/resultPage/hotelResultPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<FindPage />} />
        <Route path="/flight" element={<FlightResultPage />} />
        <Route path="/hotel" element={<HotelResultPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
