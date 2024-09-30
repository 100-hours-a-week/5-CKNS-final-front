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
    try {
        await registerServiceWorker();

        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const fcmToken = await getToken(messaging, {
                vapidKey: "BIs8qF7l2tBm1Ygtf7g8_xdmAHbAf15yQ9bx-UAEYuPmOPDsO2P8cAO2ntlkyrQ40r5wZ6-fXm7BqbXAR7PBCXk"
            });
            if (fcmToken) {
                console.log("Allow Notification", fcmToken);
                sendTokenToServer(fcmToken);// (토큰을 서버로 전송하는 로직)
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

const sendTokenToServer = async (fcmToken) => {
  try {
      const accessToken = localStorage.getItem('accessToken'); 

      const response = await axiosInstance.post(
          '/api/fcm',
          { fcmToken }, // 요청 바디
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`, 
                  'Content-Type': 'application/json', 
              },
          }
      );
      console.log("서버로 토큰 전달 완료:", response.data);
  } catch (error) {
      console.error("토큰 전달시 에러 발생:", error);
  }
};


export function registerServiceWorker() {
    return new Promise((resolve, reject) => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker
                    .register("/firebase-messaging-sw.js")
                    .then((registration) => {
                        console.log("Service Worker가 scope에 등록되었습니다.:", registration.scope);
                        resolve(registration);
                    })
                    .catch((err) => {
                        console.log("Service Worker 등록 실패:", err);
                        reject(err);
                    });
            });
        } else {
            reject(new Error("Service Workers are not supported in this browser."));
        }
    });
}