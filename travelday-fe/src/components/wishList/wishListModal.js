import React from 'react';
import styled from 'styled-components';
import backIcon from '../../images/header/back.png';  // backIcon 이미지 가져오기

const WishListModal = ({ onBack }) => (
  <ModalOverlay>
    <ModalContent>
      <ModalHeader>
        <BackButton onClick={onBack}>
          <img src={backIcon} alt="뒤로가기" />
        </BackButton>
        <ModalTitle>어디에 추가하시겠습니까?</ModalTitle>
      </ModalHeader>
      <Divider />
      <ButtonList>
        <ButtonItem onClick={() => alert('일정에 추가')}>
          일정에 추가
        </ButtonItem>
        <ButtonItem onClick={() => alert('위시리스트에 추가')}>
          위시리스트에 추가
        </ButtonItem>
      </ButtonList>
    </ModalContent>
  </ModalOverlay>
);

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
    background-color: #f12e5e; /* 더 진한 핑크색으로 변경 */
    color: #fff; /* 글씨를 하얀색으로 변경 */
    transform: scale(1.05); /* 버튼이 살짝 커지도록 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 약간의 그림자 추가 */
  }

  &:active {
    transform: scale(0.98); /* 버튼을 누를 때 살짝 작아지도록 */
  }
`;
