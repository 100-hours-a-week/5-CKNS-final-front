import React from "react";
import styled from 'styled-components';
import ResultHeader from '../../../components/shared/resultHeader.js';
import BottomNav from '../../../components/shared/bottomNav.js';
import FlightResultList from '../../../components/resultPage/flightResultList';


const FlightResultPage = () => {

  return (
    <PageContainer>
      <ResultHeader showBackButton={true} result="항공권 검색 결과" />
      <ContentContainer>
      <FlightResultList />
      </ContentContainer>
      <BottomNav />
    </PageContainer>
  );
};

export default FlightResultPage;

const PageContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 390px;
  background-color: #fff;
`;
