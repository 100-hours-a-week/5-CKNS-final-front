import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HotelDetailPage = () => {
  const { hotelName } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;
  // console.log("API Key:", apiKey);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        // 1. findplacefromtext API로 place_id 가져오기
        const textSearchResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(hotelName)}&inputtype=textquery&fields=place_id&key=${apiKey}`
        );
        const textSearchData = await textSearchResponse.json();

        if (textSearchData.candidates && textSearchData.candidates.length > 0) {
          const placeId = textSearchData.candidates[0].place_id;

          // 2. place/details API로 호텔의 상세 정보 가져오기
          const detailsResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,rating,formatted_phone_number,photos&key=${apiKey}`
          );
          const detailsData = await detailsResponse.json();

          if (detailsData.result) {
            setHotelDetails(detailsData.result);
          } else {
            setError("Failed to fetch hotel details.");
          }
        } else {
          setError("No results found for the specified hotel.");
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchHotelData();
  }, [hotelName, apiKey]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hotelDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{hotelDetails.name}</h1>
      <p>Address: {hotelDetails.formatted_address}</p>
      <p>Rating: {hotelDetails.rating}</p>
      <p>Phone: {hotelDetails.formatted_phone_number}</p>
      {hotelDetails.photos && hotelDetails.photos.length > 0 && (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotelDetails.photos[0].photo_reference}&key=${apiKey}`}
          alt={hotelDetails.name}
        />
      )}
    </div>
  );
};

export default HotelDetailPage;
