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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleNicknameChange = async (e) => {
    const nickname = e.target.value.trim();
  
    if (nickname.length > 10) {
      setNicknameError('닉네임은 10글자를 넘을 수 없습니다!');
      setIsButtonEnabled(false);
      return;
    }

    setNickname(nickname);

    if (nickname.length === 0) {
      setIsButtonEnabled(false);
      setNicknameError('');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setNicknameError('로그인 정보가 없습니다. 다시 로그인 해주세요.');
        return;
      }

      const response = await axios.get(`https://api.thetravelday.co.kr/api/user/nickname/check?nickname=${nickname}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200) {
        if (response.data === 'OK') {
          setNicknameError('');
          setIsButtonEnabled(true);
        } else if (response.data === 'DUPLICATE') {
          setNicknameError('이미 사용 중인 닉네임입니다!');
          setIsButtonEnabled(false);
        }
      } else {
        setNicknameError('서버 응답 오류가 발생했습니다. 다시 시도해 주세요.');
        setIsButtonEnabled(false);
      }
    } catch (error) {
      setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
      setIsButtonEnabled(false);
      console.error('닉네임 확인 오류:', error);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.error('토큰이 없습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

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
        setShowSuccessMessage(true); 
        navigate('/mypage');
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
          {showSuccessMessage && <SuccessMessage>닉네임이 성공적으로 변경되었습니다!</SuccessMessage>}
        </Content>
        <BottomNav />
      </Container>
    </PageContainer>
  );
};

export default LoginPage;

// 스타일 컴포넌트 정의
const SuccessMessage = styled.p`
  color: green;
  font-size: 16px;
  margin-top: 20px;
`;

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
