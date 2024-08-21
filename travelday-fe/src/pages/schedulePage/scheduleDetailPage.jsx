import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api'; // 구글 맵 임포트
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import calendarIcon from '../../images/filter/calendar.png'; 

const ScheduleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schedule } = location.state;

  // 구글 맵의 초기 설정
  const mapCenter = { lat: 37.5400456, lng: 126.9921017 };
  const [map, setMap] = useState(null);

  return (
    <Container>
      <Header showBackButton={true} onBackClick={() => navigate('/schedule')} />
      <TitleWrapper>
        <Title>{schedule.title}</Title>
        <DateWrapper>
          <Icon src={calendarIcon} alt="달력 아이콘" />
          <Date>{schedule.date}</Date>
        </DateWrapper>
      </TitleWrapper>
      <ContentContainer>
        {/* 구글 맵 추가 */}
        <MapContainer>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={10}
            onLoad={map => setMap(map)}
          >
            <Marker position={mapCenter} />
          </GoogleMap>
        </MapContainer>
      </ContentContainer>
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
  margin-bottom: 10px;
  margin-top: 100px;
  margin-left: 20px;
  text-align: left; 
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px; 
  margin-left: 20px;
`;

const Date = styled.p`
  font-size: 15px;
  color: #666;
`;

const ContentContainer = styled.div`
  width: 390px; 
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;  
  margin-bottom: 20px;
  margin: 0 auto; 
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
