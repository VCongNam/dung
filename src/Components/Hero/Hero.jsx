import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import hero from "../Assets/herofix1.jpg";

const Hero = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${hero})` }}>
      <Container fluid>
        <Row>
          <Col className="hero-text">
            <h1>Dúng xin chào bạn.</h1>
            <p>
              Hành trình mang đến những bữa ăn lành mạnh, tốt cho sức khoẻ bắt
              đầu từ nguồn nguyên liệu tươi sạch. Dúng mang đến "thịt nhúng nước
              quả" với nước dùng được nấu 100% từ hoa quả tươi, kết hợp cùng các
              loại giấm lên men tự nhiên nhà làm.
            </p>
            <Link to="/menu">
              <Button
                style={{ marginRight: "10px", marginBottom: "10px" }}
                variant="dark"
              >
                Menu
              </Button>
            </Link>
            <Link to="/booking">
              <Button style={{ marginBottom: "10px" }} variant="dark">
                Đặt bàn
              </Button>
            </Link>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
