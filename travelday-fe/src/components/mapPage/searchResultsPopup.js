import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';
import heartIcon from '../../images/wishList/heart.png';
import WishlistPopup from '../wishList/wishListPopup'; 

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const handleHeartClick = (result) => {
    setSelectedResult(result);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleRoomSelect = (room) => {
    console.log(`Selected room: ${room}`);
    setIsPopupOpen(false);
    // 여행방 선택 후 처리 로직 구현
  };

  if (!isOpen) return null;

  return (
    <>
      <PopupOverlay>
        <PopupContent>
          <PopupHeader>
            <BackButton onClick={onClose}>
              <img src={backIcon} alt="뒤로가기" />
            </BackButton>
            <Title>지도로 보기</Title>
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
                  <HeartButton onClick={(e) => { e.stopPropagation(); handleHeartClick(result); }}>
                    <img src={heartIcon} alt="위시리스트 추가" />
                  </HeartButton>
                </SearchResultItem>
              ))}
            </SearchResults>
          )}
        </PopupContent>
      </PopupOverlay>
      
      <WishlistPopup 
        isOpen={isPopupOpen} 
        onClose={handlePopupClose} 
        travelRooms={["공듀들의 일본 여행", "하이든의 네팔 여행"]} // 방 이름 예시
        onRoomSelect={handleRoomSelect} 
      />
    </>
  );
};

export default SearchResultsPopup;

// Styled Components
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
  overflow-y: scroll; 
  max-height: 80%; 

  -ms-overflow-style: none; 
  scrollbar-width: none; 
  
  &::-webkit-scrollbar {
    display: none;  
  }
`;

const SearchResultItem = styled.div`
  display: flex;
  justify-content: space-between;
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
  flex-grow: 1;
  margin-right: 15px; 
  gap: 3px;
`;

const ResultName = styled.span`
  font-size: 20px;
  text-align: left;
  font-weight: bold;
`;

const ResultAddress = styled.div`
  font-size: 16px;
  color: #666;
  text-align: left; 
`;

const ResultRating = styled.div`
  font-size: 16px;
  color: #ff9900;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 200ms cubic-bezier(.2,0,.7,1), box-shadow 400ms cubic-bezier(.2,0,.7,1);

  img {
    width: 24px;
    height: 24px;
    transition: transform 200ms cubic-bezier(.2,0,.7,1);
  }

  &:hover {
    transform: rotate(45deg);
    box-shadow: 0 0 1px 15px rgba(138, 59, 88, 0.4),
                0 0 1px 30px rgba(138, 59, 88, 0.1),
                0 0 1px 45px rgba(138, 59, 88, 0.1);
  }

  &:hover img {
    transform: rotate(-45deg);
  }
`;
