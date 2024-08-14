import React from 'react';
import styled from 'styled-components';

const SearchButton = ({ text, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 310px;
  height: 45px;
  background-color: #fff;
  color: #000;
  border: 2px solid #c2c2c2;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #3d91ff; 
    color: #fff;
  }
`;

export default SearchButton;
