import React from 'react';
import styled from 'styled-components';
import backIcon from '../../images/header/back.png'; 

const SimpleHeader = ({ title, showBackButton = true }) => {
  return (
    <HeaderContainer>
      <BackButton src={backIcon} alt="뒤로가기" show={showBackButton} />
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default SimpleHeader;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;  /* 타이틀을 가운데 정렬 */
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    width: 350px; /* 화면 전체 너비 */
    height: 48px;
    position: relative;  /* 자식 요소의 절대 위치를 위해 필요 */
`;

const BackButton = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;  /* 버튼을 왼쪽에 고정 */
  left: 20px;
  cursor: pointer;
  display: ${(props) => (props.show ? 'inline' : 'none')};
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-align: center;  /* 텍스트 중앙 정렬 */
  flex-grow: 1;
`;
