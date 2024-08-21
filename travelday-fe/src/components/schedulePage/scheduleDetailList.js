import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ScheduleDetailList = ({ scheduleDetails, setScheduleDetails }) => {

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(scheduleDetails);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setScheduleDetails(items);
  };

  return (
    <ListContainer>
      <Title>일정 보기</Title>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="schedules">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {scheduleDetails.map((detail, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <ListItem 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Day>{index + 1}일차</Day>
                      <Date>{detail}</Date>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ListContainer>
  );
};

export default ScheduleDetailList;

const ListContainer = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  padding: 15px 20px;
  background-color: #fff;
  color: #333;
  text-align: left;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 4px;
`;

const Day = styled.div`
  font-weight: bold;
  margin-right: 10px;
  font-size: 18px;
  color: #333;
`;

const Date = styled.div`
  flex-grow: 1;
  color: #666;
  font-size: 13px;
  display: flex;
  align-items: flex-end;
`;
