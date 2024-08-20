import React, { useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import searchIcon from '../../images/search/search.png'; 
import SearchResultsPopup from '../../components/mapPage/searchResultsPopup.js';

const center = {
  lat: 37.5400456,
  lng: 126.9921017
};

function MapPage() {
  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [markers, setMarkers] = useState([]); 
  const [places, setPlaces] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleSearch = () => {
    if (map && searchInput) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        query: searchInput,
        fields: ['name', 'geometry', 'formatted_address', 'rating', 'photos'], // place_id 대신 name을 사용
        language: 'ko'
      };
  
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          console.log('Search results:', results); // API에서 반환된 결과를 콘솔에 출력
          const newMarkers = results.map(result => ({
            position: result.geometry.location,
            name: result.name,
            address: result.formatted_address
          }));
          setMarkers(newMarkers);
          setPlaces(results); 
          setIsPopupOpen(true);
          if (results[0]) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(12);
          }
        } else {
          console.error('Places Service failed:', status); // 오류 메시지 출력
        }
      });
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMarkerClick = (marker) => {
    console.log('Marker clicked:', marker); // 마커 클릭 시 정보 출력
    setSelectedPlace(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  const handleResultClick = (place) => {
    if (map && place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(15);
      setIsPopupOpen(false); // 팝업 닫기
    }
  };

  return (
    <Container>
      <Header />
      <Content>
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
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={map => setMap(map)}
        >
          {markers.map((marker, index) => (
            <Marker 
              key={index} 
              position={marker.position} 
              onClick={() => handleMarkerClick(marker)} // 마커 클릭 시 handleMarkerClick 호출
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
      </Content>
      <BottomPadding />
      <BottomNav />

      <SearchResultsPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        searchResults={places} 
        onResultClick={handleResultClick}
      />
    </Container>
  );
}

export default React.memo(MapPage);

const containerStyle = {
  width: '390px',
  height: '920px'
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
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

const BottomPadding = styled.div`
  height: 110px; 
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
