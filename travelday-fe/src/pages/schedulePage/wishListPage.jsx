import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import calendarIcon from '../../images/filter/calendar.png';


const WishListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract travelRoomId from the URL
  const travelRoomId = window.location.pathname.split('/').pop();

  const { schedule } = location.state;
  const [wishListItems, setWishListItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        // 디버깅 로그 추가
        console.log('위시리스트 가져오기 시작, 방 ID:', travelRoomId);
        
        const response = await axiosInstance.get(`/api/rooms/${travelRoomId}/wishlist`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Wishlist fetch response:', response);

        if (response.status === 200) {
          setWishListItems(response.data.data);
        } else {
          console.error('Failed to fetch wishlist:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        if (error.response) {
          console.error('Server error response data:', error.response.data);
          console.error('Server error status code:', error.response.status);
        }
      }
    };

    fetchWishList();
  }, [travelRoomId]);

  const handleItemClick = (index) => {
    setSelectedItems(prevSelected =>
        prevSelected.includes(index)
            ? prevSelected.filter(item => item !== index)
            : [...prevSelected, index]
    );
  };

  const handleRemoveItem = async (index) => {
    const itemToRemove = wishListItems[index];
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axiosInstance.delete(`/api/rooms/${travelRoomId}/wishlist/${itemToRemove.wishId}`, {

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setWishListItems(prevItems => prevItems.filter((_, i) => i !== index));
        setSelectedItems(prevSelected => prevSelected.filter(item => item !== index));
      } else {
        console.error('위시리스트 가져오기 실패:', response.statusText);
      }
    } catch (error) {
      console.error('위시리스트를 불러오는 중 에러가 발생했습니다:', error);
    }
  };

  function postItems() {
    const selectedWishList =  selectedItems.map((item) => {
      return {
        name: wishListItems[item].name,
        latitude: wishListItems[item].latitude,
        longitude: wishListItems[item].longitude,
        scheduledDay : 0
      }
    })
    axiosInstance.post(`/api/rooms/${travelRoomId}/plan/list`, {
      body: selectedWishList
    }, {
    })
        .then(response => {
          console.log(response.data.data);
          navigate(`/schedule/${travelRoomId}`)
        })
        .catch(error => {
          console.error('여행방 정보 로드 중 오류 발생:', error);
        });
  }

  // const handleAddItems = () => {
  //   const selectedDetails = selectedItems.map(index => wishListItems[index]);
  //   navigate(`/schedule/${travelRoomId}`, {
  //     state: {
  //       schedule: {
  //         ...schedule,
  //         details: [...selectedDetails, ...(schedule.details || [])],
  //       },
  //       travelRoomId,
  //     },
  //   });
  // };

  const handleBackClick = () => {
    navigate(`/schedule/${travelRoomId}`, {
      state: { schedule, travelRoomId },
    });
  };

  return (
      <Container>
        <Header showBackButton={true} onBackClick={handleBackClick} />
        <ContentWrapper>
          <TitleWrapper>
            <Title>{schedule?.name || 'Wishlist'}</Title>
            <ScheduleDateWrapper>
              <Icon src={calendarIcon} alt="Calendar Icon" />
              <ScheduleDate>{schedule?.startDate} ~ {schedule?.endDate}</ScheduleDate>
            </ScheduleDateWrapper>
          </TitleWrapper>
          <SectionWrapper>
            <SectionTitle>위시리스트</SectionTitle>
            <AddButton onClick={postItems} disabled={selectedItems.length === 0}>
              장소에 추가하기
            </AddButton>
          </SectionWrapper>
          <WishList>
            {wishListItems.length > 0 ?
                wishListItems.map((item, index) => (
                    <WishListItem
                        key={item.wishId}
                        onClick={() => handleItemClick(index)}
                        selected={selectedItems.includes(index)}
                    >
                      <WishListItemContent>
                        <WishListItemTitle>{item.name}</WishListItemTitle>
                        <WishListItemLocation>{`Lat: ${item.latitude}, Lng: ${item.longitude}`}</WishListItemLocation>
                      </WishListItemContent>
                      <RemoveButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem(index);
                          }}
                      >
                        X
                      </RemoveButton>
                    </WishListItem>
                ))
                : <WishListItemTitle style={{marginTop:"20vh",textAlign:"center"}}>
                  위시리스트가 비어있습니다.<br/>지도에서 먼저 추가해주세요!
                </WishListItemTitle>
            }
          </WishList>
        </ContentWrapper>
        <BottomPadding />
        <BottomNav />
      </Container>
  );
};

export default WishListPage;

const BottomPadding = styled.div`
  height: 80px; 
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh + 80px);
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

const TitleWrapper = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 30px 0 10px 20px;
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
  padding-bottom: 20px;
  background-color: #fff;
  min-height: 100vh;
`;

const WishListItem = styled.div`
  background-color: #fff;
  width: 320px;
  padding: 15px;
  margin-bottom: 10px;
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
  width: 130px;
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
