import React, { useState } from 'react';
import styled from 'styled-components';
import BottomNav from '../../components/shared/bottomNav.js'; 
import Header from '../../components/shared/header.js'; 
import { useNavigate } from 'react-router-dom';

const ChatListPage = () => {
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: '챗팅방 1', lastMessage: '마지막 메시지입니다#1', timestamp: new Date() },
    { id: 2, name: '챗팅방 2', lastMessage: '마지막 메시지입니다#2', timestamp: new Date() },
    { id: 3, name: '챗팅방 3', lastMessage: '마지막 메세지입니다#3', timestamp: new Date() },
  ]);
  
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  const handleChatRoomClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;
  };

  const filteredChatRooms = chatRooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header />
      <ChatListContainer>
        <Navbar>
          <PageTitle>채팅</PageTitle>
        </Navbar>
        
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="검색" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </SearchContainer>

        <ChatList>
          {filteredChatRooms.map((room) => (
            <ChatRoomItem key={room.id} onClick={() => handleChatRoomClick(room.id)}>
              <RoomName>{room.name}</RoomName>
              <LastMessage>{room.lastMessage}</LastMessage>
              <Timestamp>{formatTime(new Date(room.timestamp))}</Timestamp>
            </ChatRoomItem>
          ))}
        </ChatList>
      </ChatListContainer>

      <BottomNav />
    </Container>
  );
};

export default ChatListPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #fafafa; 
  position: relative;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 390px;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  background-color: #fff;
  color: #000;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
  margin-top: 50px;
`;


const SearchContainer = styled.div`
  padding: 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #d0e2ff;
`;

const SearchInput = styled.input`
  width: 332px;
  padding: 12px;
  border: 2px solid #d0e2ff; 
  border-radius: 25px; 
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 10px rgba(74, 144, 226, 0.5); 
  }
`;

const ChatList = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 15px; 
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatRoomItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  margin-bottom: 10px; 
  border-radius: 12px; 
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #eaf6ff; 
    color: #4a90e2; 
    transform: translateY(-3px); 
  }
`;


const RoomName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const LastMessage = styled.span`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #999;
  margin-top: 3px;
  align-self: flex-end;
`;
