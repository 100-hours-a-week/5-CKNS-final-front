import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/shared/header.js';
import BottomNav from '../../components/shared/bottomNav.js';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import calendarIcon from '../../images/filter/calendar.png';
import backIcon from '../../images/header/back.png';

const WishListPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { schedule } = location.state || { schedule: { title: 'Default Title', date: '2024-01-01 ~ 2024-01-07', details: [] } };
  const [wishListItems, setWishListItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`https://api.thetravelday.co.kr/api/rooms/${id}/wishlist`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setWishListItems(response.data);
        } else {
          console.error('Failed to fetch wishlist:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishList();
  }, [id]);

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
      const response = await axios.delete(`https://api.thetravelday.co.kr/api/rooms/${id}/wishlist/${itemToRemove.wishId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setWishListItems(prevItems => prevItems.filter((_, i) => i !== index));
        setSelectedItems(prevSelected => prevSelected.filter(item => item !== index));
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
    }
  };

  const handleAddItems = () => {
    const selectedDetails = selectedItems.map(index => wishListItems[index]);
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
          <BackIcon src={backIcon} alt="Back Icon" />
        </BackButton>
        <TitleWrapper>
          <Title>{schedule.title || 'Wishlist'}</Title>
          <ScheduleDateWrapper>
            <Icon src={calendarIcon} alt="Calendar Icon" />
            <ScheduleDate>{schedule.date}</ScheduleDate>
          </ScheduleDateWrapper>
        </TitleWrapper>
        <SectionWrapper>
          <SectionTitle>Wishlist</SectionTitle>
          <AddButton onClick={handleAddItems} disabled={selectedItems.length === 0}>
            Add Items
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
                  e.stopPropagation(); // Prevent event bubbling
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
