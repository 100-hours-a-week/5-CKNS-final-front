import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../utils/axiosInstance';
import { useParams } from 'react-router-dom';

const InviteModal = ({ isOpen, onClose, searchInput, setSearchInput }) => {
    const { travelRoomId } = useParams();
    const [filteredResults, setFilteredResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');
    const [helperText, setHelperText] = useState(''); 
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null); // 디바운싱 타이머 관리

    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

    useEffect(() => {
        if (!isOpen) {
            setFilteredResults([]);
            setSearchInput('');
            setErrorMessage(''); 
            setSuccessMessage('');
            setHelperText(''); 
            setShowConfirmation(false);
        }
    }, [isOpen, setSearchInput]);

    const handleSearch = async () => {
        // Nickname validation: length and special characters
        if (searchInput.length > 10) {
            setHelperText('닉네임은 10글자 이내여야 합니다.');
            setFilteredResults([]);
            return;
        }
        if (!nicknameRegex.test(searchInput)) {
            setHelperText('닉네임에 특수문자는 사용할 수 없습니다.');
            setFilteredResults([]);
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.get(`/api/rooms/${travelRoomId}/user/search`, {
                params: { keyword: searchInput },
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
    
            if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
                setFilteredResults(response.data.data);
                setErrorMessage('');
                setHelperText(''); // Clear helper text when search is valid
            } else {
                setFilteredResults([]);
                setErrorMessage('검색 결과가 없습니다.');
            }
        } catch (error) {
            console.error('사용자 검색 중 오류가 발생했습니다:', error);
            setErrorMessage('검색 중 오류가 발생했습니다.');
        }
    };

 
    useEffect(() => {
        if (searchInput.trim() === '') {
            return;
        }

        if (typingTimeout) {
            clearTimeout(typingTimeout); // 이전 타이머를 제거
        }

        // 1초 후에 검색 요청 실행
        const timeoutId = setTimeout(() => {
            handleSearch();
        }, 1000);

        setTypingTimeout(timeoutId); // 새로운 타이머 설정

        return () => {
            clearTimeout(timeoutId); // 컴포넌트가 언마운트되거나, searchInput이 바뀔 때 타이머 클리어
        };
    }, [searchInput]); // searchInput이 변경될 때마다 디바운싱 적용

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleInvite = async (userId) => {
        try {
            const token = localStorage.getItem('accessToken'); 
            const response = await axiosInstance.post(`/api/rooms/${travelRoomId}/invitation`, 
            { invitee: userId }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
    
            setSuccessMessage(response.data.message || '초대가 성공적으로 완료되었습니다.'); 
            
            setTimeout(() => {
                setSuccessMessage('');
                setShowConfirmation(true);
            }, 2000);
    
        } catch (error) {
            console.error('초대 중 오류가 발생했습니다:', error.response.data.message);
            setErrorMessage(error.response.data.message);
            onClose();
        }
    };

    const handleConfirmYes = () => {
        setSearchInput(''); // 검색창 비우기
        setFilteredResults([]);
        setShowConfirmation(false); // 예/아니오 확인 메시지 숨김
    };

    const handleConfirmNo = () => {
        setShowConfirmation(false); // 예/아니오 확인 메시지 숨김
        onClose(); // 모달 닫기
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                <h3>친구 초대하기</h3>
                <SearchInput
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="일행을 추가해 보세요 (최대 15명)"
                    disabled={showConfirmation} 
                />
                  <HelperText>{helperText || '\u00A0'}</HelperText>
                <SearchResults>
                    {errorMessage ? (
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    ) : successMessage ? (
                        <SuccessMessage>{successMessage}</SuccessMessage> 
                    ) : showConfirmation ? (
                        <Confirmation>
                            <p>일행을 더 초대하시겠습니까?</p>
                            <ButtonGroup>
                                <ConfirmButton onClick={handleConfirmYes}>예</ConfirmButton>
                                <ConfirmButton onClick={handleConfirmNo}>아니오</ConfirmButton>
                            </ButtonGroup>
                        </Confirmation>
                    ) : (
                        filteredResults.map((result, index) => (
                            <ResultItem key={index}>
                                {result.nickname}
                                <InviteButton onClick={() => handleInvite(result.userId)}>초대하기</InviteButton>
                            </ResultItem>
                        ))
                    )}
                </SearchResults>
            </ModalContent>
        </ModalOverlay>
    );
};

export default InviteModal;


const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    position: relative;
    max-width: 300px;
    width: 90%;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px; 
    color: black; 
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: red;
    }

    &:focus {
        outline: none;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-top: 20px;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: #f0f0f0;
    }
`;

const SearchResults = styled.div`
    margin-top: 10px;
    text-align: left;
`;

const ResultItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    margin-left: 10px;
    border-bottom: 1px solid #eee;
`;

const InviteButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 20px;
    text-align: center;
`;

const SuccessMessage = styled.p`
    color: green;
    margin-top: 20px;
    text-align: center;
`;

const Confirmation = styled.div`
    margin-top: 20px;
    text-align: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
`;

const ConfirmButton = styled.button`
    padding: 10px 20px;
    width: 90px;
    border: none;
    border-radius: 25px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    &:active {
        background-color: #004494;
        transform: translateY(0);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const HelperText = styled.p`
    color: #999;
    font-size: 12px;
    margin-top: 8px;
    text-align: left;
    width: 100%;
`;

