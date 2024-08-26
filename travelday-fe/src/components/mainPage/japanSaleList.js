import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Image7 from '../../images/main/list2/KIX.png';
import Image8 from '../../images/main/list2/OKA.png';
import Image9 from '../../images/main/list2/FUK.png';
import Image10 from '../../images/main/list2/NGO.png';

const JapanSaleList = () => {
  const navigate = useNavigate();
  const images = [
    { src: Image7, id: 'KIX' },  
    { src: Image8, id: 'OKA' },
    { src: Image9, id: 'FUK' },
    { src: Image10, id: 'NGO' }
  ];

  const handleImageClick = (flightId) => {
    navigate(`/maindetail/${flightId}`);
  };

  return (
    <Wrapper>
      <ListContainer>
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
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListContainer = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;
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
