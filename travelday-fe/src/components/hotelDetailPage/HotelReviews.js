import React from 'react';
import styled from 'styled-components';

const HotelReviews = ({ reviews }) => {
  return (
    <ReviewList>
      {reviews.map((review, index) => (
        <ReviewItem key={index}>
          <ReviewText>{review.text}</ReviewText>
          <ReviewAuthor>- {review.author_name}</ReviewAuthor>
        </ReviewItem>
      ))}
    </ReviewList>
  );
};

export default HotelReviews;

const ReviewList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  margin-bottom: 20px;
`;

const ReviewText = styled.p`
  margin: 0;
`;

const ReviewAuthor = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #555;
`;
