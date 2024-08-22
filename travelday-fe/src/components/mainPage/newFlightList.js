import React from 'react';
import styled from 'styled-components';
import Image1 from '../../images/main/list1/1.png';
import Image2 from '../../images/main/list1/2.png';
import Image3 from '../../images/main/list1/3.png';
import Image4 from '../../images/main/list1/4.png';
import Image5 from '../../images/main/list1/5.png';
import Image6 from '../../images/main/list1/6.png';

const flights = [
  {
    departure: '인천',
    destination: '푸꾸옥',
    date: '2024-09-28',
    price: '₩237,000',
    image: Image1,
    //https://www.agoda.com/ko-kr/flights/airport/ICN/PQC/Seoul-Phu-Quoc-Island.html?cid=1834243&tag=73702578-adda-4b97-a1c7-12c1b3b0745d&gad_source=1&gclid=CjwKCAjwoJa2BhBPEiwA0l0ImKyJCooCWxpQRcJz6rbqi4CRayKdjFnnS-irkdVw0WIWcfNeVvlrghoC6xIQAvD_BwE
  },
  {
    departure: '인천',
    destination: '오이타',
    date: '2024-10-05',
    price: '₩600,000',
    image: Image2,
  },
  {
    departure: '인천',
    destination: '발리',
    date: '2024-11-10',
    price: '₩1,800,000',
    image: Image3,
  },
  {
    departure: '인천',
    destination: '도쿄',
    date: '2024-09-15',
    price: '₩1,200,000',
    image: Image4,
  },
  {
    departure: '부산',
    destination: '치앙마이',
    date: '2024-10-05',
    price: '₩600,000',
    image: Image5,
  },
  {
    departure: '청주',
    destination: '타이베이',
    date: '2024-11-10',
    price: '₩1,800,000',
    image: Image6,
  },
];

const NewFlightList = () => {
  return (
    <Wrapper>
      <ListContainer>
        {flights.map((flight, index) => (
          <ListItem key={index}>
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
  -webkit-overflow-scrolling: touch; /* 스크롤에 부드러운 효과를 주기 위한 속성 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Webkit 기반 브라우저에서 스크롤바 숨기기 */
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
`;

const FlightImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;
  object-fit: cover; /* 이미지가 박스에 맞게 크기 조정 */
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
