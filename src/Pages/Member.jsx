import React, { useState } from "react";
import { Container, Form, Button, Table, Alert, Modal } from "react-bootstrap";
import "../Pages/Css/Member.css";


const Member = () => {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handleSearch = async () => {
    try {
      const customerResponse = await fetch(`http://localhost:9999/customers?phone=${phone}`);
      const customerData = await customerResponse.json();

      if (customerData.length === 0) {
        setErrorMessage("Số điện thoại không tồn tại trong hệ thống.");
        setCustomer(null);
        setBookingHistory([]);
      } else {
        setCustomer(customerData[0]);
        setEditedCustomer(customerData[0]);
        setErrorMessage("");

        const bookingResponse = await fetch(`http://localhost:9999/bookings?phone=${phone}`);
        const bookingData = await bookingResponse.json();
        setBookingHistory(bookingData);
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
      [name]: value
    });
  };

  const handleUpdateCustomer = async () => {
    try {
      const response = await fetch(`http://localhost:9999/customers/${customer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedCustomer)
      });

      if (response.ok) {
        setCustomer(editedCustomer);
        setShowEditModal(false);
      } else {
        console.error("Error updating customer:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <Container className="member-container">
      <h1 className="member-header">Tra cứu thông tin khách hàng</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
        <Button variant="primary" onClick={handleSearch}>
          Tra cứu
        </Button>
      </Form>
      {customer && (
        <div className="customer-info mt-3">
          <h2>Thông tin khách hàng</h2>
          <p><strong>Tên:</strong> {customer.name}</p>
          <p><strong>Số điện thoại:</strong> {customer.phone}</p>
          <p><strong>Địa chỉ:</strong> {customer.address}</p>
          <p><strong>Tổng số tiền đã tiêu:</strong> {customer.totalSpent} VND</p>
          <p><strong>Điểm thành viên:</strong> {customer.points}</p>
          <Button variant="secondary" onClick={() => setShowEditModal(true)}>
            Cập nhật thông tin
          </Button>
        </div>
      )}
      {bookingHistory.length > 0 && (
        <div className="booking-history mt-3">
          <h2>Lịch sử đặt bàn</h2>
          <Table striped bordered hover responsive className="booking-table mt-3">
            <thead>
              <tr>
                <th>Tên người đặt</th>
                <th>Số điện thoại</th>
                <th>Số lượng người</th>
                <th>Ngày</th>
                <th>Giờ</th>
                <th>Ghi chú</th>
                <th>Tình trạng đặt bàn</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.people}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.notes}</td>
                  <td>{booking.status}</td>
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
            <Form.Group controlId="formEditAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editedCustomer.address}
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
