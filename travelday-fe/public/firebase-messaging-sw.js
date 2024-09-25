firebase.initializeApp({
    apiKey: "AIzaSyB8gOvYAD2c_sVuRZKMhfn13wXd5mwHRp4",
    authDomain: "travelday-6fd20.firebaseapp.com",
    projectId: "travelday-6fd20",
    storageBucket: "travelday-6fd20.appspot.com",
    messagingSenderId: "395135515942",
    appId: "1:395135515942:web:186fc14a2959f7fb0f55e7"
});

const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo1.png' // 알림에 표시될 아이콘 경로 수정 필요 목업임

    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("install", function (e) {
    console.log("fcm sw install..");
    self.skipWaiting();
});

self.addEventListener("activate", function (e) {
    console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
    console.log("push: ", e.data.json());
    if (!e.data.json()) return;

    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
        body: resultData.body,
        icon: resultData.image,

    };
    console.log("push: ", { resultData, notificationTitle, notificationOptions });

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
    console.log("notification click");
    // const url = "/";
    event.notification.close();
    // event.waitUntil(clients.openWindow(url));
});