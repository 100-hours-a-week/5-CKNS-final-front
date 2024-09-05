import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import calendarIcon from '../../images/filter/calendar.png';
import penIcon from '../../images/pen.png'; 
import ScheduleDetailList from '../../components/schedulePage/scheduleDetailList';

const ScheduleDetail = () => {
  const { travelRoomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [fetchedSchedule, setFetchedSchedule] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapCenter = { lat: 37.5400456, lng: 126.9921017 };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axiosInstance.get(`/api/rooms/${travelRoomId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const roomData = response.data.data;
        const startDateStr = roomData.startDate.replace(/-/g, '.');
        const endDateStr = roomData.endDate.replace(/-/g, '.');

        setFetchedSchedule({
          ...roomData,
          date: `${startDateStr} ~ ${endDateStr}`,
        });

        const tempDetails = [];
        let currentDate = new Date(roomData.startDate);
        const endDate = new Date(roomData.endDate);

        while (currentDate <= endDate) {
          tempDetails.push({
            date: currentDate.toISOString().split('T')[0],
            schedules: [],
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setScheduleDetails(tempDetails);
      } catch (error) {
        console.error('Error loading travel room information:', error);
      }
    };

    fetchRoomDetails();
  }, [travelRoomId]);

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axiosInstance.get(`/api/rooms/${travelRoomId}/plan`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const updatedDetails = scheduleDetails.map((day) => ({
          ...day,
          schedules: response.data
            .filter((detail) => detail.scheduledDay === day.date)
            .sort((a, b) => a.position - b.position),
        }));

        setScheduleDetails(updatedDetails);

        // Set markers for map display
        const markers = response.data.map((detail) => ({
          lat: detail.latitude,
          lng: detail.longitude,
          label: `${detail.position}`,
          name: detail.name,
        }));
        setMapMarkers(markers);
      } catch (error) {
        console.error('Error fetching schedule details:', error);
      }
    };

    if (fetchedSchedule) {
      fetchScheduleDetails();
    }
  }, [fetchedSchedule]);

  // 이 함수들은 useEffect 외부에 정의되어야 합니다.
  const handleAddFromWish = () => {
    navigate(`/wishlist/${travelRoomId}`, { state: { schedule: fetchedSchedule } });
  };

  const handleAddFromMap = () => {
    navigate(`/maplocation/${travelRoomId}`, { state: { schedule: fetchedSchedule } });
  };

  const handleEditClick = () => {
    navigate(`/fixschedule/${travelRoomId}`, { state: { schedule: fetchedSchedule } });
  };

  return (
    <Container>
      <Header showBackButton={true} onBackClick={() => navigate('/schedule')} />
      <ContentWrapper>
        {fetchedSchedule ? (
          <>
            <TitleWrapper>
              <Title>{fetchedSchedule.name}</Title>
              <IconButton onClick={handleEditClick}>
                <EditIcon src={penIcon} alt="Edit Icon" />
              </IconButton>
              <ScheduleDateWrapper>
                <Icon src={calendarIcon} alt="Calendar Icon" />
                <ScheduleDate>{fetchedSchedule.date}</ScheduleDate>
              </ScheduleDateWrapper>
            </TitleWrapper>
            <MapContainer>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '240px' }}
                center={mapCenter}
                zoom={10}
              >
                {mapMarkers.map((marker, index) => (
                  <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    label={marker.label}
                    onClick={() => setSelectedMarker(marker)}
                  />
                ))}
                {selectedMarker && (
                  <InfoWindow
                    position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div>
                      <h4>{selectedMarker.name}</h4>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMarker.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Go to Google Maps
                      </a>
                    </div>
                  </InfoWindow>
                )}
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
          </>
        ) : (
          <p>Loading...</p>
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
  position: relative;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 100px 0 10px 20px;
  text-align: left;
`;

const IconButton = styled.button`
  position: absolute;
  top: 100px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const EditIcon = styled.img`
  width: 20px;
  height: 20px;
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

const MapContainer = styled.div`
  width: 350px;
  height: 240px;
  margin-top: 20px;
`;

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
  padding: 12px 0;
  font-size: 14px;
  background-color: #ffffff;
  color: #333;
  border: 2px solid #ddd;
  border-radius: 25px;
  cursor: pointer;
  margin: 0 5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f12e5e;
    color: #fff;
    border-color: #f12e5e;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
`;

const PlusIcon = styled.span`
  margin-right: 10px;
  font-size: 22px;
  transition: transform 0.3s ease;

  ${ActionButton}:hover & {
    transform: scale(1.2);
  }
`;
