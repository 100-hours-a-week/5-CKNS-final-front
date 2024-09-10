import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {GoogleMap, Marker, InfoWindow, MarkerF, InfoWindowF} from '@react-google-maps/api';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import calendarIcon from '../../images/filter/calendar.png';
import penIcon from '../../images/pen.png';
import ScheduleDetailList from '../../components/schedulePage/scheduleDetailList';

const ScheduleDetail = () => {
    const { travelRoomId } = useParams();
    const navigate = useNavigate();

    const [fetchedSchedule, setFetchedSchedule] = useState(null);
    const [mapMarkers, setMapMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markersLoaded, setMarkersLoaded] = useState(false); // Control rendering of markers

    const [mapCenter,setMapCenter] = useState({lat:37.5400456,lng:126.9921017})
    // const mapCenter = { lat: 37.5400456, lng: 126.9921017 };

    // Fetch schedule details

    useEffect(() => {
        axiosInstance.get(`/api/rooms/${travelRoomId}`, { withCredentials: true })
            .then(response => {
                if (response.data) {
                    setFetchedSchedule(response.data.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [travelRoomId]);

    // Fetch map markers
    useEffect(() => {
        if(markersLoaded) {
            return
        }
        axiosInstance.get(`/api/rooms/${travelRoomId}/plan`, { withCredentials: true })
            .then(response => {
                if (response.data) {
                    const fetchedMarkers = response.data.data;
                    if (JSON.stringify(fetchedMarkers) !== JSON.stringify(mapMarkers)) {
                        // console.table(fetchedMarkers);
                        setMapMarkers(fetchedMarkers);
                        setMapCenter({lat:fetchedMarkers[0].latitude, lng:fetchedMarkers[0].longitude});
                        setMarkersLoaded(true); // Markers are ready to render
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [mapMarkers]);

    // Navigation functions
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
                                <Icon src={calendarIcon} alt="달력 아이콘" />
                                <ScheduleDate>{fetchedSchedule.startDate} ~ {fetchedSchedule.endDate}</ScheduleDate>
                            </ScheduleDateWrapper>
                        </TitleWrapper>
                        <ContentContainer>
                            <MapContainer>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={mapCenter}
                                    zoom={10}
                                >
                                    {markersLoaded && (
                                        mapMarkers.map((marker, index) => (
                                            // console.log(marker)
                                            <MarkerF
                                                key={index}
                                                position={{ lat: marker.latitude, lng: marker.longitude }}
                                                onClick={() => setSelectedMarker(marker)}
                                                animation={2}
                                            />
                                        ))
                                    )}

                                    {selectedMarker && (
                                        <InfoWindowF
                                            position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                                            onCloseClick={() => setSelectedMarker(null)} // InfoWindow close
                                        >
                                            <div>
                                                <h4>{selectedMarker.name}</h4>
                                                {/*<a*/}
                                                {/*    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMarker.name)}`}*/}
                                                {/*    target="_blank"*/}
                                                {/*    rel="noopener noreferrer"*/}
                                                {/*>*/}
                                                {/*    Google Maps로 이동*/}
                                                {/*</a>*/}
                                            </div>
                                        </InfoWindowF>
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
                            <ScheduleDetailList
                                travelRoomId={travelRoomId}
                                startDate={fetchedSchedule.startDate}
                                endDate={fetchedSchedule.endDate}
                            />
                        </ContentContainer>
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
  height: 100%;
  box-sizing: border-box;
  background-color: #fafafa;
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

const containerStyle = {
    width: '100%',
    height: '100%',
};

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

const ContentContainer = styled.div`
  width: 390px;
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20vh;
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
