import React, { useState } from "react";
import { Container, Form, Button, Table, Alert, Modal } from "react-bootstrap";
import "../Pages/Css/Member.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpeqefgjvhmpmngmjvhg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwZXFlZmdqdmhtcG1uZ21qdmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkxMjQ2MTgsImV4cCI6MjAzNDcwMDYxOH0.1QH8oyzrkRkidusb6dQ8ojs1h89mNLx5DrvI0ELp_Xg";
const supabase = createClient(supabaseUrl, supabaseKey);

const Member = () => {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({
    name: "",
    phone: "",
    booking_count: 0,
    loyalty_points: 0,
  });

  const handleSearch = async () => {
    try {
      // Fetch customer data
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .select("*")
        .eq("phone", phone)
        .single();

      if (customerError) throw customerError;

      if (customerData) {
        setCustomer(customerData);
        setEditedCustomer(customerData);
        setErrorMessage("");

        // Fetch booking history
        const { data: bookingData, error: bookingError } = await supabase
          .from("bookings")
          .select("*")
          .eq("phone", phone)
          .order("date", { ascending: false });

        if (bookingError) throw bookingError;

        setBookingHistory(bookingData);
      } else {
        setErrorMessage("Số điện thoại không tồn tại trong hệ thống.");
        setCustomer(null);
        setBookingHistory([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại sau.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({
      ...editedCustomer,
      [name]: value,
    });
  };

  const handleUpdateCustomer = async () => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .update(editedCustomer)
        .eq("id", customer.id);

      if (error) throw error;

      setCustomer(editedCustomer);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <Container className="member-container">
      <h1 className="member-header">Tra cứu thông tin khách hàng</h1>
      {errorMessage && (
        <Alert variant={errorMessage.includes("lỗi") ? "danger" : "warning"}>
          {errorMessage}
        </Alert>
      )}
      <Form className="search-form">
        <Form.Group controlId="searchPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        </Form.Group>
        <Button className="custom-button" onClick={handleSearch}>
          Tra cứu
        </Button>
      </Form>
      {customer && (
        <div className="customer-info">
          <h2>Thông tin khách hàng</h2>
          <p>
            <strong>Tên:</strong> {customer.name}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {customer.phone}
          </p>
          <p>
            <strong>Số lần đặt bàn:</strong> {customer.booking_count}
          </p>
          <p>
            <strong>Điểm thành viên:</strong> {customer.loyalty_points}
          </p>
          <Button
            className="custom-button"
            onClick={() => setShowEditModal(true)}
          >
            Cập nhật thông tin
          </Button>
        </div>
      )}
      {bookingHistory.length > 0 && (
        <div className="booking-history">
          <h2>Lịch sử đặt bàn</h2>
          <Table striped bordered hover className="booking-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Giờ</th>
                <th>Số người</th>
                <th>Ghi chú</th>
                <th>Trạng thái</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.people}</td>
                  <td>{booking.notes}</td>
                  <td>{booking.status}</td>
                  <td>{booking.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedCustomer.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEditPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editedCustomer.phone}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEditBookingCount">
              <Form.Label>Số lần đặt bàn</Form.Label>
              <Form.Control
                type="number"
                name="booking_count"
                value={editedCustomer.booking_count}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEditLoyaltyPoints">
              <Form.Label>Điểm thành viên</Form.Label>
              <Form.Control
                type="number"
                name="loyalty_points"
                value={editedCustomer.loyalty_points}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleUpdateCustomer}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Member;
