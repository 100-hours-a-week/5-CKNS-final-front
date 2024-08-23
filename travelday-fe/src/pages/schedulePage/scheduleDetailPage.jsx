import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import calendarIcon from '../../images/filter/calendar.png';
import ScheduleDetailList from '../../components/schedulePage/scheduleDetailList'; 

const ScheduleDetail = () => {
  const { travelRoomId } = useParams(); // useParams를 통해 URL에서 travelRoomId 가져옴
  const navigate = useNavigate();
  const location = useLocation();
  const { schedule } = location.state || {}; 

  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [fetchedSchedule, setFetchedSchedule] = useState(null); // 서버에서 받아온 데이터를 저장할 state 추가

  const mapCenter = { lat: 37.5400456, lng: 126.9921017 }; // 초기 지도 센터

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://api.thetravelday.co.kr/api/rooms/${travelRoomId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true // 크로스 도메인 요청 시 쿠키를 보내기 위해 추가
        });
        
        setFetchedSchedule(response.data); // 서버에서 받은 데이터로 fetchedSchedule 상태 업데이트
      } catch (error) {
        console.error('여행방 정보 로드 중 오류 발생:', error);
      }
    };

    fetchScheduleDetails();
  }, [travelRoomId]);

  useEffect(() => {
    const currentSchedule = fetchedSchedule || schedule;
    if (currentSchedule) {
      const [startDateStr, endDateStr] = currentSchedule.date.split(' ~ ');
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      const details = [];

      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        details.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setScheduleDetails(details);
    }
  }, [fetchedSchedule, schedule]);

  const handleAddFromWish = () => {
    navigate(`/wishlist/${travelRoomId}`, { state: { schedule: fetchedSchedule || schedule } });
  };
  
  const handleAddFromMap = () => {
    navigate(`/maplocation/${travelRoomId}`, { state: { schedule: fetchedSchedule || schedule } });
  };

  const currentSchedule = fetchedSchedule || schedule;

  return (
    <Container>
      <Header showBackButton={true} onBackClick={() => navigate('/schedule')} />
      <ContentWrapper>
        {currentSchedule ? (
          <>
            <TitleWrapper>
              <Title>{currentSchedule.title}</Title>
              <ScheduleDateWrapper>
                <Icon src={calendarIcon} alt="달력 아이콘" />
                <ScheduleDate>{currentSchedule.date}</ScheduleDate>
              </ScheduleDateWrapper>
            </TitleWrapper>
            <ContentContainer>
              <MapContainer>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapCenter} 
                  zoom={10}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              </MapContainer>
              <ButtonWrapper>
                <ActionButton onClick={handleAddFromWish}>
                  <PlusIcon>+</PlusIcon>위시에서 장소 추가
                </ActionButton>
                <ActionButton onClick={handleAddFromMap}>
                  <PlusIcon>+</PlusIcon>지도에서 장소 추가
                </ActionButton>
              </ButtonWrapper>
              <ScheduleDetailList scheduleDetails={scheduleDetails} />
            </ContentContainer>
          </>
        ) : (
          <p>로딩 중...</p>
        )}
      </ContentWrapper>
      <BottomNav />
    </Container>
  );
};

export default ScheduleDetail;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  background-color: #fafafa;
`;

const TitleWrapper = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 100px 0 10px 20px;
  text-align: left;
`;

const ScheduleDateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const ScheduleDate = styled.p`
  font-size: 15px;
  color: #666;
`;

const ContentContainer = styled.div`
  width: 390px;
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 350px;
  height: 240px;
  margin-top: 20px;
`;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  font-size: 13px;
  background-color: #fff;
  color: #000;
  border: 2px solid #ddd;
  border-radius: 50px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    border: 2px solid #f12e5e;
  }
`;

const PlusIcon = styled.span`
  margin-right: 8px;
  font-size: 20px;
`;
