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
  const [nickname, setNickname] = useState(''); // 초기값을 빈 문자열로 설정
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

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
      const response = await axios.get('https://www.thetravelday.co.kr/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status === 200) {
        const data = response.data;
        const nickname = data.nickname; 
        setNickname(nickname);
        setIsLoading(false); // 닉네임을 받아온 후 로딩 상태를 false로 설정
        console.log("Fetched Nickname:", nickname); // 닉네임이 제대로 들어오는지 확인
      } else {
        throw new Error('사용자 정보 요청 실패');
      }
    } catch (error) {
      setErrorMessage('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      setIsLoading(false); // 오류 발생 시에도 로딩 상태를 false로 설정
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
  
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete('https://api.thetravelday.co.kr/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      if (response.status === 200) {
        console.log('회원 탈퇴 성공');
        localStorage.removeItem('accessToken');
        navigate('/intro');
      } else {
        throw new Error('회원 탈퇴 실패');
      }
    } catch (error) {
      setErrorMessage('회원 탈퇴 중 오류가 발생했습니다.');
      alert('회원 탈퇴 중 오류가 발생했습니다.'); // 사용자에게 알림
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
    return <div>로딩 중...</div>; // 로딩 상태일 때 표시할 내용
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
            <ModalTitle>정말 탈퇴하시겠습니까?</ModalTitle>
            <ModalButtons>
              <ModalButton onClick={handleDeleteAccount}>예</ModalButton>
              <ModalButton onClick={() => setShowModal(false)}>아니오</ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </PageContainer>
  );
};

export default MyPage;




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
  align-items: flex-start; /* 왼쪽 정렬 */
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
    border-bottom: 2px solid #808080;  /* hover 시 아래쪽 테두리만 회색으로 나타남 */
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

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.3s;
  width: 45%;  

  &:nth-child(1) {  
    background-color: #808080; 
    &:hover {
      background-color: #666666;
    }
  }

  &:nth-child(2) {  
    background-color: #007bff;  
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

