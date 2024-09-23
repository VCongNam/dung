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
            <h1>Dúng Dip & Roll</h1>
            <Link to="/menu">
              <Button
                style={{ marginRight: "10px", marginBottom: "10px" }}
                variant="dark"
                className="menu-btn"
              >
                 <span class="button-content">Menu </span>
              </Button>
            </Link>
            <Link to="/booking">
              <Button
                style={{ marginBottom: "10px" }}
                variant="dark"
                className="booking-btn"
              >
                 <span class="button-content">Đặt bàn </span>
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
