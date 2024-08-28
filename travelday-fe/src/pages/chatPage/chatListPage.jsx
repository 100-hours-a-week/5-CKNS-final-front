import React from 'react';
import styled from 'styled-components';


const ChatRoomListPage = () => {
  return (
    <Container>
      {/* 네비게이션 */}
      <Navbar>
        <Logo>사이트 로고</Logo>
        <SearchBar placeholder="챗팅방 검색..." />
        <LogoutButton>로그아웃</LogoutButton>
      </Navbar>

      {/* 챗팅방 목록 */}
      <ChatRoomList>
        <ChatRoomItem>
          <h3>챗팅방 이름</h3>
          <p>참여 인원: 3명</p>
          <span>마지막 메시지: 1분 전</span>
        </ChatRoomItem>
        <ChatRoomItem>
          <h3>다른 챗팅방 이름</h3>
          <p>참여 인원: 5명</p>
          <span>마지막 메시지: 5분 전</span>
        </ChatRoomItem>
      </ChatRoomList>
    </Container>
  );
};

export default ChatRoomListPage;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const SearchBar = styled.input`
  padding: 5px 10px;
  width: 200px;
`;

const LogoutButton = styled.button`
  padding: 5px 10px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff4a4a;
  }
`;

const ChatRoomList = styled.main`
  margin-top: 20px;
`;

const ChatRoomItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;