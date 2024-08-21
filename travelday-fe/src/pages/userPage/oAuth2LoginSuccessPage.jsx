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
      console.log("로그인 성공");
      navigate('/');
  }, []);
  return <div></div>;
};

export default OAuth2LoginSuccessPage;