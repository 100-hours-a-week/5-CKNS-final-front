import React, { useState } from 'react';

function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const togglePrivacy = () => {
    setShowPrivacy(!showPrivacy);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <h2 style={styles.title}>여행한 DAY</h2>
        <p style={styles.description}>여행을 동행인과 함께 상의하고 관리할 수 있습니다.</p>

        <div style={styles.toggleContainer}>
          <button style={styles.toggleButton} onClick={toggleTerms}>이용약관</button>
          <button style={styles.toggleButton} onClick={togglePrivacy}>개인정보 처리방침</button>
        </div>

        {showTerms && <p style={styles.terms}>[여행한 DAY 이용약관

목적 이 약관은 "여행한 DAY" 서비스(이하 "서비스")의 이용과 관련하여 이용자의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.

이용자의 의무 이용자는 서비스 이용 시 관련 법령을 준수하고, 타인의 권리를 침해하거나 불법적인 행위를 하지 않아야 합니다.

서비스 제공 서비스는 이용자에게 여행 계획 및 관리 기능을 제공합니다. 서비스는 무료로 제공되며, 회사는 서비스의 일시적 중단 및 종료에 대한 책임을 지지 않습니다.

개인정보 보호 이용자의 개인정보는 관련 법령에 따라 안전하게 보호되며, 개인정보 처리방침에 명시된 목적 외에 다른 용도로 사용되지 않습니다.

저작권 서비스 내에서 제공되는 모든 콘텐츠의 저작권은 회사 또는 정당한 권리자에게 있으며, 이용자는 이를 무단으로 복제, 배포할 수 없습니다.

책임의 한계 회사는 천재지변, 서버의 다운타임 등 불가피한 사유로 인한 서비스 이용의 중단에 대하여 책임을 지지 않습니다.

약관의 변경 회사는 필요에 따라 이 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 이용자에게 고지됩니다. 이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.

]</p>}
        {showPrivacy && <p style={styles.privacy}>[개인정보 처리방침]</p>}

        <p style={styles.address}>주소: 제주 제주시 도남로 168-12</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    width: '390px',
    height: '200px',
    backgroundColor: '#f8f8f8',
    boxSizing: 'border-box',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    margin: '0 0 10px 0',
  },
  description: {
    fontSize: '14px',
    margin: '0 0 20px 0',
  },
  toggleContainer: {
    marginBottom: '10px',
  },
  toggleButton: {
    margin: '0 5px',
    padding: '5px 10px',
    fontSize: '12px',
  },
  terms: {
    fontSize: '12px',
    color: '#555',
    margin: '10px 0',
  },
  privacy: {
    fontSize: '12px',
    color: '#555',
    margin: '10px 0',
  },
  address: {
    fontSize: '12px',
    color: '#777',
    marginTop: '20px',
  }
};

export default Footer;
