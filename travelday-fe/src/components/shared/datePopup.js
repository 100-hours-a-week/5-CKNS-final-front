import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';

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

const DateRangePopup = ({ 
  isOpen, 
  onClose, 
  onDateRangeChange,
}) => {
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null);
  const [isStartDateSelected, setIsStartDateSelected] = useState(true);

  useEffect(() => {
    // 가는날, 오는날의 강조 상태를 설정
    if (!startDate) {
      setIsStartDateSelected(true);  // 아무것도 선택하지 않았을 때 가는날 강조
    } else if (startDate && !endDate) {
      setIsStartDateSelected(false); // 가는날을 선택하면 오는날 강조
    } else if (startDate && endDate) {
      setIsStartDateSelected(true);  // 둘 다 선택되면 가는날과 오는날 모두 강조
    }
  }, [startDate, endDate]);

  const handleDayClick = (date) => {
    if (startDate && date.getTime() === startDate.getTime()) {
      // 가는날을 다시 클릭했을 때 선택 취소
      setStartDate(null);
      setEndDate(null);
      setIsStartDateSelected(true);
    } else if (endDate && date.getTime() === endDate.getTime()) {
      // 오는날을 다시 클릭했을 때 선택 취소
      setEndDate(null);
      setIsStartDateSelected(false);
    } else if (!startDate || (startDate && endDate)) {
      // 아무 날짜도 선택되지 않았거나, 두 날짜가 모두 선택된 상태일 경우
      setStartDate(date);
      setEndDate(null);
      setIsStartDateSelected(false);
    } else if (date < startDate) {
      // 오는 날이 가는 날보다 빠를 수 없도록 설정
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

  const renderCalendar = (monthsToShow = 12) => {
    const currentMonth = new Date();
    const calendars = [];

    for (let i = 0; i < monthsToShow; i++) {
      const month = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + i, 1);
      calendars.push(
        <MonthContainer key={i}>
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

    for (let i = 0; i < startDay; i++) {
      days.push(<Day key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = startDate && !endDate && date < startDate; // 가는 날보다 빠른 오는 날은 선택 불가
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
      if (days.length === 7) {
        weeks.push(<Week key={`week-${day}`}>{days}</Week>);
        days = [];
      }
    }
    if (days.length > 0) {
      weeks.push(<Week key="last-week">{days}</Week>);
    }

    return <>{weeks}</>;
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
        <CalendarContainer>
          {renderCalendar(12)} {/* 12개월 표시 */}
        </CalendarContainer>
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
  justify-content: space-between;
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

const CalendarContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const MonthContainer = styled.div`
  margin-bottom: 20px;
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

export default DateRangePopup;
