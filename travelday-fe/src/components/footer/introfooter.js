import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부를 관리하는 state

  const navigate = useNavigate(); // navigate 함수 초기화

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const togglePrivacy = () => {
    setShowPrivacy(!showPrivacy);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail)); // 이메일 유효성 검사 결과 업데이트
  };

  const validateEmail = (email) => {
    // 간단한 이메일 유효성 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = () => {
    if (isEmailValid) {
      console.log(`Subscribed with email: ${email}`);
      setEmail(''); // 구독 후 이메일 입력란을 초기화
      setShowModal(true); // 모달을 표시
    }
  };

  const closeModal = () => {
    setShowModal(false); // 모달을 닫음
  };

  const navigateToPrivacy = () => {
    navigate('/privacy'); // /privacy 페이지로 이동
  };


  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <h2 style={styles.title}>여행한 DAY</h2>
        <p style={styles.description}>함께 만드는 여행 이야기, 그 순간을 담아주세요.</p>

        <div style={styles.toggleContainer}>
          <button style={styles.toggleButton} onClick={toggleTerms}>이용약관</button>
          <button style={styles.toggleButton} onClick={navigateToPrivacy}>개인정보 처리방침</button>
        </div>

        {showTerms && <p style={styles.terms}>[이용약관 추가 예정]</p>}

        <p style={styles.contact}>문의: support@travelday.com | 전화: 123-456-7890</p>

        <div style={styles.newsletter}>
          <p style={styles.newsletterText}>업데이트 소식 받아보기.</p>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={handleEmailChange}
            style={styles.emailInput}
          />

          <button
            style={{
              ...styles.subscribeButton,
              backgroundColor: isEmailValid ? '#007bff' : '#e0e0e0', // 유효성에 따라 색상 변경
              cursor: isEmailValid ? 'pointer' : 'not-allowed', // 유효성에 따라 커서 변경
            }}
            onClick={handleSubscribe}
            disabled={!isEmailValid} // 유효하지 않으면 버튼 비활성화
          >
            구독
          </button>
          {!isEmailValid && email && (
            <p style={styles.helperText}>support@travelday.com 이메일 형식을 지켜주세요!</p>
          )}
        </div>

        <p style={styles.address}>주소: 제주 제주시 도남로 168-12</p>
        <p style={styles.copyright}>© 2024 CKNS. All rights reserved.</p>
      </div>

      {/* 모달 컴포넌트 */}
      {showModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>🎉 감사합니다!</ModalHeader>
            <ModalBody>새로운 소식이 나오면 안내해 드리겠습니다 ✈️</ModalBody>
            <ModalButton onClick={closeModal}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </footer>
  );
}

const styles = {
  footer: {
    width: '500px', // 가로 크기 500px로 설정
    backgroundColor: '#fff',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    borderTop: '1px solid #e0e0e0',
    flexDirection: 'column',
    margin: '0 auto', // 가운데 정렬
  },
  container: {
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#555',
  },
  description: {
    fontSize: '14px',
    margin: '0 0 20px 0',
    lineHeight: '1.6',
    color: '#666',
  },
  toggleContainer: {
    marginBottom: '15px',
  },
  toggleButton: {
    margin: '0 5px',
    backgroundColor: '#e0e0e0',
    color: '#555',
    padding: '8px 15px',
    fontSize: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  terms: {
    fontSize: '12px',
    color: '#666',
    margin: '10px 0',
  },
  privacy: {
    fontSize: '12px',
    color: '#666',
    margin: '10px 0',
  },
  contact: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '20px',
  },
  newsletter: {
    marginBottom: '20px',
  },
  newsletterText: {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#555',
  },
  emailInput: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '70%',
    marginRight: '10px',
  },
  helperText: {
    fontSize: '12px',
    color: '#c8c8c8',
    marginTop: '5px',
  },
  subscribeButton: {
    padding: '8px 15px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    backgroundColor: '#e0e0e0',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  address: {
    fontSize: '12px',
    color: '#888',
    marginTop: '20px',
  },
  copyright: {
    fontSize: '12px',
    color: '#aaa',
    marginTop: '10px',
  },
  modalButton: {
    padding: '8px 15px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  width: 330px;
  position: relative;
  animation: slide-down 0.3s ease-out;
`;

const ModalHeader = styled.h3`
  margin-top: 0;
  font-size: 20px;
  color: #007bff;
  margin-bottom: 15px;
`;

const ModalBody = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0 0 20px 0;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Footer;
