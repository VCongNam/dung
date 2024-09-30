import React, { useState, useEffect } from "react";
import { Col, Container, Row,Image } from "react-bootstrap";
import Dish from "../Components/MainDish/Dish";
import "./Css/Menu.css";
import supabase from "../services/supabaseConfig";
import demomenu1 from "../Components/Assets/demomenu1.jpg"

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

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const { data, error } = await supabase
        .from("menu")
        .select("*")
        .order("id"); 
      if (error) {
        console.error("Error fetching menu data:", error.message);
      } else {
        setMenu(data);
      }
    } catch (error) {
      console.error("Error fetching menu data:", error.message);
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const groupMenuByCategory = (menuItems) => {
    const categories = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    const groupedCategories = Object.keys(categories).reduce((acc, category, index) => {
      if (index % 2 === 0) {
        acc.push([category]);
      } else {
        acc[acc.length - 1].push(category);
      }
      return acc;
    }, []);

    return { categories, groupedCategories };
  };

  const { categories, groupedCategories } = groupMenuByCategory(menu);

  return (
    <div className="menu">
      <Container style={{ backgroundColor: "#E6D5CA" }}>
        <Row>
          <h1 className="menu-header">
            Menu
          </h1>
          
        </Row>
        <Row>
          <Col md={6}><Dish /></Col>
          <Col md={6}><Image className="d-none d-sm-block demoMenu" style={{width:"80%"}} src={demomenu1}/></Col>
        </Row>

        {groupedCategories.map(([category1, category2]) => (
          <Row className="mt-4" key={category1}>
            <Col md={6}>
              <MenuSection title={category1}>
                {categories[category1].sort((a, b) => a.id - b.id).map((item) => (
                  <MenuItem
                    key={item.id}
                    name={item.item_name}
                    price={formatCurrency(item.price)}
                  />
                ))}
              </MenuSection>
            </Col>
            {category2 && (
              <Col md={6}>
                <MenuSection title={category2}>
                  {categories[category2].sort((a, b) => a.id - b.id).map((item) => (
                    <MenuItem
                      key={item.id}
                      name={item.item_name}
                      price={formatCurrency(item.price)}
                    />
                  ))}
                </MenuSection>
              </Col>
            )}
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Menu;

