import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

const HotelDetail = ({ details }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;


  return (
    <DetailContainer>
      <Title>{details.name}</Title>
      <GoogleMapContainer>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={{
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
            }}
            zoom={15}
          >
            <Marker
              position={{
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
              }}
            />
          </GoogleMap>
        </LoadScript>
      </GoogleMapContainer>
    </DetailContainer>
  );
};

export default HotelDetail;

const DetailContainer = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const GoogleMapContainer = styled.div`
  margin-bottom: 20px;
`;
