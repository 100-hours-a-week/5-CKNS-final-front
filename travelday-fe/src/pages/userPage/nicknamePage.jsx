import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '../../components/shared/simpleHeader.js';
import BottomNav from '../../components/shared/bottomNav.js';
import axios from 'axios';

const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const navigate = useNavigate();

  const handleNicknameChange = async (e) => {
    const nickname = e.target.value.trim();
    setNickname(nickname);

    if (nickname) {
      try {
        const response = await axios.get(`https://api.thetravelday.co.kr/api/user/nickname/check?nickname=${nickname}`);
        if (response.data.exists) {
          setNicknameError('이미 사용 중인 닉네임입니다.');
          setIsButtonEnabled(false);
        } else {
          setNicknameError('');
          setIsButtonEnabled(true);
        }
      } catch (error) {
        console.error('닉네임 중복 검사 실패:', error);
        setNicknameError('서버와의 통신 중 오류가 발생했습니다.');
        setIsButtonEnabled(false);
      }
    } else {
      setIsButtonEnabled(false);
      setNicknameError('');
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken');

    // if (!token) {
    //   return;
    // }

    try {
      const response = await axios.put(
        'https://api.thetravelday.co.kr/api/user/nickname',
        { nickname }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('닉네임이 성공적으로 변경되었습니다:', response.data);
        localStorage.setItem('nickname', nickname); 
      } else {
        console.error('닉네임 변경 실패:', response.statusText);
      }
    } catch (error) {
      console.error('닉네임 변경 중 오류 발생:', error);
    }
  };

  return (
    <PageContainer>
      <Container>
        <SimpleHeader title="닉네임 변경하기" showBackButton={true} />
        <Content>
          <InputLabel>닉네임</InputLabel>
          <Input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="새로운 닉네임을 입력하세요"
          />
          <ErrorText>{nicknameError || '\u00A0'}</ErrorText>
          <Button onClick={handleSubmit} disabled={!isButtonEnabled}>
            변경하기
          </Button>
        </Content>
        <BottomNav />
      </Container>
    </PageContainer>
  );
};

export default LoginPage;


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

const Container = styled.div`
  width: 390px;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  width: 270px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  width: 250px;
  height: 25px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    border-color: #007bff; 
    border-width: 2px; 
    outline: none; 
  }

  &:disabled {
    background-color: #f0f0f0; 
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  height: 20px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  width: 272px;
  font-size: 15px;
  background-color: ${props => (props.disabled ? '#ccc' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;
