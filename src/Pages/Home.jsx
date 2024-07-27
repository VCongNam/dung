import React from "react";
import Hero from "../Components/Hero/Hero";
import { Row, Col, Image, Button } from "react-bootstrap";
import home1 from "../Components/Assets/home1.jpg";
import { Link } from "react-router-dom";
import "../Pages/Css/Home.css";
import AutoPlay from "../Components/CardSlider/CardSlider";
import View from "../Components/Album/Album";

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
            <p style={{ color: "black" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
              facere molestiae ullam quam blanditiis nam. Ratione repellendus
              asperiores soluta explicabo ducimus. Amet optio odio aliquid eius
              beatae! Laudantium tempore deserunt voluptas soluta totam?
              Deleniti optio doloremque quidem illo similique corporis, sit
              porro voluptate, maxime culpa quod magni! Sequi hic laudantium
              aperiam quibusdam voluptas praesentium sit nihil id, dolores
              adipisci ducimus amet veritatis ipsum minus quidem ut blanditiis,
              nemo culpa voluptatibus sed earum. Inventore numquam dolore
              exercitationem optio expedita velit iusto. Rerum sed doloribus,
              voluptatem praesentium iusto recusandae, sapiente sequi quia,
              optio corporis quae suscipit! Aliquid explicabo quos rerum
              mollitia magni.
            </p>
            <Link to="/aboutDung">
              <Button style={{ fontFamily: "Roboto Mono" }} className="btn">
                Tìm hiểu thêm về Dúng
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <h3 className="mt-5">KHÁCH HÀNG NÓI GÌ VỀ DÚNG</h3>
          <AutoPlay />
        </Row>

        <Row>
          <h3 className="mt-5">DÚNG QUA NHỮNG KHUNG HÌNH</h3>
          <div style={{ alignItems: "center" }}>
            <View />
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Home;
