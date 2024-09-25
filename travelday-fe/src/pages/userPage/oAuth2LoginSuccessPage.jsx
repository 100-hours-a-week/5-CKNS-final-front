import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { requestForToken } from '../../firebase-messaging-sw.js';

const OAuth2LoginSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (!accessToken) {
      // 로그인 실패 시 처리
      // console.log("로그인 실패");
      return;
    }

    const storeAccessToken = () => {
      // 로그인 성공 시 accessToken을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      // console.log("로그인 성공");

      // 로그인 성공 후에 FCM 토큰 요청 및 서버로 전송
      // requestForToken().then(response => {console.log(response)} );
    };

    storeAccessToken();

    // 로그인 성공 후 메인 페이지로 이동
    navigate('/');
  }, [navigate, searchParams]);

  return <div>로그인 처리 중...</div>;
};

export default OAuth2LoginSuccessPage;
