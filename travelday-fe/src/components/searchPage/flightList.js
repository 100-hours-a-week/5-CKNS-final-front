import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

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
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(`/flightdetail/${flight.iataCode}`); 
  };

  return (
    <ItemContainer onClick={handleClick}>
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
  cursor: pointer;
  transition: box-shadow 0.3s ease;

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
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left; /* 왼쪽 정렬 */
`;

const Country = styled.div`
  font-size: 12px;
`;

const City = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

const Schedule = styled.div`
  font-size: 12px;
`;

const Price = styled.div`
  font-size: 12px;
  color: #007BFF;
`;

export default FlightList;
