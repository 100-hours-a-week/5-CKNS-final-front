import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import calendarIcon from '../../images/filter/calendar.png'; 
import searchIcon from '../../images/search/search.png';
import MapSearchResultsPopup from '../../components/mapPage/mapSearchResultsPopup.js';

const center = {
  lat: 37.5400456,
  lng: 126.9921017
};

function MapLocationPage() {
  const { travelRoomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { schedule } = location.state;
  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [markers, setMarkers] = useState([]); 
  const [places, setPlaces] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('토큰이 없습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleSearch = () => {
    if (map && searchInput) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        query: searchInput,
        fields: ['name', 'geometry', 'formatted_address', 'rating', 'photos'],
        language: 'ko'
      };
  
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setMarkers(results.map(result => ({
            position: result.geometry.location,
            name: result.name,
            address: result.formatted_address
          })));
          setPlaces(results); 
          setIsPopupOpen(true);
          setIsSearchComplete(true); 
          if (results[0]) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(12);
          }
        } else {
          console.error('Places Service failed:', status); 
        }
      });
    } else {
      console.warn('Map is not loaded or searchInput is empty.');  
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedPlace(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  const handleResultClick = (place) => {
    if (map && place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(15);
      setIsPopupOpen(false);
    }
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);  
  };

  const handleBackClick = () => {
    navigate(`/schedule/${travelRoomId}`, {
      state: { schedule, travelRoomId },
    });
  };

  return (
    <Container>
      <Header showBackButton={true} onBackClick={handleBackClick} />
      <ContentWrapper>
        <TitleWrapper>
          <Title>{schedule.name || 'Map Location'}</Title>
          <ScheduleDateWrapper>
            <Icon src={calendarIcon} alt="달력 아이콘" />
            <ScheduleDate>{schedule.startDate} ~ {schedule.endDate}</ScheduleDate>
          </ScheduleDateWrapper>
        </TitleWrapper>
        <SearchContainer>
          <SearchInput 
            type="text" 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)} 
            onKeyPress={handleKeyPress} 
            placeholder="장소, 주소를 입력하세요" 
          />
          <SearchIcon src={searchIcon} onClick={handleSearch} alt="search icon" />
        </SearchContainer>
        <MapButtonContainer>
          {isSearchComplete && (
            <PopupToggleButton onClick={handlePopupToggle}>
              {isPopupOpen ? '리스트로 보기' : '리스트로 보기'}
            </PopupToggleButton>
          )}
          <GoogleMap
            mapContainerStyle={isSearchComplete ? containerStyleWithButton : containerStyle}
            center={center}
            zoom={10}
            onLoad={map => setMap(map)}
          >
            {markers.map((marker, index) => (
              <Marker 
                key={index} 
                position={marker.position} 
                onClick={() => handleMarkerClick(marker)}
              />
            ))}

            {selectedPlace && (
              <InfoWindow
                position={selectedPlace.position}
                onCloseClick={handleInfoWindowClose}
              >
                <InfoWindowContent>
                  <h3>{selectedPlace.name}</h3>
                  <p>{selectedPlace.address}</p>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.name)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Google Maps에서 열기
                  </a>
                </InfoWindowContent>
              </InfoWindow>
            )}
          </GoogleMap>
        </MapButtonContainer>
        <BottomPadding />
        <BottomNav />

        <MapSearchResultsPopup 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)} 
          searchResults={places} 
          onResultClick={handleResultClick}
          travelRoomId={travelRoomId}
        />
      </ContentWrapper>
    </Container>
  );
}

export default React.memo(MapLocationPage);

const containerStyle = {
  width: '390px',
  height: '760px'  
};

const containerStyleWithButton = {
  width: '390px',
  height: '710px'  
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
`;

const ContentWrapper = styled.div`
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  position: relative;
`;

const TitleWrapper = styled.div`
  width: 390px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 30px 0 10px 20px;
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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #fff;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 16px;
  width: 200px;
  outline: none;
  
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: -40px;
  margin-right: 10px;
  cursor: pointer;
`;

const MapButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const BottomPadding = styled.div`
  height: 80px; 
`;

const InfoWindowContent = styled.div`
  h3 {
    margin: 0 0 10px;
    font-size: 16px;
  }
  p {
    margin: 0 0 10px;
    font-size: 14px;
  }
  a {
    color: #007BFF;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PopupToggleButton = styled.button`
  margin-bottom: 10px;  
  width: 310px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc; 
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease; 

  &:hover {
    background-color: #e0e0e0; 
    color: #000; 
  }
`;
