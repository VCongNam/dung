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
        {/* Cau chuyen thuong hieu */}
        <Row className="mb-4">
          <h1 className="section-title">Câu chuyện thương hiệu</h1>
        </Row>

        <Row className="mb-5">
          <Col md={7}>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo magni
              esse enim cumque mollitia voluptatum voluptatem. Maxime iusto
              ipsa, distinctio expedita ipsum exercitationem alias facilis,
              pariatur beatae rerum tenetur totam maiores consequatur sed
              cupiditate? Atque, asperiores dolor quod corrupti laborum eligendi
              fuga aut eum beatae reiciendis quasi necessitatibus praesentium
              dignissimos accusantium provident, eveniet hic corporis tempora
              incidunt! Quia deserunt id eos iste repudiandae excepturi, aperiam
              fugit eligendi, sint cupiditate ipsam, ipsa quis nisi! Dolorum,
              aperiam quibusdam? Voluptates sapiente esse maxime perspiciatis
              nam maiores, vel amet est itaque nihil exercitationem quasi quis
              corporis voluptatum? Doloribus quas tempore voluptates
              accusantium, odio numquam!
            </p>
          </Col>
          <Col>
            {" "}
            <img
              className="ingredient-image"
              src={nguyenlieu}
              alt="Nguyen lieu"
            />
          </Col>
        </Row>

        {/* Nguon nguyen lieu */}
        <Row className="mb-4">
          <h1 className="section-title">Nguồn nguyên liệu</h1>
        </Row>
        <Row>
          <Col md={7}>
            <p className="text">
              Nồi nước dùng cầu kỳ không chỉ bởi hậu vị thanh ngọt mà còn ở khâu
              chuẩn bị nguyên liệu, thời gian đun nấu. Căn bếp mỗi sáng luôn rộn
              ràng bởi tiếng cắt gọt của mía, táo, lê, dừa, dứa.. những loại củ
              quả tươi mát, thanh dịu. Dúng nói không với mì chính nên bạn hoàn
              toàn yên tâm vị ngọt của nước dùng đều đến từ trái cây thơm phức,
              chân thật. Mang đến một trải nghiệm ngon lành và tốt cho sức khỏe.
              Và giấm của Dúng cũng đặc biệt lắm lắm, chúng mình sử dụng các
              loại giấm thủ công được lên men tự nhiên từ hoa quả, như vải
              thiều, mơ hay táo mèo, táo xanh. Mỗi loại giấm sẽ có một sắc độ và
              hương vị chua khác nhau
            </p>
            <p className="text">
              Và giấm của Dúng cũng đặc biệt lắm lắm, chúng mình sử dụng các
              loại giấm thủ công được lên men tự nhiên từ hoa quả, như vải
              thiều, mơ hay táo mèo, táo xanh. Mỗi loại giấm sẽ có một sắc độ và
              hương vị chua khác nhau
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
          <h1 className="section-title">Giá trị cốt lõi</h1>
        </Row>
        <Row>
          <Col md={8}>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              odio, officia quibusdam cupiditate earum nostrum reiciendis.
              Deserunt, quod sequi quos nulla repellat placeat facilis molestias
              fugit pariatur est nihil nam sapiente praesentium consectetur
              laborum odio laudantium. Aliquid neque est repudiandae dolor
              velit? Voluptate repellat fuga voluptatum nobis inventore! Omnis
              illo ullam ipsam, saepe illum necessitatibus, voluptatem odio
              repellendus quos earum natus tenetur voluptate! Nostrum est
              officiis ut tempora! Error labore aliquam laudantium, deserunt
              natus ad laboriosam tempora. Quam veniam dolorem rerum illo ad at
              pariatur ea cumque reprehenderit sunt quo culpa commodi
              repellendus molestias, quas ducimus quos, eligendi hic
              repudiandae.
            </p>
          </Col>
          <Col md={4}>
            {" "}
            <img className="GTCL" src={GTCL} alt="GTCL" loading="lazy" />
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
          <Col md={6}>
            <img className="GTCL1" src={GTCL1} alt="GTCL" loading="lazy" />
          </Col>
          <Col md={6}>
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

        <Row className="mb-4">
          <h1 className="section-title">Nổi bật - Cảm hứng</h1>
        </Row>
        <Row>
          <Col md={7}>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              libero a, earum, architecto sapiente autem temporibus quod quam
              reprehenderit esse placeat. Incidunt porro officia eum, eos
              nesciunt dolor quia quos quas fugit quaerat assumenda omnis
              voluptatem repudiandae asperiores illo nostrum laudantium fuga
              quod voluptas tempora accusantium deserunt dignissimos sequi?
              Libero accusantium consequuntur delectus, mollitia iste beatae.
              Distinctio harum sit ipsum eveniet esse molestias aspernatur,
              fugit dolores facere voluptatem, voluptate mollitia iusto aut.
              Quibusdam inventore, architecto ea ut perspiciatis laudantium
              labore quia ducimus rerum placeat. Officia laboriosam fuga magnam
              voluptatibus vitae, odio earum placeat! Pariatur, nihil officia?
              Molestias neque modi explicabo!
            </p>
            <p className="text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
              optio placeat fugiat, beatae corrupti quam provident, sint labore
              esse aliquid quo hic, fuga nobis id suscipit adipisci qui sed
              facilis!
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
      </Container>
    </div>
  );
};

export default AboutUs;
