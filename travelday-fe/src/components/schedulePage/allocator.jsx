import React from "react";
import styled from "styled-components";

const Allocator = ({ people, setIsAllocating }) => {
    // console.table(people);
    const [amount, setAmount] = React.useState(0);
    function handlePeopleAmountChange(e) {
        e.preventDefault();
        e.stopPropagation();

    }

    return (
        <>
            <PeopleList>
                {people.map((person, index) => (
                    <PeopleItem key={index}>
                        <Person>
                            <ProfileImage src={`https://img.thetravelday.co.kr/${person.profileImagePath}`} alt={`${person.nickname} profile`} />
                            {person.nickname}
                        </Person>
                        <AmountWrapper>
                            <PeopleInput
                                // type="number"
                                // value={amount}
                                onChange={handlePeopleAmountChange}
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
    padding: 12px;
`;

const Person = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const AmountWrapper = styled.div`
    //display: flex;
    //align-items: center;
    padding:0;
`;

const MainButton = styled.button`
    padding: 15px;
    background-color: #f12e5e;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    margin-top: 10px;
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