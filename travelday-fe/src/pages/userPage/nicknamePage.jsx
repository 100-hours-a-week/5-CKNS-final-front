import React, { useState } from 'react';
import styled from 'styled-components';
import SimpleHeader from '../../components/shared/simpleHeader.js';
import BottomNav from '../../components/shared/bottomNav.js';
import axios from 'axios';

const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [nicknameError, setNicknameError] = useState('');

  const handleNicknameChange = async (e) => {
    const newNickname = e.target.value.trim();
    setNickname(newNickname);

    if (newNickname) {
      try {
        const response = await axios.get(`http://api.thetravelday.co.kr/api/nickname/check?nickname=${newNickname}`);
        if (response.data.exists) {
          setNicknameError('이미 사용 중인 닉네임입니다.');
          setIsButtonEnabled(false);
        } else {
          setNicknameError('');
          setIsButtonEnabled(true);
        }
      } catch (error) {
        console.error('닉네임 중복 검사 실패:', error);
        setNicknameError('서버와의 통신 중 오류가 발생했습니다.');
        setIsButtonEnabled(false);
      }
    } else {
      setIsButtonEnabled(false);
      setNicknameError('');
    }
  };

  const handleSubmit = () => {
    console.log('닉네임이 변경되었습니다:', nickname);
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
          <ErrorText>{nicknameError || '\u00A0'}</ErrorText> {/* 비어 있을 때는 공백을 사용 */}
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
  font-weight: bold;
  margin-bottom: 10px;
  width: 270px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  width: 250px;
  height: 25px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    border-color: #007bff; 
    border-width: 2px; 
    outline: none; 
  }
`;


const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  height: 20px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  width: 272px;
  font-size: 15px;
  background-color: ${props => (props.disabled ? '#ccc' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;
