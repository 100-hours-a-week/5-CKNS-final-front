import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomNav from '../../components/shared/bottomNav.js'; 
import Header from '../../components/shared/header.js'; 
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const ChatListPage = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchChatRooms(); // 컴포넌트가 렌더링될 때 채팅방을 불러옴
  }, []);

  const fetchChatRooms = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.get('/api/rooms', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const formattedChatRooms = response.data.data.map((room) => ({
          id: room.id,
          name: room.name,
          participants: room.memberCount,
          lastMessage: '', // 마지막 메시지는 일단 빈 값으로 설정
          timestamp: new Date(), // 타임스탬프는 현재 시간으로 임시 설정
        }));
        setChatRooms(formattedChatRooms); // 채팅방 상태 업데이트
      } else {
        console.error('채팅방 로딩 실패:', response.statusText);
      }
    } catch (error) {
      console.error('채팅방 불러오기 중 오류 발생:', error);
    }
  };

  const handleChatRoomClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? '오후' : '오전';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;
    } else if (diffInDays === 1) {
      return '어제';
    } else {
      return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
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
          {filteredChatRooms.length > 0 ? (
            filteredChatRooms.map((room) => (
              <ChatRoomItem key={room.id} onClick={() => handleChatRoomClick(room.id)}>
                <RoomHeader>
                  <RoomName>{room.name}</RoomName>
                  <Participants>{room.participants}</Participants>
                </RoomHeader>
                <MessageContainer>
                  <LastMessage>{room.lastMessage}</LastMessage>
                  <Timestamp>{formatTime(new Date(room.timestamp))}</Timestamp>
                </MessageContainer>
              </ChatRoomItem>
            ))
          ) : (
            <NoChatRooms>채팅방이 없습니다.</NoChatRooms>
          )}
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
  width: 312px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px; 
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatRoomItem = styled.div`
  display: flex;
  width: 316px;
  flex-direction: column;
  padding: 18px 10px;
  margin-bottom: 10px; 
  border-radius: 8px; 
  background-color: #ffffff;
  border: 2px solid #f2f2f2;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #dff1ff; 
    border: 2px solid #89c5ff;
    color: #4a90e2; 
    transform: scale(1.05);  
  }
`;

const RoomHeader = styled.div`
  display: flex;
  align-items: center;
`;

const RoomName = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

const Participants = styled.span`
  font-size: 14px;
  margin-left: 10px;
  color: #999;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const LastMessage = styled.span`
  font-size: 14px;
  color: #666;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #999;
  align-self: flex-end;
`;

const NoChatRooms = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #999;
  font-size: 16px;
`;
