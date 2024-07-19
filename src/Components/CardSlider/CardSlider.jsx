import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardSlider.css";
import fb1 from "../Assets/fb1.png";
import fb2 from "../Assets/fb2.png";
import fb3 from "../Assets/fb3.png";
import fb4 from "../Assets/fb4.png";
import fb5 from "../Assets/fb5.png";
import fb6 from "../Assets/fb6.png";
import fb7 from "../Assets/fb7.png";
import fb8 from "../Assets/fb8.png";
import fb9 from "../Assets/fb9.png";
import fb10 from "../Assets/fb10.png";


function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide">
          <img src={fb1} alt="slide" />
        </div>
        <div className="slide">
          <img src={fb2} alt="slide" />
        </div>
        <div className="slide">
          <img src={fb3} alt="slide" />
        </div>
        <div className="slide">
          <img src={fb4} alt="slide" />
        </div>
        <div className="slide">
          <img src={fb5} alt="slide" />
        </div>
        <div className="slide">
          <img src={fb6} alt="slide" />
        </div>
        <div className="slide">
          <img src={fb7} alt="slide" />
        </div>
        <div className="slide">
          <img src={fb8} alt="slide" />
        </div>
        <div className="slide">
          <img src={fb9} alt="slide" />
        </div>
        <div className="slide">
          <img src={fb10} alt="slide" />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
