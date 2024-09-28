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
            <p style={{ color: "black" }}>
              Hành trình mang đến những bữa ăn lành mạnh, tốt cho sức khoẻ bắt
              đầu từ nguồn nguyên liệu tươi sạch. Dúng mang đến "thịt nhúng nước
              quả" với nước dùng được nấu 100% từ hoa quả tươi, kết hợp cùng các
              loại giấm lên men tự nhiên nhà làm.
            </p>
            <Link to="/aboutDung">
              <Button  className="btn">
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
