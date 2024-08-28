import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Image1 from '../../images/main/list1/PQC.png';
import Image2 from '../../images/main/list1/OIT.png';
import Image3 from '../../images/main/list1/DPS.png';
import Image4 from '../../images/main/list1/NRT.png';
import Image5 from '../../images/main/list1/CNX.png';
import Image6 from '../../images/main/list1/TPE.png';

const IATACodeToCity = {
  'PQC': '푸꾸옥',
  'OIT': '오이타',
  'CNX': '치앙마이',
  'NRT': '도쿄',
  'TPE': '타이베이',
  'KIX': '오사카',
  'DPS': '발리',
  'OKA': '오키나와',
  'FUK': '후쿠오카',
  'JFK': '뉴욕',
  'NGO': '나고야',
  'CDG': '파리',
  'SYD': '시드니',
  'MAD': '마드리드',
  'LHR': '런던',
  'VIE': '비엔나',
  'FRA': '프랑크푸르트',
  'FCO': '로마',
  'ICN': '인천',
};

const NewFlightList = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const listContainerRef = useRef(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('https://api.thetravelday.co.kr/api/flights/lowest-price/list');
        if (response.status === 200) {
          const imageMap = {
            'PQC': Image1,
            'OIT': Image2,
            'DPS': Image3,
            'NRT': Image4,
            'CNX': Image5,
            'TPE': Image6,
          };

          const formattedFlights = response.data.data
            .map((flight, index) => {
              const destinationCode = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode;
              const departureCode = flight.itineraries[0].segments[0].departure.iataCode;

              return {
                id: index + 1,
                destination: IATACodeToCity[destinationCode] || destinationCode,
                departure: IATACodeToCity[departureCode] || departureCode,
                date: flight.lastTicketingDate,
                price: `${flight.price.grandTotal} ${flight.price.currency}`,
                image: imageMap[destinationCode] || null,
                iataCode: destinationCode, 
              };
            })
            .filter(flight => flight.image);

          setFlights(formattedFlights);
        }
      } catch (error) {
        console.error('항공 데이터를 가져오는데 에러:', error);
      }
    };

    fetchFlights();
  }, []);

  const handleItemClick = (flight) => {
    navigate(`/maindetail/${flight.iataCode}`, { state: { flight } });
  };

  return (
    <Wrapper>
      <ListContainer ref={listContainerRef}>
        {flights.map((flight) => (
          <ListItem key={flight.id} onClick={() => handleItemClick(flight)}>
            {flight.image && <FlightImage src={flight.image} alt={`${flight.destination} 이미지`} />}
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
  overflow-x: auto; /* 가로 스크롤 활성화 */
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch; /* 부드러운 스크롤링 */
  scrollbar-width: thin; /* Firefox에서 스크롤바 얇게 표시 */

  &::-webkit-scrollbar {
    height: 8px; /* 스크롤바 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #007bff; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모서리 */
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* 스크롤바 트랙(배경) 색상 */
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  overflow-x: auto; /* 가로 스크롤 가능하게 설정 */

  /* 스크롤바 스타일 통일 */
  scrollbar-width: thin; /* Firefox에서 스크롤바 얇게 표시 */
  &::-webkit-scrollbar {
    height: 8px; /* 스크롤바 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #007bff; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모서리 */
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* 스크롤바 트랙(배경) 색상 */
  }
`;


const ListItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  cursor: pointer;
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
