import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';
import { useNavigate } from 'react-router-dom'; 
import SearchBtn from '../../components/shared/searchBtn.js'; // 수정 필요 없음

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const DateRangePopup = ({ isOpen, onClose, onDateRangeChange }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isStartDateSelected, setIsStartDateSelected] = useState(true);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const navigate = useNavigate(); // useNavigate 훅 사용
  
    useEffect(() => {
      if (!startDate) {
        setIsStartDateSelected(true);
      } else if (startDate && !endDate) {
        setIsStartDateSelected(false);
      } else if (startDate && endDate) {
        setIsStartDateSelected(true);
      }
    }, [startDate, endDate]);
  
    const handleDayClick = (date) => {
      if (startDate && date.getTime() === startDate.getTime()) {
        setStartDate(null);
        setEndDate(null);
        setIsStartDateSelected(true);
      } else if (endDate && date.getTime() === endDate.getTime()) {
        setEndDate(null);
        setIsStartDateSelected(false);
      } else if (!startDate || (startDate && endDate)) {
        setStartDate(date);
        setEndDate(null);
        setIsStartDateSelected(false);
      } else if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
        setIsStartDateSelected(false);
      } else {
        setEndDate(date);
        setIsStartDateSelected(true);
      }
  
      if (onDateRangeChange) {
        onDateRangeChange({ startDate, endDate });
      }
    };
  
    const handleSearchClick = () => {
      navigate('/flight'); // /flight 경로로 이동
    };
  
    const renderCalendar = (monthsToShow = 12) => {
      const currentMonth = new Date();
      const calendars = [];
  
      for (let i = 0; i < monthsToShow; i++) {
        const month = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + i, 1);
        calendars.push(
          <MonthContainer key={i} isVisible={i === currentMonthIndex}>
            <MonthLabel>{month.toLocaleString('default', { month: 'long', year: 'numeric' })}</MonthLabel>
            {renderMonthCalendar(month)}
          </MonthContainer>
        );
      }
  
      return <CalendarGrid>{calendars}</CalendarGrid>;
    };
  
    const renderMonthCalendar = (currentMonth) => {
      const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
      const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
      const weeks = [];
      let days = [];
    
      const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
      weeks.push(
        <Week key="weekdays">
          {weekdays.map((day, index) => (
            <Weekday key={index}>{day}</Weekday>
          ))}
        </Week>
      );
    
      // 첫 주의 빈 칸 추가
      for (let i = 0; i < startDay; i++) {
        days.push(<Day key={`empty-${i}`} />);
      }
    
      // 월의 모든 날 추가
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isDisabled = startDate && !endDate && date < startDate;
        const isSelected = date >= startDate && date <= (endDate || startDate);
        days.push(
          <Day 
            key={day} 
            isSelected={isSelected} 
            isDisabled={isDisabled} 
            onClick={() => !isDisabled && handleDayClick(date)} 
          >
            {day}
          </Day>
        );
    
        // 일주일이 끝나면 새로운 주로 시작
        if (days.length === 7) {
          weeks.push(<Week key={`week-${day}`}>{days}</Week>);
          days = [];
        }
      }
    
      // 마지막 주의 남은 빈 칸 추가
      if (days.length > 0) {
        const remainingDays = 7 - days.length;
        for (let i = 0; i < remainingDays; i++) {
          days.push(<Day key={`empty-end-${i}`} />);
        }
        weeks.push(<Week key="last-week">{days}</Week>);
      }
    
      return <>{weeks}</>;
    };
  
    const handlePreviousMonth = () => {
      if (currentMonthIndex > 0) {
        setCurrentMonthIndex(currentMonthIndex - 1);
      }
    };
  
    const handleNextMonth = () => {
      if (currentMonthIndex < 11) {
        setCurrentMonthIndex(currentMonthIndex + 1);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <PopupOverlay>
        <PopupContent>
          <Header>
            <BackButton onClick={onClose}>
              <img src={backIcon} alt="뒤로가기" />
            </BackButton>
            <ToggleContainer>
              <ToggleLabel isActive={isStartDateSelected || (!startDate && !endDate)}>가는날</ToggleLabel>
              <ToggleLabel isActive={!isStartDateSelected || (startDate && endDate)}>오는날</ToggleLabel>
            </ToggleContainer>
          </Header>
          <Divider />
          <MonthNavigation>
            <NavButton onClick={handlePreviousMonth}>&lt;</NavButton>
            <NavButton onClick={handleNextMonth}>&gt;</NavButton>
          </MonthNavigation>
          <CalendarContainer>
            {renderCalendar(12)}
          </CalendarContainer>
          <ButtonContainer>
            <SearchBtn text="검색" onClick={handleSearchClick} /> {/* 버튼 클릭 시 handleSearchClick 호출 */}
          </ButtonContainer>
        </PopupContent>
      </PopupOverlay>
    );
  };
  

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const PopupContent = styled.div`
  width: 350px;
  height: 80%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  animation: ${slideUp} 0.3s ease-out;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 변경된 부분 */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  flex: 1;
`;

const ToggleLabel = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? '#000' : '#ccc')};
  margin: 0 10px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const MonthNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const CalendarContainer = styled.div`
  overflow-y: auto;
  max-height: 60%; /* 변경된 부분 */
  margin-bottom: 20px; /* 여백 추가 */
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const MonthContainer = styled.div`
  margin-bottom: 20px;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const MonthLabel = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Week = styled.div`
  display: flex;
`;

const Weekday = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #555;
`;

const Day = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ isSelected }) => (isSelected ? '#3d91ff' : 'transparent')};
  color: ${({ isSelected, isDisabled }) => (isDisabled ? '#ccc' : isSelected ? '#fff' : '#000')};

  &:hover {
    background-color: ${({ isSelected, isDisabled }) => (isSelected ? '#3d91ff' : isDisabled ? 'transparent' : '#eaeaea')};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background-color: #fff;
  position: sticky;
  bottom: 0;
`;

export default DateRangePopup;
