import React from 'react';
import styled from 'styled-components';

const HotelList = ({ hotels }) => {
  return (
    <ListContainer>
      {hotels.map((hotel, index) => (
        <HotelItem key={index} hotel={hotel} />
      ))}
    </ListContainer>
  );
};

const HotelItem = ({ hotel }) => {
  return (
    <ItemContainer>
      <HotelImage src={hotel.image} isEmpty={!hotel.image} />
      <HotelDetails>
        <HotelName>{hotel.name}</HotelName>
        <Location>{hotel.location}</Location>
        <Rating>{hotel.rating}</Rating>
        <Price>{hotel.price}</Price>
      </HotelDetails>
    </ItemContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  width: 390px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  gap: 10px;
`;

const HotelImage = styled.div`
  width: 340px;
  height: 130px;
  background-color: ${(props) => (props.isEmpty ? '#ccc' : 'transparent')};
  border-radius: 4px;
  background-image: ${(props) => (props.isEmpty ? 'none' : `url(${props.src})`)};
  background-size: cover;
  background-position: center;
`;

const HotelDetails = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
`;

const HotelName = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

const Location = styled.div`
  font-size: 12px;
`;

const Rating = styled.div`
  font-size: 12px;
`;

const Price = styled.div`
  font-size: 12px;
  color: #007BFF;
`;

export default HotelList;
