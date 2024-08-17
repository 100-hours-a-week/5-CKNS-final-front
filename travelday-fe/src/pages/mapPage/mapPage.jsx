import React from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import InfoImage from '../../images/information.png'; // 이미지 임포트

const MapPage = () => {
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

export default MapPage;

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
  margin-top: 100px; /* 필요한 경우 위치 조정을 위해 여백 추가 */
`;

const Image = styled.img`
  width: 200px; /* 이미지 크기 조정 */
  height: auto;
  margin-bottom: 20px; /* 이미지와 텍스트 사이의 간격 조정 */
`;

const Text = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
`;
