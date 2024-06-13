import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../Pages/Css/Booking.css";
import * as xlsx from 'xlsx';

const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    phone: "",
    people: "2", // default to 2 people
    date: "",
    time: "",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Read existing data from the Excel file (if it exists)
      let workbook = xlsx.utils.book_new();
      const excelData = localStorage.getItem('bookingData');
      if (excelData) {
        workbook = xlsx.read(excelData, { type: 'binary' });
      }

      // Get the first worksheet or create a new one
      const worksheet = workbook.Sheets[workbook.SheetNames[0]] || xlsx.utils.json_to_sheet([]);

      // Append the new booking data to the worksheet
      const newRow = Object.values(bookingDetails);
      xlsx.utils.sheet_add_row(worksheet, newRow);

      // Write the updated data to the local storage
      const updatedExcelData = xlsx.write(workbook, { type: 'binary', bookType: 'xlsx' });
      localStorage.setItem('bookingData', updatedExcelData);
      console.log('Booking data saved to local storage successfully');
      // Handle success (e.g., show a success message, reset the form, etc.)
    } catch (error) {
      console.error('Error saving booking data:', error);
      // Handle error (e.g., show an error message, etc.)
    }
  };


  return (
    <Container className="booking-container">
      <h1 className="booking-header">Đặt Bàn</h1>
      <Form onSubmit={handleSubmit} className="booking-form">
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Tên người đặt</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={bookingDetails.name}
                onChange={handleChange}
                placeholder="Nhập tên của bạn"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={bookingDetails.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formPeople">
              <Form.Label>Số lượng người</Form.Label>
              <Form.Control
                as="select"
                name="people"
                value={bookingDetails.people}
                onChange={handleChange}
                required
              >
                {[...Array(29)].map((_, index) => (
                  <option key={index + 2} value={index + 2}>
                    {index + 2}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDate">
              <Form.Label>Ngày</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={bookingDetails.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formTime">
              <Form.Label>Giờ</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={bookingDetails.time}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formNotes">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={bookingDetails.notes}
                onChange={handleChange}
                placeholder="Nhập ghi chú của bạn (tuỳ chọn)"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3 booking-button">
          Đặt bàn
        </Button>
      </Form>
      <p className="booking-note mt-3">
        Chỉ khi nhận được SMS hoặc thông báo, yêu cầu của bạn mới được coi là đặt bàn thành công. Khi nhận được cuộc gọi nhỡ từ hệ thống vui lòng liên hệ lại hotline để được hỗ trợ đặt bàn!
      </p>
    </Container>
  );
};

export default Booking;
