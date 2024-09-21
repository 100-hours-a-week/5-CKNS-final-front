import React, { useState } from 'react';
import styled from 'styled-components';

const ExpenseSettlement = () => {
  const [settling, setSettling] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [newRoundName, setNewRoundName] = useState('');
  const [newRoundAmount, setNewRoundAmount] = useState(0);
  const [people, setPeople] = useState([{ name: '하이든', amount: 0 }, { name: '션', amount: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPeople, setShowPeople] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditingRound, setIsEditingRound] = useState(null);

  // 정산 시작하기 버튼
  const startSettlement = () => {
    setSettling(true);
  };

  // 1차, 2차 정산 추가
  const addRound = () => {
    if (newRoundAmount <= 0) {
      setErrorMessage('0원 이하의 금액은 입력할 수 없습니다.');
      return;
    }
    const newRound = { name: newRoundName, amount: parseInt(newRoundAmount) };
    setRounds([...rounds, newRound]);
    setTotalAmount(totalAmount + newRound.amount);
    setNewRoundName('');
    setNewRoundAmount(0);
    setErrorMessage('');
  };

  // 정산 내역 수정
  const saveRoundEdit = (index) => {
    if (newRoundAmount <= 0) {
      setErrorMessage('0원 이하의 금액은 입력할 수 없습니다.');
      return;
    }
    const updatedRounds = [...rounds];
    const oldAmount = updatedRounds[index].amount;
    updatedRounds[index] = { name: newRoundName, amount: parseInt(newRoundAmount) };
    setRounds(updatedRounds);
    setTotalAmount(totalAmount - oldAmount + updatedRounds[index].amount);
    setNewRoundName('');
    setNewRoundAmount(0);
    setIsEditingRound(null);
  };

  // 정산 내역 삭제
  const deleteRound = (index) => {
    const updatedRounds = rounds.filter((_, i) => i !== index);
    setTotalAmount(totalAmount - rounds[index].amount);
    setRounds(updatedRounds);
  };

  // 정산하기 버튼 눌렀을 때 사람들에게 금액 할당
  const allocateAmounts = () => {
    const splitAmount = totalAmount / people.length;
    const updatedPeople = people.map(person => ({ ...person, amount: splitAmount }));
    setPeople(updatedPeople);
    setShowPeople(true);
  };

  // 유저 금액 수정 시 재조정 로직
  const handleAmountChange = (index, value) => {
    const updatedPeople = [...people];
    const newAmount = parseFloat(value);

    // 총 금액에서 해당 유저의 수정 전 금액을 제외한 남은 금액
    const remainingAmount = totalAmount - newAmount;

    // 나머지 사람들에게 나눠줄 금액
    const remainingPeople = people.length - 1;
    const newSplitAmount = remainingAmount / remainingPeople;

    updatedPeople[index].amount = newAmount;

    // 수정되지 않은 다른 사람들의 금액을 조정
    updatedPeople.forEach((person, i) => {
      if (i !== index) {
        person.amount = newSplitAmount;
      }
    });

    setPeople(updatedPeople);
  };

  // 차수 추가 버튼 비활성화 조건
  const isAddRoundDisabled = !newRoundName || newRoundAmount <= 0;

  return (
    <Container>
      {!settling ? (
        <>
          <NoDataText>정산 내역이 없습니다!</NoDataText>
          <MainButton onClick={startSettlement}>정산 시작하기</MainButton>
        </>
      ) : (
        <>
          <TotalAmount>총 정산 금액: {totalAmount.toLocaleString()}원</TotalAmount>

          {!showPeople && (
            <>
              <InputContainer>
                <StyledInput
                  type="text"
                  placeholder="정산 내역 이름"
                  value={newRoundName}
                  onChange={(e) => setNewRoundName(e.target.value)}
                />
                <StyledInput
                  type="number"
                  placeholder="금액"
                  value={newRoundAmount}
                  onChange={(e) => setNewRoundAmount(e.target.value)}
                />
                <MainButton onClick={addRound} disabled={isAddRoundDisabled}>차수 추가</MainButton>
                {errorMessage && <HelperText>{errorMessage}</HelperText>}
              </InputContainer>

              <RoundList>
                {rounds.map((round, index) => (
                  <RoundItem key={index}>
                    {isEditingRound === index ? (
                      <>
                        <StyledInput
                          type="text"
                          value={newRoundName}
                          onChange={(e) => setNewRoundName(e.target.value)}
                          placeholder="정산 내역 이름"
                        />
                        <StyledInput
                          type="number"
                          value={newRoundAmount}
                          onChange={(e) => setNewRoundAmount(e.target.value)}
                          placeholder="금액"
                        />
                        <Button onClick={() => saveRoundEdit(index)}>저장</Button>
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
          )}

          {showPeople && (
            <>
              <PeopleList>
                {people.map((person, index) => (
                  <PeopleItem key={index}>
                    {person.name}: 
                    <StyledInput
                      type="number"
                      value={person.amount}
                      onChange={(e) => handleAmountChange(index, e.target.value)}
                    /> 원
                  </PeopleItem>
                ))}
              </PeopleList>
              <MainButton onClick={() => alert('정산 완료 알림이 전송되었습니다!')}>완료</MainButton>
            </>
          )}
        </>
      )}
    </Container>
  );
};


const Container = styled.div`
  width: 390px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid #eee;
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

const HelperText = styled.p`
  color: #f12e5e;
  font-size: 12px;
  position: absolute;
  bottom: -20px;
`;

const TotalAmount = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
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
  transition: background-color 0.3s;
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
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  padding: 12px;
  background-color: #f8f8f8;
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

const PeopleItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  padding: 12px;
`;

export default ExpenseSettlement;
