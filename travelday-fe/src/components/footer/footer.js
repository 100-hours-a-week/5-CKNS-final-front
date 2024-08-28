import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate(); // navigate 함수 초기화

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = () => {
    if (isEmailValid) {
      console.log(`Subscribed with email: ${email}`);
      setEmail('');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
              backgroundColor: isEmailValid ? '#007bff' : '#e0e0e0',
              cursor: isEmailValid ? 'pointer' : 'not-allowed',
            }}
            onClick={handleSubscribe}
            disabled={!isEmailValid}
          >
            구독
          </button>
          {!isEmailValid && email && (
            <p style={styles.helperText}>support@travelday.com 이메일 형식을 지켜주세요!</p>
          )}
        </div>

        <p style={styles.address}>주소: 제주 제주시 도남로 168-12</p>
        <p style={styles.copyright}>© 2024 여행한 DAY. All rights reserved.</p>
      </div>

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
    width: '100%',
    backgroundColor: '#fff',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    boxSizing: 'border-box',
    borderTop: '1px solid #e0e0e0',
    flexDirection: 'column',
  },
  container: {
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '5px 0',
    color: '#555',
  },
  description: {
    fontSize: '12px',
    margin: '0 0 10px 0',
    lineHeight: '1.4',
    color: '#666',
  },
  toggleContainer: {
    marginBottom: '10px',
  },
  toggleButton: {
    margin: '0 3px',
    backgroundColor: '#e0e0e0',
    color: '#555',
    padding: '6px 10px',
    fontSize: '10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  terms: {
    fontSize: '10px',
    color: '#666',
    margin: '5px 0',
  },
  privacy: {
    fontSize: '10px',
    color: '#666',
    margin: '5px 0',
  },
  contact: {
    fontSize: '10px',
    color: '#888',
    marginBottom: '10px',
  },
  newsletter: {
    marginBottom: '10px',
  },
  newsletterText: {
    fontSize: '12px',
    marginBottom: '5px',
    color: '#555',
  },
  emailInput: {
    padding: '5px',
    fontSize: '12px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    width: '65%',
    marginRight: '5px',
  },
  helperText: {
    fontSize: '10px',
    color: '#c8c8c8',
    marginTop: '3px',
  },
  subscribeButton: {
    padding: '6px 10px',
    fontSize: '12px',
    border: 'none',
    borderRadius: '3px',
    color: '#fff',
    backgroundColor: '#e0e0e0',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  address: {
    fontSize: '10px',
    color: '#888',
    marginTop: '10px',
  },
  copyright: {
    fontSize: '10px',
    color: '#aaa',
    marginTop: '5px',
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
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  width: 280px;
  position: relative;
  animation: slide-down 0.3s ease-out;
`;

const ModalHeader = styled.h3`
  margin-top: 0;
  font-size: 18px;
  color: #007bff;
  margin-bottom: 10px;
`;

const ModalBody = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0 0 15px 0;
`;

const ModalButton = styled.button`
  padding: 8px 15px;
  font-size: 12px;
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
