import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import ScheduleList from '../../components/schedulePage/scheduleList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // if (!token) {
    //   navigate('/login');
    //   return;
    // }

    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://api.thetravelday.co.kr/api/rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const formattedSchedules = response.data.map((schedule) => ({
            id: schedule.travelRoomId,  // travelRoomId를 id로 사용
            title: schedule.name,
            date: `${schedule.startDate.replace(/-/g, '.')} ~ ${schedule.endDate.split('T')[0].replace(/-/g, '.')}`,
          }));
          setSchedules(formattedSchedules);
        } else {
          console.error('일정 목록을 불러오는 데 실패했습니다:', response.statusText);
        }
      } catch (error) {
        console.error('일정 목록을 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchSchedules();
  }, [navigate]);

  const handleItemClick = (id) => {
    navigate(`/schedule/${id}`, { state: { schedule: schedules.find(schedule => schedule.id === id) } });
  };

  const handleCreateButtonClick = () => {
    navigate('/createschedule');
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
        {isLoading ? (
          <NoScheduleText>로딩 중...</NoScheduleText>
        ) : schedules.length > 0 ? (
          <ScheduleList schedules={schedules} onItemClick={handleItemClick} />
        ) : (
          <NoScheduleText>여행방이 없습니다! 일정을 추가해 주세요.</NoScheduleText>
        )}
      </ContentWrapper>
      <BottomNav />
    </Container>
  );
};

export default SchedulePage;

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

const NoScheduleText = styled.div`
  font-size: 16px;
  color: #999;
  margin-top: 20px;
`;

