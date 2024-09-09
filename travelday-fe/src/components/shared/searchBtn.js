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
  border: 2px solid #f12e5e;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #f12e5e; 
    color: #fff;
    border: 2px solid #f12e5e;
  }
`;

export default SearchButton;
