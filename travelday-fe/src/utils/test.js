import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import Header from '../../components/shared/header.js'; 
import BottomNav from '../../components/shared/bottomNav.js';  
import ImageSlider from '../../components/mainPage/imageSlider.js';
import NewFlightList from '../../components/mainPage/newFlightList.js'; 
import JapanSaleList from '../../components/mainPage/japanSaleList.js';  
import Footer from '../../components/footer/footer.js'

const MainPage = () => {
  const baseurl = 'http://localhost:8080';

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axios.post(
          `${baseurl}/api/user/refresh`,
          {
            // refresh_token: localStorage.getItem('refreshToken'),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // credentials: 'include'와 동일한 역할
          }
        );
  
        // response.data에서 token이 있는지 확인
        if (response.data && response.data.token) {
          localStorage.setItem('accessToken', response.data.token); // 새로운 access token을 저장합니다.
          console.log('Access token refreshed successfully');
        } else {
          console.log('Token not found in response');
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };
  
    refreshAccessToken();
  }, []); // 빈 배열을 사용하여 컴포넌트가 마운트될 때만 실행되도록 설정합니다.
  

  return (
    <PageContainer>
      <Header />
      <SliderContainer>
        <ImageSlider />
      </SliderContainer>
      <Content>
        <SectionTitle>신규 노선은 뭐가 있을까? 👀</SectionTitle>
        <SectionSubTitle>#바로 떠나는 새로운 노선만 모아 뒀어요!</SectionSubTitle>
        <NewFlightList />
        <SectionTitle>바로 떠나는 일본 ✈️</SectionTitle>
        <SectionSubTitle>#바로 출발해 봐요</SectionSubTitle>
        <JapanSaleList />  
        <Footer />
      </Content>
      <BottomPadding />
      <BottomNav />
    </PageContainer>
  );
};

export default MainPage; 

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  flex: 1;
  width: 390px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  text-align: left;
  width: 370px;
  margin-left: 10px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 0px;
`;

const SectionSubTitle = styled.h2`
  font-size: 15px;
  text-align: left;
  width: 370px;
  margin-left: 10px;
  margin-top: 7px;
  margin-bottom: 15px;
  color: #c2c2c2;
`;

const BottomPadding = styled.div`
  height: 80px; 
`;
