// WishlistModal.js
import React from 'react';
import styled from 'styled-components';

const WishlistModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>위시리스트에 추가하시겠습니까?</ModalTitle>
        <ModalButtonContainer>
          <ModalButton onClick={onClose}>취소</ModalButton>
          <ModalButton onClick={onConfirm}>확인</ModalButton>
        </ModalButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default WishlistModal;

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
`;

const ModalContent = styled.div`
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
