import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Image1 from '../../images/main/list1/1.png';
import Image2 from '../../images/main/list1/2.png';
import Image3 from '../../images/main/list1/3.png';
import Image4 from '../../images/main/list1/4.png';
import Image5 from '../../images/main/list1/5.png';
import Image6 from '../../images/main/list1/6.png';

const flights = [
  {
    id: 1,
    departure: '인천',
    destination: '푸꾸옥',
    date: '2024-09-28',
    price: '₩237,000',
    image: Image1,
  },
  {
    id: 2,
    departure: '인천',
    destination: '오이타',
    date: '2024-10-05',
    price: '₩600,000',
    image: Image2,
  },
  {
    id: 3,
    departure: '인천',
    destination: '발리',
    date: '2024-11-10',
    price: '₩1,800,000',
    image: Image3,
  },
  {
    id: 4,
    departure: '인천',
    destination: '도쿄',
    date: '2024-09-15',
    price: '₩1,200,000',
    image: Image4,
  },
  {
    id: 5,
    departure: '부산',
    destination: '치앙마이',
    date: '2024-10-05',
    price: '₩600,000',
    image: Image5,
  },
  {
    id: 6,
    departure: '청주',
    destination: '타이베이',
    date: '2024-11-10',
    price: '₩1,800,000',
    image: Image6,
  },
];

const NewFlightList = () => {
  const navigate = useNavigate();

  const handleItemClick = (flight) => {
    navigate(`/maindetail/${flight.id}`, { state: { flight } });
  };

  return (
    <Wrapper>
      <ListContainer>
        {flights.map((flight) => (
          <ListItem key={flight.id} onClick={() => handleItemClick(flight)}>
            <FlightImage src={flight.image} alt={`${flight.destination} image`} />
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
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
`;

const FlightImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;
  object-fit: cover;
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
