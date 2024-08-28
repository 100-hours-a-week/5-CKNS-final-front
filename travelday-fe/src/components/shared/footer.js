import React, { useState } from 'react';

function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [email, setEmail] = useState(''); // 이메일 입력값을 관리하는 state

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const togglePrivacy = () => {
    setShowPrivacy(!showPrivacy);
  };

  const handleSubscribe = () => {
    // 구독 로직을 추가할 수 있는 부분
    console.log(`Subscribed with email: ${email}`);
    setEmail(''); // 구독 후 이메일 입력란을 초기화
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <h2 style={styles.title}>여행한 DAY</h2>
        <p style={styles.description}>함께 만드는 여행 이야기, 그 순간을 담아주세요.</p>

        <div style={styles.toggleContainer}>
          <button style={styles.toggleButton} onClick={toggleTerms}>이용약관</button>
          <button style={styles.toggleButton} onClick={togglePrivacy}>개인정보 처리방침</button>
        </div>

        {showTerms && <p style={styles.terms}>[이용약관]</p>}
        {showPrivacy && <p style={styles.privacy}>[개인정보 처리방침]</p>}

        <p style={styles.contact}>문의: support@yourdomain.com | 전화: 123-456-7890</p>

        <div style={styles.newsletter}>
          <p style={styles.newsletterText}>뉴스레터 구독하기</p>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 입력값을 state에 저장
            style={styles.emailInput}
          />
          <button style={styles.subscribeButton} onClick={handleSubscribe}>구독</button>
        </div>

        <p style={styles.address}>주소: 제주 제주시 도남로 168-12</p>
        <p style={styles.copyright}>© 2024 여행한 DAY. All rights reserved.</p>
      </div>
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
    padding: '20px',
    boxSizing: 'border-box',
    borderTop: '1px solid #e0e0e0',
    flexDirection: 'column',
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
    textAlign: 'left',
  },
  privacy: {
    fontSize: '12px',
    color: '#666',
    margin: '10px 0',
    textAlign: 'left',
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
  subscribeButton: {
    padding: '8px 15px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
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
};

export default Footer;
