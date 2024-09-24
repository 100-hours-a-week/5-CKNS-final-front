import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import ScheduleList from '../../components/schedulePage/scheduleList';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer.js';
import axiosInstance from '../../utils/axiosInstance.js';
import backgroundVideo from '../../images/schedule/null.mp4'; // 비디오 파일의 경로를 import로 수정

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
   
    if (!token) {
      console.error('토큰이 없습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    const fetchSchedules = async () => {
      try {
        // console.log('스케줄을 불러오는 중...');
        const response = await axiosInstance.get('/api/rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // console.log('API 응답:', response.data);

        if (response.status === 200) {
          const formattedSchedules = response.data.data.map((schedule) => ({
            id: schedule.id, 
            title: schedule.name,
            date: `${schedule.startDate.replace(/-/g, '.')} ~ ${schedule.endDate.replace(/-/g, '.')}`,
          }));
          setSchedules(formattedSchedules);
        } else {
          console.error('스케줄 로딩 실패:', response.statusText);
        }
      } catch (error) {
        console.error('스케줄 불러오기 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
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
          <Subtitle>새로운 여행을 떠나세요!</Subtitle>
        </CreateButton>
        {isLoading ? (
          <NoScheduleText>Loading...</NoScheduleText>
        ) : schedules.length > 0 ? (
          <ScheduleList schedules={schedules} onItemClick={handleItemClick} />
        ) : (
          <>
            <VideoContainer>
              <BackgroundVideo autoPlay loop muted>
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </BackgroundVideo>
            </VideoContainer>
            <NoScheduleText>등록된 일정이 없습니다! 만들어 주세요.</NoScheduleText>
          </>
        )}
        <Footer />
      </ContentWrapper>
      <BottomPadding />
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
  height: 100%;
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
  margin-bottom: 200px; 
`;

const BottomPadding = styled.div`
  height: 80px; 
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BackgroundVideo = styled.video`
  width: 100%;
  height: auto;
  max-width: 150px;
`;
