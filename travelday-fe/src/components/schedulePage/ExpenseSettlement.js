import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import axiosInstance from "../../utils/axiosInstance";

const ExpenseSettlement = ({travelRoomId}) => {
  const [settling, setSettling] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [newRoundName, setNewRoundName] = useState('');
  const [newRoundAmount, setNewRoundAmount] = useState(0);
  const [people, setPeople] = useState([{ name: '하이든', amount: 0 }, { name: '션', amount: 0 } , { name: '엘리', amount: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPeople, setShowPeople] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditingRound, setIsEditingRound] = useState(null);
  const [settlementId,setSettlementId] = useState(null);
  const needFetch = useRef(true);
  useEffect(() => {
    const calculatedTotalAmount = rounds.reduce((sum, round) => sum + round.amount, 0);
    setTotalAmount(calculatedTotalAmount);
  }, [rounds]);


  // 정산 시작하기 버튼
  const startSettlement = () => {
    setSettling(true);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;

    if (value.length > 10) {
      setErrorMessage('정산 내역 이름은 최대 10글자까지만 입력 가능합니다.');
      setNewRoundName(value.slice(0, 10)); // 최대 10글자까지만 허용
    } else {
      setErrorMessage('');
      setNewRoundName(value);
    }
  };


  const handleAmountChange = (e) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value);

    if (value === '') {
      setErrorMessage('금액을 입력해 주세요.');
      setNewRoundAmount(0);  // 빈 값일 때 0으로 설정
    } else if (value <= 0) {
      setErrorMessage('0원 이하의 금액은 입력할 수 없습니다.');
    } else if (value > 5000000) {
      setErrorMessage('최대 500만원까지만 입력할 수 있습니다.');
    } else {
      setErrorMessage('');
      setNewRoundAmount(value);
    }
  };


// 수정된 금액 변경 로직 (수정 모드에서도 500만원 초과 금지)
const handleRoundAmountChange = (e) => {
  const value = e.target.value === '' ? '' : parseInt(e.target.value);

  if (value === '') {
    setErrorMessage('금액을 입력해 주세요.');
    setNewRoundAmount(0);  // 빈 값일 때 0으로 설정
  } else if (value <= 0) {
    setErrorMessage('0원 이하의 금액은 입력할 수 없습니다.');
  } else if (value > 5000000) {
    setErrorMessage('최대 500만원까지만 입력할 수 있습니다.');
  } else {
    setErrorMessage('');
    setNewRoundAmount(value);
  }
};


  // 1차, 2차 정산 추가
  const addRound = () => {
    if (newRoundAmount <= 0 || newRoundAmount > 5000000) {
      setErrorMessage('0원 이하의 금액은 입력할 수 없습니다.');
      return;
    }

    if (rounds.length >= 10) {
      setErrorMessage('최대 10차까지 정산할 수 있습니다.');
      return;
    }

    axiosInstance.post(`/api/settlement/${travelRoomId}/${settlementId}`,{ name: newRoundName, amount: newRoundAmount })
        .then(response=> {
          fetchSettlementDetails(settlementId);
        })
        .catch(error => console.log(error))


    const newRound = { name: newRoundName, amount: newRoundAmount };
    // setRounds([...rounds, newRound]);
    // setTotalAmount(totalAmount + newRound.amount);
    setNewRoundName('');
    setNewRoundAmount('');
    setErrorMessage('');
  };

  // 정산 내역 수정
  const saveRoundEdit = (index) => {
    if (newRoundAmount <= 0) {
      setErrorMessage('0원 이하의 금액은 입력할 수 없습니다.');
      return;
    }

    const settlementDetailId = rounds[index].id;
    axiosInstance.patch(`/api/settlement/${travelRoomId}/${settlementId}/${settlementDetailId}`,{ name: newRoundName, amount: parseInt(newRoundAmount) })
        .then(response=>{fetchSettlementDetails(settlementId)})
        .catch(error=>console.log(error));

    // const updatedRounds = [...rounds];
    // const oldAmount = updatedRounds[index].amount;
    // updatedRounds[index] = { name: newRoundName, amount: parseInt(newRoundAmount) };
    // setRounds(updatedRounds);
    // setTotalAmount(totalAmount - oldAmount + updatedRounds[index].amount);
    // setNewRoundName('');
    // setNewRoundAmount('');
    // setIsEditingRound(null);


  };

  // 정산 내역 삭제
  const deleteRound = (index) => {
    // const updatedRounds = rounds.filter((_, i) => i !== index);
    // setTotalAmount(totalAmount - rounds[index].amount);
    // setRounds(updatedRounds);

    const settlementDetailId = rounds[index].id;
    const settlementId = rounds[index].settlementId;
    console.table(rounds)
    axiosInstance.delete(`/api/settlement/${travelRoomId}/${settlementId}/${settlementDetailId}`, {})
        .then(response=>{fetchSettlementDetails(settlementId)})
        .catch(error=>console.log(error));
  };

  // 정산하기 버튼 눌렀을 때 사람들에게 금액 할당
  const allocateAmounts = () => {
    setErrorMessage('');
    const splitAmount = totalAmount / people.length;
    const updatedPeople = people.map(person => ({ ...person, amount: splitAmount }));
    setPeople(updatedPeople);
    setShowPeople(true);
  };


  const handlePeopleAmountChange = (index, value) => {
    const updatedPeople = [...people];
    const newAmount = parseFloat(value);

    if (newAmount > totalAmount) {
      setErrorMessage(`한 유저의 금액은 총 정산 금액(${totalAmount}원)를 넘을 수 없습니다.`);
      return;
    }

    // 총 금액에서 해당 유저의 수정 전 금액을 제외한 남은 금액
    const remainingAmount = totalAmount - newAmount;

    // 나머지 사람들에게 나눠줄 금액
    const remainingPeople = people.length - 1;

    if (remainingAmount / remainingPeople < 0) {
      setErrorMessage('다른 사람이 내야할 금액이 음수가 될 수 없습니다.');
      return;
    }

    const newSplitAmount = remainingAmount / remainingPeople;
    updatedPeople[index].amount = newAmount;

    // 수정되지 않은 다른 사람들의 금액을 조정
    updatedPeople.forEach((person, i) => {
      if (i !== index) {
        person.amount = newSplitAmount;
      }
    });

    setErrorMessage('');  // 성공적으로 업데이트되면 오류 메시지 제거
    setPeople(updatedPeople);
  };





// 차수 추가 버튼 비활성화 조건
const isAddRoundDisabled = !newRoundName || newRoundAmount <= 0 || newRoundAmount > 5000000 || isEditingRound !== null;

// '저장' 버튼 비활성화 조건
const isSaveButtonDisabled = !newRoundName || newRoundAmount <= 0 || newRoundAmount > 5000000;

// '뒤로' 버튼 핸들러
const goBack = () => {
  setShowPeople(false);
};


  /** 서버에서 정산 리스트를 받아옴 단계 1 */
  function fetchSettlementList() {
    if(settlementId!==null && settlementId!==undefined){
      fetchSettlementDetails(settlementId);
      return
    }

    axiosInstance.get(`/api/settlement/${travelRoomId}`, {
    })
        .then(response => {
          // console.table(response.data.data);
          setSettlementId(response.data.data.id);
          setTotalAmount(response.data.data.totalAmount)
          fetchSettlementDetails(response.data.data.id)
        })
        .catch(error => {
          console.error('정산 리스트 조회 중 오류 발생:', error);
        });
  }
  /** 서버에서 정산 리스트를 받아옴 단계 2 */
  function fetchSettlementDetails(settlementId) {
    axiosInstance.get(`/api/settlement/${travelRoomId}/${settlementId}/detail`, {})
        .then(response=>{
          const fetchedSettlement = response.data.data.map(settlement => {
            return {...settlement,key:settlement.id}
          });
          console.table(fetchedSettlement);
          setRounds(fetchedSettlement);
        })
        .catch(error=>{
          console.error(error)
        })
  }



  useEffect(()=>{
    if (needFetch.current){
      needFetch.current = false
      fetchSettlementList();
    }
  },[needFetch.current])

return (
<Container>
  {!settling && !rounds ? (
    <>
      <NoDataText>정산 내역이 없습니다!</NoDataText>
      <MainButton onClick={startSettlement}>정산 시작하기</MainButton>
    </>
  ) : (
    <>
      <TotalAmount>총 정산 금액: {totalAmount.toLocaleString()}원</TotalAmount>
      {errorMessage && (
        <HelperText style={{ opacity: errorMessage ? 1 : 0 }}>
          {errorMessage}
        </HelperText>
      )}
      {!showPeople ? (
        <>
          <InputContainer>
          <StyledInput
            type="text"
            placeholder="정산 내역 이름"
            value={isEditingRound !== null ? '' : newRoundName}  // 수정 모드일 때 빈 값
            onChange={handleNameChange}  // 글자 수 제한 함수 적용
            disabled={isEditingRound !== null}  // 수정 모드일 때 비활성화
          />
            <StyledInput
              type="number"
              placeholder="금액입력 (원)"
              value={isEditingRound !== null ? '' : (newRoundAmount || '')}  // 수정 모드일 때 빈 값, 아니면 금액 표시
              onChange={handleAmountChange}
              disabled={isEditingRound !== null}  // 수정 모드일 때 비활성화
            />

            <MainButton onClick={addRound} disabled={isAddRoundDisabled}>
              차수 추가
            </MainButton>
          </InputContainer>

          <RoundList>
            {rounds.map((round, index) => (
              <RoundItem key={round.key}>
              {isEditingRound === index ? (
                <>
                  <Input
                    type="text"
                    value={newRoundName}
                    onChange={(e) => setNewRoundName(e.target.value)}
                    placeholder="정산 내역 이름"
                  />
                  <Input
                    type="number"
                    placeholder="금액"
                    value={newRoundAmount}
                    onChange={handleRoundAmountChange}  // 수정 모드에서도 금액 변경 시 500만원 제한
                  />
                  <Button
                    onClick={() => saveRoundEdit(index)}
                    disabled={isSaveButtonDisabled}  // 비활성화 조건 적용
                  >
                    저장
                  </Button>
                </>
              ) : (
                <>
                  <RoundDetails>{round.name}: {round.amount.toLocaleString()}원</RoundDetails>
                  <ButtonGroup>
                    <Button onClick={() => {
                      setIsEditingRound(index);
                      setNewRoundName(round.name);
                      setNewRoundAmount(round.amount);
                    }}>
                      수정
                    </Button>
                    <DeleteButton onClick={() => deleteRound(index)}>삭제</DeleteButton>
                  </ButtonGroup>
                </>
              )}
            </RoundItem>
            ))}
          </RoundList>

          <MainButton onClick={allocateAmounts}>정산하기</MainButton>
        </>
      ) : (
        <>
          <PeopleList>
            {people.map((person, index) => (
              <PeopleItem key={index}>
                {person.name}
                <AmountWrapper>
                  <PeopleInput
                    type="number"
                    value={person.amount}
                    onChange={(e) => handlePeopleAmountChange(index, e.target.value)}
                  />
                  원
                </AmountWrapper>
              </PeopleItem>
            ))}
          </PeopleList>
          <ButtonGroup>
            <BackButton onClick={goBack}>뒤로</BackButton>
            <MainButton onClick={() => alert('정산 완료 알림이 전송되었습니다!')}>완료</MainButton>
          </ButtonGroup>
        </>
      )}
    </>
  )}
</Container>
);

};

const Container = styled.div`
  width: 350px;
  padding: 20px;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
`;

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
  padding: 12px;
  width: 100px;
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
  width: 100%;
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


export default ExpenseSettlement;
