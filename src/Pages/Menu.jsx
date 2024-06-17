import React from 'react'
import Hero from "../Components/Hero/Hero";
import { Col, Container, Row } from 'react-bootstrap';

const Menu = () => {
  return (
    <div>
      <Hero/>
      <Container>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Menu