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
            <p style={{textAlign:"justify",fontFamily: "Roboto Mono"}}>
              
            </p>
            <Link to="/menu">
              <Button style={{fontFamily: "Roboto Mono"}} variant="dark">Tham khảo Menu</Button>
            </Link>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;