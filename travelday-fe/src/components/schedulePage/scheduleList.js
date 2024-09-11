import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TrashIcon from '../../images/trash.png';
import axiosInstance from "../../utils/axiosInstance";

const ScheduleList = ({ schedules, onItemClick, onDeleteClick }) => {
  const [sortedSchedules, setSortedSchedules] = useState([]);
  const [sortOrder, setSortOrder] = useState('nearest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  useEffect(() => {
    const today = new Date();

    const upcomingSchedules = [];
    const pastSchedules = [];

    schedules.forEach((schedule) => {
      // 끝나는 날을 기준으로 분류
      const endDate = new Date(schedule.date.split(' ~ ')[1]);
      
      // 현재 날짜에서 하루 전 날짜를 계산
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // 끝나는 날이 어제이거나 어제 이전일 경우 pastSchedules에 추가
      if (endDate <= yesterday) {
        pastSchedules.push(schedule);
      } else {
        upcomingSchedules.push(schedule);
      }
    });

    const sortedUpcoming = upcomingSchedules.sort((a, b) => {
      const dateA = new Date(a.date.split(' ~ ')[0]);
      const dateB = new Date(b.date.split(' ~ ')[0]);

      return sortOrder === 'nearest' ? dateA - dateB : dateB - dateA;
    });

    setSortedSchedules([...sortedUpcoming, { type: 'pastLabel' }, ...pastSchedules]);
  }, [schedules, sortOrder]);

  const handleDeleteClick = (id) => {
    setSelectedScheduleId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedScheduleId) {
      console.error("selectedScheduleId가 설정되지 않았습니다.");
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error("액세스 토큰을 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await axiosInstance.delete(`/api/rooms/${selectedScheduleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setSortedSchedules(prevSchedules =>
          prevSchedules.filter(schedule => schedule.id !== selectedScheduleId)
        );
        window.alert('삭제되었습니다!');
        setIsModalOpen(false);
      } else {
        console.error('Failed to delete schedule:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
      window.alert('스케줄 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <SortButtons>
        <Button
          selected={sortOrder === 'nearest'}
          onClick={() => setSortOrder('nearest')}
        >
          가까운 날짜순
        </Button>
        <Button
          selected={sortOrder === 'farthest'}
          onClick={() => setSortOrder('farthest')}
        >
          먼 날짜순
        </Button>
      </SortButtons>
      <ListContainer>
        {sortedSchedules.map((schedule, index) => {
          if (schedule.type === 'pastLabel') {
            return <PastLabel key={index}>지나간 여행</PastLabel>;
          }

          const endDate = new Date(schedule.date.split(' ~ ')[1]);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          const isPast = endDate <= yesterday;

          return (
            <ScheduleItem
              key={schedule.id}
              isPast={isPast}
            >
              <ScheduleContent onClick={() => onItemClick(schedule.id)}>
                <ScheduleTitle isPast={isPast}>{schedule.title}</ScheduleTitle>
                <ScheduleDate isPast={isPast}>{schedule.date}</ScheduleDate>
              </ScheduleContent>
              <TrashIconWrapper onClick={() => handleDeleteClick(schedule.id)}>
                <img src={TrashIcon} alt="Delete" />
              </TrashIconWrapper>
            </ScheduleItem>
          );
        })}
      </ListContainer>

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalMessage>정말 일정을 삭제하시겠습니까?</ModalMessage>
            <ModalButtons>
              <ModalButton onClick={confirmDelete}>예</ModalButton>
              <ModalButton onClick={closeModal}>아니오</ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ScheduleList;

const Container = styled.div`
  width: 100%;
  max-width: 340px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SortButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border: none;
  background: none;
  color: ${(props) => (props.selected ? '#f12e5e' : '#888')};  
  font-size: 16px;
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  transition: color 0.3s ease;

  &:hover {
    color: #f12e5e;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PastLabel = styled.div`
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #666;
  text-align: center;
  border-top: 1px solid #ccc;
  margin-top: 10px;
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #f2f2f2; 
  cursor: pointer;
  opacity: ${(props) => (props.isPast ? 0.5 : 1)}; 
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);  
    border: 2px solid #f12e5e; 
  }
`;

const ScheduleContent = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const ScheduleTitle = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => (props.isPast ? '#aaa' : '#000')}; 
`;

const ScheduleDate = styled.p`
  font-size: 13px;
  color: ${(props) => (props.isPast ? '#aaa' : '#666')}; 
`;

const TrashIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 20px;
    height: auto;
    object-fit: contain;
  }

  &:hover img {
    filter: brightness(0.8);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ModalButton = styled.button`
  background: linear-gradient(135deg, #f12e5e, #ff9a8b); 
  color: white;
  border: none;
  width: 82px;
  padding: 10px 20px;
  border-radius: 50px; 
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
  transition: all 0.3s ease; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 

  &:hover {
    background: linear-gradient(135deg, #ff9a8b, #f12e5e);  
    transform: translateY(-2px);  
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); 
  }

  &:active {
    transform: translateY(0); 
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); 
  }
`;
