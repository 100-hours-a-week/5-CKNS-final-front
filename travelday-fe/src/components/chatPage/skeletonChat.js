import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const SkeletonChat = () => {
  const [isOwnMessage, setIsOwnMessage] = useState(false);

  useEffect(() => {
    // 랜덤으로 왼쪽 또는 오른쪽 위치를 결정
    const randomSide = Math.random() < 0.5;
    setIsOwnMessage(randomSide);
  }, []);

  return (
    <>
      <SkeletonWrapper isOwnMessage={isOwnMessage}>
        <SkeletonBox isOwnMessage={isOwnMessage} width="80%" />
        <SkeletonBox isOwnMessage={isOwnMessage} width="60%" />
        <SkeletonBox isOwnMessage={isOwnMessage} width="90%" />
      </SkeletonWrapper>
    </>
  );
};

export default SkeletonChat;

const strongerShimmer = keyframes`
  0% {
    background-position: -300px 0;
  }
  50% {
    background-position: 300px 0;
  }
  100% {
    background-position: 600px 0;
  }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: ${(props) => (props.isOwnMessage ? 'flex-end' : 'flex-start')};
  margin-bottom: 15px;
  width: 100%;
`;

const SkeletonBox = styled.div`
  width: ${(props) => props.width || '70%'};
  height: 20px;
  background: ${(props) =>
    props.isOwnMessage
      ? 'linear-gradient(90deg, #007bff 25%, #ffffff 50%, #007bff 75%)'
      : 'linear-gradient(90deg, #e8f0fe 25%, #ffffff 50%, #e8f0fe 75%)'};
  background-size: 600% 100%;
  animation: ${strongerShimmer} 1s ease-in-out infinite;
  border-radius: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 16px;
  margin-bottom: 10px;
  position: relative;
`;
