import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 API의 기본 URL
  withCredentials: true, // 쿠키를 포함한 CORS 요청을 위해 true로 설정
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 오류 처리
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 쿠키에 저장된 리프레시 토큰을 이용해 새로운 액세스 토큰을 요청
        const response = await axios.post('/api/user/refresh', null, {
          baseURL: 'http://localhost:8080',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키를 포함한 CORS 요청을 위해 true로 설정
        }); 
        
        console.log('새로운 액세스 토큰 왔다!');
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 새로운 액세스 토큰으로 원래 요청을 다시 설정
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 원래 요청을 다시 시도
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log('뭐지?!?!?!??!?!?');
        console.error('리프레시 토큰도 만료됨:', err);
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
