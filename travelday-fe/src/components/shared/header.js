import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../utils/axiosInstance';
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
  const [hasNewAlarm, setHasNewAlarm] = useState(false); // 새 알람이 있는지 확인하는 상태
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const checkNotifications = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return; // 로그인 상태가 아니면 요청하지 않음

      try {
        const response = await axiosInstance.get('/api/notification', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const notifications = response.data.notifications;

        if (notifications && notifications.length > 0) {
          setAlarms(notifications);
          setHasNewAlarm(true); // 새로운 알람이 있음을 표시
        } else {
          setHasNewAlarm(false); // 새로운 알람이 없음을 표시
        }
      } catch (error) {
        console.error('알림 확인 중 오류 발생:', error);
      }
    };

    checkNotifications();
  }, []);

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
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    setHasNewAlarm(false); // 알람 아이콘 상태 초기화
    setIsAlarmOpen(!isAlarmOpen); // 알람 사이드바 열기/닫기
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <BackButton src={backIcon} alt="뒤로가기" onClick={handleBackClick} />
        <Logo src={logoImage} alt="여행한DAY 로고" onClick={handleLogoClick} />
      </LeftSection>
      <RightSection>
        <IconContainer>
          <BellIcon src={bellIcon} alt="알람 아이콘" onClick={handleBellIconClick} hasNewAlarm={hasNewAlarm}/>
          {hasNewAlarm && <Badge />}
        </IconContainer>
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
  transition: transform 0.3s ease;
  &:hover {
    content: url(${logoHoverImage}); 
  }
`;

const IconContainer = styled.div`
  position: relative;
`;

const BellIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 4px;
  margin-left: 23px;
  cursor: pointer;
  // filter: ${(props) => (props.hasNewAlarm ? 'invert(40%) sepia(80%) saturate(7475%) hue-rotate(0deg) brightness(94%) contrast(121%)' : 'none')}; 
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
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
  opacity: ${(props) => (props.show ? '1' : '0')};  
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;  
`;
