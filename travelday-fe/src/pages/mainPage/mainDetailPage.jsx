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
  PQC: '푸꾸옥 국제공항',
  OIT: '오이타 공항',
  CNX: '치앙마이 국제공항',
  TPE: '타이완 타오위안 국제공항',
  KIX: '간사이 국제공항',
  HND: '하네다 공항',
  DPS: '응우라라이 국제공항',
  OKA: '나하 공항',
  FUK: '후쿠오카 공항',
  JFK: '존 F. 케네디 국제공항',
  NGO: '츄부 센트레아 국제공항',
  CDG: '샤를 드 골 국제공항',
  SYD: '시드니 킹스포드 스미스 국제공항',
  MAD: '마드리드 바라하스 국제공항',
  LHR: '런던 히드로 공항',
  VIE: '비엔나 국제공항',
  FRA: '프랑크푸르트 공항',
  FCO: '피우미치노 공항',
  ICN: '인천국제공항',
  NRT: '나리타 공항',
  KUL: '쿠알라룸푸르국제공항'
};

const airlineNames = {
    KE: '대한항공',
    OZ: '아시아나항공',
    JL: '일본항공',
    NH: '전일본공수',
    AA: '아메리칸 항공',
    UA: '유나이티드 항공',
    DL: '델타 항공',
    SQ: '싱가포르 항공',
    CX: '캐세이퍼시픽 항공',
    QF: '콴타스 항공',
    BA: '영국항공',
    AF: '에어프랑스',
    LH: '루프트한자',
    EK: '에미레이트 항공',
    QR: '카타르 항공',
    TG: '타이 항공',
    MH: '말레이시아 항공',
    BR: '에바 항공',
    CI: '중화항공',
    CZ: '중국남방항공',
    MU: '중국동방항공',
    CA: '중국국제항공',
    NZ: '에어 뉴질랜드',
    TK: '터키항공',
    SU: '아에로플로트',
    '7C': '제주항공', 
    'H1': '한에어항공',
    YP: '에어프레미아',
    OD: '말린도항공',
    TW: '티웨이항공'
  };


const airlineUrls = {
    KE: 'https://www.koreanair.com', // 대한항공
    OZ: 'https://flyasiana.com', // 아시아나항공
    JL: 'https://www.jal.com', // 일본항공
    NH: 'https://www.ana.co.jp', // 전일본공수
    AA: 'https://www.aa.com', // 아메리칸 항공
    UA: 'https://www.united.com', // 유나이티드 항공
    DL: 'https://www.delta.com', // 델타 항공
    SQ: 'https://www.singaporeair.com', // 싱가포르 항공
    CX: 'https://www.cathaypacific.com', // 캐세이퍼시픽 항공
    QF: 'https://www.qantas.com/kr/en.html', // 콴타스 항공
    BA: 'https://www.britishairways.com', // 영국항공
    AF: 'https://www.airfrance.com', // 에어프랑스
    LH: 'https://www.lufthansa.com', // 루프트한자
    EK: 'https://www.lufthansa.com', // 에미레이트 항공
    QR: 'https://www.qatarairways.com', // 카타르 항공
    TG: 'https://www.thaiairways.com', // 타이 항공
    MH: 'https://www.malaysiaairlines.com', // 말레이시아 항공
    BR: 'https://www.evaair.com', // 에바 항공
    CI: 'https://www.china-airlines.com', // 중화항공
    CZ: 'https://www.csair.com', // 중국남방항공
    MU: 'https://www.ceair.com', // 중국동방항공
    CA: 'https://www.airchina.kr/KR/KO/Home', // 중국국제항공
    NZ: 'https://www.airnewzealand.com', // 에어 뉴질랜드
    TK: 'https://www.turkishairlines.com', // 터키항공
    SU: 'https://www.aeroflot.ru', // 아에로플로트
    '7C': 'https://www.jejuair.net', // 제주항공
    'H1': 'https://www.hahnair.com', // 한에어항공
    YP: 'https://www.airpremia.com' ,// 에어프레미아
    OD: 'https://www.malindoair.com/kr/ko/',
    TW: 'https://www.twayair.com/app/main'
  };
  
  
const getAirportName = (iataCode) => airportNames[iataCode] || iataCode;
const getAirlineName = (carrierCode) => airlineNames[carrierCode] || carrierCode;
const getAirlineUrl = (carrierCode) => airlineUrls[carrierCode] || '#';

const formatDate = (dateTime) => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const formatDuration = (duration) => {
  const hours = duration.match(/(\d+)H/);
  const minutes = duration.match(/(\d+)M/);
  return `${hours ? hours[1] + '시간 ' : ''}${minutes ? minutes[1] + '분' : ''} 소요`;
};

const exchangeRates = {
  EUR: 1400, // 1 EUR = 1400 KRW
  // 필요한 경우 다른 통화도 추가 가능
};

const convertToKRW = (amount, currency) => {
  const rate = exchangeRates[currency];
  if (!rate) return amount; // 환율이 없으면 변환하지 않음
  return amount * rate;
};

const MainDetailPage = () => {
  const { id } = useParams(); 
  const { t } = useTranslation();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    axios.get(`https://api.thetravelday.co.kr/api/flights/lowest-price/list`)
      .then(response => {
        const filteredFlight = response.data.data.find(flight => {
          const destinationCode = flight.itineraries[0]?.segments[flight.itineraries[0].segments.length - 1]?.arrival.iataCode;
          return destinationCode === id;
        });

        setFlight(filteredFlight);
      })
      .catch(error => {
        console.error('항공 데이터 가져오는데 오류가 있습니다', error);
      });
  }, [id]);

  const image = images[id];

  if (!flight) {
    return <p>{t('loading')}</p>;
  }

  const { itineraries, travelerPricings, price } = flight;

  const includedBags = travelerPricings && travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity;
  const airlineUrl = getAirlineUrl(itineraries[0]?.segments[0]?.carrierCode);

  const priceInKRW = convertToKRW(parseFloat(price.grandTotal), price.currency);

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
          <Airline>{getAirlineName(itineraries[0]?.segments[0]?.carrierCode)}</Airline>
          {itineraries[0]?.segments.map((segment, segIndex) => (
            <FlightSegment key={segIndex}>
              <FlightDetails>
                <TimeBold>{formatDate(segment.departure.at)}</TimeBold>
                <Route>{getAirportName(segment.departure.iataCode)} ({segment.departure.iataCode}) → {getAirportName(segment.arrival.iataCode)} ({segment.arrival.iataCode})</Route>
              </FlightDetails>
              {segIndex === itineraries[0].segments.length - 1 && (
                <FlightInfo>
                  <InfoItem>{formatDuration(itineraries[0].duration)}, {segment.numberOfStops > 0 ? `${t('stops', { count: segment.numberOfStops })}` : t('nonStop')}</InfoItem>
                </FlightInfo>
              )}
            </FlightSegment>
          ))}

          <HorizontalLine />

          <SectionTitle>
            {t('가격 정보')}
            <Icon src={PriceIcon} alt="Price" />
          </SectionTitle>
          {price ? (
            <>
              <Price>{t('price.perAdult')}: {priceInKRW.toLocaleString()} 원 ~</Price>
              <Price>{t('includedCheckedBags')}: {includedBags} {t('bags')}</Price>
            </>
          ) : (
            <p>{t('가격 정보가 없습니다')}</p>
          )}

          <SectionTitle>
            {t('예약 정보')}
            <Icon src={ScheduleIcon} alt="Schedule" />
          </SectionTitle>
          <BookingInfo>{t('bookingInfo.availableSeats')}: {flight.numberOfBookableSeats}</BookingInfo>
        </FlightItem>
        <BookingInfo>{t('bookingInfo.lastTicketingDate')}: {flight.lastTicketingDate}</BookingInfo>
          <ReservationButton href={airlineUrl} target="_blank" rel="noopener noreferrer">
            {t('예약하러가기')}
          </ReservationButton>
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
  margin-top: 50px;
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

const ReservationButton = styled.a`
  display: inline-block;
  width: 270px;
  padding: 12px 24px;
  margin-top: 50px;
  background: linear-gradient(90deg, #007bff, #00aaff);
  color: #fff;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.75);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #0056b3, #007bff);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.85);
    transform: translateY(-2px);
  }

  &:active {
    background: linear-gradient(90deg, #004080, #0056b3);
    box-shadow: 0 3px 10px rgba(0, 123, 255, 0.75);
    transform: translateY(1px);
  }
`;


