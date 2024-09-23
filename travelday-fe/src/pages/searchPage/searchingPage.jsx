import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import Toggle from '../../components/searchPage/toggle.js';
import FlightSearch from './flightSearch.jsx';
// import HotelSearch from './hotelSearch.jsx';
// import InfoImage from '../../images/information.png'; 

const SearchingPage = () => {
  const [selectedOption, setSelectedOption] = useState('항공'); 
  // const [isOverlayVisible, setIsOverlayVisible] = useState(true); // 오버레이 상태 추가

  return (
    <Container>
      <Header />
      <Content> 
      <Title>검색</Title>
        <Toggle
          options={['항공']}
          selectedOption={selectedOption}
          onOptionClick={setSelectedOption}
        />
      </Content>
      {selectedOption === '항공' && <FlightSearch />}
      {/* {selectedOption === '호텔' && <HotelSearch />} */}
      <BottomPadding />
      <BottomNav />
      {/* {isOverlayVisible && (
        <Overlay>
          <OverlayContent>
            <Image src={InfoImage} alt="Information" />
            <Text>9/23일에 업데이트 됩니다!</Text>
          </OverlayContent>
        </Overlay>
      )} */}
    </Container>
  );
};

export default SearchingPage;

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
  width: 390px;
  box-sizing: border-box;
  text-align: center;
  background-color: #fff;
`;

const BottomPadding = styled.div`
  height: 80px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
  margin-top: 50px;

`;


// const Overlay = styled.div`
//   position: fixed;
//   top: 0; 
//   left: 0;
//   width: 100%;
//   height: 100%; 
//   background-color: rgba(255, 255, 255, 0.9); 
//   display: flex;
//   justify-content: center;
//   align-items: center; 
//   z-index: 888; 
// `;

// const OverlayContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   color: #333; 
// `;

// const Image = styled.img`
//   width: 200px; 
//   height: auto;
//   margin-bottom: 20px;
// `;

// const Text = styled.p`
//   font-size: 18px;
//   color: #333;
//   text-align: center;
// `;
