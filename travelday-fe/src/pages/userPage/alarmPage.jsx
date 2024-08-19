import React from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import InfoImage from '../../images/information.png'; // 이미지 임포트

const AlarmPage = () => {
  return (
    <Container>
      <Header showBackButton={true} />
      <Content>
        <Image src={InfoImage} alt="Information" />
        <Text>9/7일에 업데이트 됩니다!</Text>
      </Content>
      <BottomNav />
    </Container>
  );
};

export default AlarmPage;

const Container = styled.div`
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
  align-items: center;
  margin-top: 100px; 
`;

const Image = styled.img`
  width: 200px; 
  height: auto;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
`;
