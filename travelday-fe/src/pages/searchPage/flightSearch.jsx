import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import FlightList from '../../components/searchPage/flightList';
import useFlightStore from '../../store/useFlightStore'; 
// import { getFlights } from '../../utils/flightSearch'; 
import switchIcon from '../../images/switch.png';
import AreaPopup from '../../components/shared/areaPopup';
import TripTypeSelector from '../../components/searchPage/tripType';
import axiosInstance from '../../utils/axiosInstance'; 
import Footer from '../../components/footer/footer'
import img1 from '../../images/search/1.png';
import img2 from '../../images/search/2.png';
import img3 from '../../images/search/3.png';

const FlightSearch = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tripType, setTripType] = useState('round-trip'); // round-trip: 인천 출발, one-way: 인천 도착
  const [flights, setFlights] = useState([]); 

  const {
    departure,setDeparture,arrival,setArrival} = useFlightStore();

  const navigate = useNavigate();

  // 도착지를 19개 공항으로 고정
  const arrivalLocations = [
    '푸꾸옥(PQC)', '오이타(OIT)', '치암마이(CNX)', '타이페이 타이완 타오위엔(TPE)',
    '오사카 간사이(KIX)', '도쿄 나리타(NRT)', 
    '발리 응우라라이(DPS)', '오키나와 나하(OKA)', '후쿠오카(FUK)', '뉴욕 존 F. 케네디(JFK)',
    '뉴욕 라과디아(LGA)', '나고야 츄부(NGO)', '파리 샤를드골(CDG)', '호주 시드니(SYD)',
    '마드리드(MAD)', '런던 히드로(LHR)', '비엔나(VIE)', '프랑크푸르트(FRA)', '로마 피우미치노(FCO)'
  ];
  const fetchFlights = async () => {
    try {
      // localStorage에서 액세스 토큰 가져오기
      const accessToken = localStorage.getItem('accessToken');
      const exchangeRate = 1400; // 1 유로당 1400원
  
      // IATA 코드에 따른 이미지 및 국가 매핑
      const destinationInfo = {
        JFK: { city: '뉴욕', country: '미국', image: img1 },
        CDG: { city: '파리', country: '프랑스', image: img2 },
        NRT: { city: '도쿄', country: '일본', image: img3 },
      };
  
      const response = await axiosInstance.get('/api/flights/lowestPrice/list', {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true, // 쿠키를 전송하기 위한 옵션
      });
  
      const flightData = response.data.data;
      console.log('전체 항공권 데이터:', response);
  
      // 항공편 데이터에서 각 항공편의 마지막 구간 도착 IATA 코드를 사용하여 필터링
      const flightsMap = new Map(); // 도착 IATA 코드 + 가격을 키로 하는 Map 생성
  
      flightData.forEach(flight => {
        const segments = flight.itineraries[0].segments;
        const lastSegment = segments[segments.length - 1]; // 마지막 구간의 도착 IATA 코드 사용
        const arrivalIata = lastSegment.arrival.iataCode; 
        const destination = destinationInfo[arrivalIata];
  
        if (destination) {
          const priceInWon = Math.round(flight.price.total * exchangeRate);
          const flightKey = `${arrivalIata}_${priceInWon}`; // IATA 코드와 가격을 조합하여 키 생성
  
          // 중복된 도착지와 가격이 없을 때만 추가
          if (!flightsMap.has(flightKey)) {
            flightsMap.set(flightKey, {
              image: destination.image,
              country: destination.country,
              city: destination.city,
              schedule: flight.lastTicketingDate || '2024. 11. 16 - 11.18',
              price: `${priceInWon.toLocaleString()}원`,
            });
          }
        }
      });
  
      const mappedFlights = Array.from(flightsMap.values()); // Map의 값들을 배열로 변환
      setFlights(mappedFlights); // 상태에 저장
      console.log('필터링된 항공권 데이터:', mappedFlights);
    } catch (error) {
      console.error('항공권 데이터를 가져오는데 실패:', error);
    }
  };
  
  
  
  
  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    setDeparture('인천');
    setArrival('인천');
    fetchFlights(); // 여기에 fetchFlights 호출 추가
  }, [setDeparture, setArrival]);
  

  const handleTripTypeChange = (type) => {
    setTripType(type);
    if (type === 'round-trip') {
      setDeparture('인천'); // 출발지를 인천으로 고정
    } else if (type === 'one-way') {
      setArrival('인천'); // 도착지를 인천으로 고정
    }
  };

  return (
    <Container>
      {/* TripTypeSelector 컴포넌트 사용 */}
      <TripTypeSelector tripType={tripType} setTripType={handleTripTypeChange} />

      <AreaSearchingContainer>
        <ButtonContainer>
          {tripType === 'round-trip' ? (
            <>
              <FixedDeparture>{departure}</FixedDeparture> 
              <SwitchIcon src={switchIcon} alt="Switch" />
              <Button onClick={() => setIsPopupOpen(true)}>도착지 선택</Button> 
            </>
          ) : (
            <>
             <Button onClick={() => setIsPopupOpen(true)}>출발지 선택</Button>
              <SwitchIcon src={switchIcon} alt="Switch" />
              <FixedDeparture>{arrival}</FixedDeparture> 
            </>
          )}
        </ButtonContainer>
      </AreaSearchingContainer>
      {isPopupOpen && (
        <AreaPopup
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          searchResults={arrivalLocations}  // 공항 리스트 전달
          onResultClick={(result) => {
            const iataCode = result.match(/\((.*?)\)/)[1]; // IATA 코드를 추출

            if (tripType === 'round-trip') {
              setArrival(result);  // 도착지 설정
              // 인천 도착인 경우 추가 로직
              if (iataCode === 'ICN') {
                alert("인천으로 도착하는 항공편을 검색합니다.");
              }
              navigate(`/flightdetail/${iataCode}`); // 도착지 IATA 코드로 페이지 이동
            } else if (tripType === 'one-way') {
              setDeparture(result);  // 출발지 설정
              navigate(`/flightdetail/${iataCode}`); // 출발지 IATA 코드로 페이지 이동
            }

            handlePopupClose(); 
          }}
        >
          <SelectionPrompt>
            {tripType === 'round-trip' ? '도착지를 선택해주세요.' : '출발지를 선택해주세요.'}
          </SelectionPrompt>
        </AreaPopup>
      )}


      <SemiTitle>이런 항공권도 있어요!</SemiTitle>

      <FlightList flights={[
        { iataCode: 'JFK', image: img1, country: '미국', city: 'New York', schedule: '2024. 11. 16 - 11.18', price: '623,000원' },
        { iataCode: 'CDG', image: img2, country: '프랑스', city: 'Paris', schedule: '2024. 9. 12 - 9.18', price: '1,092,000원' },
        { iataCode: 'NRT', image: img3, country: '일본', city: 'Tokyo', schedule: '2024. 8. 23 - 8.30', price: '340,000원' }
      ]} />
    <Footer /> 
    </Container>
  );
};

export default FlightSearch;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 327px;
  height: 64px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(149, 157, 177, 0.3);
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const FixedDeparture = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  font-size: 16px;
  outline: none;
`;

const Button = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  font-size: 16px;
  outline: none;
`;

const AreaSearchingContainer = styled.div`
  width: 390px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: center;
`;

const SwitchIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const SelectionPrompt = styled.p`
  width: 100%;
  border-radius: 4px;
  border: none;
  font-size: 20px;
`;

const SemiTitle = styled.p`
  font-size: 12px;
  margin-top:30px;
  margin-bottom: 10px;
  color: #c2c2c2;
`