import React from 'react';
import styled from 'styled-components';
import backIcon from '../../images/header/back.png'; 
import bellIcon from '../../images/header/bell.png';
import userIcon from '../../images/header/user.png';

const Header = ({ showBackButton = false }) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <BackButton src={backIcon} alt="뒤로가기" show={showBackButton} />
        <Title>여행한DAY</Title>
      </LeftSection>
      <RightSection>
        <Icon src={bellIcon} alt="알람 아이콘" />
        <Icon src={userIcon} alt="유저 아이콘" />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  font-size: 22px;
  font-weight: bold;
  margin-left: 10px;
`;

const Icon = styled.img`
  width: 27px;
  height: 27px;
  margin-left: 23px;
  cursor: pointer;
`;

const BackButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: ${(props) => (props.show ? 'inline' : 'none')};
`;
