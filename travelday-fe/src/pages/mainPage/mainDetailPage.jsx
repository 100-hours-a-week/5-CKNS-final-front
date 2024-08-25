import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Header from '../../components/shared/header.js'; 
import BottomNav from '../../components/shared/bottomNav.js';  
import { images } from '../../data/mainPage.js'; 

import TakeoffIcon from '../../images/filter/takeoff.png';
import PriceIcon from '../../images/filter/price.png';
import ScheduleIcon from '../../images/footer/schedule.png';
import PplIcon from '../../images/main/detail/ppl.png';

const airportNames = {
  ICN: '인천국제공항',
  JFK: '존 F. 케네디 국제공항',
  DAD: '다낭 국제공항',
};

const airlineNames = {
  KE: '대한항공',
};

const getAirportName = (iataCode) => airportNames[iataCode] || iataCode;
const getAirlineName = (carrierCode) => airlineNames[carrierCode] || carrierCode;

const formatDate = (dateTime) => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const formatDuration = (duration) => {
  const hours = duration.match(/(\d+)H/);
  const minutes = duration.match(/(\d+)M/);
  return `${hours ? hours[1] + '시간 ' : ''}${minutes ? minutes[1] + '분' : ''} 소요`;
};

const MainDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    axios.get(`https://api.thetravelday.co.kr/api/flights/${id}`)
      .then(response => {
        setFlight(response.data.data);
      })
      .catch(error => {
        console.error('항공 데이터 가져오는데 오류가 있습니다', error);
      });
  }, [id]);

  const image = images[id];

  const renderFlightDetails = (departure, arrival) => (
    <FlightDetails>
      <TimeBold>{formatDate(departure.at)}</TimeBold>
      <Route>{getAirportName(departure.iataCode)} ({departure.iataCode}) → {getAirportName(arrival.iataCode)} ({arrival.iataCode})</Route>
    </FlightDetails>
  );

  const renderFlightInfo = (duration, stops) => (
    <FlightInfo>
      <InfoItem>{formatDuration(duration)}, {stops > 0 ? `${t('stops', { count: stops })}` : t('nonStop')}</InfoItem>
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
          <SectionTitle>
            {t('항공 정보')}
            <Icon src={TakeoffIcon} alt="Takeoff" />
          </SectionTitle>

          <RouteLabel>{t('가는편')}</RouteLabel>
          <Airline>{getAirlineName(flight.itineraries[0].segments[0].carrierCode)}</Airline>
          {flight.itineraries[0].segments.map((segment, segIndex) => (
            <FlightSegment key={segIndex}>
              {renderFlightDetails(segment.departure, segment.arrival)}
              {segIndex === flight.itineraries[0].segments.length - 1 && renderFlightInfo(segment.duration, segment.numberOfStops)}
            </FlightSegment>
          ))}

          <HorizontalLine />

          <RouteLabel>{t('오는편')}</RouteLabel>
          <Airline>{getAirlineName(flight.itineraries[1].segments[0].carrierCode)}</Airline>
          {flight.itineraries[1].segments.map((segment, segIndex) => (
            <FlightSegment key={segIndex}>
              {renderFlightDetails(segment.departure, segment.arrival)}
              {segIndex === flight.itineraries[1].segments.length - 1 && renderFlightInfo(segment.duration, segment.numberOfStops)}
            </FlightSegment>
          ))}
          <HorizontalLine />

          <SectionTitle>
            {t('가격 정보')}
            <Icon src={PriceIcon} alt="Price" />
          </SectionTitle>
          <Price>{t('price.perAdult')}: {flight.travelerPricings[0].price.total} {flight.price.currency} ({flight.travelerPricings[0].fareDetailsBySegment[0].cabin})</Price>
          <Price>{t('includedCheckedBags')}: {flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity} {t('bags')}</Price>

          <SectionTitle>
            {t('예약 정보')}
            <Icon src={ScheduleIcon} alt="Schedule" />
          </SectionTitle>
          <BookingInfo>{t('bookingInfo.availableSeats')}: {flight.numberOfBookableSeats}</BookingInfo>
          <BookingInfo>{t('bookingInfo.lastTicketingDate')}: {flight.lastTicketingDate}</BookingInfo>
        </FlightItem>
        <PplImage src={PplIcon} alt="People" onClick={() => {
          window.location.href = "https://air.gmarket.co.kr/gm/init/lp/lpMain.do?cosemkid=ov17128974211865606&jaehuid=200012886&gad_source=1&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHu1gIeblGLOlGjnggp0j71uxJcmXX_6QxLqVYw2HcDJDIzjeFOezCRoC2kgQAvD_BwE&gate_id=ED9298F9-E43D-4BD0-B2FE-A5F9DC062212";
        }} />
      </Content>
      
      <BottomNav />
    </PageContainer>
  );
};

export default MainDetailPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  max-width: 370px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px; 
  padding-bottom: 100px;  
  margin-bottom: 20px;
`;
const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  object-fit: cover;
  margin-bottom: 15px;
`;

const FlightItem = styled.div`
  width: 100%;
  background-color: #fff;
  margin-bottom: 15px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
  text-align: left;
  margin-bottom: 15px;
  margin-top: 50px;
  position: relative;
  padding-bottom: 5px; 
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #c2c2c2;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  vertical-align: middle;
`;

const PplImage = styled.img`
  width: 390px;
  height: 110px;
  margin-bottom: 30px;
  margin-top: 40px;
  cursor: pointer;
`;

const RouteLabel = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
`;

const FlightDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const Time = styled.div`
  font-size: 14px;
  color: #555;
`;

const TimeBold = styled(Time)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Route = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

const Airline = styled.div`
  font-size: 14px;
  color: #007bff;
  margin-top: 5px;
`;

const FlightInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 15px;
`;

const InfoItem = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
`;

const FlightSegment = styled.div`
  margin-top: 10px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
  margin: 15px 0;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  width: 100%;
  margin-bottom: 5px;
`;

const BookingInfo = styled.div`
  font-size: 14px;
  color: #555;
  width: 100%;
  text-align: left;
  margin-top: 10px;
`;
