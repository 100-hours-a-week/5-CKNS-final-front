import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/shared/introfooterl.js';

const Intro = () => {
  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    navigate('/'); 
  };

  return (
    <PageContainer>
      <VideoContainer>
        <BackgroundVideo autoPlay loop muted>
          <source src={require('../../images/intro/intro.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </BackgroundVideo>
        <OverlayButton onClick={handleButtonClick}>
          여행한DAY 바로가기
        </OverlayButton>
      </VideoContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </PageContainer>
  );
};

export default Intro;

const PageContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BackgroundVideo = styled.video`
  width: 100%;
  height: auto;
  max-width: 500px;
`;

const OverlayButton = styled.button`
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: #fff;
  padding: 13px 25px;
  font-size: 20px;
  border-radius: 50px;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s ease;
  z-index: 1;
  border: none;

  &:hover {
    color: #333;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #fff;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  &:hover:after {
    transform: translateY(0);
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
