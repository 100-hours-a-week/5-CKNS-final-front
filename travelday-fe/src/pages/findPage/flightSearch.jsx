import React, { useState } from 'react';
import styled from 'styled-components';
import TripTypeSelector from '../../components/findPage/tripType';
import AreaPopup from '../../components/shared/areaPopup';
import switchIcon from '../../images/switch.png';

const FlightSearch = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <Container>
      <TripTypeSelector tripType={tripType} setTripType={setTripType} />
      <Airportsearching>
        <ButtonContainer>
          <Button>도착지</Button>
          <SwitchIcon src={switchIcon} alt="Switch" />
          <Button>목적지</Button>
        </ButtonContainer>
      </Airportsearching>
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

const Airportsearching =styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  background-color: #fff;
  width: 390px;
  height: 110px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  width: 327px;
  height: 64px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(149, 157, 177, 0.2); /* 수정된 그림자 */
  border-radius: 8px; /* 모서리 둥글게 */
`;


const Button = styled.button`
  padding: 8px 16px;
  margin: 0 40px;
  cursor: pointer;
  background-color: #fff;
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 포커스 아웃라인 제거 */
`;

const SwitchIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default FlightSearch;
