import React, { useEffect } from 'react';
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

const AreaPopup = ({ isOpen, onClose, children, searchResults = [], onResultClick }) => {

  // useEffect를 사용하여 팝업이 열릴 때와 닫힐 때 body의 overflow를 변경
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // 부모 요소의 스크롤을 막음
    } else {
      document.body.style.overflow = ''; // 원래 상태로 복원
    }

    return () => {
      // 컴포넌트가 언마운트되거나 팝업이 닫힐 때 스크롤을 원래 상태로 돌려놓음
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <BackButton onClick={onClose}>
            <img src={backIcon} alt="뒤로가기" />
          </BackButton>
          <SearchBar>
            {children}
          </SearchBar>
        </Header>
        <Divider />
        {searchResults.length > 0 && (
          <>
            <SearchResults>
              {searchResults.map((result, index) => (
                <SearchResultItem key={index} onClick={() => onResultClick(result)}>
                  {result}
                </SearchResultItem>
              ))}
            </SearchResults>
          </>
        )}
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
  align-items: flex-end;
`;

const PopupContent = styled.div`
  width: 350px;
  height: 80%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  animation: ${slideUp} 0.3s ease-out;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;  
`;

const SearchResults = styled.div`
  flex: 1;
  font-size: 20px;
  overflow-y: auto; 
  max-height: 80%;  
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
      outline: none;
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  
  &:hover {
    background-color: #f0f0f0;
    color: #007bff;
    transition: all 0.3s ease;
  }
`;


export default AreaPopup;
