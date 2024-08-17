import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SliderImage from '../../images/main/slider/ppl1.png'; // 첫 번째 슬라이드에 사용할 이미지

const colors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF']; // 나머지 슬라이드의 색상 배열

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (colors.length + 1));
    }, 4000); // 슬라이드 4초

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = () => {
    window.location.href = 'https://www.jeju-the-rentcar.com/detail?id=1026'; // URL로 이동
  };

  return (
    <Slider>
      <SliderContent activeIndex={activeIndex}>
        <Slide>
          <Image src={SliderImage} alt="slide-0" onClick={handleImageClick} /> {/* 첫 번째 슬라이드에 이미지 클릭 핸들러 추가 */}
        </Slide>
        {colors.map((color, index) => (
          <Slide key={index + 1} style={{ backgroundColor: color }}>
            <ColorBox>{color}</ColorBox>
          </Slide>
        ))}
      </SliderContent>
      <Indicators>
        <Indicator isActive={activeIndex === 0} />
        {colors.map((_, index) => (
          <Indicator
            key={index + 1}
            isActive={index + 1 === activeIndex}
          />
        ))}
      </Indicators>
    </Slider>
  );
};

export default ImageSlider;

const Slider = styled.div`
  width: 390px;
  height: 320px;
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
  height: 320px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer; /* 클릭 가능한 커서 모양으로 변경 */
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
