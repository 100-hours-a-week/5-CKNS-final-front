import React from 'react';
import styled from 'styled-components';

const flights = [
  {
    departure: '인천',
    destination: '오이타',
    date: '2024-09-15',
    price: '₩1,200,000',
  },
  {
    departure: '인천',
    destination: '푸꾸옥',
    date: '2024-10-05',
    price: '₩600,000',
  },
  {
    departure: '인천',
    destination: '치앙마이',
    date: '2024-11-10',
    price: '₩1,800,000',
  },
  {
    departure: '인천',
    destination: '발리',
    date: '2024-09-15',
    price: '₩1,200,000',
  },
  {
    departure: '부산',
    destination: '도쿄',
    date: '2024-10-05',
    price: '₩600,000',
  },
  {
    departure: '청주',
    destination: '타이베이',
    date: '2024-11-10',
    price: '₩1,800,000',
  },
];

const NewFlightList = () => {
  return (
    <Wrapper>
      <ListContainer>
        {flights.map((flight, index) => (
          <ListItem key={index}>
            <PlaceholderImage />
            <FlightDetails>
              <FlightRoute>{`${flight.departure} - ${flight.destination}`}</FlightRoute>
              <FlightDate>{flight.date}</FlightDate>
              <FlightPrice>{flight.price}</FlightPrice>
            </FlightDetails>
          </ListItem>
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default NewFlightList;

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-bottom: 10px; 
    -webkit-overflow-scrolling: touch; /* 스크롤에 부드러운 효과를 주기 위한 속성 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Webkit 기반 브라우저에서 스크롤바 숨기기 */
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%; /* 컨테이너의 너비를 100%로 설정 */
  
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

const PlaceholderImage = styled.div`
  width: 120px;
  height: 120px;
  background-color: #ccc; 
  border-radius: 5px ;
`;

const FlightDetails = styled.div`
  padding: 10px;
  text-align: left;
  width: 105px;
  `;

const FlightRoute = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const FlightDate = styled.div`
  font-size: 12px;
  color: #777777;
  margin-top: 5px;
`;

const FlightPrice = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #007bff;
  margin-top: 10px;
`;
