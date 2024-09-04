import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from "axios";
import { CSS } from '@dnd-kit/utilities';
import {DndContext, MouseSensor, PointerSensor, useDroppable, useSensor, useSensors} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    // arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {MenuOutlined} from "@ant-design/icons";

/**
 * Customizing arrayMove function from @dnd-kit
 * Move an array item to a different position.
 * Returns a new array with the item moved to the new position.
 *
 */

const arrayMoveWithPosition = (array, fromIndex, toIndex) => {
    // Day indicator should not change its position
    if (array[fromIndex].position === 0 || toIndex === undefined) {
        return array;
    }
    const newArray = [...array];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);

    // Update the position attribute after the move
    let currentDayIndex = -1;
    let currentPosition = 1;

    for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].position === 0) {
            // This is a Day indicator
            currentDayIndex = newArray[i].scheduledDay;
            currentPosition = 1;
            // newArray[i].name = `${currentDayIndex}일차`;
        } else {
            // This is an item in a day column
            newArray[i].scheduledDay = currentDayIndex; // Assuming day starts from 1
            newArray[i].position = currentPosition++;
        }
        newArray[i].index = i
    }

    return newArray;
};

const ScheduleDetailList = ({ travelRoomId }) => {
    const [scheduleDetails, setScheduleDetails] = useState([]);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
                distance: 10,
            },
        }),
    );
    const onDragEnd = ({ active, over }) => {

        const activeIdx = active?.data.current.sortable.index
        const overIdx = over?.data.current.sortable.index

        if (activeIdx !== overIdx) {
            setScheduleDetails((prev) => {
                const isOverDay = prev[overIdx]?.position === 0;
                const targetIdx = isOverDay
                    ? overIdx + 1 // Place the item after the Day
                    : overIdx;
                const temp = arrayMoveWithPosition(prev,activeIdx,overIdx);
                console.log(activeIdx,targetIdx);
                console.table(temp)
                return temp;
                // return arrayMove(prev, activeIndex, targetIndex);
            });
        }
    };

    /** 배열을 그룹으로 나누고 정렬하는 함수 */
    function groupAndSort(arr) {
        // Step 1: 날짜별로 그룹화
        const grouped = arr.reduce((acc, curr) => {
            const key = curr.scheduledDay;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(curr);
            return acc;
        }, {});

        // Step 2: 각 날짜에 position 0을 추가하고 정렬
        const result = [];
        Object.keys(grouped).forEach(scheduledDay => {
            const group = grouped[scheduledDay];
            // 날짜마다 position 0 객체 추가
            result.push({ scheduledDay: scheduledDay*1, id:10e9 + scheduledDay*1 , position: 0, name: `${scheduledDay}일차` });
            // 날짜별로 position을 기준으로 정렬하여 추가
            group.sort((a, b) => a.position - b.position);
            result.push(...group);
            // // Add position 999 object at the end of each day
            // result.push({ scheduledDay: scheduledDay * 1, position: 999, name: '' });
        });

        // Step 3: 각 객체에 index 추가
        return result
            .map((item, index) => ({
            ...item, // 기존 객체를 유지하고
            index  // index 값을 추가
        }));
    }

  /** 서버에서 일정을 반환받아 원하는 형태로 가공 */
  function postSchedule(schedule) {
      const sortedList  = groupAndSort(schedule)
      setScheduleDetails(sortedList);
      // console.table(sortedList);
  }

  useEffect(() => {
    const token= localStorage.getItem("accessToken");
      // useEffect 내부에서 axios GET 요청 수행
    axios.get(`https://api.thetravelday.co.kr/api/rooms/${travelRoomId}/plan`, {
      headers: {Authorization: `Bearer ${token}`},
      withCredentials: true
    })
        .then(response => {
          if (response.data?.data?.length > 0) {
            postSchedule(response.data.data);
          }
        })
        .catch(error => {
          console.error('여행방 정보 로드 중 오류 발생:', error);
        });
  }, []);  // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 함

    const columns = [
        {
            title: 'Drag',
            dataIndex: 'sort',
            width: 30,
            render: () => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
    ];

  return (
    <ListContainer>
      <Title>일정 보기</Title>
        <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
            <SortableContext
              items={scheduleDetails}
              strategy={verticalListSortingStrategy}
            >
                {scheduleDetails.map((item, index) => (
                    item.position === 0 ? (
                        // <Day key={index}>{item.name}
                        //     <hr/>
                        // </Day>
                        <SortableItem item={item} key={index} id={item?.id} customStyle={StyledDay}></SortableItem>
                    // ) :
                    // item.position === 999 ? (
                    //     <DroppableItem key={index} id={index}>
                    //         <br/>
                    //         <hr/>
                    //     </DroppableItem>
                    ) : (
                        <SortableItem key={index} id={item.id} item={item} />
                        // <Item key={index} props={item}>{item.name}</Item>
                    )
                ))}
            </SortableContext>
        </DndContext>
    </ListContainer>
  );
};

export default ScheduleDetailList;

const ListContainer = styled.div`
  width: 100%;
  background-color: #fff;
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
  margin-bottom: 8px;
`;

const StyledDay = styled.div`
    display: flex;
    font-weight: bold;
    width : 390px;
    margin: 20px 0 10px 0;
    font-size: 18px;
    color: #333;
    z-index: 5;
    cursor: default;
`;
const Position = styled.div`
  margin-right: 10px;
  color: #333;
  font-size: 15px;
  font-weight: bold;
`;

const Date = styled.div`
  flex-grow: 1;
  color: #666;
  font-size: 13px;
  display: flex;
  align-items: flex-end;
`;

const SortableItem = ({id, item, customStyle: CustomStyleComponent}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: 'move',
        ...(isDragging
            ? {
                position: 'relative',
                opacity: 0.3,
                zIndex: 2,
            }
            : {}),
    };

    return (
        <ListItem
            onClick={(e)=>{console.log(e.target)}}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={CustomStyleComponent ? null : style}  // customStyle이 있으면 style null로
        >
            {/* customStyle이 있으면 해당 컴포넌트로 감싸서 렌더링 */
                CustomStyleComponent ? (
                <CustomStyleComponent>{item.name}</CustomStyleComponent>
            ) : (
                item.name
            )}
        </ListItem>
    );
};