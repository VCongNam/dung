import React from 'react';
import { Container, Row, Col, Carousel, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Slide() {
  return (
    <Container>
      <Row>
        <Col md={8} className="d-none d-md-block">
          <Carousel style={{ height: '400px', overflow: 'hidden' }}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/assets/images/header2.jpg"
                style={{ objectFit: 'cover', height: '100%' }}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/assets/images/header3.jpg"
                style={{ objectFit: 'cover', height: '100%' }}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/assets/images/header5.jpg"
                style={{ objectFit: 'cover', height: '100%' }}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={4} className="d-none d-md-block">
          <h4>Latest News</h4>
          <ListGroup>
            <ListGroup.Item>News 1</ListGroup.Item>
            <ListGroup.Item>News 2</ListGroup.Item>
            <ListGroup.Item>News 3</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Slide;
