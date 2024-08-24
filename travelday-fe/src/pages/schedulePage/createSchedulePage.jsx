import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateSchedulePage = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (title && startDate && endDate) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [title, startDate, endDate]);

  const handleCreateSchedule = async () => {
    if (!isButtonEnabled) return;

    const token = localStorage.getItem('accessToken'); 

    try {
      const response = await axios.post(
        'https://api.thetravelday.co.kr/api/rooms', 
        {
          name: title,
          startDate: startDate.replace(/-/g, '.'),
          endDate: endDate.replace(/-/g, '.'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true 
        }
      );

      if (response.status === 201) { 
        console.log('새로운 일정 생성:', response.data);
        navigate('/schedule');
      }
    } catch (error) {
      console.error('일정 생성 중 오류 발생:', error);
    }
  };

  return (
    <Container>
      <Header showBackButton={true} onBackClick={() => navigate('/schedule')} />
      <ContentWrapper>
        <Title>새로운 여행 일정 만들기</Title>
        <InputField>
          <Label>여행 제목</Label>
          <Input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="여행 제목을 입력하세요" 
          />
        </InputField>
        <InputField>
          <Label>시작 날짜</Label>
          <Input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            min={today} // 시작 날짜의 최소값을 오늘로 설정
          />
        </InputField>
        <InputField>
          <Label>종료 날짜</Label>
          <Input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            min={startDate || today} // 종료 날짜의 최소값을 시작 날짜로 설정
          />
        </InputField>
        <CreateButton 
          onClick={handleCreateSchedule} 
          disabled={!isButtonEnabled} 
          enabled={isButtonEnabled}
        >
          일정 만들기
        </CreateButton>
      </ContentWrapper>
      <BottomNav />
    </Container>
  );
};

export default CreateSchedulePage;

// 스타일 컴포넌트 정의

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

const ContentWrapper = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 100px;
  text-align: center;
`;

const InputField = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;  

  &:focus {
    border: 2px solid #f12e5e;
  }
`;

const buttonEnableAnimation = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0.7;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const CreateButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  background-color: ${({ enabled }) => (enabled ? '#f12e5e' : '#ccc')};
  color: #fff;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
  margin-top: 30px;
  outline: none;
  transition: background-color 0.3s ease;
  animation: ${({ enabled }) => (enabled ? buttonEnableAnimation : 'none')} 0.3s ease;

  &:hover {
    background-color: ${({ enabled }) => (enabled ? '#d11a45' : '#ccc')};
  }
`;
