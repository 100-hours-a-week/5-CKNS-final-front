import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScheduleList = ({ schedules, onItemClick }) => {
  const [sortedSchedules, setSortedSchedules] = useState([]);
  const [sortOrder, setSortOrder] = useState('nearest');

  useEffect(() => {
    const today = new Date();

    const upcomingSchedules = [];
    const pastSchedules = [];

    schedules.forEach((schedule, index) => {
      const date = new Date(schedule.date.split(' ~ ')[0]);
      const scheduleWithIndex = { ...schedule, originalIndex: index }; 
      if (date < today) {
        pastSchedules.push(scheduleWithIndex);
      } else {
        upcomingSchedules.push(scheduleWithIndex);
      }
    });

    const sortedUpcoming = upcomingSchedules.sort((a, b) => {
      const dateA = new Date(a.date.split(' ~ ')[0]);
      const dateB = new Date(b.date.split(' ~ ')[0]);

      return sortOrder === 'nearest' ? dateA - dateB : dateB - dateA;
    });

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

          const isPast = new Date(schedule.date.split(' ~ ')[0]) < new Date();

          return (
            <ScheduleItem
              key={index}
              onClick={() => onItemClick(schedule.originalIndex)} // 원래 인덱스를 사용
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
  color: ${(props) => (props.selected ? '#f12e5e' : '#888')};  
  font-size: 16px;
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);  
    border: 2px solid #f12e5e; 
    background-color: ${(props) => (props.isPast ? '#ffffff' : '#fffff')}; 
  }
`;

const ScheduleTitle = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => (props.isPast ? '#aaa' : '#000')}; 
`;

const ScheduleDate = styled.p`
  font-size: 13px;
  color: ${(props) => (props.isPast ? '#aaa' : '#666')}; 
`;
