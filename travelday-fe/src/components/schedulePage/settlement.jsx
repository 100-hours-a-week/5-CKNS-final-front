import styled from "styled-components";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance";

const Settlement = ({settlementId, postSettlementList, travelRoomId}) => {
    const [settlementDetailList,setSettlementDetailList] = useState([]);
    const [newRowName, setNewRowName] = useState('');
    const [newRowAmount, setNewRowAmount] = useState('');
    const [isEditingRowId, setIsEditingRowId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);


    /** 서버에서 정산 리스트를 받아옴 단계 2 */
    function fetchSettlementDetails(settlementId) {
        if(settlementId === undefined || settlementId === null) {
            return
        }
        axiosInstance.get(`/api/settlement/${travelRoomId}/${settlementId}/detail`, {})
            .then(response=>{
                setSettlementDetailList(response.data.data);
            })
            .catch(error=>{
                console.error(error)
            })
    }

    // 1차, 2차 정산 추가
    const addRow = () => {
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
            .then(response => {
                fetchSettlementDetails(settlementId);
            })
            .catch(error => console.log(error))
    }


    const handleNameChange = (e) => {
        const value = e.target.value;

        if (value.length > 10) {
            setErrorMessage('정산 내역 이름은 최대 10글자까지만 입력 가능합니다.');
            setNewRowName(value.slice(0, 10)); // 최대 10글자까지만 허용
        } else {
            setErrorMessage('');
            setNewRowName(value);
        }
    };


    const handleAmountChange = (e) => {
        const value = e.target.value === '' ? '' : parseInt(e.target.value);

        if (value === '') {
            setErrorMessage('금액을 입력해 주세요.');
            setNewRowAmount(0);  // 빈 값일 때 0으로 설정
        } else if (value <= 0) {
            setErrorMessage('0원 이하의 금액은 입력할 수 없습니다.');
        } else if (value > 5000000) {
            setErrorMessage('최대 500만원까지만 입력할 수 있습니다.');
        } else {
            setErrorMessage('');
            setNewRowAmount(value);
        }
    };

    const deleteRow = (settlementDetailId) => {
        axiosInstance.delete(`/api/settlement/${travelRoomId}/${settlementId}/${settlementDetailId}`, {})
            .then(response=>{fetchSettlementDetails(settlementId)})
            .catch(error=>console.log(error));
    };

    const editRow = (settlementDetailId) => {
        axiosInstance.patch(`/api/settlement/${travelRoomId}/${settlementId}/${settlementDetailId}`,{ name: newRowName, amount: parseInt(newRowAmount) })
            .then(response=>{fetchSettlementDetails(settlementId)})
            .catch(error=>console.log(error));
        setIsEditingRowId(null)
    }

    useEffect(() => {
        const calculatedTotalAmount = settlementDetailList.reduce((sum, row) => sum + row.amount, 0);
        setTotalAmount(calculatedTotalAmount);
    }, [settlementDetailList]);



    useEffect(()=>{
        if(settlementDetailList.length > 0){
            return
        }
        fetchSettlementDetails(settlementId);
    },[settlementId])



    return (
        <Container>
            {
                settlementDetailList.length === 0 && (
                    <NoDataText>정산 내역이 없습니다!</NoDataText>
                )
            }
            {settlementId === null ? (
                <>
                    <MainButton onClick={postSettlementList}>정산 시작하기</MainButton>
                </>
            ):
            <ContentBox>
                <TotalAmount>총 정산 금액: {totalAmount.toLocaleString()}원</TotalAmount>
                {errorMessage && (
                    <HelperText style={{ opacity: errorMessage ? 1 : 0 }}>
                        {errorMessage}
                    </HelperText>
                )}
                <InputContainer>
                    <StyledInput
                        type="text"
                        placeholder="정산 내역 이름"
                        value={isEditingRowId !== null ? '' : newRowName}  // 수정 모드일 때 빈 값
                        onChange={handleNameChange}  // 글자 수 제한 함수 적용
                        disabled={isEditingRowId !== null}  // 수정 모드일 때 비활성화
                    />
                    <StyledInput
                        type="number"
                        placeholder="금액입력 (원)"
                        value={isEditingRowId !== null ? '' : (newRowAmount || '')}  // 수정 모드일 때 빈 값, 아니면 금액 표시
                        onChange={handleAmountChange}
                        disabled={isEditingRowId !== null}  // 수정 모드일 때 비활성화
                    />

                    <MainButton onClick={addRow} disabled={isEditingRowId !== null}>
                        차수 추가
                    </MainButton>
                </InputContainer>
                <RoundList style={{ maxWidth: "250px" }}>
                    {settlementDetailList.map((row, index) => (
                        <RoundItem key={row.id} >
                            {isEditingRowId === row.id ? (
                                <>
                                    <Input
                                        type="text"
                                        value={newRowName}
                                        onChange={(e) => setNewRowName(e.target.value)}
                                        placeholder="정산 내역 이름"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="금액"
                                        value={newRowAmount}
                                        onChange={handleAmountChange}  // 수정 모드에서도 금액 변경 시 500만원 제한
                                    />
                                    <Button
                                        onClick={() => editRow(row.id)}
                                        // disabled={isSaveButtonDisabled}  // 비활성화 조건 적용
                                    >
                                        저장
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <RoundDetails>{row.name}: {row.amount.toLocaleString()}원</RoundDetails>
                                    <ButtonGroup>
                                        <Button onClick={() => {
                                            setIsEditingRowId(row.id);
                                            setNewRowName(row.name);
                                            setNewRowAmount(row.amount);
                                        }}>
                                            수정
                                        </Button>
                                        <DeleteButton
                                            onClick={() => deleteRow(row.id)}
                                        >삭제</DeleteButton>
                                    </ButtonGroup>
                                </>
                            )}
                        </RoundItem>
                    ))}
                </RoundList>

            </ContentBox>
            }
        </Container>
    )
};

const Container = styled.div`
    width: inherit;
    //background-color: #000dff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`;

const ContentBox = styled.div`
    min-width: 250px;
    min-height: 500px;
    //border: 1px solid #000;
    margin: 10px;
    
//    background-color: lightgray;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
`;


const StyledInput = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 16px;
  background-color: #f8f8f8;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  padding: 10px;
  width: 60px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f8f8f8;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
  }
`;

const HelperText = styled.p`
  color: #f12e5e;
  font-size: 12px;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 60px;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
`;




const TotalAmount = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

const NoDataText = styled.p`
  font-size: 18px;
  color: #999;
  text-align: center;
  margin-bottom: 20px;
`;

const MainButton = styled.button`
  padding: 15px;
  background-color: #f12e5e;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  //width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d3204a;
  }
  &:disabled {
    background-color: #f58b9f;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  padding: 15px;
  background-color: gray;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #515151;
  }

  &:disabled {
    background-color: #f58b9f;
    cursor: not-allowed;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #f12e5e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;

  &:hover {
    background-color: #d3204a;
  }

  &:disabled {
    background-color: #d3d3d3;
    color: #a9a9a9;
    cursor: not-allowed;
    opacity: 0.7;
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
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  padding: 12px;
  //background-color: #f12525;
  border-radius: 8px;
`;

const RoundDetails = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const PeopleList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const PeopleInput = styled.input`
  padding: 12px;
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f8f8f8;
  transition: border-color 0.2s;
  margin-right: 5px;
  &:focus {
    outline: none;
  }
`;

const PeopleItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  padding: 12px;
`;

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
`;


export default Settlement;
