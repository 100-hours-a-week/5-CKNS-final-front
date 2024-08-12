import React from 'react';
import styled from 'styled-components';

const Title = ({ mainTitle, subTitle }) => (
  <>
    <TitleContainer>
        <MainTitle   MainTitle>{mainTitle}</MainTitle>
        <SubTitle>{subTitle}</SubTitle>
    </TitleContainer>
  </>
);

export default Title;

const MainTitle = styled.h1`
  font-size: 15px;
  margin-bottom: 10px;
  background-color: #fff;
`;

const SubTitle = styled.p`
  font-size: 13px;
  color: #c2c2c2;
  margin-bottom: 20px;
  background-color: #fff;
  `;


const TitleContainer = styled.div`
  background-color: #fff;
  width: 390px;
  height: 100px;
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
