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

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// FCM 초기화
const messaging = getMessaging(app);

export const requestForToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        // FCM 토큰을 백엔드로 전송하는 함수 호출
        sendTokenToServer(currentToken);
        setTokenFound && setTokenFound(true); // setTokenFound가 전달된 경우에만 호출
      } else {
        setTokenFound && setTokenFound(false);
      }
    })
    .catch((err) => {
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