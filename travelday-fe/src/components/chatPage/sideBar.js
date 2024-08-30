import React from 'react';
import styled, { keyframes } from 'styled-components';
import { IoClose } from 'react-icons/io5';

const Sidebar = ({ isSidebarVisible, toggleSidebar }) => {
  return (
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
          <InviteButton>대화상대 초대</InviteButton>
        </Section>
    
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;

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
  height: 100vh;
  width: 300px; /* 너비를 조금 더 넓게 조정 */
  background-color: #f9f9f9; /* 부드러운 배경색 */
  padding: 20px;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1); /* 그림자 강조 */
  z-index: 1000;
  transform: translateX(${props => (props.isSidebarVisible ? '0' : '100%')});
  animation: ${props => (props.isSidebarVisible ? slideIn : slideOut)} 0.3s forwards;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: -4px 0 15px rgba(0,0,0,0.2); /* 호버 시 그림자 확대 */
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0; /* 헤더 하단에 선 추가 */
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const SidebarTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4b4b; /* 빨간색으로 변경하여 경고 느낌 추가 */
  }
`;

const SidebarContent = styled.div`
  margin-top: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #555;
  margin-bottom: 10px;
`;

const InviteButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3; /* 더 짙은 파란색으로 변경 */
    transform: translateY(-2px); /* 약간 위로 이동하여 입체감 추가 */
  }

  &:active {
    transform: translateY(0); /* 클릭 시 원래 위치로 돌아오도록 */
  }
`;
