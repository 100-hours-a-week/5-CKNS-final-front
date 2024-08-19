import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FindPage from './pages/searchPage/searchingPage';
import FlightResultPage from'./pages/resultPage/flightResultPage';
import HotelResultPage from './pages/resultPage/hotelResultPage';
import MainPage from './pages/mainPage/mainPage';
import LoginPage from './pages/userPage/loginPage';
import Callback from './pages/userPage/callback';
import MyPage from './pages/userPage/myPage';
import MapPage from './pages/mapPage/mapPage'; 
import SchedulePage from './pages/schedulePage/schedulePage';
import AlarmPage from './pages/userPage/alarmPage';
import IntroPage from './pages/introPage/introPage';

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
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/intro" element={<IntroPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
