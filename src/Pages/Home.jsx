// Home.js

import React from "react";
import Hero from "../Components/Hero/Hero";
import { Row, Col, Image, Button } from "react-bootstrap";
import home1 from "../Components/Assets/home1.jpg";
import { Link } from "react-router-dom";
import "../Pages/Css/Home.css";
import AutoPlay from "../Components/CardSlider/CardSlider";
import fb1 from "../Components/Assets/fb1.png";
import fb2 from "../Components/Assets/fb2.png";
import fb3 from "../Components/Assets/fb3.png";
import fb4 from "../Components/Assets/fb4.png";
import fb5 from "../Components/Assets/fb5.png";
import Gallery from "../Components/Album/Album";

const Home = () => {
  return (
    <div>
      <Hero className="hero" />
      <div className="about-dung">
        <Row>
          <h3 className="mt-5">DÚNG - THỊT NHÚNG NƯỚC QUẢ</h3>
        </Row>
        <Row>
          <Col>
            <Image src={home1} thumbnail />
          </Col>
          <Col>
            <h4 style={{ fontFamily: "Roboto Mono" }}>
              CHÚNG MÌNH LÀ GIA ĐÌNH DÚNG
            </h4>
            <p style={{ color: "black", fontFamily: "Roboto Mono" }}>
              Đây là một văn bản tiếng việt để test xem có bị khó đọc không. Ra
              xã hội làm ăn vươn trải, liều thì ăn nhiều, không liều thì ăn ít.
              Muốn thành công thì phải chấp nhận trải qua đắng cay ngọt bùi. Làm
              ăn muốn kiếm được tiền thì phải chấp nhận mạo hiểm, nguy hiểm một
              tí nhưng trong tầm kiểm soát bạn hiểu chưa. Xã hội này, chỉ có
              làm, chịu khó cần cù thì bù siêng năng. Chỉ có làm thì mới có ăn.
              Những cái loại không làm mà đòi có ăn thì ăn đầu ####, ăn ###.Ra
              xã hội làm ăn vươn trải, liều thì ăn nhiều, không liều thì ăn ít.
              Muốn thành công thì phải chấp nhận trải qua đắng cay ngọt bùi. Làm
              ăn muốn kiếm được tiền thì phải chấp nhận mạo hiểm, nguy hiểm một
              tí nhưng trong tầm kiểm soát bạn hiểu chưa. Xã hội này, chỉ có
              làm, chịu khó cần cù thì bù siêng năng. Chỉ có làm thì mới có ăn.
              Những cái loại không làm mà đòi có ăn thì ăn đầu ####, ăn ###.
            </p>
            <Link to="/aboutDung">
              <Button style={{ fontFamily: "Roboto Mono" }} className="btn">
                Tìm hiểu thêm về Dúng
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <h3 className="mt-5">DÚNG QUA NHỮNG KHUNG HÌNH</h3>
          <AutoPlay />
        </Row>

        <Row>
          <h3 className="mt-5">Khách hàng nói gì về Dúng</h3>
          <Row className="image-row">
            <Col className="image-col">
              <Image src={fb1} className="gallery-image" />
            </Col>
            <Col className="image-col">
              <Image src={fb2} className="gallery-image" />
            </Col>
            <Col className="image-col">
              <Image src={fb3} className="gallery-image" />
            </Col>
            <Col className="image-col">
              <Image src={fb4} className="gallery-image" />
            </Col>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default Home;
