// utils/hotelResearch.js
export const fetchHotels = async (location, dates, adults, children) => {
    try {
      const queryString = new URLSearchParams({
        location,
        checkIn: dates.startDate,
        checkOut: dates.endDate,
        adults,
        children,
      }).toString();
  
      const response = await fetch(`http://travelday-env.eba-zmxjim7g.ap-northeast-2.elasticbeanstalk.com/api/hotels?${queryString}`);
      
      if (!response.ok) {
        throw new Error(`네트워크 에러: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("fetch 실패:", error);
      return null; 
    }
  };
  