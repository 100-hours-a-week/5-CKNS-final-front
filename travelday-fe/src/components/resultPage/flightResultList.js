import React from "react";
import styled from 'styled-components';

const FlightResultList = () => {
  // 예시 데이터
  const flights = [
    {
      airline: '아시아나항공',
      departureTime: '10:00',
      departureAirport: 'ICN',
      arrivalTime: '16:00',
      arrivalAirport: 'LAX',
      duration: '10시간 0분',
      stops: 1,  // 경유
      segments: [
        {
          segmentDepartureTime: '10:00',
          segmentDepartureAirport: 'ICN',
          segmentArrivalTime: '12:00',
          segmentArrivalAirport: 'NRT',
          segmentDuration: '2시간 0분',
        },
        {
          segmentDepartureTime: '14:00',
          segmentDepartureAirport: 'NRT',
          segmentArrivalTime: '16:00',
          segmentArrivalAirport: 'LAX',
          segmentDuration: '10시간 0분',
        },
      ],
      returnDepartureTime: '18:00',
      returnDepartureAirport: 'LAX',
      returnArrivalTime: '22:00',
      returnArrivalAirport: 'ICN',
      returnDuration: '11시간 0분',
      returnStops: 0,
      price: '850,000원'
    },
    {
      airline: '제주항공',
      departureTime: '12:30',
      departureAirport: 'INC',
      arrivalTime: '14:30',
      arrivalAirport: 'KIX', 
      duration: '2시간 0분',
      stops: 0,
      returnDepartureTime: '16:30',
      returnDepartureAirport: 'KIX',
      returnArrivalTime: '18:30',
      returnArrivalAirport: 'INC',
      returnDuration: '2시간 0분',
      returnStops: 0,
      price: '130,000원'
    }
  ];

  const renderFlightDetails = (departureTime, departureAirport, arrivalTime, arrivalAirport) => (
    <FlightDetails>
      <TimeBold>{departureTime}</TimeBold>
      <Time>({departureAirport})</Time>
      <Separator>·------------·</Separator>
      <TimeBold>{arrivalTime}</TimeBold>
      <Time>({arrivalAirport})</Time>
    </FlightDetails>
  );

  const renderFlightInfo = (duration, stops) => (
    <FlightInfo>
      <InfoItem>{duration} 소요, {stops > 0 ? `경유 ${stops}회` : '직항'}</InfoItem>
    </FlightInfo>
  );

  return (
    <ListContainer>
      {flights.map((flight, index) => (
        <FlightItem key={index}>
          <Airline>{flight.airline}</Airline>

          <RouteLabel>가는편</RouteLabel>
          {flight.stops > 0 ? (
            flight.segments.map((segment, segIndex) => (
              <FlightSegment key={segIndex}>
                {renderFlightDetails(segment.segmentDepartureTime, segment.segmentDepartureAirport, segment.segmentArrivalTime, segment.segmentArrivalAirport)}
                {segIndex === flight.segments.length - 1 && renderFlightInfo(segment.segmentDuration, flight.stops)}
              </FlightSegment>
            ))
          ) : (
            <>
              {renderFlightDetails(flight.departureTime, flight.departureAirport, flight.arrivalTime, flight.arrivalAirport)}
              {renderFlightInfo(flight.duration, flight.stops)}
            </>
          )}

          <RouteLabel>오는편</RouteLabel>
          {renderFlightDetails(flight.returnDepartureTime, flight.returnDepartureAirport, flight.returnArrivalTime, flight.returnArrivalAirport)}
          {renderFlightInfo(flight.returnDuration, flight.returnStops)}

          <HorizontalLine />
          <Price>{flight.price}</Price>
        </FlightItem>
      ))}
    </ListContainer>
  );
};

export default FlightResultList;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
`;

const FlightItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
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

const Airline = styled.div`
  font-size: 13px;
  color: #000;
  width: 290px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const RouteLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #007bff;
  margin-top: 25px;
  width: 290px;
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
