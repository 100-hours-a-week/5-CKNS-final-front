import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import FindPage from './pages/searchPage/searchingPage';
import FlightResultPage from './pages/resultPage/flightResultPage';
import HotelResultPage from './pages/resultPage/hotelResultPage';
import MainPage from './pages/mainPage/mainPage';
import LoginPage from './pages/userPage/loginPage';
import Callback from './pages/userPage/oAuth2LoginSuccessPage';
import MyPage from './pages/userPage/myPage';
import Nickname from './pages/userPage/nicknamePage';
import MapPage from './pages/mapPage/mapPage'; 
import SchedulePage from './pages/schedulePage/schedulePage';
import AlarmPage from './pages/userPage/alarmPage';
import IntroPage from './pages/introPage/introPage';
import HotelDetailPage from './pages/resultPage/hotelDetailPage';
import ScheduleDetail from './pages/schedulePage/scheduleDetailPage';
import WishListPage from './pages/schedulePage/wishListPage';
import MapLocationPage from './pages/schedulePage/mapLocationPage';
import CreateSchedulePage from './pages/schedulePage/createSchedulePage';  

import './App.css';

const libraries = ['places']; 

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY, 
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/search" element={<FindPage />} />
        <Route path="/flight" element={<FlightResultPage />} />
        <Route path="/hotel" element={<HotelResultPage />} /> 
        <Route path="/hotel/hotel-detail" element={<HotelDetailPage />} />
        <Route path="/login/oauth2/successs" element={<Callback />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/schedule/:id" element={<ScheduleDetail />} />
        <Route path="/wishlist/:id" element={<WishListPage />} /> 
        <Route path="/maplocation/:id" element={<MapLocationPage />} /> 
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/intro" element={<IntroPage />} /> 
        <Route path="/createschedule" element={<CreateSchedulePage />} /> {/* CreateSchedulePage 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
