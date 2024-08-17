import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../images/header/back.png'; 
import bellIcon from '../../images/header/bell.png';
import userIcon from '../../images/header/user.png';
import logoImage from '../../images/logo/logo11.png'; 

const Header = ({ showBackButton = false }) => {
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    navigate('/login');  // 유저 아이콘 클릭 시 /login 페이지로 이동
  };

  const handleLogoClick = () => {
    navigate('/');  // 로고 클릭 시 / 페이지로 이동
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <BackButton src={backIcon} alt="뒤로가기" show={showBackButton} />
        <Logo src={logoImage} alt="여행한DAY 로고" onClick={handleLogoClick} />  {/* onClick 이벤트 추가 */}
      </LeftSection>
      <RightSection>
        <Icon src={bellIcon} alt="알람 아이콘" />
        <Icon src={userIcon} alt="유저 아이콘" onClick={handleUserIconClick} />
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

const Logo = styled.img`
  width: 140px;
  height: auto;
  cursor: pointer;  /* 로고 클릭 가능하도록 커서 변경 */
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
  margin-right: 10px;
  cursor: pointer;
  display: ${(props) => (props.show ? 'inline' : 'none')};
`;
