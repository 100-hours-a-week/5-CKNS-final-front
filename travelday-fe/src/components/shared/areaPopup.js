import React from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';
import arrowIcon from '../../images/arrow.png'; // 화살표 이미지 경로

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
  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContent>
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
            <SearchResultsTitle>검색결과</SearchResultsTitle>
            <SearchResults>
              {searchResults.map((result, index) => (
                <SearchResultItem key={index} onClick={() => onResultClick(result)}>
                  <img src={arrowIcon} alt="화살표" />
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

const SearchResultsTitle = styled.div`
  width: 100%;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const SearchResults = styled.div`
  flex: 1;
  margin-top: 20px;
  font-size: 20px;
  overflow-y: auto; 
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    margin-left: 10px;
    margin-right: 21px;
    width: 16px; /* 화살표 이미지 크기 */
    height: 16px;
  }
`;

export default AreaPopup;
