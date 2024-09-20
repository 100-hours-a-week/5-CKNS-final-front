import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoClose } from 'react-icons/io5';
import InviteModal from '../../components/schedulePage/inviteModal.js';
import axiosInstance from '../../utils/axiosInstance'; 

const Sidebar = ({ isSidebarVisible, toggleSidebar }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // 초대 모달 열기
  const handleInviteClick = () => {
    setIsInviteModalOpen(true);
  };

  // 초대 모달 닫기
  const handleInviteModalClose = () => {
    setIsInviteModalOpen(false);
  };

  // 방 나가기 로직
  const handleLeaveRoom = async () => {
    const travelRoomId = window.location.pathname.split('/').pop(); // URL에서 ID 추출
    const accessToken = localStorage.getItem('accessToken'); // 로컬스토리지에서 토큰 가져오기

    try {
      const response = await axiosInstance.delete(`/api/rooms/${travelRoomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        window.alert('채팅방을 나갔습니다!'); // 성공 시 알림
      } else {
        console.error('방 나가기를 실패했습니다:', response.statusText);
      }
    } catch (error) {
      console.error('방 나가기를 실패했습니다:', error);
      window.alert('채팅방 나가기를 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <SidebarContainer isSidebarVisible={isSidebarVisible}>
        <Header>
          <SidebarTitle>채팅방 설정</SidebarTitle>
          <CloseButton onClick={toggleSidebar}>
            <IoClose size={24} />
          </CloseButton>
        </Header>
        <SidebarContent>
          <Section>
            <SectionTitle>대화상대</SectionTitle>
            <InviteButton onClick={handleInviteClick}>
              대화상대 초대
            </InviteButton>
          </Section>
        </SidebarContent>
        <ExitButton onClick={handleLeaveRoom}>나가기</ExitButton> 
      </SidebarContainer>

      {isInviteModalOpen && (
        <InviteModalOverlay>
          <InviteModal 
            isOpen={isInviteModalOpen} 
            onClose={handleInviteModalClose} 
            searchInput={searchInput} 
            setSearchInput={setSearchInput} 
          />
        </InviteModalOverlay>
      )}
    </>
  );
};

export default Sidebar;

// 스타일 코드들
const InviteModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);  // 배경 어둡게
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;  // 사이드바보다 위에 표시되도록 z-index 설정
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: calc(100vh - 40px);
  width: 300px; 
  background-color: #ffffff; 
  padding: 20px;
  box-shadow: -2px 0 15px rgba(0,0,0,0.15);
  z-index: 1100; 
  transform: translateX(${props => (props.isSidebarVisible ? '0' : '100%')});
  animation: ${props => (props.isSidebarVisible ? slideIn : slideOut)} 0.3s forwards;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &:hover {
    box-shadow: -4px 0 20px rgba(0,0,0,0.25); 
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const SidebarTitle = styled.h2`
  font-size: 20px; 
  color: #2c3e50; 
  margin: 0;
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

const SidebarContent = styled.div`
  margin-top: 20px;
  flex-grow: 1;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #34495e; 
  margin-bottom: 10px;
`;

const InviteButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff; 
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #0056b3; 
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1); 
  }

  &:active {
    transform: translateY(0);
  }
`;

const ExitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: transparent;
  color: #7f8c8d;
  border: 2px solid #7f8c8d;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 70px;
  transition: color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    color: #e74c3c;
    border-color: #e74c3c;
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;
