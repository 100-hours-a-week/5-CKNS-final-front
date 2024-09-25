import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {GoogleMap, MarkerF, InfoWindowF, PolylineF, Polyline} from '@react-google-maps/api';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import calendarIcon from '../../images/filter/calendar.png';
import penIcon from '../../images/pen.png';
import ScheduleDetailList from '../../components/schedulePage/scheduleDetailList';
import InviteModal from '../../components/schedulePage/inviteModal.js';
import ScheduleTab from "../../components/schedulePage/scheduleTab";

const ScheduleDetail = () => {
    const { travelRoomId } = useParams();
    const navigate = useNavigate();

    const [fetchedSchedule, setFetchedSchedule] = useState(null);
    const [mapMarkers, setMapMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markersLoaded, setMarkersLoaded] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: 37.5400456, lng: 126.9921017 });

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        axiosInstance.get(`/api/rooms/${travelRoomId}`, { withCredentials: true })
            .then(response => {
                if (response.data) {
                    setFetchedSchedule(response.data.data);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [travelRoomId]);

    useEffect(() => {
        if (markersLoaded) {
            return;
        }
        axiosInstance.get(`/api/rooms/${travelRoomId}/plan`, { withCredentials: true })
            .then(response => {
                if (response.data) {
                    const fetchedMarkers = response.data.data;
                    if (JSON.stringify(fetchedMarkers) !== JSON.stringify(mapMarkers)) {
                        setMapMarkers(fetchedMarkers);
                        setMapCenter({ lat: fetchedMarkers[0].latitude, lng: fetchedMarkers[0].longitude });
                        setMarkersLoaded(true);
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [mapMarkers, markersLoaded, travelRoomId]);

    const handleAddFromWish = () => {
        navigate(`/wishlist/${travelRoomId}`, { state: { schedule: fetchedSchedule } });
    };

    const handleAddFromMap = () => {
        navigate(`/maplocation/${travelRoomId}`, { state: { schedule: fetchedSchedule } });
    };

    const handleEditClick = () => {
        navigate(`/fixschedule/${travelRoomId}`, { state: { schedule: fetchedSchedule } });
    };

    const handleInviteClick = () => {
        setIsInviteModalOpen(true);
    };

    const handleInviteModalClose = () => {
        setIsInviteModalOpen(false);
    };

    // Generate a color based on the index, following the rainbow gradient pattern
    const getMarkerColor = (day) => {
        const day1 = new Date(fetchedSchedule.startDate);
        const day2 = new Date(fetchedSchedule.endDate)
        const totalDate = (day2.getTime()-day1.getTime() ) / (1000 * 60 * 60 * 24) + 1
        const hue = (day / totalDate) * 30 + 240; // Generate hue value from 0 to 360
        return `hsl(${hue}, 100%, 50%)`; // Full saturation and medium lightness
    };

    return (
        <Container>
            <Header showBackButton={true} onBackClick={() => navigate('/schedule')} />
            <ContentWrapper>
                {fetchedSchedule ? (
                    <>
                        <TitleWrapper>
                            <Title>{fetchedSchedule.name}</Title>
                            <MetaWrapper>
                                <IconButton onClick={handleEditClick}>
                                    <EditIcon src={penIcon} alt="Edit Icon" />
                                </IconButton>
                                <ScheduleDateWrapper>
                                    <Icon src={calendarIcon} alt="달력 아이콘" />
                                    <ScheduleDate>{fetchedSchedule.startDate} ~ {fetchedSchedule.endDate}</ScheduleDate>
                                </ScheduleDateWrapper>
                            </MetaWrapper>
                            <InviteButton onClick={handleInviteClick}>
                                    +일행 초대하기
                            </InviteButton>
                        </TitleWrapper>
                        <ContentContainer>
                            <MapContainer>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={mapCenter}
                                    zoom={10}
                                    options={{
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        styles: [{ featureType: "poi", stylers: [{ visibility: 'off' }] }]
                                    }}
                                >
                                    {markersLoaded && (
                                        mapMarkers.map((marker, index) => (
                                            <MarkerF
                                                key={index}
                                                position={{ lat: marker.latitude, lng: marker.longitude }}
                                                onClick={() => setSelectedMarker(marker)}
                                                icon={{
                                                    // path: marker.icons,
                                                    path: "M12 2C7.58172 2 4 6.00258 4 10.5C4 14.9622 6.55332 19.8124 10.5371 21.6744C11.4657 22.1085 12.5343 22.1085 13.4629 21.6744C17.4467 19.8124 20 14.9622 20 10.5C20 6.00258 16.4183 2 12 2ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z",
                                                    fillColor: getMarkerColor(marker.scheduledDay),
                                                    fillOpacity: 0.8,
                                                    scale: 1.5,
                                                    // strokeColor: getMarkerColor(marker.scheduledDay),
                                                    strokeColor: "black",
                                                    strokeWeight: 3,
                                                    anchor: new window.google.maps.Point(12, 24) // Centering the marker
                                                }}
                                                animation={2}
                                            />
                                        ))
                                    )}

                                    {/* Draw lines between markers */}
                                    {markersLoaded && (
                                        <PolylineF
                                            path={mapMarkers.map(marker => ({ lat: marker.latitude, lng: marker.longitude }))}
                                            options={{
                                                strokeColor: '#FF0000',
                                                strokeOpacity: 0.8,
                                                strokeWeight: 2,
                                                clickable: false,
                                                draggable: false,
                                                editable: false,
                                                geodesic: true,
                                            }}
                                        />
                                    )}

                                    {selectedMarker && (
                                        <InfoWindowF
                                            position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                                            onCloseClick={() => setSelectedMarker(null)}
                                        >
                                            <div>
                                                <h4>{selectedMarker.name}</h4>
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
                            <ScheduleTab travelRoomId={travelRoomId} startDate={fetchedSchedule.startDate} endDate={fetchedSchedule.endDate} />
                        </ContentContainer>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </ContentWrapper>
            <BottomNav />
            <InviteModal 
                isOpen={isInviteModalOpen} 
                onClose={handleInviteModalClose} 
                searchInput={searchInput} 
                setSearchInput={setSearchInput} 
            />
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
  justify-content: space-between;
  background-color: #fff;
  position: relative;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 30px 0 10px 20px; 
  text-align: left;
`;

const MetaWrapper = styled.div`
  display: flex;
  width: inherit;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  margin-right: 20px;
  cursor: pointer;
`;

const EditIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const InviteButton = styled.button`
  background-color: #ffffff;
  border: 1.5px solid #ccc;  
  font-size: 14px;
  color: #000;
  cursor: pointer;
  margin-left: 20px;
  margin-top: 15px;
  padding: 10px 20px;  
  border-radius: 25px; 
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;  
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #5bbab5;  
    color: #ffffff;  
    border-color: #5bbab5;  
  }
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
  margin-bottom: 20px;
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

