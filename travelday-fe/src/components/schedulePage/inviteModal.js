import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../utils/axiosInstance';
import { useParams } from 'react-router-dom';

const InviteModal = ({ isOpen, onClose, searchInput, setSearchInput }) => {
    const { travelRoomId } = useParams();
    const [filteredResults, setFilteredResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setFilteredResults([]);
            setSearchInput('');
            setErrorMessage(''); 
            setSuccessMessage('');
        }
    }, [isOpen, setSearchInput]);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.get(`/api/user/search`, {
                params: { value: searchInput },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.results.length > 0) {
                setFilteredResults(response.data.results);
                setErrorMessage(''); 
            } else {
                setFilteredResults([]);
                setErrorMessage('검색 결과가 없습니다.');
            }
        } catch (error) {
            console.error('사용자 검색 중 오류가 발생했습니다:', error);
            setErrorMessage('검색 중 오류가 발생했습니다.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleInvite = async (userId) => {
        try {
            const token = localStorage.getItem('accessToken'); 
            const response = await axiosInstance.post(`/api/rooms/${travelRoomId}/invitation`, { userId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage(response.data); 
        } catch (error) {
            console.error('초대 중 오류가 발생했습니다:', error);
            setErrorMessage('초대 중 오류가 발생했습니다.');
        }
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
                />
                <SearchResults>
                    {errorMessage ? (
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    ) : successMessage ? (
                        <SuccessMessage>{successMessage}</SuccessMessage>
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
    font-weight: bold;
`;
