import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axiosInstance from "../../utils/axiosInstance";
import {CSS} from '@dnd-kit/utilities';
import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import axiosInstance from "../../utils/axiosInstance";

/**
 * Customizing arrayMove function from @dnd-kit
 * Move an array item to a different position.
 * Returns a new array with the item moved to the new position.
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
        } else {
            // This is an item in a day column
            newArray[i].scheduledDay = currentDayIndex; // Assuming day starts from 1
            newArray[i].position = currentPosition++;
        }
        newArray[i].index = i
    }
    return newArray;
};


/** 배열을 그룹으로 나누고 정렬하는 함수 */
function groupAndSort(arr, startDate,endDate) {
    // 두 날짜 생성
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    // 밀리초 단위로 변환
    const timeDifference = date2.getTime() - date1.getTime();

    // 밀리초를 일 단위로 변환
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    const minDay = 0
    const maxDay = dayDifference

    // Step 1: 날짜별로 그룹화
    const grouped = arr.reduce((acc, curr) => {
        const key = curr.scheduledDay;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
    }, {});

    // Step 2: 비어있는 날짜 처리
    for (let day = minDay; day <= maxDay; day++) {
        if (!grouped[day]) {
            grouped[day] = []; // 빈 그룹 추가
        }
    }

    // Step 3: 각 날짜에 position 0을 추가하고 정렬
    const result = [];
    Object.keys(grouped).sort((a, b) => a - b).forEach(scheduledDay => {
        const group = grouped[scheduledDay];
        // 날짜마다 position 0 객체 추가
        if(Number(scheduledDay) !== 0){
            result.push({ scheduledDay: Number(scheduledDay), id: 10e9 + Number(scheduledDay), position: 0, name: `${scheduledDay}일차` });
        }
        // 날짜별 position 기준으로 정렬하여 추가
        group.sort((a, b) => a.position - b.position);
        result.push(...group);
    });

    // Step 4: 각 객체에 index 추가
    return result.map((item, index) => ({
        ...item, // 기존 객체를 유지하고
        index // index 값을 추가
    }));
}



function reverseGroupAndSort(arr) {
    // Step 1: index 필드를 제거하고 scheduledDay가 -1인 경우 0으로 변경
    const arrWithoutIndex = arr.map(({ index, name, latitude, longitude, scheduledDay, ...rest }) => {
        return {
            ...rest,
            scheduledDay: scheduledDay === -1 ? 0 : scheduledDay, // scheduledDay가 -1이면 0으로 변경
        };
    });
    // Step 2: 날짜별로 position: 0 객체를 제거
    const filteredArr = arrWithoutIndex.filter(item => item.position !== 0);

    // Step 3: 날짜별로 그룹화된 객체에서 원래 배열로 복원
    const groupedByDate = filteredArr.reduce((acc, curr) => {
        const { scheduledDay, ...rest } = curr;
        if (!acc[scheduledDay]) {
            acc[scheduledDay] = [];
        }
        acc[scheduledDay].push({ scheduledDay, ...rest });
        return acc;
    }, {});

    // Step 4: 각 그룹을 날짜별로 원래대로 합쳐서 반환
    return Object.values(groupedByDate).flat();
}


const ScheduleDetailList = ({ travelRoomId, startDate, endDate }) => {
    const [scheduleDetails, setScheduleDetails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 추가
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    /** 드래그 이벤트가 끝나면 어레이 변형 */
    const onDragEnd = ({ active, over }) => {
        const activeIdx = active?.data.current.sortable.index;
        const overIdx = over?.data.current.sortable.index;

        if (activeIdx !== overIdx) {
            setScheduleDetails((prev) => {
                return arrayMoveWithPosition(prev, activeIdx, overIdx);
            });
        }
    };

    /** 서버에서 일정을 받아옴 */
    function fetchPlans(token) {
        axiosInstance.get(`/api/rooms/${travelRoomId}/plan`, {
            headers: {Authorization: `Bearer ${token}`},
            withCredentials: true
        })
            .then(response => {
                if (response.data?.data?.length > 0) {
                    modifySchedule(response.data.data);
                }
            })
            .catch(error => {
                console.error('여행방 정보 로드 중 오류 발생:', error);
            });
    }

    /** 서버에서 받아온 일정을 필요한 형태로 가공 */
    function modifySchedule(schedule) {
        const sortedList = groupAndSort(schedule, startDate, endDate);
        setScheduleDetails(sortedList);
    }

    /** 서버에 저장할 형태로 일정을 가공 */
    function retrieveSchedule(schedule) {
        return reverseGroupAndSort(schedule);
    }

    /** 서버에 변환한 리스트를 다시 저장 */
    function postPlans() {
        const token = localStorage.getItem("accessToken");
        axiosInstance.post(`/api/rooms/${travelRoomId}/plan`, {
            body: retrieveSchedule(scheduleDetails)
        }, {
            headers: {Authorization: `Bearer ${token}`},
            withCredentials: true
        })
            .then(response => {
                console.log(response.data.data);
                setIsModalOpen(true);  // 저장 후 모달 열기
                setTimeout(() => setIsModalOpen(false), 2000);  // 2초 후에 모달 자동 닫기
            })
            .catch(error => {
                console.error('여행방 정보 로드 중 오류 발생:', error);
            });
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        fetchPlans(token);
    }, []);

    return (
        <ListContainer>
            <TitleWrapper>
                <Title>일정 보기</Title>
                <SaveButton onClick={postPlans}>저장하기</SaveButton>
            </TitleWrapper>
            <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    items={scheduleDetails}
                    strategy={verticalListSortingStrategy}
                >
                    {scheduleDetails.map((item, index) => (
                        item.position === 0 ? (
                            <SortableItem item={item} key={index} id={item.id} customStyle={StyledDay}></SortableItem>
                        ) : (
                            <SortableItem key={index} id={item.id} item={item} />
                        )
                    ))}
                </SortableContext>
            </DndContext>
            {isModalOpen && (
                <Modal>
                    <ModalContent>
                        일정이 저장되었습니다.
                    </ModalContent>
                </Modal>
            )}
        </ListContainer>
    );
};

export default ScheduleDetailList;

const ListContainer = styled.div`
  width: 100%;
  background-color: #fff;
  margin-top: 20px;
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
`;

const SaveButton = styled.button`
    font-size: 16px;
    padding: 10px 16px;
    background-color: transparent;
    color: #333;
    border: 2px solid #ccc;
    border-radius: 50px;
    cursor: pointer;
    transition: 
        background-color 0.3s ease, 
        border-color 0.3s ease, 
        color 0.3s ease,
        transform 0.3s ease, 
        box-shadow 0.3s ease,
        font-size 0.3s ease;

    &:hover {
        background-color: #5bbab5; 
        border-color: #5bbab5; 
        color: #fff; 
    }
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
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 4px;
`;

const StyledDay = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    width: 390px;
    margin: 20px 0 10px 0;
    font-size: 18px;
    color: #333;
    z-index: 5;
    cursor: default;
`;
const Position = styled.div`
    color: #333;
    font-size: 30px;
    cursor: move;
`;

const ScheduleBox = styled.div`
    font-size: 18px;
    width: 390px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: default;
    padding: 10px 20px;
    border-radius: 8px;
    border: 2px solid #ccc;
    background-color: #fff;
    color: #333;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;
    &:hover {
        box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.15);
        border-color: #c2c2c2;
    }
    touch-action: none;
`;

const ListItemName = styled.div`
    width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 8px;
    z-index: 1000;
`;

const ModalContent = styled.div`
    color: #fff;
    font-size: 18px;
    text-align: center;
`;

const SortableItem = ({id, item, customStyle: CustomStyleComponent}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useSortable({
        id
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition: 'none',
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
            ref={setNodeRef}
            {...attributes}
            style={CustomStyleComponent ? null : style}
        >
            {CustomStyleComponent ? (
                <CustomStyleComponent>{item.name}</CustomStyleComponent>
            ) : (
                <ScheduleBox><ListItemName>{item.name}</ListItemName><Position {...listeners}>=</Position></ScheduleBox>
            )}
        </ListItem>
    );
};
