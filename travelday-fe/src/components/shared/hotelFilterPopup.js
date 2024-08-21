import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';
import commentsIcon from '../../images/filter/comments.png';
import priceIcon from '../../images/filter/price.png';
import SearchBtn from '../../components/shared/searchBtn.js';

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

const HotelFilterPopup = ({ isOpen, onClose }) => {
  const [selectedRating, setSelectedRating] = useState('모든 평점');
  const [selectedPrice, setSelectedPrice] = useState('모든 가격대');

  const ratings = [
    { label: '9점 이상 ~', icon: commentsIcon },
    { label: '8점 이상 ~', icon: commentsIcon },
    { label: '7점 이상 ~', icon: commentsIcon },
    { label: '6점 이상 ~', icon: commentsIcon },
  ];

  const priceRanges = [
    { label: '10만원 이하', icon: priceIcon },
    { label: '10만원 ~ 50만원', icon: priceIcon },
    { label: '50만원 ~ 100만원', icon: priceIcon },
    { label: '100만원 이상', icon: priceIcon },
  ];

  if (!isOpen) return null;

  const handleRatingClick = (rating) => {
    setSelectedRating(rating.label);
  };

  const handlePriceClick = (priceRange) => {
    setSelectedPrice(priceRange.label);
  };

  const handleSearchClick = () => {
    console.log('검색 버튼 클릭');
    console.log('선택된 호텔 평점:', selectedRating);
    console.log('선택된 가격대:', selectedPrice);
    onClose(); // 팝업 닫기
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <Header>
          <BackButton onClick={onClose}>
            <img src={backIcon} alt="뒤로가기" />
          </BackButton>
          <Title>필터</Title>
        </Header>
        <Divider />
        <FilterSection>
          <SectionTitle>호텔 평점</SectionTitle>
          <ButtonContainer>
            {ratings.map((rating) => (
              <FilterButton
                key={rating.label}
                isSelected={selectedRating === rating.label}
                onClick={() => handleRatingClick(rating)}
              >
                <Icon src={rating.icon} alt={rating.label} />
                {rating.label}
              </FilterButton>
            ))}
          </ButtonContainer>
        </FilterSection>
        <Divider />
        <FilterSection>
          <SectionTitle>가격대</SectionTitle>
          <ButtonContainer>
            {priceRanges.map((priceRange) => (
              <FilterButton
                key={priceRange.label}
                isSelected={selectedPrice === priceRange.label}
                onClick={() => handlePriceClick(priceRange)}
              >
                <Icon src={priceRange.icon} alt={priceRange.label} />
                {priceRange.label}
              </FilterButton>
            ))}
          </ButtonContainer>
        </FilterSection>
        <ButtonContainer>
          <SearchBtn text="검색" onClick={handleSearchClick} />
        </ButtonContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default HotelFilterPopup;

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

const FilterSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;    
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const FilterButton = styled.button`
  width: 170px;
  height: 43px;
  font-size: 16px;
  background-color: ${({ isSelected }) => (isSelected ? '#007bff' : '#f0f0f0')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#0056b3' : '#e0e0e0')};
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;
