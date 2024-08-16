import React from 'react';
import styled from 'styled-components';
import homeIcon from '../../images/footer/home.png';
import airplaneIcon from '../../images/footer/airplane.png';
import scheduleIcon from '../../images/footer/schedule.png';
import mapIcon from '../../images/footer/map.png';

const BottomNav = () => {
  return (
    <NavContainer>
      <NavItem href="/">
        <NavIcon src={homeIcon} alt="메인" />
        <NavText>메인</NavText>
      </NavItem>
      <NavItem href="/search">
        <NavIcon src={airplaneIcon} alt="예약" />
        <NavText>예약</NavText>
      </NavItem>
      <NavItem href="#">
        <NavIcon src={scheduleIcon} alt="일정" />
        <NavText>일정</NavText>
      </NavItem>
      <NavItem href="#">
        <NavIcon src={mapIcon} alt="지도" />
        <NavText>지도</NavText>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNav;

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ddd;
  z-index: 1000;
`;

const NavItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #000;
`;

const NavIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-bottom: 5px;
`;

const NavText = styled.span`
  font-size: 12px;
`;

