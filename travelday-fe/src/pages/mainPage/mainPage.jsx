import React from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js'; 
import BottomNav from '../../components/shared/bottomNav.js';  
import ImageSlider from '../../components/mainPage/imageSlider.js';
import NewFlightList from '../../components/mainPage/newFlightList.js'; 
import JapanSaleList from '../../components/mainPage/japanSaleList.js';  
import Footer from '../../components/shared/footer.js'

const MainPage = () => {
  return (
    <PageContainer>
      <Header />
      <SliderContainer>
        <ImageSlider />
      </SliderContainer>
      <Content>
        <SectionTitle>신규 노선은 뭐가 있을까?👀</SectionTitle>
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
  margin-top: 30px;
  margin-bottom: 0px;
`;

const SectionSubTitle = styled.h2`
  font-size: 15px;
  text-align: left;
  width: 370px;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #c2c2c2;
`;

const BottomPadding = styled.div`
  height: 110px; 
`;