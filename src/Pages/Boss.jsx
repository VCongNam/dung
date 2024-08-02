import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Dropdown, Pagination } from 'react-bootstrap';
import supabase from '../services/supabaseConfig';

const Boss = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 30;

  useEffect(() => {
    fetchBookings();

    const bookingChannel = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
        const newBooking = payload.new;
        setBookings((prevBookings) => [...prevBookings, newBooking]);
        setFilteredBookings((prevBookings) => applyFilters([...prevBookings, newBooking]));
        sendNotification(newBooking);
      })
      .subscribe();

    return () => {
      bookingChannel.unsubscribe();
    };
  }, []);

  const fetchBookings = async () => {
    try {
      let { data, error } = await supabase.from('bookings').select('*');
      if (error) {
        console.error('Error fetching booking data:', error.message);
      } else {
        setBookings(data);
        setFilteredBookings(applyFilters(data));
      }
    } catch (error) {
      console.error('Error fetching booking data:', error.message);
    }
  };

  const sendNotification = (newBooking) => {
    fetch('https://ntfy.sh/Booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `New booking from ${newBooking.name}`
    }).then(response => {
      if (response.ok) {
        console.log('Notification sent');
      } else {
        console.error('Failed to send notification');
      }
    }).catch(error => {
      console.error('Error sending notification:', error);
    });
  };

  const handleDateFilter = (e) => {
    const date = e.target.value;
    setDateFilter(date);
    setCurrentPage(1);
    setFilteredBookings(applyFilters(bookings, date, nameFilter));
  };

  const handleNameFilter = (e) => {
    const name = e.target.value;
    setNameFilter(name);
    setCurrentPage(1);
    setFilteredBookings(applyFilters(bookings, dateFilter, name));
  };

  const applyFilters = (data, date = dateFilter, name = nameFilter) => {
    return data
      .filter((booking) => {
        return (
          (!date || booking.date === date) &&
          (!name || booking.name.toLowerCase().includes(name.toLowerCase()))
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)
        .select();

      if (error) {
        console.error('Error updating booking status:', error.message);
      } else {
        const updatedBookings = bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);
        setFilteredBookings(applyFilters(updatedBookings));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const offset = (currentPage - 1) * bookingsPerPage;
  const currentBookings = filteredBookings.slice(offset, offset + bookingsPerPage);
  const pageCount = Math.ceil(filteredBookings.length / bookingsPerPage);

  const paginationItems = [];
  for (let number = 1; number <= pageCount; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

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
          {currentBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{booking.people}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.notes}</td>
              <td>
                <Dropdown onSelect={(eventKey) => handleStatusChange(booking.id, eventKey)}>
                  <Dropdown.Toggle variant="secondary" id={`dropdown-${booking.id}`} style={getStatusStyles(booking.status)}>
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
      <Pagination className="justify-content-center mt-3">
        {paginationItems}
      </Pagination>
    </Container>
  );
};

export default Boss;
