import React from "react";
import styled from 'styled-components';

const HotelResultList = () => {
  // 호텔 데이터 예시
  const hotels = [
    {
      name: 'Hilton New York',
      location: 'New York, USA',
      rating: '5 stars',
      price: '1,500,000원',
      amenities: ['무료 Wi-Fi', '조식 포함', '수영장'],
    },
    {
      name: 'Hotel de Paris',
      location: 'Paris, France',
      rating: '5 stars',
      price: '2,000,000원',
      amenities: ['무료 Wi-Fi', '조식 포함', '스파'],
    },
    {
      name: 'Tokyo Inn',
      location: 'Tokyo, Japan',
      rating: '3 stars',
      price: '800,000원',
      amenities: ['무료 Wi-Fi', '주차 가능'],
    },
  ];

  return (
    <ListContainer>
      {hotels.map((hotel, index) => (
        <HotelItem key={index}>
          <ImagePlaceholder /> {/* 이미지가 들어갈 자리 */}
          <HotelName>{hotel.name}</HotelName>
          <HotelLocation>{hotel.location}</HotelLocation>
          <Rating>{hotel.rating}</Rating>
          <Amenities>
            {hotel.amenities.join(' · ')}
          </Amenities>
          <HorizontalLine />
          <Price>{hotel.price}</Price>
        </HotelItem>
      ))}
    </ListContainer>
  );
};

export default HotelResultList;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
`;

const HotelItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  width: 313px;
  height: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    border: 1px solid #007bff;
  }
`;

const ImagePlaceholder = styled.div`
  width: 290px;
  height: 180px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const HotelName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  width: 290px;
`;

const HotelLocation = styled.div`
  font-size: 14px;
  color: #555;
  width: 290px;
  margin-top: 5px;
`;

const Rating = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #007bff;
  width: 290px;
  margin-top: 10px;
`;

const Amenities = styled.div`
  font-size: 12px;
  color: #555;
  width: 290px;
  margin-top: 10px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 10px 0;
`;

const Price = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #000;
  width: 280px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
