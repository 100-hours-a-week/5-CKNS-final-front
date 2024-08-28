import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js'; 
import BottomNav from '../../components/shared/bottomNav.js'; 

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: '나', content: '안녕하세요!' },
    { sender: '다른 사용자', content: '안녕하세요! 반갑습니다.' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      const updatedMessages = [...messages, { sender: '나', content: newMessage }];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <Container>
      <Header /> 

      <ChatContainer>
        <Navbar>
          <BackButton>뒤로</BackButton>
          <RoomTitle>챗팅방 이름</RoomTitle>
        </Navbar>

        <MessageList>
          {messages.map((message, index) => (
            <MessageItem key={index}>
              <MessageSender>{message.sender}</MessageSender>
              <MessageContent isOwnMessage={message.sender === '나'}>
                {message.content}
              </MessageContent>
            </MessageItem>
          ))}
        </MessageList>

        <MessageInputContainer>
          <MessageInput 
            type="text" 
            placeholder="메시지를 입력하세요..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <SendButton onClick={handleSendMessage}>전송</SendButton>
        </MessageInputContainer>
      </ChatContainer>

      <BottomNav /> 
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #fafafa; /* 부드러운 밝은 색상 배경 */
  position: relative;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: 100%;
  padding-bottom: 70px;
`;

const Navbar = styled.header`
  display: flex;
  align-items: center;
  padding: 12px 18px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #2d87f0;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const BackButton = styled.button`
  padding: 6px 12px;
  background-color: transparent;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const RoomTitle = styled.h2`
  margin-left: 24px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
`;

const MessageItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const MessageSender = styled.span`
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
`;

const MessageContent = styled.div`
position: relative;
padding: 10px 16px;
background-color: ${(props) => (props.isOwnMessage ? '#2d87f0' : '#e8f0fe')};
color: ${(props) => (props.isOwnMessage ? '#fff' : '#333')};
border-radius: 16px;
max-width: 75%;
align-self: ${(props) => (props.isOwnMessage ? 'flex-end' : 'flex-start')};
margin: 8px 0;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
transition: background-color 0.3s ease;

&:after {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: ${(props) => (props.isOwnMessage ? '8px 0 8px 12px' : '8px 12px 8px 0')};
  border-color: ${(props) =>
    props.isOwnMessage ? 'transparent transparent transparent #2d87f0' : 'transparent #e8f0fe transparent transparent'};
  display: block;
  width: 0;
  z-index: 1;
  margin-top: -8px;
  left: ${(props) => (props.isOwnMessage ? 'auto' : '-12px')};
  right: ${(props) => (props.isOwnMessage ? '-12px' : 'auto')};
  top: 50%; /* 다시 가운데로 위치시킵니다 */
  transform: translateY(-50%) translateY(8px); /* 삼각형을 아래로 조금 내립니다 */
}
`;



const MessageInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 370px;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #2d87f0;
    box-shadow: 0 0 3px rgba(45, 135, 240, 0.3);
  }
`;

const SendButton = styled.button`
  padding: 12px 15px;
  background-color: #2d87f0;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1a6bc9;
  }
`;
