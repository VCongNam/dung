import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Carousel.css";
import CR1 from "../Assets/CR1.jpg";
import CR2 from "../Assets/CR2.jpg";
import CR3 from "../Assets/CR3.jpg";
import CR4 from "../Assets/CR4.jpg";
import CR5 from "../Assets/CR5.jpg";
import { Container } from "react-bootstrap";

const images = [CR1, CR2, CR3, CR4, CR5];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <Container  className="carousel-container">
      <button onClick={handlePrev} className="carousel-button prev-button">
        {"<"}
      </button>
      <div className="image-wrapper">
        <div
          className="image-container"
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="carousel-image"
            />
          ))}
        </div>
      </div>
      <button onClick={handleNext} className="carousel-button next-button">
        {">"}
      </button>
    </Container>
  );
};

export default ImageCarousel;
