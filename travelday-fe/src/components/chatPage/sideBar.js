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
        <p>사용자 초대</p>
        <InviteButton>새 유저 초대</InviteButton>
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
  width: 250px;
  background-color: #fff;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  z-index: 1000;
  transform: translateX(${props => (props.isSidebarVisible ? '0' : '100%')});
  animation: ${props => (props.isSidebarVisible ? slideIn : slideOut)} 0.3s forwards;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SidebarTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;

  &:hover {
    color: #007bff;
  }
`;

const SidebarContent = styled.div`
  margin-top: 20px;
`;

const InviteButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0069d9;
  }
`;
