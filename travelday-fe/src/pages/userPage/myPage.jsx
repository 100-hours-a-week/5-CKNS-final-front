import React, { useState } from 'react';
import styled from 'styled-components';
import SimpleHeader from '../../components/shared/simpleHeader.js';
import BottomNav from '../../components/shared/bottomNav.js';

const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsButtonEnabled(e.target.value.trim() !== '');  // 입력란이 비어 있지 않으면 버튼 활성화
  };

  const handleSubmit = () => {
    // 닉네임 변경 로직
    console.log('닉네임이 변경되었습니다:', nickname);
    // 닉네임을 서버로 전송하거나 로컬 스토리지에 저장하는 등의 로직 추가
  };

  return (
    <PageContainer>
      <Container>
        <SimpleHeader title="닉네임 변경하기" showBackButton={true} />
        
        <Content>
          <InputLabel>닉네임</InputLabel>
          <Input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="collie"
          />
          <Button onClick={handleSubmit} disabled={!isButtonEnabled}>
            변경하기
          </Button>
        </Content>
        
        <BottomNav />
      </Container>
    </PageContainer>
  );
};

export default LoginPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

const Container = styled.div`
  width: 390px;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: bold;  // 닉네임 글씨를 두껍게
  margin-bottom: 10px;
  width:270px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  width: 250px;  // 입력란 너비 조정
  height: 25px;  // 입력란 높이 조정
  margin-bottom: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 15px;
  background-color: ${props => (props.disabled ? '#ccc' : '#007bff')}; // 비활성화 시 회색, 활성화 시 파란색
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};  // 비활성화 시 커서 변경

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#0056b3')}; // 비활성화 시 색상 유지, 활성화 시 어두운 파란색
  }
`;
