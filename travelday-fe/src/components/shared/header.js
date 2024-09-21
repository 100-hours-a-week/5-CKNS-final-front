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
  const [hasNewAlarm, setHasNewAlarm] = useState(false); 
  const [alarms, setAlarms] = useState([]);
  const [isDelayedTrue, setIsDelayedTrue] = useState(false); 

  useEffect(() => {
    if (showBackButton) {
        setIsDelayedTrue(true);
    }
  }, [showBackButton]);

  useEffect(() => {
    const checkNotifications = async () => {
        console.log('checkNotifications 함수 시작'); 

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.log('AccessToken이 없습니다. 알람 조회를 중단합니다.');
            return;
        }

        try {
          console.log('알람 조회 API 호출 시작');
          const response = await axiosInstance.get('/api/notification', {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });
      
          const notification = response.data.data;
      
          if (Array.isArray(notification)) {
              // 알림이 배열인 경우 그대로 사용
              setAlarms(notification);
          } else {
              setHasNewAlarm(false);
              // console.log('알람이 없습니다.');
          }
      
          setHasNewAlarm(true);
          console.log('알람 조회 성공! 알람 내용:', notification);
      } catch (error) {
          console.error('알림 확인 중 오류 발생:', error);
      }
      
    };

    checkNotifications(); // 함수 호출
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

    setHasNewAlarm(false);
    setIsAlarmOpen(!isAlarmOpen);
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <BackButton src={backIcon} alt="뒤로가기" show={isDelayedTrue} onClick={handleBackClick} />
        <Logo src={logoImage} alt="여행한DAY 로고" show={isDelayedTrue} onClick={handleLogoClick} />
      </LeftSection>
      <RightSection>
      <IconContainer>
        <BellIcon src={bellIcon} alt="알람 아이콘" onClick={handleBellIconClick} hasNewAlarm={hasNewAlarm} />
        {hasNewAlarm && alarms.length > 0 && <Badge />} 
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
  transform: ${(props) => (props.show ? 'translateX(0px)' : 'translateX(-20px)')}; 
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
