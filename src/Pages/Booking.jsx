import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, Alert, Modal } from "react-bootstrap";
import "../Pages/Css/Booking.css";

const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    phone: "",
    people: "2", 
    date: "",
    time: "",
    notes: ""
  });

  const [bookings, setBookings] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:9999/bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate booking details
    if (parseInt(bookingDetails.people) <= 0) {
      alert("Số lượng người phải lớn hơn 0");
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    if (bookingDetails.date < currentDate) {
      alert("Bạn không thể đặt bàn cho ngày trong quá khứ");
      return;
    }

    try {
      // Prepare booking data with 'pending' status
      const newBooking = {
        ...bookingDetails,
        status: 'Chờ duyệt'
      };

      const response = await fetch('http://localhost:9999/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBooking)
      });

      if (response.ok) {
        console.log('Booking data saved to server successfully');
        const savedBooking = await response.json();
        setBookings([...bookings, savedBooking]);
        setBookingDetails({
          name: "",
          phone: "",
          people: "2", // reset to default 2 people
          date: "",
          time: "",
          notes: ""
        });
        setSuccessMessage("Đặt bàn thành công! Chúng tôi sẽ liên hệ với bạn sớm để xác nhận.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000); // Clear the success message after 5 seconds
      } else {
        console.error('Error saving booking data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving booking data:', error);
    }
  };

  const handleSearch = () => {
    const results = bookings.filter(booking => booking.phone === searchPhone);
    setFilteredBookings(results);
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setBookingDetails(booking);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9999/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Booking deleted successfully');
        setBookings(bookings.filter(booking => booking.id !== id));
        setFilteredBookings(filteredBookings.filter(booking => booking.id !== id));
      } else {
        console.error('Error deleting booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:9999/bookings/${editingBooking.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingDetails)
      });

      if (response.ok) {
        console.log('Booking updated successfully');
        const updatedBooking = await response.json();
        setBookings(bookings.map(booking => booking.id === updatedBooking.id ? updatedBooking : booking));
        setFilteredBookings(filteredBookings.map(booking => booking.id === updatedBooking.id ? updatedBooking : booking));
        setShowEditModal(false);
        setBookingDetails({
          name: "",
          phone: "",
          people: "2",
          date: "",
          time: "",
          notes: ""
        });
      } else {
        console.error('Error updating booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <Container className="booking-container">
      <h1 className="booking-header">Đặt Bàn</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
        <h6 className="my-3">Dúng sẽ sớm liên hệ với bạn để chốt lịch đặt bàn. Chỉ khi nhận được gọi xác nhận, yêu cầu của bạn mới được coi là đặt bàn thành công. Khi nhận được cuộc gọi nhỡ từ hệ thống vui lòng liên hệ lại hotline để được hỗ trợ đặt bàn!</h6>
      </Form>
      <div className="search-section">
        <h2 className="search-header">Tra cứu lịch sử đặt bàn</h2>
        <Form className="search-form">
          <Row>
            <Col >
              <Form.Group controlId="searchPhone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  placeholder="Nhập số điện thoại để tra cứu"
                />
              </Form.Group>
              <br></br>
              <Button variant="secondary" className="search-button" onClick={handleSearch}>
                Tra cứu
              </Button>
            </Col>
           
          </Row>
        </Form>
      </div>
      {filteredBookings.length > 0 && (
        <div className="table-container">
          <h2 className="mt-3">Lịch sử đặt bàn</h2>
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
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.people}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.notes}</td>
                  <td>{booking.status}</td> {/* Assuming 'status' is a property of booking */}
                  <td>
                    {booking.status === "Chờ duyệt" && (
                      <>
                        <Button variant="warning" size="sm" onClick={() => handleEdit(booking)}>Sửa</Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => handleDelete(booking.id)}>Xóa</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin đặt bàn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formEditName">
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
                <Form.Group controlId="formEditPhone">
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
                <Form.Group controlId="formEditPeople">
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
                <Form.Group controlId="formEditDate">
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
                <Form.Group controlId="formEditTime">
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
                <Form.Group controlId="formEditNotes">
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Booking;
