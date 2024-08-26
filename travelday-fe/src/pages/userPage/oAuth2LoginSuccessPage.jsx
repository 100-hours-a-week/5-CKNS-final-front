import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuth2LoginSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (!accessToken) {
      console.log("로그인 실패");
      return;
    }

    const storeAccessToken = () => {
      // 로그인 성공 시 accessToken을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      console.log("로그인 성공");
    };

    const fetchNickname = async () => {
      try {
        const response = await fetch('https://api.thetravelday.co.kr/api/user', { 
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const { nickname } = data;  // 닉네임만 가져오기

          // 닉네임 로컬 스토리지에 저장
          localStorage.setItem('nickname', nickname);

          // 닉네임 확인
          console.log("Nickname:", nickname);
        } else {
          console.error('사용자 정보 요청 실패:', response.statusText);
        }
      } catch (error) {
        console.error('사용자 정보 요청 중 오류 발생:', error);
      }
    };

    storeAccessToken();   
    fetchNickname();     

    // 로그인 성공 후 메인 페이지로 이동
    navigate('/');
  }, [navigate, searchParams]);

  return <div>로그인 처리 중...</div>;
};

export default OAuth2LoginSuccessPage;
