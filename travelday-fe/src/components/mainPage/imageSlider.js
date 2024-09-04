import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SliderImage from '../../images/main/slider/ppl1.png'; 
import SliderImage2 from '../../images/main/slider/ppl2.png'; 
import SliderImage3 from '../../images/main/slider/ppl3.png'; 
import SliderImage4 from '../../images/main/slider/ppl4.png'; 
import SliderImage5 from '../../images/main/slider/ppl5.png'; 

const images = [
  { src: SliderImage, alt: "slide-0", onClick: () => window.open('https://www.jeju-the-rentcar.com/detail?id=1026', '_blank') },
  { src: SliderImage2, alt: "slide-1", onClick: () => window.open('https://www.hanatour.com/promotion/plan/PM0000114126', '_blank') },
  { src: SliderImage3, alt: "slide-2", onClick: () => window.open('https://www.skyscanner.co.kr/news/summer-foodie-roadtrips', '_blank') },
  { src: SliderImage4, alt: "slide-3", onClick: () => window.open('https://www.jejuair.net/ko/event/eventDetail.do?eventNo=0000002180', '_blank') },
  { src: SliderImage5, alt: "slide-4", onClick: () => window.open('https://web.travelover.co.kr/insu/intro?utm_campaign=pckey&utm_source=google&utm_medium=ads&utm_term=%EC%97%AC%ED%96%89%EC%9E%90%EB%B3%B4%ED%97%98&gad_source=1&gclid=Cj0KCQjwlIG2BhC4ARIsADBgpVRVqlzAfUvGjKnBTugrESV3nILtThScC5pO7OPRax0_pe3ZwTD_oHkaAhkGEALw_wcB', '_blank') }
];

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 슬라이드 4초

    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Slider>
      <SliderContent activeIndex={activeIndex}>
        {images.map((image, index) => (
          <Slide key={index}>
            <Image src={image.src} alt={image.alt} onClick={image.onClick} />
          </Slide>
        ))}
      </SliderContent>
      <Indicators>
        {images.map((_, index) => (
          <Indicator
            key={index}
            isActive={index === activeIndex}
            onClick={() => handleIndicatorClick(index)} 
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
  cursor: pointer; 
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  align-items: center; /* 수직 중앙 정렬 */
`;

const Indicator = styled.div`
  width: ${({ isActive }) => (isActive ? '24px' : '10px')}; 
  height: ${({ isActive }) => (isActive ? '8px' : '4px')};
  background-color: ${({ isActive }) => (isActive ? 'rgba(90, 155, 255, 0.8)' : 'rgba(208, 228, 255, 0.5)')}; 
  border-radius: 10px; /* 둥근 모서리 설정 */
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  box-shadow: ${({ isActive }) => (isActive ? '0 0 8px rgba(90, 155, 255, 0.7)' : 'none')};
  transform: ${({ isActive }) => (isActive ? 'scale(1.2)' : 'scale(1)')};
  position: relative;
  opacity: ${({ isActive }) => (isActive ? '1' : '0.7')};

  &:after {
    content: '';
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 1px solid rgba(90, 155, 255, 0.8); 
    opacity: 0.6;
    animation: pulse 1.5s infinite; 
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.6;
    }
  }
`;
