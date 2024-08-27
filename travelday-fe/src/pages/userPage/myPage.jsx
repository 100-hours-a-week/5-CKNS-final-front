import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '../../components/shared/simpleHeader.js';
import BottomNav from '../../components/shared/bottomNav.js';  
import LogoImage from '../../images/logo/logo12.png';  
import PenIcon from '../../images/pen.png'; 
import axios from 'axios';

const MyPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      setErrorMessage('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    fetchKakaoUserProfile(token); 

  }, [navigate]);

  const fetchKakaoUserProfile = async (token) => {
    try {
      const response = await axios.get('https://api.thetravelday.co.kr/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status === 200) {
        const nickname = response.data.data.nickname; 
        setNickname(nickname);
        setIsLoading(false); 
      } else {
        throw new Error('사용자 정보 요청 실패');
      }
    } catch (error) {
      setErrorMessage('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      setIsLoading(false); 
    }
  };
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('https://api.thetravelday.co.kr/api/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
  
      localStorage.removeItem('accessToken');
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      alert('로그아웃 중 오류가 발생했습니다.'); 
    }
  };

  const handleRecommend = async () => {
    try {
      await navigator.clipboard.writeText('https://www.thetravelday.co.kr');
      alert('링크가 복사되었습니다!');
    } catch (error) {
      console.error('링크 복사 실패:', error);
      alert('링크 복사 중 오류가 발생했습니다.'); 
    }
  };

  const handleNicknameClick = () => {
    navigate('/nickname');
  };

  if (isLoading) {
    return <div>로딩 중...</div>; 
  }

  return (
    <PageContainer>
      <SimpleHeader title="마이 페이지" showBackButton={true} />
      
      <Content>
        <LogoWrapper>
          <Logo src={LogoImage} alt="로고" />
        </LogoWrapper>

        <UserInfo>
          <NicknameContainer>
            <Value>{nickname}</Value>
            <PenIconImage src={PenIcon} alt="닉네임 변경" onClick={handleNicknameClick} />
          </NicknameContainer>
        </UserInfo>

        <Separator /> 

        <Button onClick={handleRecommend}>친구에게 추천하기</Button>
        <Button onClick={handleLogout}>로그아웃</Button>
        <DeleteButton onClick={() => setShowModal(true)}>회원 탈퇴</DeleteButton>
      </Content>

      <BottomNav />  

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>여행한DAY를 떠나시려 한다니 정말 아쉽네요.</ModalTitle>
            <ModalMessage>
              그동안 저희와 함께해 주셔서 감사합니다.<br/>
              언제든지 다시 여행 계획이 필요할 때,<br/>
              여행한DAY가 기다리고 있을게요.<br/>
              즐거운 여행 가득하시길 바랍니다!<br/>
              감사합니다.
            </ModalMessage>
            <ModalButton onClick={() => setShowModal(false)}>닫기</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </PageContainer>
  );
};

export default MyPage;


// 스타일 컴포넌트 정의

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 390px;
  height: 100%;
  background-color: #fff;
`;

const LogoWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 30px; 
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 100px; 
  height: auto;
  margin-top: 80px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Value = styled.p`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 30px;
`;

const PenIconImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Separator = styled.hr`
  width: 100%;
  border: none;
  border-top: 8px solid #ddd;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 16px;
  background-color: #fff;
  color: #000;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin: 10px 0;
  width: 390px;  
  text-align: left;  
  transition: border-bottom 0.3s, color 0.3s;

  &:hover {
    border-bottom: 2px solid #007bff;  
    color: #0056b3; 
  }

  &:active {
    background-color: #e6f7ff;
  }
`;

const DeleteButton = styled(Button)`
  color: #808080; 
  &:hover {
    border-bottom: 2px solid #808080;  
    color: #666666;
  }
`;

// 모달 창 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 320px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  background-color: #007bff;  
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;
