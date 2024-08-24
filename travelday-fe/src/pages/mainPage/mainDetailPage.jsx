import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../../components/shared/header.js'; 
import BottomNav from '../../components/shared/bottomNav.js';  
import { images } from '../../data/mainPage.js'; 
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const airportNames = {
  ICN: '인천국제공항',
  JFK: '존 F. 케네디 국제공항',
  // 필요한 다른 공항 코드들도 추가 가능
};

const getAirportName = (iataCode) => {
  return airportNames[iataCode] || iataCode;
};

const MainDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    // 데이터 가져오기
    axios.get(`https://api.thetravelday.co.kr/api/flights/${id}`)
      .then(response => {
        setFlight(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching flight data:', error);
      });
  }, [id]);

  const image = images[id];

  const renderFlightDetails = (departure, arrival) => (
    <FlightDetails>
      <TimeBold>{departure.at}</TimeBold>
      <Time>({getAirportName(departure.iataCode)})</Time>
      <Separator>·------------·</Separator>
      <TimeBold>{arrival.at}</TimeBold>
      <Time>({getAirportName(arrival.iataCode)})</Time>
    </FlightDetails>
  );

  const renderFlightInfo = (duration, stops) => (
    <FlightInfo>
      <InfoItem>{duration} {t('duration')}, {stops > 0 ? `${t('stops', { count: stops })}` : t('nonStop')}</InfoItem>
    </FlightInfo>
  );

  if (!flight) {
    return <p>{t('loading')}</p>;
  }

  return (
    <PageContainer>
      <Header />
      <Content>
        {image ? <StyledImage src={image} alt={`Image ${id}`} /> : <p>{t('imageNotFound')}</p>}
        <FlightItem>
          <Airline>{t('airline')}: {flight.carrierCode}</Airline>
          <FlightNumber>{t('flightNumber')}: {flight.itineraries[0].segments[0].number}</FlightNumber>
          <Aircraft>{t('aircraft')}: {t('aircraft.' + flight.itineraries[0].segments[0].aircraft.code)}</Aircraft>

          <RouteLabel>{t('outbound')}</RouteLabel>
          {flight.itineraries[0].segments.map((segment, segIndex) => (
            <FlightSegment key={segIndex}>
              {renderFlightDetails(segment.departure, segment.arrival)}
              {segIndex === flight.itineraries[0].segments.length - 1 && renderFlightInfo(segment.duration, segment.numberOfStops)}
            </FlightSegment>
          ))}

          <RouteLabel>{t('inbound')}</RouteLabel>
          {flight.itineraries[1]?.segments.map((segment, segIndex) => (
            <FlightSegment key={segIndex}>
              {renderFlightDetails(segment.departure, segment.arrival)}
              {segIndex === flight.itineraries[1].segments.length - 1 && renderFlightInfo(segment.duration, segment.numberOfStops)}
            </FlightSegment>
          ))}

          <HorizontalLine />
          <Price>{t('price.total')}: {flight.price.grandTotal} {flight.price.currency}</Price>
          <Price>{t('price.base')}: {flight.price.base} {flight.price.currency}</Price>
          <Price>{t('price.fees')}: {t('none')}</Price>
          <Price>{t('price.perAdult')}: {flight.travelerPricings[0].price.total} {flight.price.currency}</Price>
          <Price>{t('includedCheckedBags')}: {flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity} {t('bags')}</Price>

          <HorizontalLine />
          <BookingInfo>{t('bookingInfo.availableSeats')}: {flight.numberOfBookableSeats}</BookingInfo>
          <BookingInfo>{t('bookingInfo.lastTicketingDate')}: {flight.lastTicketingDate}</BookingInfo>
        </FlightItem>
      </Content>
      <BottomNav />
    </PageContainer>
  );
};

export default MainDetailPage;

// styled-components
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
  font-size: 14px;
  color: #000;
  width: 100%;
  margin-top: 10px;
  text-align: left;
`;

const FlightNumber = styled.div`
  font-size: 14px;
  color: #000;
  width: 100%;
  margin-top: 5px;
  text-align: left;
`;

const Aircraft = styled.div`
  font-size: 14px;
  color: #000;
  width: 100%;
  margin-top: 5px;
  text-align: left;
`;

const RouteLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #007bff;
  margin-top: 15px;
  width: 100%;
  text-align: left;
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

const BookingInfo = styled.div`
  font-size: 13px;
  color: #555;
  width: 100%;
  text-align: left;
`;
