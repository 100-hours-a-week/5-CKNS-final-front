import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../images/header/back.png'; 

const SimpleHeader = ({ title, showBackButton = true }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // 뒤로가기 버튼 클릭 시 /main으로 이동
  };

  return (
    <HeaderContainer>
      <BackButton src={backIcon} alt="뒤로가기" show={showBackButton} onClick={handleBackClick} />
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default SimpleHeader;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center; /* 타이틀을 가운데 정렬 */
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    width: 350px; 
    height: 48px;
    position: relative; /* 타이틀을 절대 위치로 설정할 수 있게 만듭니다 */
`;

const BackButton = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 20px; /* 왼쪽에 고정 */
  cursor: pointer;
  display: ${(props) => (props.show ? 'inline' : 'none')};
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 수평으로 가운데 정렬 */
`;
