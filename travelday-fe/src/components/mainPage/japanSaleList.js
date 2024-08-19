import React from 'react';
import styled from 'styled-components';
import Image7 from '../../images/main/list2/7.png';
import Image8 from '../../images/main/list2/8.png';
import Image9 from '../../images/main/list2/9.png';
import Image10 from '../../images/main/list2/10.png';

const JapanSaleList = () => {
  const images = [Image7, Image8, Image9, Image10];

  return (
    <Wrapper>
      <ListContainer>
        {images.map((image, index) => (
          <ListItem key={index}>
            <Image src={image} alt={`sale-${index}`} />
          </ListItem>
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default JapanSaleList;

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* 가로 스크롤을 활성화 */
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch; /* 스크롤에 부드러운 효과를 주기 위한 속성 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Webkit 기반 브라우저에서 스크롤바 숨기기 */
  }
`;

const ListContainer = styled.div`
  display: flex;
  gap: 20px;
  width: max-content; /* 컨텐츠의 크기에 맞게 컨테이너 크기를 설정 */
`;

const ListItem = styled.div`
  width: 290px;
  height: 290px;
  flex-shrink: 0; /* 아이템 크기를 고정 */
  border-radius: 8px;
  overflow: hidden; /* 이미지를 아이템 경계에 맞게 잘라냄 */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 박스에 맞게 크기 조정 */
`;
