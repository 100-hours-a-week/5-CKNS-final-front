import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axiosInstance from "./utils/axiosInstance";

const firebaseConfig = {
    apiKey: "AIzaSyB8gOvYAD2c_sVuRZKMhfn13wXd5mwHRp4",
    // authDomain: "travelday-6fd20.firebaseapp.com",
    projectId: "travelday-6fd20",
    storageBucket: "travelday-6fd20.appspot.com",
    messagingSenderId: "395135515942",
    appId: "1:395135515942:web:186fc14a2959f7fb0f55e7",
    measurementId: "G-2R5M42P16Z"
};

// // Firebase 초기화
// const app = initializeApp(firebaseConfig);
//
// // // FCM 초기화
// const messaging = getMessaging(app);
// //
// export const requestForToken = (setTokenFound) => {
//   return getToken(messaging, { vapidKey: "BIs8qF7l2tBm1Ygtf7g8_xdmAHbAf15yQ9bx-UAEYuPmOPDsO2P8cAO2ntlkyrQ40r5wZ6-fXm7BqbXAR7PBCXk" })
//     .then((currentToken) => {
//       if (currentToken) {
//         // FCM 토큰을 백엔드로 전송하는 함수 호출
//         sendTokenToServer(currentToken).then(response =>{console.log(response);});
//         setTokenFound && setTokenFound(true); // setTokenFound가 전달된 경우에만 호출
//       } else {
//         setTokenFound && setTokenFound(false);
//       }
//     })
//     .catch((err) => {
//       console.error("An error occurred while retrieving token. ", err);
//       setTokenFound && setTokenFound(false);
//     });
// };
//
// const sendTokenToServer = async (token) => {
//     try {
//     const response = await axiosInstance.post('/api/fcm',
//       { token }, // 요청 바디
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );
//
//     console.log("서버로 토큰 전달 완료:", response.data);
//   } catch (error) {
//     console.error("토큰 전달시 에러 발생:", error);
//   }
// };

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
    console.log("권한 요청 중...");

    const permission = await Notification.requestPermission();
    if (permission === "denied") {
        console.log("알림 권한 허용 안됨");
        return;
    }

    console.log("알림 권한이 허용됨");

    const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    if (token) console.log("token: ", token);
    else console.log("Can not get Token");

    onMessage(messaging, (payload) => {
        console.log("메시지가 도착했습니다.", payload);
        // ...
    });
}

requestPermission();