import React from "react";
import Hero from "../Components/Hero/Hero";
import { Col, Container, Row } from "react-bootstrap";
import nguyenlieu from "../Components/Assets/nvl.jpg";
import GTCL from "../Components/Assets/GTCL.jpg";
import GTCL1 from "../Components/Assets/GTCL1.jpg";
import "../Pages/Css/AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <Hero />
      <Container fluid="md" className="my-5">

        {/* Nguon nguyen lieu */}
        <Row className="mb-4">
          <h1 className="section-title my-2">
            Nước dùng của Dúng được làm từ gì?
          </h1>
        </Row>
        <Row>
         
          <Col md={7}>
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
        <Row className="mb-4">
          <h1 className="section-title my-2">
            Ngoài món nhúng ở Dúng còn có gì?
          </h1>
        </Row>
        <Row>
          <Col md={8}>
            <p className="text">
              Món cuốn sáng tạo, là món ăn chơi nhưng vẫn đủ đầy dinh dưỡng và
              no bụng. Bếp sẽ cuốn khi có order nên luôn đảm bảo độ tươi giòn
              của rau củ, bạn đừng ngại gọi thêm tóp mỡ hay chả ram vào chiếc
              cuốn béo tròn nhé, những nguyên liệu quen thuộc nhưng cũng thật
              mới mẻ được Dúng kết hợp để sử dụng chắc chắn sẽ khiến bạn cảm
              thấy thú vị đó.
            </p>
          </Col>
         

          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae magni
            neque earum dolores magnam vitae dicta obcaecati soluta, ab
            voluptatum delectus adipisci nobis impedit harum aspernatur quisquam
            quas voluptate quod reprehenderit quo modi natus officia iure! Autem
            optio officia veritatis in rerum. Enim, error laborum consectetur
            dolorum ratione impedit nostrum natus debitis nemo laboriosam
            commodi. Ut blanditiis nihil totam itaque adipisci debitis, ratione
            autem, dolor quibusdam omnis explicabo voluptatum? Aspernatur
            reiciendis fugit maiores voluptatem distinctio voluptate qui quasi
            possimus esse ipsum, accusamus, doloremque nesciunt, amet aperiam.
            Soluta distinctio non nemo!
          </p>
          <Col md={6} className="my-2">
            <img className="GTCL1" src={GTCL1} alt="GTCL" loading="lazy" />
          </Col>
          <Col md={6} className="my-2">
            <img className="GTCL1" src={GTCL1} alt="GTCL" loading="lazy" />
          </Col>
        </Row>
        <Row>
          <p className="text mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            numquam voluptas vero eum dignissimos, fugiat porro voluptatem
            dolores exercitationem earum nisi molestias modi cupiditate.
            Consectetur, necessitatibus nostrum voluptas cumque veniam
            excepturi, ad a aliquid distinctio, ea magnam ullam tempora quidem
            nulla hic error blanditiis ducimus rerum magni vero molestiae
            deleniti. Qui dignissimos voluptatum fugiat excepturi molestiae sit
            exercitationem eveniet error dolor rerum? Quod facere enim nobis
            magni maxime, blanditiis quidem a reprehenderit. Culpa voluptas
            rerum distinctio harum facilis, consectetur dolores. Commodi quo,
            aliquid, illo aliquam nulla eius qui, maiores delectus molestias
            exercitationem totam consequuntur nemo! Quaerat a ea tenetur quos!
          </p>
        </Row>


        
      </Container>
    </div>
  );
};

export default AboutUs;
