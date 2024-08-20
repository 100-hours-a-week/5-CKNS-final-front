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

const SearchResultsPopup = ({ isOpen, onClose, searchResults = [], onResultClick }) => {
  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContent>
        <PopupHeader>
          <BackButton onClick={onClose}>
            <img src={backIcon} alt="뒤로가기" />
          </BackButton>
          <Title>검색 결과</Title>
        </PopupHeader>
        <Divider />
        {searchResults.length > 0 && (
          <SearchResults>
            {searchResults.map((result, index) => (
              <SearchResultItem key={index} onClick={() => onResultClick(result)}>
                {result.photos && result.photos.length > 0 && (
                  <ResultImage 
                    src={result.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 })} 
                    alt={result.name} 
                  />
                )}
                <ResultDetails>
                  <ResultName>{result.name}</ResultName>
                  {result.formatted_address && <ResultAddress>{result.formatted_address}</ResultAddress>}
                  {result.rating && <ResultRating>평점: {result.rating}</ResultRating>}
                </ResultDetails>
              </SearchResultItem>
            ))}
          </SearchResults>
        )}
      </PopupContent>
    </PopupOverlay>
  );
};

export default SearchResultsPopup;

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
`;

const PopupHeader = styled.div`
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

const Title = styled.h2`
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
  margin-top: -10px;
  margin-bottom: 10px;
`;

const SearchResults = styled.div`
  flex: 1;
  font-size: 16px;
  overflow-y: auto; 
`;

const SearchResultItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;
`;

const ResultImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

const ResultDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ResultName = styled.span`
  font-size: 20px;
  text-align: left;
  font-weight: bold;
`;

const ResultAddress = styled.div`
  font-size: 16px;
  color: #666;
`;

const ResultRating = styled.div`
  font-size: 16px;
  color: #ff9900;
`;
