import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import calendarIcon from '../../images/filter/calendar.png';
import ScheduleDetailList from '../../components/schedulePage/scheduleDetailList'; 

const ScheduleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schedule, id } = location.state; 

  const mapCenter = { lat: 37.5400456, lng: 126.9921017 };

  const [scheduleDetails, setScheduleDetails] = useState([]);

  useEffect(() => {
    const [startDateStr, endDateStr] = schedule.date.split(' ~ ');
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const details = [];

    let currentDate = new Date(startDate); 

    while (currentDate <= endDate) {
      details.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1); 
    }

    setScheduleDetails(details);
  }, [schedule.date]);

  const handleAddFromWish = () => {
    navigate(`/wishlist/${id}`, { state: { schedule } });
  };
  
  const handleAddFromMap = () => {
    navigate(`/maplocation/${id}`, { state: { schedule } });
  };

  return (
    <Container>
      <Header showBackButton={true} onBackClick={() => navigate('/schedule')} />
      <ContentWrapper>
        <TitleWrapper>
          <Title>{schedule.title}</Title>
          <ScheduleDateWrapper>
            <Icon src={calendarIcon} alt="달력 아이콘" />
            <ScheduleDate>{schedule.date}</ScheduleDate>
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
      </ContentWrapper>
      <BottomNav />
    </Container>
  );
};

export default ScheduleDetail;

// 스타일 컴포넌트 정의는 동일합니다

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
