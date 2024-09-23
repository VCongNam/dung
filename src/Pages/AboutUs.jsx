import React from "react";
import Hero from "../Components/Hero/Hero";
import { Col, Container, Row } from "react-bootstrap";
import nguyenlieu from "../Components/Assets/nvl.jpg";
import roll from "../Components/Assets/roll.jpg";
import "../Pages/Css/AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <Hero />
      <Container fluid="md" className="my-5">
        {/* Nguon nguyen lieu */}
        <Row className="mb-4"></Row>
        <Row>
          <Col>
            <p className="text">
              Hành trình mang đến những bữa ăn lành mạnh, tốt cho sức khoẻ bắt
              đầu từ nguồn nguyên liệu tươi sạch. Dúng mang đến "thịt nhúng nước
              quả" với nước dùng được nấu 100% từ hoa quả tươi, kết hợp cùng các
              loại giấm lên men tự nhiên nhà làm.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <h1 className="section-title my-2">
              Nước dùng của Dúng được làm từ gì?
            </h1>
            <p className="text">
              Nồi nước dùng cầu kỳ không chỉ bởi hậu vị thanh ngọt mà còn ở khâu
              chuẩn bị nguyên liệu, thời gian đun nấu. Căn bếp mỗi sáng luôn rộn
              ràng bởi tiếng cắt gọt của mía, táo, lê, dừa, dứa...những loại củ
              quả tươi mát, thanh dịu. Dúng nói không với mì chính nên bạn hoàn
              toàn yên tâm vị ngọt của nước dùng đều đến từ trái cây thơm phức,
              chân thật. Mang đến một trải nghiệm ngon lành và tốt cho sức khoẻ.
            </p>
          </Col>
          <Col>
            <img
              className="ingredient-image"
              src={nguyenlieu}
              alt="Nguyen lieu"
              loading="lazy"
            />
          </Col>
        </Row>

        {/* Gia tri cot loi */}
        <Row className="mb-4"></Row>
        <Row>
          <Col md={7}>
            <h1 className="section-title my-2">
              Ngoài món nhúng ở Dúng còn có gì?
            </h1>
            <p className="text">
              Món cuốn sáng tạo, là món ăn chơi nhưng vẫn đủ đầy dinh dưỡng và
              no bụng. Bếp sẽ cuốn khi có order nên luôn đảm bảo độ tươi giòn
              của rau củ, bạn đừng ngại gọi thêm tóp mỡ hay chả ram vào chiếc
              cuốn béo tròn nhé, những nguyên liệu quen thuộc nhưng cũng thật
              mới mẻ được Dúng kết hợp để sử dụng chắc chắn sẽ khiến bạn cảm
              thấy thú vị đó.
            </p>
          </Col>
          <Col>
            <img
              className="roll-image"
              src={roll}
              alt="Nguyen lieu"
              loading="lazy"
            />
          </Col>
        </Row>
        <Row className="mb-4"></Row>
        <Row>
          <Col>
            <p className="text">
              Trong một không gian tươi mát tràn ngập cây xanh, Dúng muốn bạn
              được hoà mình cùng thiên nhiên và thưởng thức những món ăn tươi
              mới, sạch lành. Nhúng và cuốn, mời bạn ghé Dúng và trải nghiệm.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
