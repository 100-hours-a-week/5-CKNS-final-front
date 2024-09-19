import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import axiosInstance from '../../utils/axiosInstance'

const AlarmSidebar = ({ isOpen, onClose, alarms }) => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAlarmClick = (travelRoomId, content, notificationId) => {
    console.log(notificationId);
    setSelectedRoom({ travelRoomId, content, notificationId }); 
    setIsModalOpen(true);
  };

  const handleAccept = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axiosInstance.put(
        `/api/rooms/${selectedRoom.travelRoomId}/invitation/${selectedRoom.notificationId}`,
        {"status": "Y"},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true, 
        }
      );
      if (response.status === 200) {
        console.log('초대 수락 성공');
        setIsModalOpen(false);
        onClose();
        navigate(`/schedule/${selectedRoom.travelRoomId}`);
      }
    } catch (error) {
      console.error('초대 수락 실패:', error);
    }
  };

  const handleDecline = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axiosInstance.put(
        `/api/rooms/${selectedRoom.travelRoomId}/invitation/${selectedRoom.notificationId}`,
        { "status": "N" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true, // 쿠키도 같이 전송
        }
      );
      if (response.status === 200) {
        console.log('초대 거절 성공');
        setIsModalOpen(false);
        setSelectedRoom(null);
      }
    } catch (error) {
      console.error('초대 거절 실패:', error);
    }
  };

  const getTimeDifference = (time) => {
    const correctedTime = `20${time.slice(0, 2)}-${time.slice(3, 5)}-${time.slice(6, 8)}T${time.slice(9)}`;
    const now = new Date();
    const alarmTime = new Date(correctedTime);
    const differenceInMinutes = Math.floor((now - alarmTime) / 1000 / 60);

    if (differenceInMinutes < 1) {
      return "방금 전";
    } else if (differenceInMinutes < 60) {
      return `${differenceInMinutes}분 전`;
    } else if (differenceInMinutes < 1440) {
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
          {alarms.length === 0 ? (
            <NoAlarmsMessage>알림이 없습니다!</NoAlarmsMessage>
          ) : (
            alarms.map((alarm, index) => (
              <AlarmItem 
                key={index} 
                onClick={() => handleAlarmClick(alarm.travelRoomId, alarm.content, alarm.notificationId)} 
              >
                <AlarmMessage>
                  {alarm.content}
                </AlarmMessage>
                <InviteTime>{getTimeDifference(alarm.notificationTime)}</InviteTime>
              </AlarmItem>
            ))
          )}
        </AlarmList>
      </SidebarContainer>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <CloseModalButton onClick={() => setIsModalOpen(false)}>
              <IoClose size={24} />
            </CloseModalButton>
            <ModalTitle>
              {`${selectedRoom.content}`}
              <br />
              <br />
              {`초대를 수락하시겠습니까?`}
            </ModalTitle>
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
  width: 340px;
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

const NoAlarmsMessage = styled.div`
  font-size: 16px;
  color: #6c757d;
  text-align: center;
  padding: 50px 0;
`;

const AlarmItem = styled.div`
  padding: 15px;
  height: 90px;
  cursor: pointer;
  border-radius: 8px;
  background-color: #f8f9fa;
  margin-bottom: 10px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #e9ecef;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const AlarmMessage = styled.div`
  font-size: 16px;
  color: #000;
  white-space: pre-wrap;
  line-height: 1.5;
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
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 330px; 
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
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #333;
`;

const ModalButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalButton = styled.button`
  background: linear-gradient(135deg, #007bff, #00a2ff); 
  color: white;
  border: none;
  width: 82px;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #00a2ff, #007bff);  
    transform: translateY(-2px);  
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); 
  }

  &:active {
    transform: translateY(0); 
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); 
  }
`;
