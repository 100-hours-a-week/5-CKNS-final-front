import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axiosInstance from "./utils/axiosInstance";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

let tokenRequestInProgress = false; // 중복 호출 방지를 위한 플래그

export const requestForToken = (setTokenFound) => {
  if (tokenRequestInProgress) return; // 이미 요청이 진행 중이면 함수 종료

  tokenRequestInProgress = true; // 토큰 요청이 시작되면 플래그를 true로 설정

  return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE__KEY })
    .then((currentToken) => {
      tokenRequestInProgress = false; // 요청이 완료되면 플래그를 false로 설정
      if (currentToken) {
        // FCM 토큰을 백엔드로 전송하는 함수 호출
        sendTokenToServer(currentToken);
        setTokenFound && setTokenFound(true); // setTokenFound가 전달된 경우에만 호출
      } else {
        setTokenFound && setTokenFound(false);
      }
    })
    .catch((err) => {
      tokenRequestInProgress = false; // 요청이 실패해도 플래그를 false로 설정
      console.error("An error occurred while retrieving token. ", err);
      setTokenFound && setTokenFound(false);
    });
};


const sendTokenToServer = async (fcmToken) => {
  try {
    const token = localStorage.getItem('accessToken'); 

    const response = await axiosInstance.post('/api/fcm', 
      { fcmToken }, // 요청 바디
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("서버로 토큰 전달 완료:", response.data);
  } catch (error) {
    console.error("토큰 전달시 에러 발생:", error);
  }

};
