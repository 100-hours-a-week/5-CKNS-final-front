import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import Title from '../../components/shared/title.js';
import Toggle from '../../components/searchPage/toggle.js';
import FlightSearch from './flightSearch.jsx';
import HotelSearch from './hotelSearch.jsx';
import InfoImage from '../../images/information.png'; // 이미지 임포트

const SearchingPage = () => {
  const [selectedOption, setSelectedOption] = useState('항공'); 
  const [isOverlayVisible, setIsOverlayVisible] = useState(true); // 오버레이 상태 추가

  return (
    <Container>
      <Header />
      <Content>
        <Title mainTitle="검색" subTitle="한 번의 검색으로 가격을 비교하세요!" />
        <Toggle
          options={['항공', '호텔']}
          selectedOption={selectedOption}
          onOptionClick={setSelectedOption}
        />
      </Content>
      {selectedOption === '항공' && <FlightSearch />}
      {selectedOption === '호텔' && <HotelSearch />}
      <BottomPadding />
      <BottomNav />
      {isOverlayVisible && (
        <Overlay>
          <OverlayContent>
            <Image src={InfoImage} alt="Information" />
            <Text>9/7일에 업데이트 됩니다!</Text>
          </OverlayContent>
        </Overlay>
      )}
    </Container>
  );
};

export default SearchingPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const BottomPadding = styled.div`
  height: 110px;  /* 하단 네비게이션 바의 높이만큼 여유 공간 추가 */
`;

const Overlay = styled.div`
  position: absolute;
  top: 60px; /* 헤더 아래로 오버레이 위치를 조정 */
  left: 0;
  width: 100%;
  height: calc(100% - 60px); /* 헤더를 제외한 나머지 영역을 오버레이로 커버 */
  background-color: rgba(255, 255, 255, 0.9); /* 반투명 하얀 배경 */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 콘텐츠를 위쪽에 배치 */
  padding-top: 40px; /* 콘텐츠가 화면 상단에서 약간 떨어지도록 여백 추가 */
  z-index: 999; /* 오버레이를 최상단에 표시 */
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 40px;
  color: #333; /* 텍스트 색상을 어두운 회색으로 변경 */
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
