import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Dropdown,
  Button,
  Badge,
  Modal,
  Pagination,
} from "react-bootstrap";
import supabase from "../services/supabaseConfig";

const Boss = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      let { data, error } = await supabase.from("bookings").select("*");
      if (error) {
        console.error("Error fetching booking data:", error.message);
      } else {
        // Convert date format when fetching
        const formattedData = data.map(booking => ({
          ...booking,
          date: formatDate(booking.date)
        }));
        setBookings(formattedData);
        setFilteredBookings(formattedData);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  const handleDateFilter = (e) => {
    const date = e.target.value;
    setDateFilter(date);
    filterBookings(nameFilter, date, isSortedByDate);
  };

  const handleNameFilter = (e) => {
    const name = e.target.value;
    setNameFilter(name);
    filterBookings(name, dateFilter, isSortedByDate);
  };

  const handleSortByDate = () => {
    setIsSortedByDate(!isSortedByDate);
    filterBookings(nameFilter, dateFilter, !isSortedByDate);
  };

  const filterBookings = (name, date, sortByDate) => {
    let filtered = bookings;
    if (name) {
      filtered = filtered.filter((booking) =>
        booking.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (date) {
      // Convert the filter date to the same format for comparison
      const formattedFilterDate = formatDate(date);
      filtered = filtered.filter((booking) => booking.date === formattedFilterDate);
    }
    if (sortByDate) {
      filtered.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('-');
        const [dayB, monthB, yearB] = b.date.split('-');
        return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
      });
    }
    setFilteredBookings(filtered);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId)
        .select();

      if (error) {
        console.error("Error updating booking status:", error.message);
      } else {
        // Update local state
        const updatedBookings = bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);
        setFilteredBookings(updatedBookings);
      }
    } catch (error) {
      console.error("Error updating booking status:", error.message);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Chờ duyệt":
        return { backgroundColor: "yellow", color: "black" };
      case "Xác nhận":
        return { backgroundColor: "blue", color: "white" };
      case "Hết bàn":
        return { backgroundColor: "red", color: "white" };
      default:
        return {};
    }
  };

  const handleDeleteBooking = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowDeleteWarning(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingToDelete);

      if (error) {
        console.error("Error deleting booking:", error.message);
      } else {
        // Update local state
        const updatedBookings = bookings.filter((booking) => booking.id !== bookingToDelete);
        setBookings(updatedBookings);
        setFilteredBookings(updatedBookings);
      }
      setShowDeleteWarning(false);
    } catch (error) {
      console.error("Error deleting booking:", error.message);
    }
  };

  const handleEditBooking = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    setBookingToEdit(booking);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .update(bookingToEdit)
        .eq("id", bookingToEdit.id)
        .select();

      if (error) {
        console.error("Error updating booking:", error.message);
      } else {
        // Update local state
        const updatedBookings = bookings.map((booking) =>
          booking.id === bookingToEdit.id ? bookingToEdit : booking
        );
        setBookings(updatedBookings);
        setFilteredBookings(updatedBookings);
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error updating booking:", error.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setBookingToEdit({ ...bookingToEdit, [name]: value });
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Quản lý đặt bàn</h1>
      <h1 className="my-4 text-center">Tổng số bàn đặt: <span style={{ fontWeight: "bold" }}> {filteredBookings.length}</span>  bàn</h1>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="dateFilter">
            <Form.Label>Lọc theo ngày</Form.Label>
            <Form.Control
              type="date"
              value={dateFilter}
              onChange={handleDateFilter}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="nameFilter">
            <Form.Label>Lọc theo tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên"
              value={nameFilter}
              onChange={handleNameFilter}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button variant="outline-primary mx-3" onClick={handleSortByDate}>
            Sắp xếp theo ngày{" "}
            {isSortedByDate ? "(cũ nhất trước)" : "(mới nhất trước)"}
          </Button>
          <Button variant="outline-primary" onClick={fetchBookings}>
            Load lại trang
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Số người</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Ghi chú</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{booking.people}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.notes}</td>
              <td>
                <Dropdown
                  onSelect={(eventKey) =>
                    handleStatusChange(booking.id, eventKey)
                  }
                >
                  <Dropdown.Toggle
                    variant="secondary"
                    id={`dropdown-${booking.id}`}
                    style={getStatusStyles(booking.status)}
                  >
                    {booking.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Chờ duyệt">Chờ duyệt</Dropdown.Item>
                    <Dropdown.Item eventKey="Xác nhận">Xác nhận</Dropdown.Item>
                    <Dropdown.Item eventKey="Hết bàn">Hết bàn</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEditBooking(booking.id)}
                >
                  Sửa
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteBooking(booking.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={showDeleteWarning}
        onHide={() => setShowDeleteWarning(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa đặt bàn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa đặt bàn này?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={handleConfirmDelete}
          >
            Xóa
          </Button>
          <Button variant="outline-primary" onClick={() => setShowDeleteWarning(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa đặt bàn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookingToEdit && (
            <Form>
              <Form.Group controlId="editName">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={bookingToEdit.name}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="editPhone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={bookingToEdit.phone}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="editPeople">
                <Form.Label>Số người</Form.Label>
                <Form.Control
                  type="number"
                  name="people"
                  value={bookingToEdit.people}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="editDate">
                <Form.Label>Ngày</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={bookingToEdit.date}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="editTime">
                <Form.Label>Giờ</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={bookingToEdit.time}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="editNotes">
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  as="textarea"
                  name="notes"
                  value={bookingToEdit.notes}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={handleSaveEdit}
          >
            Lưu
          </Button>
          <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Boss;