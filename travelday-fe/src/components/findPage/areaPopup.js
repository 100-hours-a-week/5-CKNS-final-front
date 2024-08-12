import React from 'react';
import styled from 'styled-components';

const AreaPopup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Popup>
      <PopupContent>
        {children}
        <button onClick={onClose}>닫기</button>
      </PopupContent>
    </Popup>
  );
};

const Popup = styled.div`
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

const PopupContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

export default AreaPopup;
