import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../../components/shared/header.js'; 
import BottomNav from '../../components/shared/bottomNav.js';  
import { images } from '../../data/mainPage.js'; 
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useTranslation } from 'react-i18next';

import TakeoffIcon from '../../images/filter/takeoff.png';
import PriceIcon from '../../images/filter/price.png';
import ScheduleIcon from '../../images/footer/schedule.png';
import PplIcon from '../../images/main/detail/ppl.png';

import TipsPopup from '../../components/mainPage/tipsPopup.js';
import QuestionPopup from '../../components/mainPage/questionPopup.js';

const airportNames = {
  ICN: '인천국제공항',
  JFK: '존 F. 케네디 국제공항',
  DAD: '다낭 국제공항',
};

const airlineNames = {
  KE: '대한항공',
};

const getAirportName = (iataCode) => {
  return airportNames[iataCode] || iataCode;
};

const getAirlineName = (carrierCode) => {
  return airlineNames[carrierCode] || carrierCode;
};

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
  const [showTipsPopup, setShowTipsPopup] = useState(false);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);

  useEffect(() => {
    const mock = new MockAdapter(axios);

    mock.onGet(`https://api.thetravelday.co.kr/api/flights/${id}`).reply(200, {
      data: {
        type: "flight-offer",
        id: "1",
        lastTicketingDate: "2024-08-27",
        lastTicketingDateTime: "2024-08-27T23:59:00",
        numberOfBookableSeats: 9,
        itineraries: [
          {
            duration: "PT4H35M",
            segments: [
              {
                departure: {
                  iataCode: "ICN",
                  at: "2024-08-24T15:25:00"
                },
                arrival: {
                  iataCode: "DAD",
                  at: "2024-08-24T19:00:00"
                },
                carrierCode: "KE",
                number: "3618",
                aircraft: {
                  code: "789"
                },
                duration: "PT3H35M",
                numberOfStops: 0
              }
            ]
          },
          {
            duration: "PT4H30M",
            segments: [
              {
                departure: {
                  iataCode: "DAD",
                  at: "2024-08-30T11:00:00"
                },
                arrival: {
                  iataCode: "ICN",
                  at: "2024-08-30T14:30:00"
                },
                carrierCode: "KE",
                number: "3619",
                aircraft: {
                  code: "789"
                },
                duration: "PT4H30M",
                numberOfStops: 0
              }
            ]
          }
        ],
        price: {
          currency: "USD",
          total: "899.99",
          base: "700.00",
          fees: [
            {
              amount: "0.00",
              type: "SUPPLIER"
            },
            {
              amount: "0.00",
              type: "TICKETING"
            }
          ],
          grandTotal: "899.99"
        },
        travelerPricings: [
          {
            travelerId: "1",
            fareOption: "STANDARD",
            travelerType: "ADULT",
            price: {
              currency: "USD",
              total: "450.00",
              base: "350.00"
            },
            fareDetailsBySegment: [
              {
                segmentId: "1",
                cabin: "ECONOMY",
                fareBasis: "YCNV1",
                class: "Y",
                includedCheckedBags: {
                  quantity: 1
                }
              },
              {
                segmentId: "2",
                cabin: "ECONOMY",
                fareBasis: "YCNV1",
                class: "Y",
                includedCheckedBags: {
                  quantity: 1
                }
              }
            ]
          }
        ]
      }
    });

    axios.get(`https://api.thetravelday.co.kr/api/flights/${id}`)
      .then(response => {
        setFlight(response.data.data);
      })
      .catch(error => {
        console.error('항공 데이터 가져오는데 오류가 있습니다', error);
      });
  }, [id]);

  const image = images[id];

  const renderFlightDetails = (departure, arrival, carrierCode) => (
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

  const handlePplImageClick = () => {
    window.location.href = "https://air.gmarket.co.kr/gm/init/lp/lpMain.do?cosemkid=ov17128974211865606&jaehuid=200012886&gad_source=1&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHu1gIeblGLOlGjnggp0j71uxJcmXX_6QxLqVYw2HcDJDIzjeFOezCRoC2kgQAvD_BwE&gate_id=ED9298F9-E43D-4BD0-B2FE-A5F9DC062212";
  };

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
              {renderFlightDetails(segment.departure, segment.arrival, segment.carrierCode)}
              {segIndex === flight.itineraries[0].segments.length - 1 && renderFlightInfo(segment.duration, segment.numberOfStops)}
            </FlightSegment>
          ))}
  
          <HorizontalLine />
  
          <RouteLabel>{t('오는편')}</RouteLabel>
          <Airline>{getAirlineName(flight.itineraries[1].segments[0].carrierCode)}</Airline>
          {flight.itineraries[1].segments.map((segment, segIndex) => (
            <FlightSegment key={segIndex}>
              {renderFlightDetails(segment.departure, segment.arrival, segment.carrierCode)}
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
        <PplImage src={PplIcon} alt="People" onClick={handlePplImageClick} />
        <ButtonContainer>
        <Button onClick={() => setShowTipsPopup(true)}>{t('자주 묻는 질문')}</Button>
        <Button onClick={() => setShowQuestionPopup(true)}>{t('원하는 지역이 없어요!')}</Button>
      </ButtonContainer>
      {showTipsPopup && <PopupContainer><TipsPopup /></PopupContainer>}
      {showQuestionPopup && <PopupContainer><QuestionPopup /></PopupContainer>}
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

// styled-components를 사용한 스타일 정의
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

