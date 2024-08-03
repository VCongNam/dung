import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      return registration.pushManager.getSubscription()
        .then(async (subscription) => {
          if (subscription) {
            return subscription;
          }

          const vapidPublicKey = 'BOgGcUqG44RnHQJM7HkisjLUkPbQOEP96ZZUrpq2MFyAvyO4RhZquEVYMspdbG7Zj99onZwdmubGQKDgvwzINvo';
          const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          });
        });
    })
    .then((subscription) => {
      fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
