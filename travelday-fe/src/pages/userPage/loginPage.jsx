import React from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js'; 
import BottomNav from '../../components/shared/bottomNav.js';  
import KakaoLoginImage from '../../images/kakaologin.png'; 


const LoginPage = () => {

    const Rest_api_key = process.env.REACT_APP_KAKAO_APP_KEY; 
    const redirect_uri = 'http://localhost:3000/auth/kakao/callback';

    // OAuth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };

  return (
    <PageContainer>
        <Container>
        <Header />
        <KaKaoButtonWrapper>
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
  width:390px;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const KaKaoButtonWrapper = styled.div`
  cursor: pointer;
`;

const KakaoButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const KakaoImage = styled.img`
  width: 180px;
  height: auto;
`;
