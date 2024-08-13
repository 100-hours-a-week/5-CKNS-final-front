import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import AreaPopup from '../../components/shared/areaPopup';
import HotelList from '../../components/findPage/hotellist'; // Corrected import

const HotelSearch = () => {
  const [tripType, setTripType] = useState('single-room');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchType, setSearchType] = useState('');

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleButtonClick = (type) => {
    setSearchType(type);
    setIsPopupOpen(true);
  };

  // 예시 호텔 데이터
  const hotels = [
    { image: '', name: 'Hilton New York', location: 'New York, USA', rating: '5 stars', price: '1,500,000원' },
    { image: '', name: 'Hotel de Paris', location: 'Paris, France', rating: '5 stars', price: '2,000,000원' },
    { image: '', name: 'Tokyo Inn', location: 'Tokyo, Japan', rating: '3 stars', price: '800,000원' },
  ];

  return (
    <Container>
      <AreaSearchingContainer>
        <ButtonContainer>
          <Button onClick={() => handleButtonClick('location')}>도시, 호텔 이름을 검색하세요.</Button>
        </ButtonContainer>
      </AreaSearchingContainer>
      <AnimatedPopup isOpen={isPopupOpen} onClose={handlePopupClose}>
        <input 
          type="text" 
          placeholder="도시, 호텔 위치를 검색하세요." 
        />
      </AnimatedPopup>
      <HotelList hotels={hotels} />  
    </Container>
  );
};

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 327px;
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 30px;
  border: 1px solid #ccc;
`;


const Button = styled.button`
  padding: 8px 16px;
  margin: 0 40px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  outline: none;
  font-size: 16px;
  color: #CCC;
`;

const AreaSearchingContainer = styled.div`
  width: 390px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: center;
`;


const AnimatedPopup = styled(AreaPopup)`
  animation: ${slideUp} 0.3s ease-out;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;

  ${(props) => !props.isOpen && `
    display: none;
  `}
`;

export default HotelSearch;
