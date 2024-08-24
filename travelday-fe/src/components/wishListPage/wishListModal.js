import React from 'react';
import styled from 'styled-components';
import backIcon from '../../images/header/back.png';  
import axios from 'axios';  

const WishListModal = ({ onClose, selectedPlace, travelRoomId }) => {
  const handleAddToSchedule = async () => {
    const token = localStorage.getItem('accessToken'); // 토큰 가져오기

    try {
      const response = await axios.post(
        `https://api.thetravelday.co.kr/api/rooms/${travelRoomId}/plan/list`, 
        {
          latitude: selectedPlace.latitude,
          longitude: selectedPlace.longitude,
          name: selectedPlace.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
          withCredentials: true 
        }
      );
      console.log('일정에 추가 성공:', response.data);
      onClose();
    } catch (error) {
      console.error('일정에 추가 실패:', error);
    }
  };

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem('accessToken'); 

    try {
      const response = await axios.post(
        `https://api.thetravelday.co.kr/api/rooms/${travelRoomId}/wishlist`,
        {
          latitude: selectedPlace.latitude,
          longitude: selectedPlace.longitude,
          name: selectedPlace.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
          withCredentials: true 
        }
      );
      console.log('위시리스트에 추가 성공:', response.data);
      onClose();
    } catch (error) {
      console.error('위시리스트에 추가 실패:', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <BackButton onClick={onClose}>
            <img src={backIcon} alt="뒤로가기" />
          </BackButton>
          <ModalTitle>어디에 추가하시겠습니까?</ModalTitle>
        </ModalHeader>
        <Divider />
        <ButtonList>
          <ButtonItem onClick={handleAddToSchedule}>
            일정에 추가
          </ButtonItem>
          <ButtonItem onClick={handleAddToWishlist}>
            위시리스트에 추가
          </ButtonItem>
        </ButtonList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default WishListModal;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const ModalHeader = styled.div`
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

const ModalTitle = styled.h3`
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

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonItem = styled.div`
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  background-color: #f0f0f0;
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f12e5e; 
    color: #fff; 
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;
