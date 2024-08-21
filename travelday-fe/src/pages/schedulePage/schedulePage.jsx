import React from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import ScheduleList from '../../components/schedulePage/scheduleList';
import { useNavigate } from 'react-router-dom';

const SchedulePage = () => {
  const schedules = [
    { title: '공듀들의 일본 여행', date: '2024.09.01 ~ 2024.09.04' },
    { title: '하이든의 배낭 여행', date: '2024.11.12 ~ 2024.12.05' },
    { title: '콜리의 호치민 한달살이', date: '2024.03.15 ~ 2024.04.14' },
  ];

  const navigate = useNavigate();

  const handleItemClick = (index) => {
    navigate(`/schedule/${index}`, { state: { schedule: schedules[index], id: index } });
  };

  const handleCreateButtonClick = () => {
    navigate('/createschedule'); // CreateSchedulePage로 이동
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Title>여행 일정</Title>
        <CreateButton onClick={handleCreateButtonClick}>
          <PlusCircle>+</PlusCircle>
          <BoldText>여행 일정 만들기</BoldText>
          <Subtitle>새로운 여행을 떠나보세요!</Subtitle>
        </CreateButton>
        <ScheduleList schedules={schedules} onItemClick={handleItemClick} />
      </ContentWrapper>
      <BottomNav />
    </Container>
  );
};

export default SchedulePage;

// 스타일 컴포넌트 정의는 동일합니다

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

const ContentWrapper = styled.div`
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
  margin-top: 50px;
`;

const CreateButton = styled.button`
  background-color: #fff;
  color: #000;
  padding: 15px 0px;
  width: 340px;
  border-radius: 8px;
  font-size: 15px;
  margin-bottom: 30px;
  text-align: center;
  border: 2px solid #ddd; 
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    border: 2px solid #f12e5e;

    & > div {
      background-color: #f12e5e;
      color: #fff;
    }
  }
`;

const PlusCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ccc;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: light;
  margin-left: 15px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #ccc;
`;
