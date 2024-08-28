import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js'; // Import the Header component
import BottomNav from '../../components/shared/bottomNav.js'; // Import the BottomNav component

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
      <Header /> {/* Include the Header component at the top */}

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
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

const Navbar = styled.header`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #f8f9fa;
`;

const BackButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const RoomTitle = styled.h2`
  margin-left: 20px;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f1f1f1;
`;

const MessageItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const MessageSender = styled.span`
  font-weight: bold;
  color: #007bff;
`;

const MessageContent = styled.div`
  padding: 8px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  max-width: 75%;
  align-self: ${props => (props.isOwnMessage ? 'flex-end' : 'flex-start')};
`;

const MessageInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #f8f9fa;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;
