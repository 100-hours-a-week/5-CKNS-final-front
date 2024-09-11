import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


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
        // console.log("FCM Token: ", currentToken);
        setTokenFound(true);
        // 토큰을 백엔드로 전송하는 함수 호출
        sendTokenToServer(currentToken);
      } else {
        // console.log("No registration token available.");
        setTokenFound(false);
      }
    })
    .catch((err) => {
      // console.log("An error occurred while retrieving token. ", err);
      setTokenFound(false);
    });
};

const sendTokenToServer = (token) => {
  // 서버로 토큰 전송
  fetch("https://api.thetravelday.co.kr/api/fcm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
  .then(response => response.json())
  // .then(data => console.log("Token sent to server:", data))
  .catch(error => console.error("Error sending token to server:", error));
};
