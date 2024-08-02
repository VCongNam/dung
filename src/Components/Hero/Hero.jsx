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
            <p >
              thêm văn bản nếu muốn ạ
            </p>
            <Link to="/menu">
              <Button style={{marginRight: "10px", marginBottom: "10px"}} variant="dark">Tham khảo Menu</Button>
            </Link>
            <Link to="/booking">
              <Button style={{ marginBottom: "10px"}} variant="dark">Đặt bàn</Button>
            </Link>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;