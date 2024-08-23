import React from 'react';
import styled, { keyframes } from 'styled-components';
import SimpleHeader from '../../components/shared/simpleHeader.js';
import BottomNav from '../../components/shared/bottomNav.js';  
import KakaoLoginImage from '../../images/login/kakaologin.png'; 
import BubbleImage from '../../images/login/bubble.png'; 
import LogoImage from '../../images/logo/logo12.png'; // 로고 이미지 임포트

const LoginPage = () => {

    // OAuth 요청 URL
    const kakaoURL = `https://api.thetravelday.co.kr/oauth2/authorization/kakao`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };


  return (
    <PageContainer>
        <Container>
        <SimpleHeader title="로그인" showBackButton={true} /> 
        <KaKaoButtonWrapper>
            <LogoWrapper>
                <Logo src={LogoImage} alt="로고" />
            </LogoWrapper>
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

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-15px);
  }
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

const KaKaoButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 100px; /* 로고 크기 조정 */
  height: auto;
  margin-bottom: 30px;
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
  animation: ${bounce} 2s infinite;
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
