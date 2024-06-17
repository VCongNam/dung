import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs"; 
// import Products from "./Pages/Products";
import Header from "../src/Components/Navbar/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Booking from "./Pages/Booking";
import Menu from "./Pages/Menu";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutDung" element={<AboutUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/menu" element={<Menu/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
