import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import './App.css';
import './i18n';

// 필요한 페이지 컴포넌트 임포트
import FindPage from './pages/searchPage/searchingPage';
import FlightResultPage from './pages/resultPage/flightResultPage';
import HotelResultPage from './pages/resultPage/hotelResultPage';
import MainPage from './pages/mainPage/mainPage';
import MainDetailPage from './pages/mainPage/mainDetailPage';
import LoginPage from './pages/userPage/loginPage';
import Callback from './pages/userPage/oAuth2LoginSuccessPage';
import MyPage from './pages/userPage/myPage';
import Nickname from './pages/userPage/nicknamePage';
import MapPage from './pages/mapPage/mapPage';
import SchedulePage from './pages/schedulePage/schedulePage';
import FixSchedulePage from './pages/schedulePage/fixschedulePage';
import AlarmPage from './pages/userPage/alarmPage';
import IntroPage from './pages/introPage/introPage';
import HotelDetailPage from './pages/resultPage/hotelDetailPage';
import ScheduleDetail from './pages/schedulePage/scheduleDetailPage';
import WishListPage from './pages/schedulePage/wishListPage';
import MapLocationPage from './pages/schedulePage/mapLocationPage';
import CreateSchedulePage from './pages/schedulePage/createSchedulePage';
import PrivacyPage from './pages/mainPage/privacyPage';
import ChatPage from './pages/chatPage/chatPage';
import ChatTest from './pages/chatPage/chatTest';
import ChatListPage from './pages/chatPage/chatListPage';
import ExpenseSettlement from './components/schedulePage/settlement';
import FlightDetailPage from './pages/resultPage/flightDetailPage';

const libraries = ['places'];

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  });

  useEffect(() => {
    // 서비스 워커 등록
    if ('serviceWorker' in navigator) {
      // 기존에 등록된 모든 서비스 워커 제거
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        registrations.forEach(function (registration) {
          registration.unregister().then(function (success) {
            if (success) {
              console.log('기존 서비스 워커가 해제되었습니다.');
            } else {
              console.error('기존 서비스 워커 해제에 실패했습니다.');
            }
          });
        });
    
        // 새로운 서비스 워커 등록
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then(function (registration) {
            console.log('서비스 워커가 등록되었습니다. 스코프:', registration.scope);
          })
          .catch(function (error) {
            console.error('서비스 워커 등록에 실패했습니다:', error);
            
            // 오류의 전체 정보를 출력
            console.error('에러 전체 정보:', error.message);
            console.error('에러 파일:', error.filename);
            console.error('에러 라인:', error.lineno, '열:', error.colno);
          });
      }).catch(function (error) {
        console.error('기존 서비스 워커 가져오기 실패:', error);
      });
    }
    
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainRouter />} />
      </Routes>
    </Router>
  );
}

function MainRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('visited');
    if (isFirstVisit) {
      localStorage.setItem('visited', 'true');
      navigate('/intro');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/maindetail/:id" element={<MainDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<FindPage />} />
      <Route path="/flight" element={<FlightResultPage />} />
      <Route path="/hotel" element={<HotelResultPage />} />
      <Route path="/hotel/hotel-detail" element={<HotelDetailPage />} />
      <Route path="/login/oauth2/success" element={<Callback />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/nickname" element={<Nickname />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/schedule/:travelRoomId" element={<ScheduleDetail />} />
      <Route path="/edit/:travelRoomId" element={<FixSchedulePage />} />
      <Route path="/wishlist/:travelRoomId" element={<WishListPage />} />
      <Route path="/maplocation/:travelRoomId" element={<MapLocationPage />} />
      <Route path="/alarm" element={<AlarmPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/createschedule" element={<CreateSchedulePage />} />
      <Route path="/fixschedule/:travelRoomId" element={<FixSchedulePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/chat/:travelRoomId" element={<ChatPage />} />
      <Route path="/chat/test" element={<ChatTest />} />
      <Route path="/chatList" element={<ChatListPage />} />
      <Route path="/settlement" element={<ExpenseSettlement />} />
      <Route path='/flightdetail/:id' element={<FlightDetailPage />} />
    </Routes>
  );
}

export default App;
