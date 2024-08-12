import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TripTypeSelector from '../../components/findPage/tripType';
import AreaPopup from '../../components/shared/areaPopup';
import switchIcon from '../../images/switch.png';

const FlightSearch = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchType, setSearchType] = useState('');

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleButtonClick = (type) => {
    setSearchType(type);
    setIsPopupOpen(true);
  };

  return (
    <Container>
      <TripTypeSelector tripType={tripType} setTripType={setTripType} />
      <AreaSearchingContainer>
        <ButtonContainer>
          <Button onClick={() => handleButtonClick('departure')}>출발지</Button>
          <SwitchIcon src={switchIcon} alt="Switch" />
          <Button onClick={() => handleButtonClick('arrival')}>도착지</Button>
        </ButtonContainer>
      </AreaSearchingContainer>
      <AnimatedPopup isOpen={isPopupOpen} onClose={handlePopupClose}>
        <input 
          type="text" 
          placeholder={searchType === 'departure' ? "출발지를 검색하세요." : "도착지를 검색하세요."} 
        />
      </AnimatedPopup>
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
  box-shadow: 0px 0px 10px rgba(149, 157, 177, 0.2);
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 40px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  outline: none;
`;

const AreaSearchingContainer = styled.div`
  width: 390px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: center;
`;

const SwitchIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
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

export default FlightSearch;
