import React from "react";
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ResultHeader from '../../../components/shared/resultHeader.js';
import BottomNav from '../../../components/shared/bottomNav.js';
import FlightResultList from '../../../components/resultPage/flightResultList';


const FlightResultPage = () => {
  const location = useLocation();
  const { searchData } = location.state || { searchData: '' };

  return (
    <PageContainer>
      <ResultHeader showBackButton={true} result="항공권 검색 결과" />
      <ContentContainer>
        {searchData ? (
          <SearchResultText>검색한 내용: {searchData}</SearchResultText>
        ) : (
          <NoResultText>검색 결과가 없음</NoResultText>
        )}
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

const SearchResultText = styled.p`
  font-size: 18px;
  color: #333;
`;

const NoResultText = styled.p`
  font-size: 18px;
  color: #ff0000;
  text-align: center;
  width: 390px;
  display: none;
`;
