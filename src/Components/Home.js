import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";

function Home() {
    const titles = [
        "Video Graphic Cards",
        "Monitors",
        "Headphones",
        "Laptops",
        "Computer Memories",
        "Motherboards",
        "CPU",
        "PSU",
      ];
    

  return (
    <Container>
      <Row xs={1} sm={2} md={4} className="g-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant="top"
                src={`/assets/images/header${idx + 1}.jpg`}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
              <Card.Title>{titles[idx]}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
