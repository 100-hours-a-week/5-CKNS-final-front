import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const AlarmSidebar = ({ isOpen, onClose, alarms }) => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAlarmClick = (roomId, roomName) => {
    setSelectedRoom({ roomId, roomName });
    setIsModalOpen(true); // 모달 열기
    // 이곳에서 알람이 확인된 것으로 표시하는 로직 추가 가능
  };

  const handleAccept = () => {
    // 초대 수락 처리 로직 추가 예정
    setIsModalOpen(false);
    onClose();
    navigate(`/rooms/${selectedRoom.roomId}`);
  };

  const handleDecline = () => {
    // 초대 거절 처리 로직 추가 예정
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const getTimeDifference = (time) => {
    const now = new Date();
    const alarmTime = new Date(time);
    const differenceInMinutes = Math.floor((now - alarmTime) / 1000 / 60);
  
    if (differenceInMinutes < 1) {
      return "방금 전";
    } else if (differenceInMinutes < 60) {
      return `${differenceInMinutes}분 전`;
    } else if (differenceInMinutes < 1440) { // 1440분 = 24시간
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      return `${differenceInHours}시간 전`;
    } else {
      const differenceInDays = Math.floor(differenceInMinutes / 1440);
      return `${differenceInDays}일 전`;
    }
  };
  
  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <Title>알람</Title>
          <CloseButton onClick={onClose}>
            <IoClose size={24} />
          </CloseButton>
        </SidebarHeader>
        <AlarmList>
          {alarms.map((alarm, index) => (
            <AlarmItem 
              key={index} 
              onClick={() => handleAlarmClick(alarm.roomId, alarm.roomName)}
            >
              <AlarmMessage>
                당신을 기다리고 있어요! <br />
                <HighlightedText>{alarm.inviter}</HighlightedText>님이 <HighlightedText>{alarm.roomName}</HighlightedText>에 초대했습니다.
              </AlarmMessage>
              <InviteTime>{getTimeDifference(alarm.invitedAt)}</InviteTime>
            </AlarmItem>
          ))}
        </AlarmList>
      </SidebarContainer>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <CloseModalButton onClick={() => setIsModalOpen(false)}>
              <IoClose size={24} />
            </CloseModalButton>
            <ModalTitle>{`${selectedRoom.roomName} 초대를 수락하시겠습니까?`}</ModalTitle>
            <ModalButtons>
              <ModalButton onClick={handleAccept}>수락</ModalButton>
              <ModalButton onClick={handleDecline} decline>거절</ModalButton>
            </ModalButtons>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default AlarmSidebar;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  height: 48px;
  border-bottom: 1px solid #e0e0e0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #2c3e50;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c; 
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const AlarmList = styled.div`
  padding: 20px;
`;

const AlarmItem = styled.div`
  padding: 15px;
  height: 90px;
  cursor: pointer;
  border-radius: 8px;
  background-color: #f8f9fa; /* 배경색 조정 */
  margin-bottom: 10px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #e9ecef; /* hover 시 강조 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const AlarmMessage = styled.div`
  font-size: 16px;
  color: #000; /* 텍스트 색상 */
  white-space: pre-wrap;
  line-height: 1.5; /* 줄 간격을 조절하는 속성 */
`;

const HighlightedText = styled.span`
  color: #007bff; /* 초대한 사람과 방 이름만 파란색으로 표시 */
  font-weight: 500;
`;

const InviteTime = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-top: 5px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  width: 330px;
  height: 120px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #e74c3c;
  }
`;

const ModalTitle = styled.h2`
  font-size: 15px;
  margin-top: 25px;
  margin-bottom: 25px;
  color: #333;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #b0b0b0;  /* 기본 회색 */
  color: white;
  width: 45%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${props => props.decline ? '#007bff' : '#007bff'}; 
    transform: translateY(-2px); /* 버튼이 약간 올라가는 효과 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* hover 시 그림자 강화 */
  }
`;
