import React from 'react';
import styled from 'styled-components';

const FlightList = ({ flights }) => {
  return (
    <ListContainer>
      {flights.map((flight, index) => (
        <FlightItem key={index} flight={flight} />
      ))}
    </ListContainer>
  );
};

const FlightItem = ({ flight }) => {
  return (
    <ItemContainer>
      <FlightImage src={flight.image} isEmpty={!flight.image} />
      <FlightDetails>
        <Country>{flight.country}</Country>
        <City>{flight.city}</City>
        <Schedule>{flight.schedule}</Schedule>
        <Price>{flight.price}</Price>
      </FlightDetails>
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

const FlightImage = styled.div`
  width: 340px;
  height: 130px;
  background-color: ${(props) => (props.isEmpty ? '#ccc' : 'transparent')};
  border-radius: 4px;
  background-image: ${(props) => (props.isEmpty ? 'none' : `url(${props.src})`)};
  background-size: cover;
  background-position: center;
`;

const FlightDetails = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left; /* 왼쪽 정렬 */
`;

const Country = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const City = styled.div`
  font-size: 14px;
  color: #555;
`;

const Schedule = styled.div`
  font-size: 14px;
  color: #333;
`;

const Price = styled.div`
  font-size: 16px;
  color: #007BFF;
  font-weight: bold;
`;

export default FlightList;
