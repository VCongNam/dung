import React from "react";
import Hero from "../Components/Hero/Hero";
import { Container, Row } from "react-bootstrap";
import Dish from "../Components/MainDish/Dish";
import "./Css/Menu.css";

const Menu = () => {
  return (
    <div className="menu">
      <Hero />
      <Container style={{ backgroundColor: "#E6D5CA" }}>
        <Row>
          <h1
            style={{ fontFamily: "Comfortaa, sans-serif" }}
          >
            Menu
          </h1>
          <Dish />
        </Row>

        <Row className="mt-4">
          <MenuSection title="Thịt gọi thêm">
            <MenuItem name="Lõi rựa bò" price="150k" />
            <MenuItem name="Ụ hoa" price="150k" />
            <MenuItem name="Bẻ tươi" price="150k" />
            <MenuItem name="Đuôi bò" price="123k" />
            <MenuItem name="Gân bò" price="123k" />
            <MenuItem name="Ba chỉ bò Mỹ" price="123k" />
            <MenuItem name="Bắp bò" price="123k" />
            <MenuItem name="Gầu bò" price="123k" />
            <MenuItem name="Chân giò" price="110k" />
            <MenuItem name="Nạm giòn" price="123k" />
          </MenuSection>

          <MenuSection title="Viên gọi thêm">
            <MenuItem name="Bò viên" price="123k" />
            <MenuItem name="Đậu hũ phô mai" price="123k" />
            <MenuItem name="Sandwich cá" price="123k" />
            <MenuItem name="Tàu hũ ky" price="123k" />
            <MenuItem name="Hủ tiếu cuộn" price="110k" />
            <MenuItem name="Viên tổng hợp" price="150k" />
          </MenuSection>

          <MenuSection title="Rau gọi thêm">
            <MenuItem name="Nấm tổng hợp" price="50k" />
            <MenuItem name="Rau nhúng tổng hợp" price="40k" />
            <MenuItem name="Rau cuốn tổng hợp" price="30k" />
          </MenuSection>

          <MenuSection title="Khác">
            <MenuItem name="Mì tôm" price="10k" />
            <MenuItem name="Bún" price="20k" />
            <MenuItem name="Đậu phu" price="30k" />
            <MenuItem name="Váng đậu" price="30k" />
            <MenuItem name="Quẩy" price="30k" />
          </MenuSection>

          <MenuSection title="Món cuốn sẵn (3 cuốn)">
            <MenuItem name="Bò - cải cay - tảo" price="79k" />
            <MenuItem name="Tôm - tóp mỡ - dưa" price="89k" />
            <MenuItem name="Chân giò - chả ram - xoài" price="79k" />
            <MenuItem name="Tai heo - rau thơm" price="79k" />
            <MenuItem name="Lươn nướng - măng tây" price="89k" />
            <MenuItem name="Đậu phụ - bắp cải tím" price="69k" />
            <MenuItem
              name="Cuốn 3 loại (tôm - chân giò - tai heo)"
              price="89k"
            />
            <MenuItem name="Cuốn 3 loại (bò - đậu - lươn nướng)" price="89k" />
          </MenuSection>

          <MenuSection title="Đồ uống">
            <MenuItem name="Nước sâu non" price="45k" />
            <MenuItem name="Trà đậu tằm" price="50k" />
            <MenuItem name="Trà Thái đỏ" price="45k" />
            <MenuItem name="Soda mơ/quất/sấu" price="50k" />
            <MenuItem name="Trà táo bạc hà" price="50k" />
            <MenuItem name="Trà quất" price="30k" />
            <MenuItem name="Trà nhài đá (bình)" price="30k" />
            <MenuItem name="Coke (Pepsi, Coca, 7up)" price="30k" />
            <MenuItem name="Bia (lon)" price="30k" />
            <MenuItem name="Lavie" price="30k" />
            <MenuItem name="Rượu mơ (120ml/550ml)" price="90/250k" />
            <MenuItem name="Rượu nếp sữa (120ml/550ml)" price="90/250k" />
          </MenuSection>
        </Row>
      </Container>
    </div>
  );
};

const MenuSection = ({ title, children }) => (
  <div className="menu-section">
    <h2>{title}</h2>
    {children}
  </div>
);

const MenuItem = ({ name, price }) => (
  <div className="menu-item">
    <span className="item-name">{name}</span>
    <span className="item-price">{price}</span>
  </div>
);

export default Menu;
