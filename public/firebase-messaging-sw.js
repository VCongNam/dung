// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAQ_EsbtsQfB6a1e9ySnUgnyZ69sAsXdHA",
  authDomain: "dung-70a41.firebaseapp.com",
  projectId: "dung-70a41",
  storageBucket: "dung-70a41.appspot.com",
  messagingSenderId: "698636465474",
  appId: "1:698636465474:web:13176c2e117b6856c3c4db",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background message body.',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});