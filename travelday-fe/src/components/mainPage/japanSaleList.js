import React from 'react';
import styled from 'styled-components';

const JapanSaleList = () => {
  return (
    <Wrapper>
      <ListContainer>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
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
  background-color: #ccc; /* 회색 박스 */
  border-radius: 8px;
  flex-shrink: 0; /* 아이템 크기를 고정 */
`;
