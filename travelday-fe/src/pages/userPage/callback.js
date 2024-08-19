import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Callback = () => {
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      console.log("Authorization code:", code);

      axios.get(`http://localhost:8080/auth/kakao/callback=${code}`)
        .then(response => {
          console.log(response.data);
          // 성공 시 처리 로직
        })
        .catch(error => {
          console.error(error);
          // 실패 시 처리 로직
        });
    }
  }, [location]);


  return (
    <div>
      <h2>카카오 로그인 중...</h2>
    </div>
  );
};

export default Callback;
