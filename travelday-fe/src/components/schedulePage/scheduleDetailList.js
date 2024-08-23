import React from 'react';
import styled from 'styled-components';

const ScheduleDetailList = ({ scheduleDetails }) => {
  if (!Array.isArray(scheduleDetails)) {
    console.error("scheduleDetails는 배열이어야 합니다.");
    return null;
  }

  return (
    <ListContainer>
      <Title>일정 보기</Title>
      {scheduleDetails.map((day, index) => (
        <div key={index}>
          <Day>{`${index + 1}일차 (${day.date})`}</Day> 
          {day.schedules.map((detail) => (
            <ListItem key={detail.id}>
              <Position>#{detail.position}</Position>
              <Date>{detail.name}</Date> 
            </ListItem>
          ))}
        </div>
      ))}
    </ListContainer>
  );
};

export default ScheduleDetailList;

const ListContainer = styled.div`
  width: 100%;
  background-color: #fff;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  padding: 15px 20px;
  background-color: #fff;
  color: #333;
  text-align: left;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Day = styled.div`
  display: flex;
  font-weight: bold;
  width : 390px;
  margin: 20px 0px 10px 20px;
  font-size: 18px;
  color: #333;
`;

const Position = styled.div`
  margin-right: 10px;
  color: #333;
  font-size: 15px;
  font-weight: bold;
`;

const Date = styled.div`
  flex-grow: 1;
  color: #666;
  font-size: 13px;
  display: flex;
  align-items: flex-end;
`;
