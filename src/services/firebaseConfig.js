// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAQ_EsbtsQfB6a1e9ySnUgnyZ69sAsXdHA",
  authDomain: "dung-70a41.firebaseapp.com",
  projectId: "dung-70a41",
  storageBucket: "dung-70a41.appspot.com",
  messagingSenderId: "698636465474",
  appId: "1:698636465474:web:13176c2e117b6856c3c4db",
  measurementId: "G-2NCE5L82NQ"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BNXS7gNtV_9udxoEcVtzhmERDeDP5V2wjbWz-xIFrCpZw2iI-T-0zgIE-ArW8KMN9VlBq76XJOXgAJptljApu9I' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
