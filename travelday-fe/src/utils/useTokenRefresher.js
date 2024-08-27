import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useTokenRefresher = () => {
    const navigate = useNavigate(); // useNavigate를 커스텀 훅의 최상위에서 호출

    useEffect(() => {
        const api = axios.create({
            baseURL: 'http://api.thetravelday.co.kr',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let isRefreshing = false;
        let failedQueue = [];

        const processQueue = (error, token = null) => {
            failedQueue.forEach(prom => {
                if (error) {
                    prom.reject(error);
                } else {
                    prom.resolve(token);
                }
            });
            failedQueue = [];
        };

        const refreshAccessToken = async () => {
            const expiredToken = localStorage.getItem('access_token');
            try {
                const response = await api.post('/api/user/refresh', null, {
                    headers: {
                        'Authorization': `Bearer ${expiredToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200 && response.data.ok) {
                    console.log(data);
                    const newAccessToken = response.data.access_token;
                    localStorage.setItem('access_token', newAccessToken);
                    return newAccessToken;
                } else {
                    console.error('Failed to refresh token');
                    alert('토큰이 만료되어 로그아웃 되었습니다!');
                    navigate('/login'); 
                    return null;
                }
            } catch (error) {
                console.error('Error while refreshing access token:', error);
                alert('토큰이 만료되어 로그아웃 되었습니다!');
                navigate('/login');
                return null;
            }
        };

        const requestInterceptor = api.interceptors.request.use(
            config => {
                const token = localStorage.getItem('access_token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    if (isRefreshing) {
                        return new Promise(function(resolve, reject) {
                            failedQueue.push({ resolve, reject });
                        })
                            .then(token => {
                                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                                return api(originalRequest);
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            });
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    return new Promise(async (resolve, reject) => {
                        const newToken = await refreshAccessToken();
                        if (newToken) {
                            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
                            processQueue(null, newToken);
                            resolve(api(originalRequest));
                        } else {
                            processQueue(error, null);
                            reject(error);
                        }
                        isRefreshing = false;
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate]); // navigate를 useEffect의 의존성 배열에 추가
};

export default useTokenRefresher;
