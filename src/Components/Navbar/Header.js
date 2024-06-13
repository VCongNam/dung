import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../Assets/logo.png";
import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function BasicExample() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  return (
    <Navbar className="fixed-top" expanded={expanded} expand="lg" style={{ backgroundColor: "#D8C4B9" }}>
      <Container fluid="md">
        <Navbar.Brand href="#home">
          <img alt="" src={logo} />{" "}
          <span style={{ fontWeight: "600" }}>Dúng</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={handleClose}>
              Trang chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/aboutDung" onClick={handleClose}>
              Về Dúng
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" onClick={handleClose}>
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/booking" onClick={handleClose}>
              Đặt bàn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
