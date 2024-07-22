import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <Container style={{ backgroundColor: "#211F4C", fontSize: "0.8em" }}>
        <Row>
          <Col md={9} style={{ textAlign: "left" }}>
            <h5 className="mb-3">Dúng - Thịt nhúng nước quả</h5>

            <p className="contact-item">
              Địa chỉ: 87 Phố Triệu Việt Vương, Bùi Thị Xuân, Hai Bà Trưng, Hà
              Nội , Việt Nam
            </p>
            <p className="contact-item">Hotline: 0986 610 910</p>
            <p className="contact-item">Email: dunglendungxuong@gmail.com</p>
          </Col>
          <Col md={3} className="d-flex flex-column align-items-sm-start align-items-md-end justify-content-sm-start justify-content-md-end">
            <p >
              @2023 Dúng, All Rights Reserved
            </p>
            <p  className="link header" style={{color: "#E6D5CA"}}>
              Theo dõi Dúng
            </p>
            <div className="social-icons">
              <a
                className="mx-2"
                href="https://www.facebook.com/dunglendungxuong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="social-icon" />
              </a>
              <a
                className="mx-2"
                href="https://www.instagram.com/dung.thitnhungnuocqua/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="social-icon" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
