import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import Title from '../../components/shared/title.js';
import Toggle from '../../components/findPage/toggle.js';
import FlightSearch from './flightSearch.jsx';

const BookingPage = () => {
  const [selectedOption, setSelectedOption] = useState('항공'); // 기본 선택을 '항공'으로 설정

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
      <FlightSearch />
      <BottomNav />
    </Container>
  );
};

export default BookingPage;

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

