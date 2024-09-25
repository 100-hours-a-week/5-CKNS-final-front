import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axiosInstance from "./utils/axiosInstance";

const firebaseConfig = {
    apiKey: "AIzaSyB8gOvYAD2c_sVuRZKMhfn13wXd5mwHRp4",
    authDomain: "travelday-6fd20",
    projectId: "travelday-6fd20",
    storageBucket: "travelday-6fd20.appspot.com",
    messagingSenderId: "395135515942",
    appId: "1:395135515942:web:186fc14a2959f7fb0f55e7",
    measurementId: "G-2R5M42P16Z"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// // FCM 초기화
const messaging = getMessaging(app);
//
export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "BIs8qF7l2tBm1Ygtf7g8_xdmAHbAf15yQ9bx-UAEYuPmOPDsO2P8cAO2ntlkyrQ40r5wZ6-fXm7BqbXAR7PBCXk" })
    .then((fcmRegistrationToken) => {
      if (fcmRegistrationToken) {
        console.log(fcmRegistrationToken);
        // FCM 토큰을 백엔드로 전송하는 함수 호출
        sendTokenToServer(fcmRegistrationToken);
      }
    })
    .catch((err) => {
      console.error("An error occurred while retrieving token. ", err);
    });
};

const sendTokenToServer = async (fcmRegistrationToken) => {
    try {
    const response = await axiosInstance.post('/api/fcm',
      { fcmRegistrationToken }, // 요청 바디
      {
      }
    );
    console.log("서버로 토큰 전달 완료:", response.data);
  } catch (error) {
    console.error("토큰 전달시 에러 발생:", error);
  }
};

onMessage(messaging, (payload) => {
    // console.log("알림 도착 ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    };

    if (Notification.permission === "granted") {
        new Notification(notificationTitle, notificationOptions);
    }
});

export async function handleAllowNotification() {
    registerServiceWorker(); // 나중에 설명
    try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
            });
            if (token) {
                sendTokenToServer(token);// (토큰을 서버로 전송하는 로직)
            } else {
                alert(
                    "토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요"
                );
            }
        } else if (permission === "denied") {
            alert(
                "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
            );
        }
    } catch (error) {
        console.error("푸시 토큰 가져오는 중에 에러 발생", error);
    }
}

export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("/firebase-messaging-sw.js")
                .then(function (registration) {
                    console.log(
                        "Service Worker가 scope에 등록되었습니다.:",
                        registration.scope
                    );
                })
                .catch(function (err) {
                    console.log("Service Worker 등록 실패:", err);
                });
        });
    }
}