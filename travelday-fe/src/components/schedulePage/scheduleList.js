import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TrashIcon from '../../images/trash.png';

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
      const date = new Date(schedule.startDate);
      if (date < today) {
        pastSchedules.push(schedule);
      } else {
        upcomingSchedules.push(schedule);
      }
    });

    const sortedUpcoming = upcomingSchedules.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);

      return sortOrder === 'nearest' ? dateA - dateB : dateB - dateA;
    });

    setSortedSchedules([...sortedUpcoming, { type: 'pastLabel' }, ...pastSchedules]);
  }, [schedules, sortOrder]);

  const handleDeleteClick = (id) => {
    setSelectedScheduleId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedScheduleId) {
      try {
        // Using the selectedScheduleId in the DELETE request URL
        await axios.delete(`https://api.thetravelday.co.kr/api/rooms/${selectedScheduleId}`);
        setSortedSchedules(sortedSchedules.filter(schedule => schedule.id !== selectedScheduleId));
        onDeleteClick(selectedScheduleId);
        setIsModalOpen(false); 
      } catch (error) {
        console.error("일정 삭제 중 오류 발생:", error);
      }
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

          const isPast = new Date(schedule.startDate) < new Date();

          return (
            <ScheduleItem
              key={schedule.id}
              isPast={isPast}
            >
              <ScheduleContent onClick={() => onItemClick(schedule.id)}>
                <ScheduleTitle isPast={isPast}>{schedule.name}</ScheduleTitle>
                <ScheduleDate isPast={isPast}>{`${schedule.startDate} ~ ${schedule.endDate}`}</ScheduleDate>
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
        <ModalOverlay>
          <ModalContent>
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
  background: linear-gradient(135deg, #ff7e79, #ff9a8b); 
  color: white;
  border: none;
  width:82px;
  padding: 10px 20px;
  border-radius: 50px; 
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
  transition: all 0.3s ease; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 

  &:hover {
    background: linear-gradient(135deg, #ff9a8b, #ff7e79);  
    transform: translateY(-2px);  
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); 
  }

  &:active {
    transform: translateY(0); 
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); 
  }
`;
