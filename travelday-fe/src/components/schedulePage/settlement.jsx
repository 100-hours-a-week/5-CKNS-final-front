import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Allocator from "./allocator";
import addImg from "../../images/filter/add.png";
import trashImg from "../../images/trash.png";

const Settlement = ({ settlementId, postSettlementList, travelRoomId, hasNoData, people, deleteSettlement }) => {
    const [settlementDetailList, setSettlementDetailList] = useState([]);
    const [newRowName, setNewRowName] = useState('');
    const [newRowAmount, setNewRowAmount] = useState('');
    const [isEditingRowId, setIsEditingRowId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [isAllocating, setIsAllocating] = useState(false);

    const fetchSettlementDetails = (settlementId) => {
        if (!settlementId) return;

        axiosInstance.get(`/api/settlement/${travelRoomId}/${settlementId}/detail`)
            .then(response => setSettlementDetailList(response.data.data))
            .catch(error => console.error(error));
    };

    const addRow = () => {

        if (newRowName == null || newRowName === '') {
            setErrorMessage("정산 항목 이름을 작성해주세요.")
            return;
        }

        if (newRowAmount <= 0 || newRowAmount > 5000000) {
            setErrorMessage('0원 이하의 금액은 입력할 수 없습니다.');
            return;
        }

        if (settlementDetailList.length >= 10) {
            setErrorMessage('정산 항목은 10개까지 입력 할 수 있습니다.');
            return;
        }

        axiosInstance.post(`/api/settlement/${travelRoomId}/${settlementId}`, {
            name: newRowName,
            amount: newRowAmount
        })
            .then(() => fetchSettlementDetails(settlementId))
            .catch(error => console.log(error));
        setNewRowName('');
        setNewRowAmount('');
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setErrorMessage(value.length > 10 ? '정산 내역 이름은 최대 10글자까지만 입력 가능합니다.' : '');
        setNewRowName(value.slice(0, 10));
    };

    const handleAmountChange = (e) => {
        const value = e.target.value === '' ? '' : parseInt(e.target.value);
        setErrorMessage(value <= 0 ? '0원 이하의 금액은 입력할 수 없습니다.' : '');
        setNewRowAmount(value);
    };

    const deleteRow = (settlementDetailId) => {
        axiosInstance.delete(`/api/settlement/${travelRoomId}/${settlementId}/${settlementDetailId}`)
            .then(() => fetchSettlementDetails(settlementId))
            .catch(error => console.log(error));
    };

    const editRow = (settlementDetailId) => {
        axiosInstance.patch(`/api/settlement/${travelRoomId}/${settlementId}/${settlementDetailId}`, { name: newRowName, amount: parseInt(newRowAmount) })
            .then(() => fetchSettlementDetails(settlementId))
            .catch(error => console.log(error));
        setIsEditingRowId(null);
        setNewRowName('');
        setNewRowAmount('');
    };

    useEffect(() => {
        const calculatedTotalAmount = settlementDetailList.reduce((sum, row) => sum + row.amount, 0);
        setTotalAmount(calculatedTotalAmount);
    }, [settlementDetailList]);

    useEffect(() => {
        if (settlementDetailList.length === 0) {
            fetchSettlementDetails(settlementId);
        }
    }, [settlementId]);

    const handleAllocationButton = () => {
        if(!totalAmount){
            alert("정산할 금액이 비어있습니다!")
            return
        }
        setIsAllocating(true);
    };

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    // Define a threshold to detect drag vs click (can be adjusted)
    const dragThreshold = 1;

    const handleMouseDown = (e) => {
        // Store the starting position when mouse is pressed down
        setStartX(e.clientX);
        setStartY(e.clientY);
    };

    const handleMouseUp = (e) => {
        // Calculate the difference between starting and ending positions
        const diffX = Math.abs(e.clientX - startX);
        const diffY = Math.abs(e.clientY - startY);

        // If the movement is small (below the threshold), treat it as a click
        if (diffX < dragThreshold && diffY < dragThreshold) {
            handleSheetClick(); // Trigger click behavior
        }
    };

    const handleDeleteSheet = () =>{
        alert("정산 목록이 삭제되었습니다.")
        setSettlementDetailList([])
        setNewRowName("")
        setNewRowAmount("")

        deleteSettlement(settlementId);
    }

    const handleSheetClick = () => {
        // This will only be called on click, not on drag
        if (!settlementId) {
            postSettlementList();
        }
    };
    return (
        <Container
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {(!hasNoData && settlementId !== null) &&
                <>
                    <DeleteSheet onClick={handleDeleteSheet}>
                    <>X</>
                    </DeleteSheet>
                    <TotalAmount>총 정산 금액: {totalAmount.toLocaleString()}원</TotalAmount>
                </>
            }
            {isAllocating ? (
                <Allocator people={people} setIsAllocating={setIsAllocating} />
            ) : (
                <>
                    {hasNoData ? (
                        <div style={{ minHeight:"60vh", display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center" }}>
                            <NoDataText>정산 내역이 없습니다!</NoDataText>
                            <img src={addImg} alt={"addImg"} style={{width: '30%'}}/>
                            {settlementId === null && (
                                // <MainButton onClick={postSettlementList}>새 정산 추가</MainButton>
                                <p style={{fontSize: "2.1em"}}>
                                        새 정산 추가
                                </p>
                                )}
                        </div>
                    ) : (
                        settlementId === null ? (
                            <div style={{
                                minHeight: "60vh",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src={addImg} alt={"addImg"} style={{width: '30%'}}/>
                                {/*<MainButton onClick={postSettlementList}>새 정산 추가</MainButton>*/}
                                <p style={{fontSize: "2.1em"}}>
                                    새 정산 추가
                                </p>
                            </div>
                        ) : (
                            <ContentBox>
                                {errorMessage && <HelperText>{errorMessage}</HelperText>}
                                <InputContainer>
                                    <StyledInput
                                        type="text"
                                        placeholder="정산 내역 이름"
                                        value={isEditingRowId !== null ? '' : newRowName}
                                        onChange={handleNameChange}
                                        disabled={isEditingRowId !== null}
                                    />
                                    <StyledInput
                                        type="number"
                                        placeholder="금액입력 (원)"
                                        value={isEditingRowId !== null ? '' : (newRowAmount || '')}
                                        onChange={handleAmountChange}
                                        disabled={isEditingRowId !== null}
                                    />
                                    <MainButton onClick={addRow} disabled={isEditingRowId !== null}>
                                        내역 추가
                                    </MainButton>
                                </InputContainer>
                                <RoundList>
                                    {settlementDetailList.map(row => (
                                        <RoundItem key={row.id}>
                                            {isEditingRowId === row.id ? (
                                                <>
                                                    <RoundDetailWrap>
                                                        <Input
                                                            type="text"
                                                            value={newRowName}
                                                            onChange={handleNameChange}
                                                            placeholder="정산 내역 이름"
                                                        />
                                                        <Input
                                                            style={{ fontSize: 12 }}
                                                            type="number"
                                                            value={newRowAmount}
                                                            onChange={handleAmountChange}
                                                            placeholder="금액"
                                                        />
                                                    </RoundDetailWrap>
                                                    <Button onClick={() => editRow(row.id)}>저장</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <RoundDetailWrap>
                                                        {/*<RoundDetails contentEditable onInput={(e)=>{console.log(e.target.outerText)}}>{row.name}</RoundDetails>*/}
                                                        <RoundDetails >{row.name}</RoundDetails>
                                                        <RoundAmounts>{row.amount.toLocaleString()}원</RoundAmounts>
                                                    </RoundDetailWrap>
                                                    <ButtonGroup>
                                                        <Button onClick={() => {
                                                            setIsEditingRowId(row.id);
                                                            setNewRowName(row.name);
                                                            setNewRowAmount(row.amount);
                                                        }}>수정</Button>
                                                        <DeleteButton onClick={() => deleteRow(row.id)}>삭제</DeleteButton>
                                                    </ButtonGroup>
                                                </>
                                            )}
                                        </RoundItem>
                                    ))}
                                </RoundList>
                                <MainButton onClick={handleAllocationButton}>정산 요청</MainButton>
                            </ContentBox>
                        )
                    )}
                </>
            )}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: #f8f7f2;
    border-radius: 10px;
    padding: 25px;
    margin: 10px;
`;

const ContentBox = styled.div`
    min-width: 250px;
    min-height: 500px;

`;

const DeleteSheet = styled.div`
    position: relative;
    font-size: 2.0em;
    display: flex;
    justify-content: flex-end;
    padding-top: -20px;
    width: 100%;
`


const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const StyledInput = styled.input`
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #f8f8f8;
`;

const TotalAmount = styled.p`
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 40px;
`;

const NoDataText = styled.p`
    font-size: 18px;
    color: #999;
    position: absolute;
    top: 30px;
`;

const MainButton = styled.button`
    padding: 15px;
    background-color: #f12e5e;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background-color: #d3204a;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #f12e5e;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background-color: #d3204a;
    }
`;

const DeleteButton = styled(Button)`
    background-color: #ff5f5f;
    &:hover {
        background-color: #d94444;
    }
`;

const RoundList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const RoundItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 12px;
    border-bottom: 1px solid black;
`;

const RoundDetailWrap = styled.div`
display: flex;
flex-direction: column;
align-items: baseline;
height: 40px;
`

const RoundDetails = styled.span`
    font-size: 16px;
    font-weight: 500;
`;

const RoundAmounts = styled.span`
    font-size: 12px;
    font-weight: 500;
`;


const Input = styled.input`
    //padding: 10px;
    border: 0 solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    background-color: transparent;
    //width: 100%;
    box-sizing: border-box;
`;

const HelperText = styled.p`
    position: relative;
    color: #f12e5e;
    font-size: 12px;
    margin-bottom: 10px;
`;

export default Settlement;
