import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'; 
import ResultHeader from '../../../components/shared/resultHeader.js';
import BottomNav from '../../../components/shared/bottomNav.js';
import FlightResultList from '../../../components/resultPage/flightResultList';
import DateRangePopup from '../../../components/shared/datePopup.js';

// 아이콘 이미지 경로
import calendarIcon from '../../../images/filter/calendar.png';
import humanIcon from '../../../images/filter/human.png';
import filterIcon from '../../../images/filter/filter.png';

const FlightResultPage = () => {
  const location = useLocation(); 
  const { departure, arrival, dates } = location.state || {}; 

  // 팝업 상태 관리
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [isPeoplePopupOpen, setIsPeoplePopupOpen] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  useEffect(() => {
    console.log("출발지:", departure);
    console.log("도착지:", arrival);
    console.log("선택된 날짜:", dates);
  }, [departure, arrival, dates]);

  const handleDateClick = () => {
    setIsDatePopupOpen(true);
  };

  const handlePeopleClick = () => {
    setIsPeoplePopupOpen(true);
  };

  const handleFilterClick = () => {
    setIsFilterPopupOpen(true);
  };

  const handleDateRangeChange = (selectedDates) => {
    console.log("선택된 날짜:", selectedDates);
    // 여기서 선택된 날짜를 처리할 수 있습니다.
  };
 
  return (
    <PageContainer>
      <ResultHeader showBackButton={true} result="항공권 검색 결과" />
      
      <FilterContainer>
        <FilterButton onClick={handleDateClick}>
          <Icon src={calendarIcon} alt="날짜 아이콘" /> 날짜
        </FilterButton>
        <FilterButton onClick={handlePeopleClick}>
          <Icon src={humanIcon} alt="인원 아이콘" /> 인원
        </FilterButton>
        <FilterButton onClick={handleFilterClick}>
          <Icon src={filterIcon} alt="필터 아이콘" /> 필터
        </FilterButton>
      </FilterContainer>

      <ContentContainer>
        <FlightResultList departure={departure} arrival={arrival} dates={dates} />
      </ContentContainer>
      <BottomNav />

      {/* 팝업 컴포넌트들 */}
      {isDatePopupOpen && (
        <DateRangePopup 
          isOpen={isDatePopupOpen} 
          onClose={() => setIsDatePopupOpen(false)} 
          onDateRangeChange={handleDateRangeChange}
        />
      )}
      {/* 
      {isPeoplePopupOpen && <PeoplePopup onClose={() => setIsPeoplePopupOpen(false)} />}
      {isFilterPopupOpen && <FilterPopup onClose={() => setIsFilterPopupOpen(false)} />}
      */}
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
