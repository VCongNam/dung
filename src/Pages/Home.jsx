import React from "react";
import Hero from "../Components/Hero/Hero";
import ImageCarousel from "../Components/Carousel/Carousel";
import { Row, Col, Image, Button } from "react-bootstrap";
import home1 from "../Components/Assets/home1.jpg";
import { Link } from "react-router-dom";
import "../Pages/Css/Home.css";
import AutoPlay from "../Components/CardSlider/CardSlider";

const Home = () => {
  return (
    <div>
      <Hero className="hero" />
     
      <div className="carousel-section">{/* <ImageCarousel /> */}</div>
      <div className="about-dung">
        <Row>
          <h3>DÚNG - THỊT NHÚNG NƯỚC QUẢ</h3>
        </Row>
        <Row>
          <Col>
            <Image className="h-40" src={home1} thumbnail />
          </Col>
          <Col>
            <h4>Chúng tôi là Dúng</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              illum, nesciunt aspernatur, id aut beatae reiciendis pariatur
              iste, voluptates aliquid iusto cum ex deleniti quidem voluptate
              molestiae veritatis eaque corrupti odio rem quis laborum itaque
              quisquam? Odio, harum, soluta repellat consectetur exercitationem
              aliquid nihil ratione architecto recusandae dicta odit ut
              voluptates quas voluptatibus ad delectus quos quis consequuntur
              vero ducimus fugiat? Odit tempora facere repudiandae doloribus
              laudantium ratione impedit deleniti laboriosam illum? Sint
              similique soluta quam harum laudantium, iusto dolores culpa cum,
              accusamus, recusandae veniam ipsam illum voluptatem! Animi
              recusandae amet quidem impedit officia unde dolore rem officiis
              minus nulla!
            </p>
            <Link to="/aboutDung">
              <Button className="btn">Tìm hiểu thêm về Dúng</Button>
            </Link>
          </Col>
        </Row>
        <Row>
        <h3>DÚNG QUA NHỮNG KHUNG HÌNH</h3>
          {" "}
          <AutoPlay />{" "}
        </Row>
      </div>
    </div>
  );
};

export default Home;
