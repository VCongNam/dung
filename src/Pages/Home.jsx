import React from "react";
import Hero from "../Components/Hero/Hero";
import { Row, Col, Image, Button } from "react-bootstrap";
import home1 from "../Components/Assets/home1.jpg";
import { Link } from "react-router-dom";
import "../Pages/Css/Home.css";
import AutoPlay from "../Components/CardSlider/CardSlider";

const Home = () => {
  return (
    <div style={{ fontFamily: 'DFVN Grafika, sans-serif' }}>
      <Hero className="hero" />
      <div className="about-dung">
        <Row className="mt-5">
          <h3>DÚNG - THỊT NHÚNG NƯỚC QUẢ</h3>
        </Row>
        <Row>
          <Col>
            <Image  src={home1} thumbnail />
          </Col>
          <Col>
            <h4>Chúng tôi là Dúng</h4>
            <p>
             Đây là một văn bản tiếng việt để test xem có bị khó đọc không
            </p>
            <Link to="/aboutDung">
              <Button className="btn">Tìm hiểu thêm về Dúng</Button>
            </Link>
          </Col>
        </Row>

        <Row className="my-5">
        <h3>DÚNG QUA NHỮNG KHUNG HÌNH</h3>
          {" "}
          <AutoPlay />{" "}
        </Row>
      </div>
    </div>
  );
};

export default Home;
