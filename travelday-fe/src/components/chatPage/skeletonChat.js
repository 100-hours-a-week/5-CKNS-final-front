import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SkeletonChat = () => {
  const [isOwnMessage, setIsOwnMessage] = useState(false);

  useEffect(() => {
    // 랜덤으로 왼쪽 또는 오른쪽 위치를 결정
    const randomSide = Math.random() < 0.5;
    setIsOwnMessage(randomSide);
  }, []);

  return (
    <SkeletonWrapper isOwnMessage={isOwnMessage}>
      <SkeletonBox isOwnMessage={isOwnMessage} width="80%" />
      <SkeletonBox isOwnMessage={isOwnMessage} width="60%" />
      <SkeletonBox isOwnMessage={isOwnMessage} width="90%" />
    </SkeletonWrapper>
  );
};

export default SkeletonChat;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  align-items: ${(props) => (props.isOwnMessage ? 'flex-end' : 'flex-start')};
  margin-bottom: 15px;
  width: 100%;
`;

const SkeletonBox = styled.div`
  width: ${(props) => props.width || '70%'};
  height: 20px;
  background-color: ${(props) => (props.isOwnMessage ? '#007bff' : '#e8f0fe')};
  color: #fff;
  border-radius: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  word-break: break-word;
  padding: 10px 16px;
  margin-bottom: 10px; /* 줄 간격을 주기 위해 추가 */
  position: relative;
`;
