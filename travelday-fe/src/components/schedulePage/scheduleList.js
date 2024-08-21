import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScheduleList = ({ schedules, onItemClick }) => {
  const [sortedSchedules, setSortedSchedules] = useState(schedules);
  const [sortOrder, setSortOrder] = useState('nearest'); 

  useEffect(() => {
    const today = new Date();

    const upcomingSchedules = [];
    const pastSchedules = [];

    // 여행을 지나간 여행과 다가올 여행으로 분류
    schedules.forEach(schedule => {
      const date = new Date(schedule.date.split(' ~ ')[0]);
      if (date < today) {
        pastSchedules.push(schedule);
      } else {
        upcomingSchedules.push(schedule);
      }
    });

    // 다가올 여행을 선택한 정렬 기준에 따라 정렬
    const sortedUpcoming = upcomingSchedules.sort((a, b) => {
      const dateA = new Date(a.date.split(' ~ ')[0]);
      const dateB = new Date(b.date.split(' ~ ')[0]);

      return sortOrder === 'nearest' ? dateA - dateB : dateB - dateA;
    });

    // 최종적으로 다가올 여행 + "지나간 여행" 텍스트 + 지나간 여행으로 리스트 구성
    setSortedSchedules([...sortedUpcoming, { type: 'pastLabel' }, ...pastSchedules]);
  }, [schedules, sortOrder]);

  return (
    <Container>
      <SortButtons>
        <Button
          selected={sortOrder === 'nearest'}
          onClick={() => setSortOrder('nearest')}
        >
          가까운 날짜순
        </Button>
        <Button
          selected={sortOrder === 'farthest'}
          onClick={() => setSortOrder('farthest')}
        >
          먼 날짜순
        </Button>
      </SortButtons>
      <ListContainer>
        {sortedSchedules.map((schedule, index) => {
          if (schedule.type === 'pastLabel') {
            return <PastLabel key={index}>지나간 여행</PastLabel>;
          }

          const date = new Date(schedule.date.split(' ~ ')[0]);
          const isPast = date < new Date();

          return (
            <ScheduleItem
              key={index}
              onClick={() => onItemClick(index)}
              isPast={isPast}
            >
              <ScheduleTitle isPast={isPast}>{schedule.title}</ScheduleTitle>
              <ScheduleDate isPast={isPast}>{schedule.date}</ScheduleDate>
            </ScheduleItem>
          );
        })}
      </ListContainer>
    </Container>
  );
};

export default ScheduleList;

const Container = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SortButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border: none;
  background: none;
  color: ${(props) => (props.selected ? '#f12e5e' : '#888')};  /* 선택된 버튼 강조 */
  font-size: 14px;
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  transition: color 0.3s ease;

  &:hover {
    color: #f12e5e;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PastLabel = styled.div`
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #666;
  text-align: center;
  border-top: 1px solid #ccc;
  margin-top: 10px;
`;

const ScheduleItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #f2f2f2; 
  cursor: pointer;
  opacity: ${(props) => (props.isPast ? 0.5 : 1)}; 

  &:hover {
    background-color: ${(props) => (props.isPast ? '#ffffff' : '#f9f9f9')}; 
  }
`;

const ScheduleTitle = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => (props.isPast ? '#aaa' : '#000')}; /* 지나간 항목은 회색 텍스트 */
`;

const ScheduleDate = styled.p`
  font-size: 13px;
  color: ${(props) => (props.isPast ? '#aaa' : '#666')}; /* 지나간 항목은 회색 텍스트 */
`;
