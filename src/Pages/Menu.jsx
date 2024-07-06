import React, { useEffect, useState } from 'react';
import Hero from "../Components/Hero/Hero";
import { Col, Container, Row, Form, Card } from 'react-bootstrap';
import supabase from '../services/supabaseConfig'; // Import supabase client

const Menu = () => {
  const categories = ["Thịt gọi thêm", "Viên gọi thêm", "Rau gọi thêm", "Món cuốn sẵn", "Đồ uống", "Khác"];
  const [dataMenu, setDataMenu] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('menu').select('*');
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setDataMenu(data);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter(category => category !== value));
    }
  };

  const renderMenuItems = (category) => {
    return dataMenu
      .filter(item => selectedCategories.length === 0 || selectedCategories.includes(item.category))
      .filter(item => item.category === category)
      .map(item => (
        <Col key={item.id} xs={12} md={6} lg={4}>
          <Card className="menu-item mb-4">
            <Card.Body style={{fontFamily: "Roboto Mono"}}>
              <Card.Title>{item.name}</Card.Title>
              {item.price && <Card.Text>Giá tiền: {item.price}</Card.Text>}
              {item.notes && <Card.Text>{item.notes.split("\n").map((note, index) => (
                <span key={index}>{note}<br /></span>
              ))}</Card.Text>}
            </Card.Body>
          </Card>
        </Col>
      ));
  };

  const hasItemsInCategory = (category) => {
    return dataMenu.some(item => selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
           dataMenu.some(item => item.category === category);
  };

  return (
    <div>
      <Hero />
      <Container>
        <Row>
          <h1 className='text-center mt-5'>MENU</h1>
        </Row>
        <Row>
          <h4>Món chính</h4>
          <Card className="menu-item mb-4">
            <Card.Body>
              <Card.Title style={{fontFamily: "Roboto Mono"}}>123.000 VND/ người</Card.Title>
              <Card.Text style={{fontFamily: "Roboto Mono"}}>
                Lựa chọn loại giấm bạn thích:
                <br />- Giấm vải thiều 
                <br />- Giấm táo mèo 
                <br />- Giấm táo xanh
                <br />- Giấm mơ
                <br />- Giấm trà xanh (+50k/nồi) 
                <br />Món nhúng đi kèm: Bắp bò tươi, gầu bò chín, rau nhúng, rau cuốn
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row className='mt-4'>
          <Col xs={12} md={4} className="d-none d-sm-block">
            <h3>Filters</h3>
            {categories.map(category => (
              <Form.Check
                style={{fontFamily: "Roboto Mono"}}
                key={category}
                type="checkbox"
                label={category}
                value={category}
                onChange={handleCategoryChange}
              />
            ))}
          </Col>
          <Col xs={12} md={8}>
            <Row>
              {categories.map(category => (
                hasItemsInCategory(category) && (
                  <React.Fragment key={category}>
                    <h3>{category}</h3>
                    <Row>{renderMenuItems(category)}</Row>
                  </React.Fragment>
                )
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Menu;
