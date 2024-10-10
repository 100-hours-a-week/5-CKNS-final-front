import React, {useEffect} from "react";
import styled from "styled-components";

const Allocator = ({ people, setIsAllocating, totalAmount }) => {
    // console.table(people);
    const [allocatePeople, setAllocatePeople] = React.useState(people);
    const [errorMessage, setErrorMessage] = React.useState("");

    const handlePeopleAmountChange = (index, value) => {
        if (value === null || value === undefined || value === "") {
            return;
        }
        const updatedPeople = [...allocatePeople];
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
        updatedPeople[index]["amount"] = newAmount;

        // 수정되지 않은 다른 사람들의 금액을 조정
        updatedPeople.forEach((person, i) => {
            if (i !== index) {
                person.amount = newSplitAmount;
            }
        });

        setErrorMessage('');  // 성공적으로 업데이트되면 오류 메시지 제거
        setAllocatePeople(updatedPeople);
    };


    useEffect(()=>{
        const splitAmount = totalAmount / people.length;
        const updatedPeople = people.map(person => ({ ...person, amount: splitAmount }));
        if (totalAmount % people.length !== 0) {
            updatedPeople[0].amount += totalAmount % people.length;
        }
        setAllocatePeople(updatedPeople);
    },[])
    return (
        <>
            {errorMessage && <HelperText>{errorMessage}</HelperText>}
            <PeopleList>
                {allocatePeople.map((person, index) => (
                    <PeopleItem key={index}>
                        <Person>
                            <ProfileImage src={`https://img.thetravelday.co.kr/${person.profileImagePath}`} alt={`${person.nickname} profile`} />
                            {person.nickname}
                        </Person>
                        <AmountWrapper>
                            <PeopleInput
                                // type="number"
                                value={person.amount}
                                onChange={(e)=>{handlePeopleAmountChange(index,e.target.value)}}
                            />
                            <span>원</span>
                        </AmountWrapper>
                    </PeopleItem>
                ))}
            </PeopleList>
            <ButtonGroup>
                <BackButton onClick={() => setIsAllocating(false)}>뒤로</BackButton>
                <MainButton onClick={() => alert('정산 완료 알림이 전송되었습니다!')}>완료</MainButton>
            </ButtonGroup>
        </>
    );
};

export default Allocator;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
`;

const BackButton = styled.button`
    padding: 15px;
    background-color: gray;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    margin-top: 10px;
    width: auto;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #515151;
    }

    &:disabled {
        background-color: #f58b9f;
        cursor: not-allowed;
    }
`;

const PeopleList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
`;

const PeopleInput = styled.input`
    //padding: 12px;
    max-width: 80px;
    border: 0 solid black ;
    font-size: 16px;
    background-color: transparent;
    transition: border-color 0.2s;
    &:focus {
        outline: none;
        border-bottom: 1px solid black;
    }
`;

const PeopleItem = styled.li`
    min-width: 240px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    padding: 0px;
    
`;

const Person = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-wrap: nowrap;
    font-size: 12px;
`

const AmountWrapper = styled.div`
    //display: flex;
    //align-items: center;
    padding:0;
`;

const MainButton = styled.button`
    padding: 15px;
    background-color: #408cff;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #2a61b3;
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

const HelperText = styled.p`
    position: relative;
    color: #f12e5e;
    font-size: 12px;
    margin-bottom: 10px;
`;