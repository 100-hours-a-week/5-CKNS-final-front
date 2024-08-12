import React from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';

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

const AreaPopup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContent>
        <Header>
          <BackButton onClick={onClose}>
            <img src={backIcon} alt="뒤로가기" />
          </BackButton>
          <SearchBar>
            <input type="text" placeholder="출발지를 검색하세요." />
          </SearchBar>
        </Header>
        <SearchResults>
          {children}
        </SearchResults>
      </PopupContent>
    </PopupOverlay>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 팝업이 화면 하단에 위치 */
`;

const PopupContent = styled.div`
  width: 350px;
  height: 863px;
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

const SearchBar = styled.div`
  flex: 1;
  margin-left: 10px;

  input {
    width: 100%;
    border-radius: 4px;
    border: none;
    font-size: 20px;

    &:focus {
      outline: none; /* 포커스 시 아웃라인 제거 */
    }
  }
`;

const SearchResults = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 20px;
`;

export default AreaPopup;
