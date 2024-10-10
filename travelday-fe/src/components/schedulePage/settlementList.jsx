import React, { useState, useRef, useEffect } from 'react';
import Settlement from './settlement';
import axiosInstance from '../../utils/axiosInstance';
import styled from 'styled-components';

const SLIDER_WIDTH = 370; // Adjust to your desired width
const SLIDER_CONTENT_WIDTH = 310;
const SLIDER_HEIGHT = '80vh'; // Adjust to your desired height

const SettlementList = ({ travelRoomId, people }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transX, setTransX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startXRef = useRef(0);
    const [fetchedList, setFetchedList] = useState([]);

    const onMouseDown = (e) => {
        setIsDragging(true);
        startXRef.current = e.clientX;
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        const diff = e.clientX - startXRef.current;
        setTransX(diff);
    };

    const onMouseUp = () => {
        handleDragEnd();
    };

    const onTouchStart = (e) => {
        setIsDragging(true);
        startXRef.current = e.touches[0].clientX;
    };

    const onTouchMove = (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startXRef.current;
        setTransX(diff);
    };

    const onTouchEnd = () => {
        handleDragEnd();
    };

    const onWheel = (e) => {

        // if (e.deltaY < 0) {
        //     // Scrolling up
        //     if (currentIndex > 0) {
        //         setCurrentIndex((prev) => prev - 1);
        //     }
        // } else if (e.deltaY > 0) {
        //     // Scrolling down
        //     if (currentIndex < fetchedList.length - 1) {
        //         setCurrentIndex((prev) => prev + 1);
        //     } else {
        //         setCurrentIndex(0);
        //     }
        // }
    };

    const handleDragEnd = () => {
        if (isDragging) {
            setIsDragging(false);
            if (transX > 100 && currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
            } else if (transX < -100) {
                if (currentIndex === fetchedList.length - 1) {
                    setCurrentIndex(0);
                } else {
                    setCurrentIndex((prev) => prev + 1);
                }
            }
            setTransX(0); // Reset the translation
        }
    };

    function fetchSettlementList() {
        axiosInstance
            .get(`/api/settlement/${travelRoomId}`)
            .then((response) => {
                console.table(response.data.data);
                if (response.data.data.length > 0) {
                    const settlementList = [
                        ...response.data.data,
                        {
                            id: null,
                            status: null,
                            totalAmount: null,
                            settledAt: null,
                            isLastPage: true,
                        },
                    ];
                    setFetchedList(settlementList);
                } else {
                    setFetchedList([
                        {
                            id: null,
                            status: null,
                            totalAmount: null,
                            settledAt: null,
                            isLastPage: true,
                        },
                    ]);
                }
            })
            .catch((error) => {
                console.error('정산 리스트 조회 중 오류 발생:', error);
            });
    }

    function postSettlementList() {
        axiosInstance
            .post(`/api/settlement/${travelRoomId}`)
            .then((response) => {
                fetchSettlementList();
            })
            .catch((error) => {
                console.error('정산 리스트 생성 중 오류 발생:', error);
            });
    }

    function deleteSettlement(settlementId) {
        axiosInstance
            .delete(`/api/settlement/${travelRoomId}/${settlementId}`)
            .then((response) => {
                fetchSettlementList();
            })
            .catch((error) => {
                console.error('정산 리스트 삭제 중 오류 발생', error);
            });
    }

    useEffect(() => {
        fetchSettlementList();
    }, []);

    return (
        <div
            style={{
                overflowX: 'hidden',
                width: SLIDER_WIDTH,
                height: '100%',
                marginLeft: '10px',
                marginRight: '10px',
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onWheel={onWheel}
        >
            {/* Slider */}
            <div
                style={{
                    transform: `translateX(${
                        -currentIndex * SLIDER_CONTENT_WIDTH + transX + 30 + (currentIndex ? 0 : -30)
                    }px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease',
                    display: 'flex',
                    direction: 'row',
                }}
            >
                {/* Slide */}
                {fetchedList.map((i, index) => (
                    <div key={index}>
                        <div
                            style={{
                                width: `${SLIDER_CONTENT_WIDTH}px`,
                                marginLeft: currentIndex ? 0 : 15,
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}
                        >
                            <Settlement
                                people={people}
                                hasNoData={fetchedList.length === 1}
                                settlementId={fetchedList[index].id}
                                postSettlementList={postSettlementList}
                                travelRoomId={travelRoomId}
                                deleteSettlement={deleteSettlement}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettlementList;
