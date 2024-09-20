// eslint-disable-next-line
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Header from "./Components/Navbar/Header";
import Footer from "./Components/Footer/Footer";
import Booking from "./Pages/Booking";
import Menu from "./Pages/Menu";
import "./App.css";
import Boss from "./Pages/Boss";
import { requestForToken, onMessageListener } from "./services/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    requestForToken();
  }, []);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        toast.info(`New booking: ${payload.notification.body}`);
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#E6D5CA",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        flex: "1",
      }}
    >
      <ToastContainer />
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutDung" element={<AboutUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/boss" element={<Boss />} />
          <Route path="/zalo-redirect" element={<openUrlInWebview />} />
        </Routes>
        <Footer className="fixed-bottom" />
      </HashRouter>
    </div>
  );
};

export default App;

