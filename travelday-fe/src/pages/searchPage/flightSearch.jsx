// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import styled, { keyframes } from 'styled-components';
// import TripTypeSelector from '../../components/searchPage/tripType';
// import AreaPopup from '../../components/shared/areaPopup';
// import DateRangePopup from '../../components/shared/datePopup';
// import GuestSelectorPopup from '../../components/shared/guestPopup';
// import FlightList from '../../components/searchPage/flightList';
// import useFlightStore from '../../store/useFlightStore'; 
// import { getFlights } from '../../utils/flightSearch'; 

// // 이미지 파일 import
// import img1 from '../../images/search/1.png';
// import img2 from '../../images/search/2.png';
// import img3 from '../../images/search/3.png';

// const FlightSearch = () => {
//   const [tripType, setTripType] = useState('round-trip');
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
//   const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);  
//   const [searchType, setSearchType] = useState('');
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [flights, setFlights] = useState([]); 

//   const {
//     departure,
//     arrival,
//     dates,
//     adults,
//     children,
//     setDeparture,
//     setArrival,
//     setDates,
//     setAdults,
//     setChildren,
//   } = useFlightStore();

//   const navigate = useNavigate();

//   const departureLocations = ['서울', '부산', '인천', '대구']; // 수정된 부분
//   const arrivalLocations = ['뉴욕', '파리', '도쿄', '런던']; // 수정된 부분

//   useEffect(() => {
//     // console.log("Selected Departure:", departure);
//     // console.log("Selected Arrival:", arrival);
//     // console.log("Selected Dates:", dates);
//     // console.log("Adults:", adults);
//     // console.log("Children:", children);
//   }, [departure, arrival, dates, adults, children]);

//   const fetchFlights = async () => {
//     try {
//       const params = {
//         departure,
//         arrival,
//         startDate: dates.startDate.toISOString().split('T')[0], 
//         endDate: dates.endDate.toISOString().split('T')[0],
//         adults,
//         children,
//       };
//       const data = await getFlights(params);
//       setFlights(data); // 가져온 데이터를 상태에 저장
//     } catch (error) {
//       console.error('Failed to fetch flights:', error);
//     }
//   };

//   const handlePopupClose = () => {
//     setIsPopupOpen(false);
//     setSearchInput('');
//     setFilteredResults([]);
//   };

//   const handleButtonClick = (type) => {
//     setSearchType(type);
//     setIsPopupOpen(true);
//   };

//   const handleSearchInputChange = (event) => {
//     setSearchInput(event.target.value);
//   };

//   const handleSearch = () => {
//     const dataToFilter = searchType === 'departure' ? departureLocations : arrivalLocations;
//     const results = dataToFilter.filter(location => location.includes(searchInput));
//     setFilteredResults(results.length > 0 ? results : ['검색결과가 없습니다.']);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

  // const handleResultClick = (result) => {
  //   if (searchType === 'departure') {
  //     setDeparture(result);
  //     handlePopupClose();
  //     setTimeout(() => {
  //       handleButtonClick('arrival');
  //     }, 300);
  //   } else {
  //     setArrival(result); 
  //     handlePopupClose();
  //     setTimeout(() => {
  //       setIsDatePopupOpen(true);
  //     }, 300);
  //   }
  // };

//   const handleDateSelect = (range) => {
//     setDates(range);
//   };

//   const handleSearchClick = () => {
//     setIsDatePopupOpen(false);  // 날짜 선택 팝업 닫기
//     setIsGuestPopupOpen(true);  // 인원 선택 팝업 열기
//   };

//   const handleGuestSelect = async (adults, children) => {
//     setAdults(adults);
//     setChildren(children);
//     await fetchFlights(); // 인원 선택 후, API 호출
//     navigate('/flight'); // 이후 /flight 페이지로 이동
//   };

//   const handleDatePopupClose = () => {
//     setIsDatePopupOpen(false);
//     setDates([]);
//   };

//   return (
//     <Container>
//       <TripTypeSelector tripType={tripType} setTripType={setTripType} />
//       <AreaSearchingContainer>
//         <ButtonContainer>
//           <Button onClick={() => handleButtonClick('departure')}>출발지</Button>
//           <SwitchIcon src={switchIcon} alt="Switch" />
//           <Button onClick={() => handleButtonClick('arrival')}>도착지</Button>
//         </ButtonContainer>
//       </AreaSearchingContainer>
//       <AnimatedPopup 
//         isOpen={isPopupOpen} 
//         onClose={handlePopupClose} 
//         searchResults={filteredResults}
//         onResultClick={handleResultClick} 
//       >
//         <input 
//           type="text" 
//           placeholder={searchType === 'departure' ? "출발지를 검색하세요." : "도착지를 검색하세요."} 
//           value={searchInput}
//           onChange={handleSearchInputChange} 
//           onKeyDown={handleKeyDown} 
//         />
//       </AnimatedPopup>
//       <DateRangePopup 
//         isOpen={isDatePopupOpen} 
//         onClose={handleDatePopupClose}
//         onDateRangeChange={handleDateSelect}
//         onSearchClick={handleSearchClick} 
//         toggleLabel="가는날 - 오는날"
//         buttonText="검색"
//         dateRange={dates} 
//       />
//       {isGuestPopupOpen && (
//         <GuestSelectorPopup 
//           isOpen={isGuestPopupOpen}
//           onClose={() => setIsGuestPopupOpen(false)}
//           onGuestSelect={handleGuestSelect}
//           adults={adults}
//           children={children}
//         />
//       )}
//       <FlightList flights={flights.length > 0 ? flights : [
//         { image: img1, country: '미국', city: 'New York', schedule: '2024. 11. 16 - 11.18', price: '623,000원' },
//         { image: img2, country: '프랑스', city: 'Paris', schedule: '2024. 9. 12 - 9.18', price: '1,092,000원' },
//         { image: img3, country: '일본', city: 'Tokyo', schedule: '2024. 8. 23 - 8.30', price: '340,000원' },
//       ]} />  
//     </Container>
//   );
// };

// export default FlightSearch;


// const slideUp = keyframes`
//   from {
//     transform: translateY(100%);
//     opacity: 0;
//   }
//   to {
//     transform: translateY(0);
//     opacity: 1);
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 327px;
//   height: 64px;
//   background-color: #fff;
//   box-shadow: 0px 0px 10px rgba(149, 157, 177, 0.3);
//   border-radius: 8px;
//   margin-bottom: 10px;
// `;

// const Button = styled.button`
//   padding: 8px 16px;
//   margin: 0 20px;
//   cursor: pointer;
//   background-color: #fff;
//   border: none;
//   outline: none;
// `;

// const AreaSearchingContainer = styled.div`
//   width: 390px;
//   display: flex;
//   align-items: center;
//   background-color: #fff;
//   justify-content: center;
// `;

// const AnimatedPopup = styled(AreaPopup)`
//   animation: ${slideUp} 0.3s ease-out;
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background-color: #fff;
//   border-top-left-radius: 10px;
//   border-top-right-radius: 10px;
//   box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
//   padding: 20px;
//   z-index: 1000;
//   overflow-y: hidden;

//   ${(props) => !props.isOpen && `
//     display: none;
//   `}
// `;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import FlightList from '../../components/searchPage/flightList';
import useFlightStore from '../../store/useFlightStore'; 
import { getFlights } from '../../utils/flightSearch'; 
import switchIcon from '../../images/switch.png';
import AreaPopup from '../../components/shared/areaPopup';
import TripTypeSelector from '../../components/searchPage/tripType';

import img1 from '../../images/search/1.png';
import img2 from '../../images/search/2.png';
import img3 from '../../images/search/3.png';

const FlightSearch = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tripType, setTripType] = useState('round-trip'); // round-trip: 인천 출발, one-way: 인천 도착
  const [flights, setFlights] = useState([]); 

  const {
    departure,
    setDeparture,
    arrival,
    setArrival,
  } = useFlightStore();

  const navigate = useNavigate();

  // 도착지를 19개 공항으로 고정
  const arrivalLocations = [
    '푸꾸옥(PQC)', '오이타(OIT)', '치암마이(CNX)', '타이페이 타이완 타오위엔(TPE)',
    '오사카 이타미(ITM)', '오사카 간사이(KIX)', '도쿄 나리타(NRT)', '도쿄 하네다(HND)',
    '발리 응우라라이(DPS)', '오키나와 나하(OKA)', '후쿠오카(FUK)', '뉴욕 존 F. 케네디(JFK)',
    '뉴욕 라과디아(LGA)', '나고야 츄부(NGO)', '파리 샤를드골(CDG)', '호주 시드니(SYD)',
    '마드리드(MAD)', '런던 히드로(LHR)', '비엔나(VIE)', '프랑크푸르트(FRA)', '로마 피우미치노(FCO)'
  ];

  const fetchFlights = async () => {
    try {
      const params = { departure, arrival };
      const data = await getFlights(params);
      setFlights(data); 
    } catch (error) {
      console.error('Failed to fetch flights:', error);
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

    useEffect(() => {
    setDeparture('인천');
    setArrival('인천');
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
              <Button onClick={() => setIsPopupOpen(true)}>도착지 검색</Button> 
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



      <FlightList flights={flights.length > 0 ? flights : [
        { image: img1, country: '미국', city: 'New York', schedule: '2024. 11. 16 - 11.18', price: '623,000원' },
        { image: img2, country: '프랑스', city: 'Paris', schedule: '2024. 9. 12 - 9.18', price: '1,092,000원' },
        { image: img3, country: '일본', city: 'Tokyo', schedule: '2024. 8. 23 - 8.30', price: '340,000원' },
      ]} />  
    </Container>
  );
};

export default FlightSearch;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
