import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://03037d8f733436db9cc28b8e01b367f3@o4507814026543104.ingest.us.sentry.io/4507825093607424",
    integrations: [
        Sentry.feedbackIntegration({
            // Additional SDK configuration goes in here, for example:
            colorScheme: "system",
            showBranding: false,
            triggerLabel: "버그 신고하기",
            triggerAriaLabel: "버그 신고하기",
            formTitle: "버그 신고하기",
            submitButtonLabel: "제출",
            cancelButtonLabel: "취소",
            addScreenshotButtonLabel: "사진 등록",
            removeScreenshotButtonLabel: "사진 삭제",
            nameLabel: "제보자",
            namePlaceholder: "이름을 입력해주세요",
            emailLabel: "이메일",
            isRequiredLabel: "(필수)",
            messageLabel: "버그 설명",
            messagePlaceholder: "상황을 자세하게 설명해주세요. \n감사히 읽고 수정 조치하겠습니다!",
            successMessageText: "신고가 접수되었어요. 감사합니다!"

        }),
    ],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
