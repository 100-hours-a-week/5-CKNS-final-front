import React from 'react';
import styled from 'styled-components';

const Toggle = ({ options, selectedOption, onOptionClick }) => (
  <ToggleContainer>
    {options.map((option) => (
      <ToggleOption
        key={option}
        selected={selectedOption === option}
        onClick={() => onOptionClick(option)}
      >
        {option}
      </ToggleOption>
    ))}
  </ToggleContainer>
);

export default Toggle;

const ToggleContainer = styled.div`
  display: flex;
  width: 350px;
  height: 60px;
  justify-content: left;
  position: relative;
  background-color: #fff;
  padding: 0px 20px 30px;
   border-bottom: 2px solid #c2c2c2;
`;

const ToggleOption = styled.button`
  font-size: 16px;
  padding: 0px 20px;
  margin: 0;
  border: none;
  background-color: transparent;
  color: ${(props) => (props.selected ? '#007BFF' : '#ccc')};
  cursor: pointer;
  position: relative;
  
  &:hover {
    color: ${(props) => (props.selected ? '#007BFF' : '#aaa')};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: #007BFF;
    transform: ${(props) => (props.selected ? 'scaleX(1)' : 'scaleX(0)')};
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;
