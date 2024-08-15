import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const colors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 4000); // 슬라이드 4초

    return () => clearInterval(interval);
  }, []);

  return (
    <Slider>
      <SliderContent activeIndex={activeIndex}>
        {colors.map((color, index) => (
          <Slide key={index} style={{ backgroundColor: color }}>
            <ColorBox>{color}</ColorBox>
          </Slide>
        ))}
      </SliderContent>
      <Indicators>
        {colors.map((_, index) => (
          <Indicator
            key={index}
            isActive={index === activeIndex}
          />
        ))}
      </Indicators>
    </Slider>
  );
};

export default ImageSlider;

const slideAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const Slider = styled.div`
  width: 390px;
  height: 270px;
  overflow: hidden;
  position: relative;
`;

const SliderContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(${({ activeIndex }) => `-${activeIndex * 100}%`});
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  width: 390px;
  height: 270px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ isActive }) => (isActive ? '#333' : '#ccc')};
  border-radius: 50%;
`;
