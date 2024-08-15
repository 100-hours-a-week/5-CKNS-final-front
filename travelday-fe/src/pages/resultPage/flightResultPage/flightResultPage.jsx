import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import ResultHeader from '../../../components/shared/resultHeader.js';
import BottomNav from '../../../components/shared/bottomNav.js';
import FlightResultList from '../../../components/resultPage/flightResultList';
import DateRangePopup from '../../../components/shared/datePopup.js';
import calendarIcon from '../../../images/filter/calendar.png';
import humanIcon from '../../../images/filter/human.png';
import filterIcon from '../../../images/filter/filter.png';
import useFlightStore from '../../../store/store.js';

const FlightResultPage = () => {
  const { departure, arrival, dates } = useFlightStore();
  const navigate = useNavigate();

  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);

  useEffect(() => {
    console.log("출발지:", departure);
    console.log("도착지:", arrival);
    console.log("선택된 날짜:", dates);
  }, [departure, arrival, dates]);

  const handleDateClick = () => {
    setIsDatePopupOpen(true);
  };

  const resultTitle = `${departure} - ${arrival}`;

  // 선택된 날짜를 "YYYY-MM-DD - YYYY-MM-DD" 형식으로 표시
  const formattedDates = dates && dates.startDate && dates.endDate
    ? `${dates.startDate.toLocaleDateString()} - ${dates.endDate.toLocaleDateString()}`
    : "날짜 선택";

  const handleDateRangeChange = (selectedDates) => {
    console.log("선택된 날짜:", selectedDates);
    useFlightStore.setState({ dates: selectedDates });
  };

  const handleBackClick = () => {
    navigate('/search'); 
  };

  return (
    <PageContainer>
      <ResultHeader showBackButton={true} result={resultTitle} onBackClick={handleBackClick} />
      <FilterContainer>
        <FilterButton onClick={handleDateClick}>
          <Icon src={calendarIcon} alt="날짜 아이콘" /> {formattedDates}
        </FilterButton>
      </FilterContainer>

      <ContentContainer>
        <FlightResultList departure={departure} arrival={arrival} dates={dates} />
      </ContentContainer>
      <BottomNav />

      {isDatePopupOpen && (
        <DateRangePopup 
          isOpen={isDatePopupOpen} 
          onClose={() => setIsDatePopupOpen(false)} 
          onDateRangeChange={handleDateRangeChange}
        />
      )}
    </PageContainer>
  );
};

export default FlightResultPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 390px;
  background-color: #fff;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 390px;
  padding: 0px 0px 10px 0px;
  background-color: #fff;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  font-size: 13px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
