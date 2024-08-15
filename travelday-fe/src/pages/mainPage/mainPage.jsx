import React from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js'; 
import BottomNav from '../../components/shared/bottomNav.js';  
import ImageSlider from '../../components/mainPage/imageSlider.js';

const MainPage = () => {
  return (
    <PageContainer>
      <Header />
      <SliderContainer>
        <ImageSlider />
      </SliderContainer>
      <Content>
        <p>메인 자리</p>
      </Content>
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
  height: 100vh;
  background-color: #fafafa;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
