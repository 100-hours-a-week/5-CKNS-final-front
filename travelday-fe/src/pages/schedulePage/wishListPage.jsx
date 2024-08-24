import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import calendarIcon from '../../images/filter/calendar.png';
import backIcon from '../../images/header/back.png';

const WishListPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // location.state가 null일 경우를 대비해 기본값 설정
  const { schedule } = location.state || { schedule: { title: 'Default Title', date: '2024-01-01 ~ 2024-01-07', details: [] } };

  const [wishListItems, setWishListItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // 모킹 어댑터 설정
    const mock = new MockAdapter(axios);

    // 모킹 데이터 설정
    const mockData = [
      { wishId: 1, title: 'Mock Item 1', location: 'Location 1' },
      { wishId: 2, title: 'Mock Item 2', location: 'Location 2' },
      { wishId: 3, title: 'Mock Item 3', location: 'Location 3' },
    ];

    // 모킹된 GET 요청 처리
    mock.onGet(`http://api.thetravelday.co.kr/api/rooms/${id}/wishlist`).reply(200, {
      data: [
        {
          wishlist: mockData,
        },
      ],
    });

    // 실제 API 호출
    const fetchWishList = async () => {
      try {
        const response = await axios.get(`http://api.thetravelday.co.kr/api/rooms/${id}/wishlist`);
        if (response.status === 200) {
          setWishListItems(response.data.data[0].wishlist);
        } else {
          console.error('데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 요청 중 에러 발생:', error);
      }
    };

    fetchWishList();
  }, [id]);

  const handleItemClick = (index) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((item) => item !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleRemoveItem = async (index) => {
    const itemToRemove = wishListItems[index];
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('액세스 토큰이 없습니다.');
      return;
    }

    try {
      const response = await axios.delete(`http://api.thetravelday.co.kr/api/rooms/${id}/wishlist/${itemToRemove.wishId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        // 성공적으로 삭제되었으면, 로컬 상태에서 항목 제거
        setWishListItems((prevItems) => prevItems.filter((_, i) => i !== index));
        setSelectedItems((prevSelected) => prevSelected.filter((item) => item !== index));
      } else {
        console.error('아이템 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 요청 중 에러 발생:', error);
    }
  };

  const handleAddItems = () => {
    const selectedDetails = selectedItems.map((index) => wishListItems[index]);

    navigate(`/schedule/${id}`, {
      state: {
        schedule: {
          ...schedule,
          details: [...selectedDetails, ...(schedule.details || [])],
        },
        id,
      },
    });
  };

  const handleBackClick = () => {
    navigate(`/schedule/${id}`, {
      state: { schedule, id },
    });
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <BackButton onClick={handleBackClick}>
          <BackIcon src={backIcon} alt="뒤로가기 아이콘" />
        </BackButton>
        <TitleWrapper>
          <Title>{schedule.name || '위시 리스트'}</Title>
          <ScheduleDateWrapper>
            <Icon src={calendarIcon} alt="달력 아이콘" />
            <ScheduleDate>{schedule.date}</ScheduleDate>
          </ScheduleDateWrapper>
        </TitleWrapper>
        <SectionWrapper>
          <SectionTitle>위시리스트 보기</SectionTitle>
          <AddButton onClick={handleAddItems} disabled={selectedItems.length === 0}>
            추가하기
          </AddButton>
        </SectionWrapper>
        <WishList>
          {wishListItems.map((item, index) => (
            <WishListItem
              key={item.wishId}
              onClick={() => handleItemClick(index)}
              selected={selectedItems.includes(index)}
            >
              <WishListItemContent>
                <WishListItemTitle>{item.title}</WishListItemTitle>
                <WishListItemLocation>{item.location}</WishListItemLocation>
              </WishListItemContent>
              <RemoveButton
                onClick={(e) => {
                  e.stopPropagation(); // 부모 onClick 이벤트 전파 방지
                  handleRemoveItem(index);
                }}
              >
                X
              </RemoveButton>
            </WishListItem>
          ))}
        </WishList>
      </ContentWrapper>
      <BottomNav />
    </Container>
  );
};

export default WishListPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

const ContentWrapper = styled.div`
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  position: relative;
`;

const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const TitleWrapper = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  margin-top: 60px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0 10px 20px;
  text-align: left;
`;

const ScheduleDateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const ScheduleDate = styled.p`
  font-size: 15px;
  color: #666;
`;

const SectionWrapper = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const WishList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const WishListItem = styled.div`
  background-color: #fff;
  width: 320px;
  padding: 15px;
  border-radius: 50px;
  border: 2px solid #ddd;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.3s, background-color 0.3s;

  &:hover {
    border: 2px solid #f12e5e;
  }

  ${(props) =>
    props.selected &&
    `
  border-color: #f12e5e;
  background-color: #fde2e4;
`}
`;

const WishListItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const WishListItemTitle = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

const WishListItemLocation = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0 0;
`;

const RemoveButton = styled.button`
  background: #f12e5e;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;

  &:hover {
    background: #d11a45;
  }
`;

const AddButton = styled.button`
  width: 100px;
  padding: 10px;
  font-size: 16px;
  background-color: #f12e5e;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #d11a45;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
