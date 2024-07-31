import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Dropdown } from 'react-bootstrap';
import supabase from '../services/supabaseConfig';

const Boss = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      let { data, error } = await supabase.from('bookings').select('*');
      if (error) {
        console.error('Error fetching booking data:', error.message);
      } else {
        setBookings(data);
        setFilteredBookings(data);
      }
    } catch (error) {
      console.error('Error fetching booking data:', error.message);
    }
  };

  const handleDateFilter = (e) => {
    const date = e.target.value;
    setDateFilter(date);
    filterBookings(nameFilter, date);
  };

  const handleNameFilter = (e) => {
    const name = e.target.value;
    setNameFilter(name);
    filterBookings(name, dateFilter);
  };

  const filterBookings = (name, date) => {
    let filtered = bookings;
    if (name) {
      filtered = filtered.filter(booking =>
        booking.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (date) {
      filtered = filtered.filter(booking => booking.date === date);
    }
    setFilteredBookings(filtered);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
        // eslint-disable-next-line
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)
        .select();

      if (error) {
        console.error('Error updating booking status:', error.message);
      } else {
        // Update local state
        const updatedBookings = bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);
        setFilteredBookings(updatedBookings);
      }
    } catch (error) {
      console.error('Error updating booking status:', error.message);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Chờ duyệt':
        return { backgroundColor: 'yellow', color: 'black' };
      case 'Xác nhận':
        return { backgroundColor: 'blue', color: 'white' };
      case 'Hoàn thành':
        return { backgroundColor: 'green', color: 'white' };
      default:
        return {};
    }
  };

  return (
    <Container>
      <h1 className="my-4">Quản lý đặt bàn</h1>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="dateFilter">
            <Form.Label>Lọc theo ngày</Form.Label>
            <Form.Control
              type="date"
              value={dateFilter}
              onChange={handleDateFilter}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
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
                <Dropdown onSelect={(eventKey) => handleStatusChange(booking.id, eventKey)}>
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
                    <Dropdown.Item eventKey="Hoàn thành">Hoàn thành</Dropdown.Item>
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
