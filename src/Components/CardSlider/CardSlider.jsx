import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardSlider.css";
import view1 from "../Assets/view1.jpg";
import view2 from "../Assets/view2.jpg";
import view3 from "../Assets/view3.jpg";
import view4 from "../Assets/view4.jpg";
import view5 from "../Assets/view5.jpg";
import view6 from "../Assets/view6.jpg";
import view7 from "../Assets/view7.jpg";

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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide">
          <img src={view1} alt="slide" />
        </div>
        <div className="slide">
        <img src={view5} alt="slide" />
        </div>
        <div className="slide">
        <img src={view3} alt="slide" />
        </div>
        <div className="slide">
        <img src={view2} alt="slide" />
        </div>
        <div className="slide">
        <img src={view4} alt="slide" />
        </div>
        <div className="slide">
        <img src={view6} alt="slide" />
        </div>
        <div className="slide">
        <img src={view7 } alt="slide" />
        </div>
        
      </Slider>
    </div>
  );
}

export default AutoPlay;
