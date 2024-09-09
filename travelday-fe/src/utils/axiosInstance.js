import axios from 'axios';

// 세션 만료 상태를 추적하는 변수
let isSessionExpired = false;

// 세션 만료 알림 및 리디렉션 함수
function handleSessionExpiration() {
  if (!isSessionExpired) {
    isSessionExpired = true; // 세션 만료 상태 설정
    alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
    localStorage.removeItem('accessToken');
    window.location.href = '/login'; // 로그인 페이지로 리디렉션
  }
}

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://api.thetravelday.co.kr', // 백엔드 API의 기본 URL
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
    if (error.response && error.response.status === 401) {
      const errorCode = error.response.data.code;

      if (errorCode === 'AU001' && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post('/api/user/refresh', null, {
            baseURL: 'https://api.thetravelday.co.kr',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, 
          }); 
          
          console.log('새로운 액세스 토큰 왔다!');
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          // 새로운 액세스 토큰으로 원래 요청을 다시 설정
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // 원래 요청을 다시 시도
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error('토큰 갱신에 실패:', err);
          handleSessionExpiration();
        }
      } else if (errorCode === 'AU002') {
        console.log('유효하지 않은 액세스 토큰입니다. 로그아웃 시킵니다.');
        handleSessionExpiration();
      } else if (errorCode === 'AU003') {
        console.log('접근 권한이 없는 액세스 토큰입니다.');
      } else if (errorCode === 'AU004') {
        console.log('리프레시 토큰도 만료되었습니다.');
        handleSessionExpiration();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
