import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Dropdown,
  Button,
} from "react-bootstrap";
import supabase from "../services/supabaseConfig";

const Boss = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [isSortedByDate, setIsSortedByDate] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      let { data, error } = await supabase.from("bookings").select("*");
      if (error) {
        console.error("Error fetching booking data:", error.message);
      } else {
        setBookings(data);
        setFilteredBookings(data);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error.message);
    }
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
      filtered = filtered.filter((booking) => booking.date === date);
    }
    if (sortByDate) {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
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
      case "Hoàn thành":
        return { backgroundColor: "green", color: "white" };
      default:
        return {};
    }
  };

  return (
    <Container>
      <h1 className="my-4">Quản lý đặt bàn</h1>
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
                    <Dropdown.Item eventKey="Chờ duyệt">
                      Chờ duyệt
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Xác nhận">Xác nhận</Dropdown.Item>
                    <Dropdown.Item eventKey="Hoàn thành">
                      Hoàn thành
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Boss;

