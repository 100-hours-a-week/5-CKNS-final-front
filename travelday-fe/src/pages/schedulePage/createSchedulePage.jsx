import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import { useNavigate } from 'react-router-dom';

const CreateSchedulePage = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleCreateSchedule = () => {
    console.log('새로운 일정 생성:', { title, startDate, endDate });
    navigate('/schedule'); 
  };

  return (
    <Container>
      <Header />
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
          />
        </InputField>
        <InputField>
          <Label>종료 날짜</Label>
          <Input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </InputField>
        <CreateButton onClick={handleCreateSchedule}>
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
`;

const CreateButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  background-color: #f12e5e;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 30px;

  &:hover {
    background-color: #d11a45;
  }
`;
