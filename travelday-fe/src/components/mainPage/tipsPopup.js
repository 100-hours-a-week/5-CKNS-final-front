import React from 'react';
import styled, { keyframes } from 'styled-components';
import closeIcon from '../../images/header/back.png';// 팝업을 닫는 버튼 이미지

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const TipsPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Popup>
        <PopupHeader>
          <Title>항공권 저렴하게 구매하는 팁</Title>
          <CloseButton onClick={onClose}>
            <img src={closeIcon} alt="닫기" />
          </CloseButton>
        </PopupHeader>
        <Content>
          <Tip>
            <strong>1. 'Hidden City' 티켓 예약</strong>
            <p>경유지에서 내리고 목적지까지 가지 않는 전략으로, 짐을 부치지 않고 항공사의 정책을 잘 확인해야 합니다.</p>
          </Tip>
          <Tip>
            <strong>2. 적립 포인트와 제휴 카드 활용</strong>
            <p>항공사와 제휴한 신용카드를 통해 포인트를 적립하고 무료 항공권이나 업그레이드에 사용하세요.</p>
          </Tip>
          <Tip>
            <strong>3. 지역 공항 이용</strong>
            <p>작은 공항을 이용하면 경쟁이 덜하여 저렴한 가격을 찾을 수 있습니다.</p>
          </Tip>
          <Tip>
            <strong>4. 가격 변동 알림 설정</strong>
            <p>가격 추적기를 사용해 항공권 가격이 하락할 때 알림을 받으세요.</p>
          </Tip>
          <Tip>
            <strong>5. 구매 시점 최적화</strong>
            <p>출발 6-8주 전에 항공권을 구매하는 것이 가장 저렴할 수 있으며, 화요일 이른 새벽에 구매하는 것도 좋은 방법입니다.</p>
          </Tip>
          <Tip>
            <strong>6. 정기 항공권 구매</strong>
            <p>자주 특정 구간을 여행한다면 월정액으로 특정 구간을 무제한 이용할 수 있는 패스를 고려해보세요.</p>
          </Tip>
          <Tip>
            <strong>7. 환승을 이용한 할인</strong>
            <p>직항보다 환승 항공편이 더 저렴할 수 있으며, 환승 시간을 활용해 추가적인 여행 경험을 할 수 있습니다.</p>
          </Tip>
          <Tip>
            <strong>8. 결제 통화 변경</strong>
            <p>현지 통화 대신 다른 통화로 결제하면 수수료나 환율 차이로 인해 더 저렴할 수 있습니다.</p>
          </Tip>
          <Tip>
            <strong>9. 가상 전용 네트워크(VPN) 사용</strong>
            <p>VPN을 사용해 다른 국가에서 항공권을 구매하는 것처럼 보이게 하여 가격을 비교해보세요.</p>
          </Tip>
          <Tip>
            <strong>10. 날짜와 시간 유연하게 설정</strong>
            <p>날짜를 유연하게 설정하면 더 저렴한 항공권을 찾을 수 있으며, 주중 비행이 주말보다 저렴한 경우가 많습니다.</p>
          </Tip>
        </Content>
      </Popup>
    </Overlay>
  );
};

export default TipsPopup;

// styled-components
const Overlay = styled.div`
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

const Popup = styled.div`
  width: 400px;
  max-height: 80%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: ${slideDown} 0.3s ease-out;
  overflow-y: auto;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
`;

const Content = styled.div`
  padding: 15px;
`;

const Tip = styled.div`
  margin-bottom: 15px;
  strong {
    display: block;
    font-size: 16px;
    color: #333;
  }
  p {
    font-size: 14px;
    color: #666;
    margin: 5px 0 0;
  }
`;
