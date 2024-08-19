import React from 'react';
import styled from 'styled-components';
import backIcon from '../../images/header/back.png'; 
import userIcon from '../../images/header/user.png';

const ResultHeader = ({ showBackButton = false, result = "검색 결과", onBackClick }) => {
  return (
    <HeaderContainer>
      <LeftSection>
        {showBackButton && (
          <BackButton src={backIcon} alt="뒤로가기" onClick={onBackClick} />
        )}
      </LeftSection>
      <Title>{result}</Title>
      <RightSection>
        <Icon src={userIcon} alt="유저 아이콘" />
      </RightSection>
    </HeaderContainer>
  );
};

export default ResultHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 10px 20px;
  background-color: #fff;
  width: 350px;
  height: 48px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 15px;
  cursor: pointer;
`;

const BackButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
