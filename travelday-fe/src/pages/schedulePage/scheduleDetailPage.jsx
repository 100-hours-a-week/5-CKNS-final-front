import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import calendarIcon from '../../images/filter/calendar.png';
import ScheduleDetailList from '../../components/schedulePage/scheduleDetailList';

// Axios mock setup
const mock = new MockAdapter(axios);

const ScheduleDetail = () => {
  const { travelRoomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { schedule } = location.state || {};

  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [fetchedSchedule, setFetchedSchedule] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]); // 구글 맵에 표시할 마커 데이터를 저장할 상태

  const mapCenter = { lat: 37.5400456, lng: 126.9921017 };

  // 목 데이터 설정
  useEffect(() => {
    mock.onGet(`http://api.thetravelday.co.kr/api/rooms/${travelRoomId}`).reply(200, {
      travelRoomId: 0,
      name: '구라쟁이의 여행',
      date: '2024-01-01 ~ 2024-01-03',
    });

    mock.onGet(`http://api.thetravelday.co.kr/api/rooms/${travelRoomId}/plan`).reply(200, [
      {
        id: travelRoomId,
        name: 'Place 1',
        scheduledDay: '2024-01-01',
        position: 1,
        latitude: 37.5400456,
        longitude: 126.9921017,
      },
      {
        id: travelRoomId,
        name: 'Place 2',
        scheduledDay: '2024-01-01',
        position: 2,
        latitude: 37.5400456,
        longitude: 126.9921017,
      },
      {
        id: travelRoomId,
        name: 'Place 3',
        scheduledDay: '2024-01-02',
        position: 1,
        latitude: 37.5400456,
        longitude: 126.9921017,
      },
    ]);
  }, [travelRoomId]);

  // 여행방 정보 로드 및 일자 계산
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://api.thetravelday.co.kr/api/rooms/${travelRoomId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });

        setFetchedSchedule(response.data);

        // 일자 계산
        const { date } = response.data;
        const [startDateStr, endDateStr] = date.split(' ~ ');
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        const tempDetails = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          tempDetails.push({
            date: currentDate.toISOString().split('T')[0],
            schedules: []
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setScheduleDetails(tempDetails);
      } catch (error) {
        console.error('여행방 정보 로드 중 오류 발생:', error);
      }
    };

    fetchRoomDetails();
  }, [travelRoomId]);

  // 일정 데이터 로드 및 일차별 정렬
  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://api.thetravelday.co.kr/api/rooms/${travelRoomId}/plan`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const updatedDetails = scheduleDetails.map(day => {
          const dayDetails = { ...day };
          dayDetails.schedules = response.data
            .filter(detail => detail.scheduledDay === day.date)
            .sort((a, b) => a.position - b.position);
          return dayDetails;
        });

        setScheduleDetails(updatedDetails);

        // 지도에 표시할 마커 데이터 설정
        const markers = response.data.map(detail => ({
          lat: detail.latitude,
          lng: detail.longitude,
        }));
        setMapMarkers(markers);

      } catch (error) {
        console.error('일정 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    if (fetchedSchedule) {
      fetchScheduleDetails();
    }
  }, [fetchedSchedule]);

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
              <Title>{currentSchedule.name}</Title>
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
                  {mapMarkers.map((marker, index) => (
                    <Marker key={index} position={marker} />
                  ))}
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
