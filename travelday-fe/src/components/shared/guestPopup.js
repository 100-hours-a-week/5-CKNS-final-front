import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';
import addIcon from '../../images/filter/add.png';
import minusIcon from '../../images/filter/minus.png';

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

const GuestSelectorPopup = ({ isOpen, onClose }) => {
  const [adultCount, setAdultCount] = useState(1); // 성인 인원 수
  const [childCount, setChildCount] = useState(0); // 유아 인원 수

  if (!isOpen) return null;

  const increaseCount = (setCount, count) => setCount(count + 1);
  const decreaseCount = (setCount, count) => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <Header>
          <BackButton onClick={onClose}>
            <img src={backIcon} alt="뒤로가기" />
          </BackButton>
          <Title>인원 선택</Title>
        </Header>
        <Divider />
        <GuestTypeContainer>
          <GuestType>
            <GuestLabel>성인</GuestLabel>
            <CountControl>
              <ControlButton onClick={() => decreaseCount(setAdultCount, adultCount)}>
                <img src={minusIcon} alt="마이너스 버튼" />
              </ControlButton>
              <GuestCount>{adultCount}</GuestCount>
              <ControlButton onClick={() => increaseCount(setAdultCount, adultCount)}>
                <img src={addIcon} alt="플러스 버튼" />
              </ControlButton>
            </CountControl>
          </GuestType>
          <GuestType>
            <GuestLabel>유아</GuestLabel>
            <CountControl>
              <ControlButton onClick={() => decreaseCount(setChildCount, childCount)}>
                <img src={minusIcon} alt="마이너스 버튼" />
              </ControlButton>
              <GuestCount>{childCount}</GuestCount>
              <ControlButton onClick={() => increaseCount(setChildCount, childCount)}>
                <img src={addIcon} alt="플러스 버튼" />
              </ControlButton>
            </CountControl>
          </GuestType>
        </GuestTypeContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default GuestSelectorPopup;

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
  height: 80%; /* 높이를 화면의 80%로 설정 */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  animation: ${slideUp} 0.3s ease-out;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

const Title = styled.div`
  flex: 1;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: -10px;
  margin-bottom: 20px;
`;

const GuestTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GuestType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GuestLabel = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const CountControl = styled.div`
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const GuestCount = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 0 15px;
  width: 30px;
  text-align: center;
`;
