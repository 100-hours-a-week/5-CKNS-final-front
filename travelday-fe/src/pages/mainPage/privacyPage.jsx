import React from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';  
import BottomNav from '../../components/shared/bottomNav.js'; 
const PrivacyPage = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Title>개인정보 처리방침</Title>
        {sections.map((section, index) => (
          <Section key={index}>
            <SectionTitle>{section.title}</SectionTitle>
            <SectionContent>{section.content}</SectionContent>
          </Section>
        ))}
      </Content>
      <BottomNav />
    </Container>
  );
};

const sections = [
  {
    title: '제1조(목적)',
    content: `CKNS(이하 ‘회사’라 함)는 회사가 제공하고자 하는 서비스(이하 ‘회사 서비스’)를 이용하는 개인(이하 ‘이용자’ 또는 ‘개인’)의 정보(이하 ‘개인정보’)를 보호하기 위해, 개인정보보호법, 정보통신망의 이용촉진 및 정보보호 등에 관한 법률(이하 ‘정보통신법’) 등 관련 법령을 준수하며, 서비스 이용자의 개인정보 보호 관련한 조치를 신속하고 일관하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침(이하 ‘본 방침’)을 수립합니다.`,
  },
  {
    title: '제2조(개인정보 처리의 원칙)',
    content: `개인정보보호법 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 제공되는 경우 회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제3자에게 제공할 수도 있습니다.`,
  },
  {
    title: '제3조(본 방침의 공개)',
    content: `회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본 방침을 공개하고 있습니다. 회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.`,
  },
  {
    title: '제4조(본 방침의 변경)',
    content: `본 방침은 개인정보와 관련 법령, 지침, 고시 또는 정부나 회사 서비스의 정책이나 내용의 변경에 따라 개정될 수 있습니다. 회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나 이상의 방법으로 공지합니다.\n- 회사가 운영하는 인터넷 홈페이지의 첫 화면에 공지하거나 첫 화면과의 연결화면을 통해 공지하는 방법\n- 회사가 운영하는 전자우편 또는 문자메시지를 통하여 이용자에게 통지하는 방법\n회사는 제2항의 공지는 변경될 사항이 이용자에게 불리하게 적용되는 최소 7일 이전에 공지합니다. 다만, 이용자 권리의 중대한 변경이 있을 경우에는 최소 30일 전에 공지합니다.`,
  },
  {
    title: '제5조(개인정보 수집 방법)',
    content: `회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.\n\n- 이용자가 회사의 홈페이지에 자신의 개인정보를 입력하는 방식\n- 애플리케이션 등 회사가 제공하는 홈페이지와 회사의 서비스를 통하여 이용자가 자신의 개인정보를 입력하는 방식\n- 이용자가 고객센터와의 상담, 게시판에서의 활동 등 회사의 서비스를 이용하는 과정에서 이용자가 입력하는 방식`,
  },
  {
    title: '제6조(개인정보의 이용)',
    content: `회사는 개인정보를 다음 각 호의 경우에 이용합니다.\n\n- 공지사항에 관한 등 회사운영에 필요한 경우\n- 이용요원의 대화 진행, 본인확인 절차 등 이용자의 불만 처리와 서비스 개선을 위한 경우\n- 회사의 서비스에 포함된 활동의 경우\n- 법령의 규정 또는 이용자의 동의에 의한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장이 있는 행위에 대한 방지 및 제재를 위한 경우\n- 그 밖의 본 방침 등에서 정하는 경우`,
  },
  {
    title: '제7조(개인정보의 보유 및 이용기간)',
    content: `회사는 이용자의 개인정보에 대해 개인정보의 수집·이용 목적 달성을 위한 기간 동안 개인정보를 보유 및 이용합니다. 전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용기록을 부정 가입 및 이용 방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관합니다.`,
  },
  {
    title: '제8조(법령에 따른 개인정보의 보유 및 이용기간)',
    content: `회사는 관련법령에 따라 다음과 같이 개인정보를 보유 및 이용합니다.\n\n- 전자상거래 등에서의 소비자보호에 관한 법률에 따른 보유정보 및 보유기간\n  - 계약 또는 청약철회 등에 관한 기록: 5년\n  - 대금결제 및 재화 등의 공급에 관한 기록: 5년\n  - 소비자의 불만 또는 분쟁처리에 관한 기록: 3년\n  - 표시·광고에 관한 기록: 6개월\n- 통신비밀보호법에 따른 보유정보 및 보유기간\n  - 웹사이트 방문기록: 3개월\n- 전자금융거래법에 따른 보유정보 및 보유기간\n  - 전자금융에 관한 기록: 5년\n- 위치정보의 보호 및 이용 등에 관한 법률\n  - 개인위치정보에 관한 기록: 6개월`,
  },
  {
    title: '제9조(개인정보의 파기 원칙)',
    content: `회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성, 보유·이용기간의 경과 등 개인정보가 불필요하게 되는 경우에는 해당 정보를 지체 없이 파기합니다.`,
  },
  {
    title: '제10조(개인정보 파기절차)',
    content: `이용자가 회원가입 등을 위해 입력한 정보는 개인정보 처리 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다. 회사는 제1항에 따라 발생한 개인정보를 개인정보보호 책임자의 승인절차를 거쳐 파기합니다.`,
  },
  {
    title: '제11조(개인정보파기방법)',
    content: `회사는 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄하거나 소각 등을 통하여 파기합니다.`,
  },
  {
    title: '제12조(광고 정보의 전송 조치)',
    content: `회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 이용자의 명시적인 사전동의를 받습니다. 단, 다음 각호 어느 하나에 해당하는 경우에는 사전 동의를 받지 않습니다.\n- 회사가 제공한 동일한 매체를 통하여 수신자와의 거래관계에 의하여 전자적 전송매체를 수신자가 명시적으로 동의한 경우\n- 거래관계 이외에 회사가 수신자와의 거래관계가 지속될 경우 전자적 전송매체를 수신자가 명시적으로 동의한 경우\n회사는 전항에도 불구하고 수신자가 수신거부의사를 표시하거나 사전 동의를 철회한 경우에도 영리목적의 광고성 정보를 전송하지 않으며 수신자의 수신거부의사를 확인하기 위한 처리 절차를 밟습니다. 회사는 전항에도 불구하고 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 다음의 사항을 광고성 정보에 구체적으로 명시합니다.\n- 회사의 명칭 또는 대표자명\n- 수신 거부 관련 안내\n- 수신자가 해당 광고성 정보를 수신한 매체의 서비스에 관한 사항의 표시`,
  },
  {
    title: '제13조(개인정보 조회 및 수정 등의 절차)',
    content: `이용자는 법적 절차에 따라 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 개인정보의 동의 철회를 요청할 수 있습니다.\n이용자가 법적 절차에 따라 수정, 조회 등의 조치를 취하는 경우 회사는 관련 법령 및 내부 방침에 따라 신속하게 해당 개인정보를 수정·조치합니다.`,
  },
  {
    title: '제14조(개인정보 정보 변경 등)',
    content: `이용자는 회사에 제공한 방법을 통해 개인정보의 오류에 대한 정정을 요청할 수 있습니다. 회사는 이용자의 개인정보의 정정을 완료하지 않거나 개인정보를 이용 또는 제공하지 않는 경우 회사의 제3자에게 이를 제공하지 않으며, 제3자에게 개인정보를 제공하는 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하도록 하겠습니다.`,
  },
  {
    title: '제15조(이용자의 의무)',
    content: `이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용자의 부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다. 단말기 이용정보를 도용한 위법사항의 경우 이용자 자격을 상실하거나 관련 법령에 의해 처벌받을 수 있습니다. 이용자는 접수한 ID, 비밀번호 등을 제3자에게 이용하도록 하여서는 안 됩니다.`,
  },
  {
    title: '제16조(회사의 개인정보 관리)',
    content: `회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변경, 훼손 등이 되지 아니하도록 안전성을 확보하기 위하여 필요한 기술적·관리적 보호대책을 강구하고 있습니다.`,
  },
  {
    title: '제17조(삭제된 정보의 처리)',
    content: `회사는 이용자 혹은 법적 대리인의 요청에 의해 해제 또는 삭제된 개인정보를 회사가 수집하는 "개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.`,
  },
  {
    title: '제18조(비밀번호의 암호화)',
    content: `이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인, 변경, 비밀번호의 관리를 알고 있는 본인에 의해서만 가능합니다.`,
  },
  {
    title: '제19조(해킹 등에 대비한 대책)',
    content: `회사는 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 회사는 시스템프로그램을 이용하여 이용자의 개인정보가 제3자에 의해 손상되지 않도록 방지하고 있습니다. 회사는 만약 사업에 대하여 정보화시스템을 이용하여 본인이 취소한 이유에 의해 개인정보가 침해된 사실이 발생하는 경우, 개인정보 관리책임자에게 이를 보고하도록 하고 있습니다.`,
  },
  {
    title: '제20조(개인정보 처리 최소화 및 교육)',
    content: `회사는 개인정보 관련 처리 담당자를 최소한으로 제한하며, 개인정보 처리자에 대한 교육 등을 통해 법령 및 내부 방침 등의 준수를 강조하고 있습니다.`,
  },
  {
    title: '제21조(개인정보 유출 등에 대한 조치)',
    content: `회사는 개인정보보호법 및 동법·규정 등에 의거하여 "유출" 등의 사건이 발생하는 사실을 인지한 때에는 다음 각 호의 조치를 취할 것입니다.\n- 유출 등에 개인정보 침해사실 통지\n- 이용자가 취할 수 있는 조치\n- 정보통신서비스 제공자의 조치`,
  },
  {
    title: '제22조(개인정보 유출 등에 대한 조치의 예외)',
    content: `회사는 제21조의 불가항력으로 이용자의 연락처를 알 수 없는 등 정당한 사유가 있는 경우에는 회사의 홈페이지에 30일 이상 게시하는 방법으로 조치의 경과를 알립니다.`,
  },
  {
    title: '제23조(국외 이점 개인정보의 보호)',
    content: `회사는 이용자의 개인정보보호법에 관하여 개인정보보호법 등 관계 법규를 위반하는 사항을 내용으로 하는 국제적 계약을 체결하지 않습니다. 회사는 이용자의 개인정보를 국외 제공할 수 없으며, 다만, 보호조치 등 관계 법규를 준수함과 동시에 국내외 이용자의 보호조치를 위해 국제계약을 체결하지 않습니다.`,
  },
  {
    title: '제24조(개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)',
    content: `회사는 이용자의 개인정보를 자동화시스템을 설치·운영하기 위해 이용 정보를 저장하고 수시로 불러오는 개인정보 자동 수집장치(이하 "쿠키"라 함)를 사용할 수 있습니다. 그러나 회사는 운영환경에서 이용되는 서비스(단, 법령에서 요구하는 쿠키자동 수집장치를 포함) 정보를 저장함에 있어 개인정보에 이용하지 않습니다. 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 다만, 이용자는 쿠키의 설치를 거부할 경우 로그인이 필요한 회사의 일부 서비스 이용에 어려움이 있을 수 있습니다.\n\n**쿠키 설정 허용 지정 방법**\nEdge: 웹브라우저 우측 상단의 설정 메뉴 > 쿠키 및 사이트 데이터 관리 및 삭제\nChrome: 웹브라우저 우측 상단의 설정 메뉴 > 개인정보 보호 > 쿠키 및 기타 사이트 데이터\nWhale: 웹브라우저 우측 상단의 설정 메뉴 > 개인정보 보호 > 쿠키 및 기타 사이트 데이터`,
  },
  {
    title: '제25조(쿠키 설치 허용 지정 방법)',
    content: `웹브라우저의 옵션 설정을 통해 쿠키 허용, 쿠키 차단 등의 설정을 할 수 있습니다.\n\nEdge: 웹브라우저 우측 상단의 설정 메뉴 > 쿠키 및 사이트 데이터 관리 및 삭제\nChrome: 웹브라우저 우측 상단의 설정 메뉴 > 개인정보 보호 > 쿠키 및 기타 사이트 데이터\nWhale: 웹브라우저 우측 상단의 설정 메뉴 > 개인정보 보호 > 쿠키 및 기타 사이트 데이터`,
  },
  {
    title: '제26조(회사의 개인정보 보호 책임자의 지정)',
    content: `회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호 책임자를 지정하고 있습니다.\n\n**개인정보 보호 책임자**\n성명: 이본도\n직책: CEO\n전화번호: 010-7559-0396\n이메일: hkjtechjcks@gmail.com`,
  },
  {
    title: '제27조(권익침해에 대한 구제방법)',
    content: `정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보보호법령조정위원회, 한국인터넷진흥원의 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.\n- 개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)\n- 개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)\n- 대검찰청: (국번없이) 1301 (www.spo.go.kr)\n- 경찰청: (국번없이) 182 (ecrm.cyber.go.kr)\n\n정보주체는 개인정보보호법 제35조(개인정보의 열람, 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 행정소송법이 정한 절차에 따른 부처의 사전 권리 또는 의의의 허위를 구하는 행정심판청구를 할 수 있습니다.\n- 중앙행정심판위원회: (국번없이) 110 (www.simpan.go.kr)`,
  },
  {
    title: '부칙',
    content: `본 방침은 2024.08.26.부터 시행됩니다.`,
  },
];

export default PrivacyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: space-between;
  background-color: #fafafa; /* 밝은 배경색 */
`;

const Content = styled.div`
  padding: 20px;
  width: 350px;
  flex: 1;
  overflow-y: auto;
  background: #fff;
  margin-bottom: 80px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: #222; 
  text-align: center;
  margin: 30px 0;
  border-bottom: 2px solid #ddd; 
  padding-bottom: 10px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  background-color: #ffffff; /* 섹션 배경색 */
  padding: 15px 20px;
  border-radius: 8px; /* 모서리를 둥글게 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #007bff; /* 강조색 */
  margin-bottom: 10px;
  border-left: 4px solid #007bff; /* 강조색 왼쪽 선 */
  padding-left: 10px;
`;

const SectionContent = styled.p`
  font-size: 14px;
  line-height: 1.8;
  color: #555; /* 중간 명도의 텍스트 색상 */
  white-space: pre-line; /* 줄 바꿈을 유지 */
  margin: 0;
`;

const Highlight = styled.span`
  background-color: #ffefc2; /* 중요한 텍스트 강조를 위한 배경색 */
  padding: 0 4px;
  border-radius: 3px;
`;
