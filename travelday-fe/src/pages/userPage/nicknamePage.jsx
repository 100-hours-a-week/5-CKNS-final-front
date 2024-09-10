import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '../../components/shared/simpleHeader.js';
import BottomNav from '../../components/shared/bottomNav.js';
import axiosInstance from '../../utils/axiosInstance.js';

const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');  

 
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const validateNickname = async () => {
      // 닉네임 길이 검사
      if (nickname.length > 10) {
        setNicknameError('닉네임은 10글자 이내여야 합니다.');
        setIsButtonEnabled(false);
        return;
      }

      // 특수문자 포함 여부 검사
      if (!nicknameRegex.test(nickname)) {
        setNicknameError('특수문자는 사용할 수 없습니다.');
        setIsButtonEnabled(false);
        return;
      }

      // 중복 닉네임 검사
      try {
        const response = await axiosInstance.get(
          `/api/user/nickname/check?nickname=${nickname}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Response data:', response.data);

        if (response.data.data === 'DUPLICATE') {
          setNicknameError('이미 사용 중인 닉네임입니다.');
          setIsButtonEnabled(false);
        } else if (response.data.data === 'OK') {
          setNicknameError('');
          setIsButtonEnabled(true);
        } else {
          console.log('Unexpected response:', response.data);
          setNicknameError('알 수 없는 응답입니다.');
          setIsButtonEnabled(false);
        }
      } catch (error) {
        console.error('중복 검사 중 오류 발생:', error);
        setNicknameError('중복 검사 중 오류가 발생했습니다.');
        setIsButtonEnabled(false);
      }
    };

    if (nickname) {
      validateNickname();
    } else {
      setIsButtonEnabled(false);
      setNicknameError('');
    }
  }, [nickname, accessToken]);

  const handleSubmit = async () => {
    try {
      console.log('닉네임 제출:', nickname);
      const response = await axiosInstance.put(
        '/api/user/nickname',
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.data === '닉네임 수정 성공') {
        setShowSuccessPopup(true);
        const interval = setInterval(() => {
          setCountdown(prev => {
            if (prev === 1) {
              clearInterval(interval);
              navigate('/mypage');
            }
            return prev - 1;
          }, 1000);
        });
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
            onChange={(e) => setNickname(e.target.value)}
            placeholder="새로운 닉네임을 입력하세요"
          />
          <ErrorText>{nicknameError || '\u00A0'}</ErrorText>
          <Button onClick={handleSubmit} disabled={!isButtonEnabled}>
            변경하기
          </Button>
        </Content>
        <BottomNav />
      </Container>

      {showSuccessPopup && (
        <SuccessPopup>
          <PopupContent>
            <p>닉네임이 성공적으로 변경되었습니다!</p>
            <CountdownBar />
            <CountdownText>{countdown}초 후에 페이지가 이동합니다.</CountdownText>
          </PopupContent>
        </SuccessPopup>
      )}
    </PageContainer>
  );
};

export default LoginPage;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const countdown = keyframes`
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
  animation: ${countdown} 3s linear forwards;
`;

const CountdownText = styled.p`
  font-size: 14px;
  color: #333;
  margin-top: 10px;
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
