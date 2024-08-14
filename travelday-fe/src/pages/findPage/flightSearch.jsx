import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled, { keyframes } from 'styled-components';
import TripTypeSelector from '../../components/findPage/tripType';
import AreaPopup from '../../components/shared/areaPopup';
import DateRangePopup from '../../components/shared/datePopup'; 
import switchIcon from '../../images/switch.png';
import FlightList from '../../components/findPage/flightList';

const FlightSearch = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState(''); 
  const [selectedArrival, setSelectedArrival] = useState('');    
  const [selectedDates, setSelectedDates] = useState([]); 

  const navigate = useNavigate();

  const departureLocations = ['서울', '부산', '인천', '대구'];
  const arrivalLocations = ['뉴욕', '파리', '도쿄', '런던'];

  // 출발지 선택 시 로그 출력
  useEffect(() => {
    console.log("Selected Departure:", selectedDeparture);
  }, [selectedDeparture]);

  // 도착지 선택 시 로그 출력
  useEffect(() => {
    console.log("Selected Arrival:", selectedArrival);
  }, [selectedArrival]);

  // 날짜 선택 시 로그 출력
  useEffect(() => {
    console.log("Selected Dates:", selectedDates);
  }, [selectedDates]);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSearchInput('');
    setFilteredResults([]);
  };

  const handleButtonClick = (type) => {
    setSearchType(type);
    setIsPopupOpen(true);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    const dataToFilter = searchType === 'departure' ? departureLocations : arrivalLocations;
    const results = dataToFilter.filter(location => location.includes(searchInput));
    setFilteredResults(results.length > 0 ? results : ['검색결과가 없습니다.']);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = (result) => {
    if (searchType === 'departure') {
      setSelectedDeparture(result); 
      handlePopupClose();
      setTimeout(() => {
        handleButtonClick('arrival');
      }, 300);
    } else {
      setSelectedArrival(result); 
      handlePopupClose();
      setTimeout(() => {
        setIsDatePopupOpen(true);
      }, 300);
    }
  };

  const handleDateSelect = (range) => {
    setSelectedDates(range); 
  };

  const handleSearchClick = () => {
    console.log("출발지:", selectedDeparture);
    console.log("도착지:", selectedArrival);
    console.log("선택된 날짜:", selectedDates);

    navigate('/flight', { 
      state: { 
        departure: selectedDeparture,
        arrival: selectedArrival,    
        dates: selectedDates         
      } 
    });
  };

  const handleDatePopupClose = () => {
    setIsDatePopupOpen(false);
    setSelectedDates([]);
  };

  // 예시 항공편 데이터
  const flights = [
    { image: '', country: '미국', city: 'New York', schedule: '2024. 11. 16 - 11.18', price: '623,000원' },
    { image: '', country: '프랑스', city: 'Paris', schedule: '2024. 9. 12 - 9.18', price: '1,092,000원' },
    { image: '', country: '일본', city: 'Tokyo', schedule: '2024. 8. 23 - 8.30', price: '340,000원' },
  ];

  return (
    <Container>
      <TripTypeSelector tripType={tripType} setTripType={setTripType} />
      <AreaSearchingContainer>
        <ButtonContainer>
          <Button onClick={() => handleButtonClick('departure')}>출발지</Button>
          <SwitchIcon src={switchIcon} alt="Switch" />
          <Button onClick={() => handleButtonClick('arrival')}>도착지</Button>
        </ButtonContainer>
      </AreaSearchingContainer>
      <AnimatedPopup 
        isOpen={isPopupOpen} 
        onClose={handlePopupClose} 
        searchResults={filteredResults}
        onResultClick={handleResultClick} 
      >
        <input 
          type="text" 
          placeholder={searchType === 'departure' ? "출발지를 검색하세요." : "도착지를 검색하세요."} 
          value={searchInput}
          onChange={handleSearchInputChange} 
          onKeyDown={handleKeyDown} 
        />
      </AnimatedPopup>
      <DateRangePopup 
        isOpen={isDatePopupOpen} 
        onClose={handleDatePopupClose}
        onDateRangeChange={handleDateSelect}
        onSearchClick={handleSearchClick} 
        toggleLabel="가는날 - 오는날"
        buttonText="검색"
        dateRange={selectedDates} 
      />
      <FlightList flights={flights} />  
    </Container>
  );
};

export default FlightSearch;


const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1);
  }
`;

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
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 40px;
  cursor: pointer;
  background-color: #fff;
  border: none;
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

const AnimatedPopup = styled(AreaPopup)`
  animation: ${slideUp} 0.3s ease-out;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  overflow-y: hidden;

  ${(props) => !props.isOpen && `
    display: none;
  `}
`;
