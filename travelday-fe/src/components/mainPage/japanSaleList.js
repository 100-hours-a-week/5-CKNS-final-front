import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Image7 from '../../images/main/list2/KIX.png';
import Image8 from '../../images/main/list2/OKA.png';
import Image9 from '../../images/main/list2/FUK.png';
import Image10 from '../../images/main/list2/NGO.png';

const JapanSaleList = () => {
  const navigate = useNavigate();
  const listContainerRef = React.useRef(null);

  const images = [
    { src: Image7, id: 'KIX' },
    { src: Image8, id: 'OKA' },
    { src: Image9, id: 'FUK' },
    { src: Image10, id: 'NGO' },
  ];

  const handleImageClick = (flightId) => {
    navigate(`/maindetail/${flightId}`);
  };

  const handleScroll = (direction) => {
    const container = listContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Wrapper>
      <ScrollButtonContainer>
        <ScrollButton onClick={() => handleScroll('left')}>&lt;</ScrollButton>
        <ScrollButton onClick={() => handleScroll('right')}>&gt;</ScrollButton>
      </ScrollButtonContainer>
      <ListContainer ref={listContainerRef}>
        {images.map((image, index) => (
          <ListItem key={index} onClick={() => handleImageClick(image.id)}>
            <Image src={image.src} alt={`sale-${image.id.toLowerCase()}`} />
          </ListItem>
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default JapanSaleList;

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-bottom: 10px;
  position: relative;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }


  -ms-overflow-style: none;  
  scrollbar-width: none;

  &:hover {
    & > div:first-child {
      opacity: 1;
    }
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }


  -ms-overflow-style: none; 
  scrollbar-width: none; 
`;
const ListItem = styled.div`
  width: 290px;
  height: 290px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ScrollButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  transform: translateY(-50%); /* Center buttons vertically */

  ${Wrapper}:hover & {
    opacity: 1; /* Show buttons on hover */
  }
`;

const ScrollButton = styled.div`
  pointer-events: all;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  margin: 0 10px;
  font-size: 18px;
`;
