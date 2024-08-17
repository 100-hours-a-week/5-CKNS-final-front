import React from 'react';
import styled, { keyframes } from 'styled-components';
import SimpleHeader from '../../components/shared/simpleHeader.js';  // SimpleHeader 컴포넌트 임포트
import BottomNav from '../../components/shared/bottomNav.js';  
import KakaoLoginImage from '../../images/login/kakaologin.png'; 
import BubbleImage from '../../images/login/bubble.png'; 

const LoginPage = () => {

    const Rest_api_key = process.env.REACT_APP_KAKAO_APP_KEY; 
    const redirect_uri = 'http://localhost:3000/auth/kakao/callback';

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };

  return (
    <PageContainer>
        <Container>
        <SimpleHeader title="로그인" showBackButton={true} />  {/* SimpleHeader 사용 */}
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
  width:390px;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const KaKaoButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  margin-top:250px;
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
  padding-bottom:5px;
`;
