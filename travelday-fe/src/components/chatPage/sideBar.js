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
      <ExitButton onClick={toggleSidebar}>나가기</ExitButton>
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
  height: calc(100vh - 40px);
  width: 300px; 
  background-color: #ffffff; /* Changed to pure white for a clean look */
  padding: 20px;
  box-shadow: -2px 0 15px rgba(0,0,0,0.15); /* Slightly deeper shadow */
  z-index: 1100; 
  transform: translateX(${props => (props.isSidebarVisible ? '0' : '100%')});
  animation: ${props => (props.isSidebarVisible ? slideIn : slideOut)} 0.3s forwards;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  &:hover {
    box-shadow: -4px 0 20px rgba(0,0,0,0.25); /* Enhanced shadow on hover */
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
  font-size: 20px; /* Slightly increased font size */
  font-weight: 700; /* Made font bolder */
  color: #2c3e50; /* Darker shade for a modern look */
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
    color: #e74c3c; /* More vibrant red on hover */
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
  font-weight: 600; /* Increased font weight */
  color: #34495e; /* Darker color for titles */
  margin-bottom: 10px;
`;

const InviteButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff; /* Original blue color */
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
  color: #e74c3c;
  border: 2px solid #e74c3c; 
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 70px;
  transition: color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    color: #e74c3c; 
    border-color: #c0392b; 
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;
