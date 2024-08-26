import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';
import WishListModal from './wishListModal';  
import useTravelStore from '../../store/useTravelStore';
import axios from 'axios';

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

const WishlistPopup = ({ isOpen, onClose, selectedPlace }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const travelRooms = useTravelStore((state) => state.travelRooms) || [];
  const setTravelRooms = useTravelStore((state) => state.setTravelRooms);

  useEffect(() => {
    const fetchTravelRooms = async () => {
      try {
        const response = await axios.get('https://api.thetravelday.co.kr/api/rooms');
        setTravelRooms(response.data);  
      } catch (error) {
        console.error('여행방 목록 불러오기 실패:', error);

        ;
      }
    };

    


    fetchTravelRooms();
  }, [setTravelRooms]);

  const handleRoomSelect = (roomId) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  if (!isOpen || !selectedPlace) return null;

  return (
    <>
      <PopupOverlay>
        <PopupContent>
          <PopupHeader>
            <BackButton onClick={onClose}>
              <img src={backIcon} alt="뒤로가기" />
            </BackButton>
            <Title>어디에 저장하시겠습니까?</Title>
          </PopupHeader>
          <Divider />
          <RoomList>
            {travelRooms.length > 0 ? (
              travelRooms.map((room) => (
                <RoomListItem key={room.id} onClick={() => handleRoomSelect(room.id)}>
                  {room.name}
                </RoomListItem>
              ))
            ) : (
              <p>저장 가능한 여행방이 없습니다.</p>
            )}
          </RoomList>
        </PopupContent>
      </PopupOverlay>

      {isModalOpen && (
        <WishListModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose} 
          selectedPlace={selectedPlace}  
          travelRoomId={selectedRoomId}
        />
      )}
    </>
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

const Title = styled.h2`
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
  margin-bottom: 10px;
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
`;
