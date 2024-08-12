import React, { useState } from 'react';
import styled from 'styled-components';
import TripTypeSelector from '../../components/findPage/tripType';
import AirportSearchInput from '../../components/findPage/airportSearch';
import AreaPopup from '../../components/shared/areaPopup';
import switchIcon from '../../images/switch.png';

const FlightSearch = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleInputClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <Container>
      <TripTypeSelector tripType={tripType} setTripType={setTripType} />
        <SwitchIcon src={switchIcon} alt="Switch" />
      <AreaPopup isOpen={isPopupOpen} onClose={handlePopupClose}>
        <h3>공항 선택</h3>
      </AreaPopup>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const SwitchIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default FlightSearch;
