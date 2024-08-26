import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FlightResultList = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('http://travelday-env.eba-zmxjim7g.ap-northeast-2.elasticbeanstalk.com/api/flights');
        const data = await response.json();
        if (data.flights && data.flights.length > 0) {
          setFlights(data.flights);
        } else {
          console.error("No flights data available.");
        }
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setIsLoading(false); // Ensure loading is set to false
      }
    };

    fetchFlights();
  }, []);

  const formatDuration = (duration) => {
    return duration.replace(/ 0분$/, '');
  };

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
      <InfoItem>{formatDuration(duration)} 소요, {stops > 0 ? `경유 ${stops}회` : '직항'}</InfoItem>
    </FlightInfo>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ListContainer>
      {flights.length > 0 ? flights.map((flight, index) => (
        <FlightItem key={index}>
          <Airline>{flight.airline}</Airline>
          <RouteLabel>가는편</RouteLabel>
          {flight.segments.map((segment, segIndex) => (
            <FlightSegment key={segIndex}>
              {renderFlightDetails(segment.departure, segment.arrival)}
              {segIndex === flight.segments.length - 1 && renderFlightInfo(formatDuration(segment.duration), flight.segments.length - 1)}
            </FlightSegment>
          ))}
          <RouteLabel>오는편</RouteLabel>
          {flight.returnSegments.map((segment, segIndex) => (
            <FlightSegment key={segIndex}>
              {renderFlightDetails(segment.departure, segment.arrival)}
              {segIndex === flight.returnSegments.length - 1 && renderFlightInfo(formatDuration(segment.duration), flight.returnSegments.length - 1)}
            </FlightSegment>
          ))}
          <HorizontalLine />
          <Price>{flight.price}</Price>
        </FlightItem>
      )) : <p>No flights found.</p>}
    </ListContainer>
  );
};

export default FlightResultList;

// Styled components definitions remain the same as previously given.


// styled-components 그대로 유지

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

const Airline = styled.div`
  font-size: 13px;
  color: #000;
  width: 290px;
  margin-top: 10px;
`;

const RouteLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #007bff;
  margin-top: 15px;
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
