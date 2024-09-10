import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../images/header/back.png'; 
import bellIcon from '../../images/header/bell.png';
import userIcon from '../../images/header/user.png';
import logoImage from '../../images/logo/logo11.png'; 
import logoHoverImage from '../../images/logo/logo13.png'; 
import AlarmSidebar from '../../components/shared/alarm.js';

const Header = ({ showBackButton = false, onBackClick }) => {
  const navigate = useNavigate();
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [alarms, setAlarms] = useState([
    {
      roomId: 1,
      inviter: '엘깅이',
      roomName: '공듀들의 일본여행',
      invitedAt: '2024-09-02 14:00',
    },
    {
      roomId: 2,
      inviter: '션',
      roomName: '제주도 덩어리즈',
      invitedAt: '2024-09-01 15:30',
    },
    {
      roomId: 3,
      inviter: '이든하',
      roomName: '스껄',
      invitedAt: '2024-09-01 14:00',
    },
  ]);
  // for back button showing animation
  const [isDelayedTrue, setIsDelayedTrue] = useState(false);
  useEffect(()=>{
    if (showBackButton) {
        setIsDelayedTrue(true);
    }
  },[showBackButton])

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/'); 
    }
  };

  const handleUserIconClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/mypage'); 
    } else {
      navigate('/login'); 
    }
  };

  const handleLogoClick = () => {
    navigate('/'); 
  };

  const handleBellIconClick = () => {
    // navigate('/alarm'); 
    setIsAlarmOpen(!isAlarmOpen); // 알람 사이드바 열기/닫기
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <BackButton src={backIcon} alt="뒤로가기" show={isDelayedTrue} onClick={handleBackClick} />
        <Logo src={logoImage} alt="여행한DAY 로고" show={isDelayedTrue} onClick={handleLogoClick} />
      </LeftSection>
      <RightSection>
        <Icon src={bellIcon} alt="알람 아이콘" onClick={handleBellIconClick}/>
        <Icon src={userIcon} alt="유저 아이콘" onClick={handleUserIconClick} />
      </RightSection>

      <AlarmSidebar isOpen={isAlarmOpen} onClose={() => setIsAlarmOpen(false)} alarms={alarms} />
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
  height: inherit;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 140px;
  height: auto;
  cursor: pointer;
  transform: ${(props) => (props.show ? 'translateX(0px)' : 'translateX(-20px)')}; // sliding effect
  transition: transform 0.3s ease;  // smooth transition
  &:hover {
    content: url(${logoHoverImage}); 
  }
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
  opacity: ${(props) => (props.show ? '1' : '0')};  // control visibility with opacity
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;  // smooth transition
`;
