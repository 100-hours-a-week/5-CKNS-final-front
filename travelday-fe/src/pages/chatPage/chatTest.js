import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import BottomNav from '../../components/shared/bottomNav.js'; 
import { useNavigate } from 'react-router-dom';
import { IoSearch, IoMenuOutline } from "react-icons/io5";
import Sidebar from '../../components/chatPage/sideBar.js';  

const linkify = (text) => {
  const urlPattern = /https?:\/\/[^\s]+/g;
  return text.split(urlPattern).map((part, index) => {
    const match = text.match(urlPattern);
    if (match && match[index]) {
      return (
        <React.Fragment key={index}>
          {part}
          <StyledLink href={match[index]} target="_blank" rel="noopener noreferrer">
            {match[index]}
          </StyledLink>
        </React.Fragment>
      );
    }
    return part;
  });
};

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: '나', content: '안녕하세요!', timestamp: new Date() },
    { sender: '다른 사용자', content: '안녕하세요! 반갑습니다.', timestamp: new Date() },
    { sender: '나', content: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요', timestamp: new Date() }, 
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const messageEndRef = useRef(null);
  const messageListRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      const newTimestamp = new Date();
      const updatedMessages = [...messages, { sender: '나', content: newMessage, timestamp: newTimestamp }];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const isSameSenderAndTime = (currentMessage, previousMessage) => {
    if (!previousMessage) return false;

    return (
      currentMessage.sender === previousMessage.sender &&
      formatTime(currentMessage.timestamp) === formatTime(previousMessage.timestamp)
    );
  };

  const isSameDay = (currentMessage, previousMessage) => {
    if (!previousMessage) return false;

    const currentDate = formatDate(currentMessage.timestamp);
    const previousDate = formatDate(previousMessage.timestamp);

    return currentDate === previousDate;
  };

  const handleBackButtonClick = () => { 
    navigate(-1); 
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;

    const index = messages.findIndex(message => 
      message.content.includes(searchTerm)
    );

    if (index !== -1 && messageListRef.current) {
      const messageElements = messageListRef.current.children;
      if (messageElements[index]) {
        messageElements[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleCancelSearch = () => {
    setIsSearchVisible(false);
    setSearchTerm('');
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Container>
      <ChatContainer>
        <Navbar>
          <BackButton onClick={handleBackButtonClick}>뒤로</BackButton>
          <RoomTitle>챗팅방 이름</RoomTitle>
          <IconsContainer>
            <IoSearch size={22} onClick={toggleSearch} />  
            <IoMenuOutline size={22} onClick={toggleSidebar} /> 
          </IconsContainer>
        </Navbar>

        {isSearchVisible && (
          <SearchContainer>
            <SearchInput 
              placeholder="메시지 검색하기" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
            <CancelButton onClick={handleCancelSearch}>취소</CancelButton>
          </SearchContainer>
        )}

        <MessageList ref={messageListRef}>
          {messages.map((message, index) => {
            const previousMessage = messages[index - 1];
            const nextMessage = messages[index + 1];
            const showSender = !isSameSenderAndTime(message, previousMessage);
            const showTimestamp = !isSameSenderAndTime(message, nextMessage);
            const showDate = !isSameDay(message, previousMessage) || index === 0;

            return (
              <React.Fragment key={index}>
                {showDate && (
                  <DateSeparator>{formatDate(message.timestamp)}</DateSeparator>
                )}
                <MessageItem isOwnMessage={message.sender === '나'}>
                  {showSender && (
                    <MessageSender>{message.sender}</MessageSender>
                  )}
                  <MessageWrapper isOwnMessage={message.sender === '나'}>
                    <MessageContent isOwnMessage={message.sender === '나'}>
                      {linkify(message.content)}
                    </MessageContent>
                    {showTimestamp && (
                      <MessageTimestamp isOwnMessage={message.sender === '나'}>
                        {formatTime(message.timestamp)}
                      </MessageTimestamp>
                    )}
                  </MessageWrapper>
                </MessageItem>
              </React.Fragment>
            );
          })}
          <div ref={messageEndRef} />
        </MessageList>

        <MessageInputContainer>
          <MessageInput 
            type="text" 
            placeholder="메시지를 입력하세요..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress} 
          />
          <SendButton onClick={handleSendMessage}>전송</SendButton>
        </MessageInputContainer>
      </ChatContainer>

      <Sidebar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

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
  margin: 0 auto;
  background-color: #fafafa;
  position: relative;
  overflow-y: auto;

   &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: calc(100vh - 130px);
  padding-bottom: 70px;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 100px 20px 10px 20px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledLink = styled.a`
  color: #fff;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const Navbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #007bff;
  color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 390px;
  z-index: 10;
`;

const RoomTitle = styled.h2`
  flex-grow: 1; 
  font-size: 15px;
  margin: 0;
  text-align: center; 
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 20px;

  svg {
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  svg:hover {
    color: #0056b3;
    transform: scale(1.1);
  }
`;

const BackButton = styled.button`
  padding: 6px 20px;
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

const MessageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isOwnMessage ? 'flex-end' : 'flex-start')};
  margin-bottom: 15px;
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: end;
  flex-direction: ${(props) => (props.isOwnMessage ? 'row-reverse' : 'row')};
  position: relative;
  width: 100%;
`;

const MessageSender = styled.div`
  margin-bottom: 5px;
  color: #333;
`;

const MessageContent = styled.div`
  position: relative;
  padding: 10px 16px;
  background-color: ${(props) => (props.isOwnMessage ? '#007bff' : '#e8f0fe')};
  color: ${(props) => (props.isOwnMessage ? '#fff' : '#333')};
  border-radius: 16px;
  max-width: 70%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: ${(props) => (props.isOwnMessage ? '8px 0 8px 12px' : '8px 12px 8px 0')};
    border-color: ${(props) =>
      props.isOwnMessage ? 'transparent transparent transparent #007bff' : 'transparent #e8f0fe transparent transparent'};
    display: block;
    width: 0;
    z-index: 1;
    bottom: 8px; 
    left: ${(props) => (props.isOwnMessage ? 'auto' : '-12px')};
    right: ${(props) => (props.isOwnMessage ? '-10px' : 'auto')};
    transform: translateY(0);
  }
`;

const MessageTimestamp = styled.span`
  font-size: 10px;
  color: #999;
  margin: ${(props) => (props.isOwnMessage ? '0 8px 0 0' : '0 0 0 8px')};
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
  border-radius: 50px;
  margin-right: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.3);
  }
`;

const SendButton = styled.button`
  padding: 12px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0069d9;
  }
`;

const DateSeparator = styled.div`
  text-align: center;
  font-size: 12px;
  color: #999;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px  0px ;
  background-color: #e8f0fe;
  position: fixed;
  top: 68px;
  width: 100%;
  max-width: 390px;
  z-index: 100;
`;

const SearchInput = styled.input`
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const CancelButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0069d9;
  }
`;
