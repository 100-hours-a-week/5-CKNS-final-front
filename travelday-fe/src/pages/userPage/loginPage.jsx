import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SimpleHeader from '../../components/shared/simpleHeader.js';
import BottomNav from '../../components/shared/bottomNav.js';
import KakaoLoginImage from '../../images/login/kakaologin.png';
import BubbleImage from '../../images/login/bubble.png';

const LoginPage = () => {
  const navigate = useNavigate();

  // 가정: 로그인 상태를 로컬 스토리지에서 확인
  const isLoggedIn = localStorage.getItem('isLoggedIn');  // 예시로 로컬 스토리지 사용

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/mypage');  // 이미 로그인한 상태라면 닉네임 변경 페이지로 리다이렉트
    }
  }, [isLoggedIn, navigate]);

  const Rest_api_key = process.env.REACT_APP_KAKAO_APP_KEY;
  const redirect_uri = 'http://localhost:3000/auth/kakao/callback';

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <PageContainer>
      <Container>
        <SimpleHeader title="로그인" showBackButton={true} />
        <KaKaoButtonWrapper>
          <BubbleWrapper>
            <Bubble src={BubbleImage} alt="말풍선" />
            <BubbleText>카카오로 5초 만에 시작하기</BubbleText>
          </BubbleWrapper>
          <KakaoButton onClick={handleLogin}>
            <KakaoImage src={KakaoLoginImage} alt="kakao login" />
          </KakaoButton>
        </KaKaoButtonWrapper>
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

const KaKaoButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  margin-top: 250px;
  flex-direction: column;
  align-items: center;
`;

const KakaoButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const KakaoImage = styled.img`
  width: 210px;
  height: auto;
`;

const BubbleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Bubble = styled.img`
  width: 180px;
  height: auto;
`;

const BubbleText = styled.span`
  position: absolute;
  font-size: 14px;
  color: #fff;
  padding-left: 10px;
  padding-bottom: 5px;
`;
