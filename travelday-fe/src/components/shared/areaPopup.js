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

const AreaPopup = ({ isOpen, onClose, children, searchResults = [] }) => {
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
              {/* 검색결과*/}
              {searchResults.map((result, index) => (
                <div key={index}>{result}</div>
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
  overflow-y: auto;
`;

export default AreaPopup;
