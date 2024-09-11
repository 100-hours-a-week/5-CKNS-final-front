import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';

const CreateSchedulePage = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(''); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [countdown, setCountdown] = useState(3); 
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    validateDates();
    if (title && startDate && endDate && !titleError) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [title, startDate, endDate, titleError]);

  const validateDates = () => {
    const today = new Date().toISOString().split('T')[0];
    if (startDate && startDate < today) {
      setStartDate(today);
    }
    if (endDate && endDate < startDate) {
      setEndDate(startDate);
    }
  };

  const handleTitleChange = (e) => {
    const input = e.target.value;
  
    if (input.length > 15) {
      setTitleError('제목은 15자 이내로 입력해주세요.');
    } else {
      setTitleError('');
    }
  
    setTitle(input);
  };
  
  const handleTitleBlur = () => {
    setTitle(prevTitle => prevTitle.trim());
  };
  
  const handleCreateSchedule = async () => {
    if (!isButtonEnabled) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24); // 날짜 차이 계산

    if (diffInDays > 90) {
      alert('일정 생성은 최대 90일까지 가능합니다.');
      return;
    }

    setIsButtonEnabled(false);

    const token = localStorage.getItem('accessToken');

    try {
      const response = await axiosInstance.post('/api/rooms',
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

      if (response.status === 200) { 
        setShowSuccessPopup(true);

        // 3초 후 페이지 이동
        setTimeout(() => {
          navigate('/schedule');
        }, 3000);
      }
    } catch (error) {
      console.error('일정 생성 중 오류 발생:', error);
      setIsButtonEnabled(true);
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
            onChange={handleTitleChange} 
            onBlur={handleTitleBlur} 
            placeholder="여행 제목을 입력하세요" 
          />
          {titleError && <HelperText>{titleError}</HelperText>}
        </InputField>
        <InputField>
          <Label>시작 날짜</Label>
          <Input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            min={today} 
          />
        </InputField>
        <InputField>
          <Label>종료 날짜</Label>
          <Input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            min={startDate || today} 
          />
        </InputField>
        <CreateButton 
          onClick={handleCreateSchedule} 
          disabled={!isButtonEnabled} 
          enabled={isButtonEnabled}
        >
          일정 만들기
        </CreateButton>
        {showSuccessPopup && (
          <SuccessPopup>
            <PopupContent>
              <p>일정이 성공적으로 생성되었습니다!</p>
              <CountdownBar countdown={countdown} />
              <CountdownText>{countdown}초 후에 페이지가 이동합니다.</CountdownText>
            </PopupContent>
          </SuccessPopup>
        )}
      </ContentWrapper>
      <BottomNav />
    </Container>
  );
};

export default CreateSchedulePage;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const countdownAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
`;

const SuccessPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in-out;
  z-index: 9999;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CountdownBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: #f12e5e;
  margin-top: 15px;
  border-radius: 5px;
  animation: ${countdownAnimation} ${props => props.countdown}s linear forwards;
`;

const CountdownText = styled.p`
  font-size: 14px;
  color: #333;
  margin-top: 10px;
`;

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
  margin-top: 30px;
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

const helperFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HelperText = styled.p`
  font-size: 12px;
  color: #f12e5e;
  margin-top: 5px;
  animation: ${helperFadeIn} 0.3s ease-in-out;
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
