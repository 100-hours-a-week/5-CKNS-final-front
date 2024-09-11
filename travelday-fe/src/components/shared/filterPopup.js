import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import backIcon from '../../images/header/back.png';
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

const FilterPopup = ({ isOpen, onClose }) => {
  const [selectedFlightType, setSelectedFlightType] = useState('모든노선');
  const [selectedAirline, setSelectedAirline] = useState('모든 항공사');

  const flightTypes = ['모든노선', '직항', '경유1회', '경유2회~'];
  const airlines = ['모든 항공사', '대한항공', '아시아나', '에어부산', '제주항공', '티웨이항공', '진에어', '에어프레미아']; // 예시 항공사 목록

  if (!isOpen) return null;

  const handleFlightTypeClick = (type) => {
    setSelectedFlightType(type);
  };

  const handleAirlineClick = (airline) => {
    setSelectedAirline(airline);
  };

  const handleSearchClick = () => {
    // console.log('검색 버튼 클릭');
    // console.log('선택된 노선:', selectedFlightType);
    // console.log('선택된 항공사:', selectedAirline);
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
          <SectionTitle>직항/경유</SectionTitle>
          <ButtonContainer>
            {flightTypes.map((type) => (
              <FilterButton
                key={type}
                isSelected={selectedFlightType === type}
                onClick={() => handleFlightTypeClick(type)}
              >
                {type}
              </FilterButton>
            ))}
          </ButtonContainer>
        </FilterSection>
        <Divider />
        <FilterSection>
          <SectionTitle>항공사</SectionTitle>
          <ScrollableList>
            {airlines.map((airline) => (
              <AirlineItem
                key={airline}
                isSelected={selectedAirline === airline}
                onClick={() => handleAirlineClick(airline)}
              >
                {airline}
              </AirlineItem>
            ))}
          </ScrollableList>
        </FilterSection>
        <ButtonContainer>
          <SearchBtn text="검색" onClick={handleSearchClick} />
        </ButtonContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default FilterPopup;

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
  margin-top:30px;
`;

const FilterButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  background-color: ${({ isSelected }) => (isSelected ? '#007bff' : '#f0f0f0')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#0056b3' : '#e0e0e0')};
  }
`;

const ScrollableList = styled.div`
  max-height: 150px; 
  overflow-y: auto; 
  padding-right: 10px; 
`;

const AirlineItem = styled.div`
  padding: 10px;
  font-size: 16px;
  background-color: ${({ isSelected }) => (isSelected ? '#007bff' : '#f0f0f0')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#333')};
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#0056b3' : '#e0e0e0')};
  }
`;
