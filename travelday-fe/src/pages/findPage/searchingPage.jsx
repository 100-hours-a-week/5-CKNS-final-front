import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import Title from '../../components/shared/title.js';
import Toggle from '../../components/findPage/toggle.js';
import FlightSearch from './flightSearch.jsx';
import HotelSearch from './hotelSearch.jsx';

const SearchingPage = () => {
  const [selectedOption, setSelectedOption] = useState('항공'); 

  return (
    <Container>
      <Header />
      <Content>
        <Title mainTitle="예약" subTitle="한 번의 검색으로 가격을 비교하세요!" />
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
    </Container>
  );
};

export default SearchingPage;

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
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const BottomPadding = styled.div`
  height: 110px;  /* 하단 네비게이션 바의 높이만큼 여유 공간 추가 */
`;