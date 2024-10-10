// /public/firebase-messaging-sw.js
importScripts(
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
    self.skipWaiting();
});

self.addEventListener("activate", function (e) {
    console.log("fcm service worker가 실행되었습니다.");
});

const firebaseConfig = {
    apiKey: "AIzaSyB8gOvYAD2c_sVuRZKMhfn13wXd5mwHRp4",
    authDomain: "travelday-6fd20",
    projectId: "travelday-6fd20",
    storageBucket: "travelday-6fd20.appspot.com",
    messagingSenderId: "395135515942",
    appId: "1:395135515942:web:186fc14a2959f7fb0f55e7",
    measurementId: "G-2R5M42P16Z"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.title;
    const notificationOptions = {
        body: payload.body,
        icon: '/logo1.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});