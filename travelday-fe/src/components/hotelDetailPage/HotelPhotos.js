import React from 'react';
import styled from 'styled-components';

const HotelPhotos = ({ photos, apiKey }) => {
  return (
    <PhotoGallery>
      {photos.map((photo, index) => (
        <img
          key={index}
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`}
          alt={`호텔 사진 ${index + 1}`}
        />
      ))}
    </PhotoGallery>
  );
};

export default HotelPhotos;

const PhotoGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
