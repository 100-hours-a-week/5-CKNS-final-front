const BASE_URL = 'http://travelday-env.eba-zmxjim7g.ap-northeast-2.elasticbeanstalk.com/api';

export const getFlights = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString(); 
    const response = await fetch(`${BASE_URL}/flights?${queryString}`);
    
    if (!response.ok) {
      throw new Error('네트워크 에러');
    }

    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error('fetch 실패:', error);
    throw error;
  }
};
