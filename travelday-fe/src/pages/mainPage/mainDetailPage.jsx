import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../../components/shared/header.js'; 
import BottomNav from '../../components/shared/bottomNav.js';  
import { images, flightData } from '../../data/mainPage.js'; 

const MainDetailPage = () => {
  const { id } = useParams();
  const image = images[id];
  const flight = flightData[id];

  const renderFlightDetails = (departure, arrival) => (
    <FlightDetails>
      <TimeBold>{departure.at}</TimeBold>
      <Time>({departure.iataCode})</Time>
      <Separator>·------------·</Separator>
      <TimeBold>{arrival.at}</TimeBold>
      <Time>({arrival.iataCode})</Time>
    </FlightDetails>
  );

  const renderFlightInfo = (duration, stops) => (
    <FlightInfo>
      <InfoItem>{duration} 소요, {stops > 0 ? `경유 ${stops}회` : '직항'}</InfoItem>
    </FlightInfo>
  );

  return (
    <PageContainer>
      <Header />
      <Content>
        {image ? <StyledImage src={image} alt={`Image ${id}`} /> : <p>Image not found</p>}
        {flight ? (
          <FlightItem>
            <Airline>{flight.airline}</Airline>

            <RouteLabel>가는편</RouteLabel>
            {flight.segments.map((segment, segIndex) => (
              <FlightSegment key={segIndex}>
                {renderFlightDetails(segment.departure, segment.arrival)}
                {segIndex === flight.segments.length - 1 && renderFlightInfo(segment.duration, flight.segments.length - 1)}
              </FlightSegment>
            ))}

            <RouteLabel>오는편</RouteLabel>
            {flight.returnSegments.map((segment, segIndex) => (
              <FlightSegment key={segIndex}>
                {renderFlightDetails(segment.departure, segment.arrival)}
                {segIndex === flight.returnSegments.length - 1 && renderFlightInfo(segment.duration, flight.returnSegments.length - 1)}
              </FlightSegment>
            ))}

            <HorizontalLine />
            <Price>{flight.price}</Price>
          </FlightItem>
        ) : (
          <p>Flight information not found</p>
        )}
      </Content>
      <BottomNav />
    </PageContainer>
  );
};

export default MainDetailPage;

// 기존의 styled-components 유지
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

const Content = styled.div`
  flex: 1;
  width: 390px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledImage = styled.img`
  width: 390px;
  height: 390px;
  object-fit: cover;
`;

const FlightItem = styled.div`
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
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    border: 1px solid #007bff;
  }
`;

const Airline = styled.div`
  font-size: 13px;
  color: #000;
  width: 100%; /* 전체 너비를 차지하게 설정 */
  margin-top: 10px;
  text-align: left; /* 왼쪽 정렬 */
`;

const RouteLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #007bff;
  margin-top: 15px;
  width: 100%; /* 전체 너비를 차지하게 설정 */
  text-align: left; /* 왼쪽 정렬 */
`;

const FlightDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-top: 5px;
`;

const Time = styled.div`
  font-size: 12px;
  color: #000;
`;

const TimeBold = styled(Time)`
  font-size: 18px;
  font-weight: bold;
`;

const Separator = styled.div`
  font-size: 14px;
  color: #999;
`;

const FlightInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 290px;
  margin-top: 10px;
`;

const InfoItem = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const FlightSegment = styled.div`
  margin-top: 0px;
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
