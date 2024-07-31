// eslint-disable-next-line
// import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Header from "./Components/Navbar/Header";
import Footer from "./Components/Footer/Footer";
import Booking from "./Pages/Booking";
import Menu from "./Pages/Menu";
import Member from "./Pages/Member";
import "./App.css"
import Boss from "./Pages/Boss";
// import { createClient } from "@supabase/supabase-js";
// import { messaging, requestPermission, onMessageListener } from "./services/firebaseConfig";
// import { supabase } from "./services/supabaseConfig";

const App = () => {
  // const [token, setToken] = useState(null);
  // const [notification, setNotification] = useState(null);

  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = await requestPermission();
  //     if (token) {
  //       setToken(token);
  //       // Gửi token này lên Supabase để lưu trữ
  //       saveFcmToken(token);
  //     }
  //   };

  //   const saveFcmToken = async (token) => {
  //     const { data, error } = await supabase.from("fcm_tokens").insert([{ token }]);
  //     if (error) {
  //       console.error("Error saving FCM token: ", error);
  //     } else {
  //       console.log("FCM token saved: ", data);
  //     }
  //   };

  //   getToken();

  //   const messageListener = onMessageListener().then((payload) => {
  //     setNotification(payload);
  //     console.log("Notification received: ", payload);
  //   });

  //   return () => {
  //     messageListener.then((listener) => listener());
  //   };
  // }, []);

  return (
    <div className="App" style={{backgroundColor:"#E6D5CA", height:"100vh", width:"100vw", display:"flex", flexDirection:"column", flex:"1"}}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutDung" element={<AboutUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/member" element={<Member />} />
          <Route path="/boss" element={<Boss />} />
        </Routes>
        <Footer className="fixed-bottom"/>
      </BrowserRouter>
    </div>
  );
};

export default App;
