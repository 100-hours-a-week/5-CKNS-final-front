import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';  
import SubPopup from './wishListModal.js';  


// 애니메이션 키프레임
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const mockTravelRooms = ["공듀들의 일본 여행", "하이든의 네팔 여행"];

const WishlistPopup = ({ isOpen, onClose }) => {
  const [subPopupOpen, setSubPopupOpen] = useState(false);

  const handleRoomSelect = () => {
    setSubPopupOpen(true);
  };

  const handleBackToRooms = () => {
    setSubPopupOpen(false);
  };

  if (!isOpen) return null;

  return (
    <PopupOverlay>
      {subPopupOpen ? (
        <SubPopup onBack={handleBackToRooms} />
      ) : (
        <PopupContent>
          <PopupHeader>
            <BackButton onClick={onClose}>
              <img src={backIcon} alt="뒤로가기" />
            </BackButton>
            <PopupTitle>어디에 저장하시겠습니까?</PopupTitle>
          </PopupHeader>
          <Divider />
          <RoomList>
            {mockTravelRooms.map((room, index) => (
              <RoomListItem key={index} onClick={handleRoomSelect}>
                {room}
              </RoomListItem>
            ))}
          </RoomList>
        </PopupContent>
      )}
    </PopupOverlay>
  );
};

export default WishlistPopup;

// Styled Components
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const PopupContent = styled.div`
  width: 350px;
  height: 80%; 
  background-color: #fff;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  animation: ${slideUp} 0.3s ease-out;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const PopupTitle = styled.h3`
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
`;

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RoomListItem = styled.div`
  padding: 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  text-align: left; 
  border: 2px solid transparent; 

  &:hover {
    border-color: #f12e5e; 

  }
`
