import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 import

const Intro = () => {
  const navigate = useNavigate();  // useNavigate 훅 사용

  const handleButtonClick = () => {
    navigate('/');  // / 경로로 이동
  };

  return (
    <VideoContainer>
      <BackgroundVideo autoPlay loop muted>
        <source src={require('../../images/intro/intro.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <OverlayButton onClick={handleButtonClick}>여행한DAY 바로가기</OverlayButton>
    </VideoContainer>
  );
};

export default Intro;

const VideoContainer = styled.div`
  width: 100%;
  height: auto; 
  overflow: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative; /* 버튼을 동영상 위에 배치하기 위해 상대 위치 설정 */
`;

const BackgroundVideo = styled.video`
  width: 500px;
  height: 1352px;
`;

const OverlayButton = styled.button`
  position: absolute; 
  top: 36%;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #333; 
  }
`;
