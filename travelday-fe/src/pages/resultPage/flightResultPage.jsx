import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import ResultHeader from '../../components/shared/resultHeader.js';
import BottomNav from '../../components/shared/bottomNav.js';
import FlightResultList from '../../components/resultPage/flightResultList.js';
import DateRangePopup from '../../components/shared/datePopup.js';
import GuestSelectorPopup from '../../components/shared/guestPopup.js';
import FilterPopup from '../../components/shared/filterPopup.js'; 
import calendarIcon from '../../images/filter/calendar.png';
import humanIcon from '../../images/filter/human.png'; 
import filterIcon from '../../images/filter/filter.png'; 
import useFlightStore from '../../store/useFlightStore.js';

const FlightResultPage = () => {
  const { departure, arrival, dates, setDates, adults, children } = useFlightStore();
  const navigate = useNavigate();

  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [localDates, setLocalDates] = useState(dates); // 로컬 상태로 초기화
  const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false); // 인원 팝업 상태 추가
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false); // 필터 팝업 상태 추가

  useEffect(() => {
    console.log("출발지:", departure);
    console.log("도착지:", arrival);
    console.log("선택된 날짜:", dates);
  }, [departure, arrival, dates]);

  const handleDateClick = () => {
    setIsDatePopupOpen(true);
  };

  const handleGuestClick = () => {
    setIsGuestPopupOpen(true);
  };

  const handleFilterClick = () => {
    setIsFilterPopupOpen(true); 
  };

  const resultTitle = `${departure} - ${arrival}`;

  const formattedDates = localDates && localDates.startDate && localDates.endDate
    ? `${localDates.startDate.toLocaleDateString()} - ${localDates.endDate.toLocaleDateString()}`
    : "날짜 선택";

  const handleDateRangeChange = (selectedDates) => {
    console.log("선택된 날짜:", selectedDates);
    setLocalDates(selectedDates);  // 로컬 상태 업데이트
  };

  const formattedGuests = `인원 ${adults + children}명`;

  const handleSearchClick = () => {
    setDates(localDates); // 선택된 날짜를 Zustand 스토어에 저장
    navigate('/flight'); // 검색 버튼 클릭 시 /flight로 이동
    setIsDatePopupOpen(false); // 팝업 닫기
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
        <FilterButton onClick={handleGuestClick}>
          <Icon src={humanIcon} alt="인원 아이콘" /> {formattedGuests}
        </FilterButton>
        <FilterButton onClick={handleFilterClick}>
          <Icon src={filterIcon} alt="필터 아이콘" /> 필터
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
          onSearchClick={handleSearchClick} // 검색 버튼 클릭 시 호출
        />
      )}

      {isGuestPopupOpen && (
        <GuestSelectorPopup 
          isOpen={isGuestPopupOpen} 
          onClose={() => setIsGuestPopupOpen(false)} 
          // 여기에 필요한 다른 props 추가
        />
      )}

      {isFilterPopupOpen && (
        <FilterPopup 
          isOpen={isFilterPopupOpen} 
          onClose={() => setIsFilterPopupOpen(false)} 
          // 여기에 필요한 다른 props 추가
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
  padding: 8px;
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
