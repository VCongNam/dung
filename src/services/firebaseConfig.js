import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyAQ_EsbtsQfB6a1e9ySnUgnyZ69sAsXdHA",
  authDomain: "dung-70a41.firebaseapp.com",
  projectId: "dung-70a41",
  storageBucket: "dung-70a41.appspot.com",
  messagingSenderId: "698636465474",
  appId: "1:698636465474:web:13176c2e117b6856c3c4db",
  measurementId: "G-2NCE5L82NQ",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BNXS7gNtV_9udxoEcVtzhmERDeDP5V2wjbWz-xIFrCpZw2iI-T-0zgIE-ArW8KMN9VlBq76XJOXgAJptljApu9I",
    });
    if (token) {
      console.log("Token received: ", token);
      return token;
    }
  } catch (error) {
    console.error("Error getting token: ", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
