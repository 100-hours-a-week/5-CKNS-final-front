import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SliderImage from '../../images/main/slider/ppl1.png'; 
import SliderImage2 from '../../images/main/slider/ppl2.png'; 
import SliderImage3 from '../../images/main/slider/ppl3.png'; 
import SliderImage4 from '../../images/main/slider/ppl4.png'; 
import SliderImage5 from '../../images/main/slider/ppl5.png'; 

const images = [
  { src: SliderImage, alt: "slide-0", onClick: () => window.location.href = 'https://www.jeju-the-rentcar.com/detail?id=1026' },
  { src: SliderImage2, alt: "slide-1", onClick: () => window.location.href = 'https://www.hanatour.com/promotion/plan/PM0000114126' },
  { src: SliderImage3, alt: "slide-2", onClick: () => window.location.href = 'https://www.skyscanner.co.kr/news/summer-foodie-roadtrips' },
  { src: SliderImage4, alt: "slide-3", onClick: () => window.location.href = 'https://www.jejuair.net/ko/event/eventDetail.do?eventNo=0000002180' },
  { src: SliderImage5, alt: "slide-4", onClick: () => window.location.href = 'https://web.travelover.co.kr/insu/intro?utm_campaign=pckey&utm_source=google&utm_medium=ads&utm_term=%EC%97%AC%ED%96%89%EC%9E%90%EB%B3%B4%ED%97%98&gad_source=1&gclid=Cj0KCQjwlIG2BhC4ARIsADBgpVRVqlzAfUvGjKnBTugrESV3nILtThScC5pO7OPRax0_pe3ZwTD_oHkaAhkGEALw_wcB' }
];

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 슬라이드 4초

    return () => clearInterval(interval);
  }, []);

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
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ isActive }) => (isActive ? '#333' : '#ccc')};
  border-radius: 50%;
`;
