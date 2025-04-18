import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import "../Pages/Css/Booking.css";
import supabase from "../services/supabaseConfig"; // Import supabase client
import { toast } from "react-toastify";

const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    phone: "",
    people: "2",
    date: "",
    time: "",
    notes: "",
  });

  const [bookings, setBookings] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isOutsideServiceHours, setIsOutsideServiceHours] = useState(false);


  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 22 || currentHour < 6) {
      setIsOutsideServiceHours(true);
    }

    // khóa đặt bàn
    // setIsOutsideServiceHours(true);

    // Fetch initial bookings data
    const fetchBookings = async () => {
      try {
        let { data, error } = await supabase.from("bookings").select("*");
        if (error) {
          console.error("Error fetching booking data:", error.message);
        } else {
          setBookings(data);
        }
      } catch (error) {
        console.error("Error fetching booking data:", error.message);
      }
    };

    fetchBookings();
  }, []);
  if (isOutsideServiceHours) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: 0.8,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <h1 style={{marginBottom: '20px'}}>Dúng Thông Báo</h1>
        <p style={{fontSize: '24px'}}>
        Chúng mình tạm dừng đặt bàn qua website để nâng cấp hệ thống. Hãy gọi hotline để đặt bàn tại DÚNG.
        </p>
        
      </div>
    );
  }
  const handleChange = (e) => {
    // Update booking details state on input change
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate booking details
    if (parseInt(bookingDetails.people) <= 0) {
      toast.error("Số lượng người phải lớn hơn 0");

      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    if (bookingDetails.date < currentDate) {
      toast.error("Bạn không thể đặt bàn cho ngày trong quá khứ");
      return;
    }
    const bookingDateTime = new Date(`${bookingDetails.date}T${bookingDetails.time}`);
    const currentDateTime = new Date();
    const timeDifference = bookingDateTime.getTime() - currentDateTime.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);

    if (hoursDifference < 1) {
      toast.error("Vui lòng đặt bàn trước ít nhất 1 giờ hoặc liên hệ hotline 0986610910.");
      return;
    }
    try {
      const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 8);
      };
      // Prepare booking data with 'Chờ duyệt' status
      const newBooking = {
        id: generateRandomId(),
        name: bookingDetails.name,
        phone: bookingDetails.phone,
        people: bookingDetails.people,
        date: bookingDetails.date,
        time: bookingDetails.time,
        notes: bookingDetails.notes,
        status: "Chờ duyệt",
      };
      // eslint-disable-next-line
      const { data, error } = await supabase
        .from("bookings")
        .insert([newBooking]);

      if (error) {
        console.error("Error saving booking data:", error.message);
      } else {
        sendNotification(newBooking);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          
        }, 2500);
      }
    } catch (error) {
      console.error("Error saving booking data:", error.message);
    }
  };
  const sendNotification = (newBooking) => {
    fetch("https://ntfy.sh/Booking", {
      method: "POST",
      body: `${newBooking.name} - ${newBooking.date} - ${newBooking.time}`, 
      headers: {
        'Title': 'BOOKING',
        'Priority': 5,
        'Actions': 'view, Check Booking, https://dungdipandroll-congnams-projects.vercel.app/#boss' 
      },
      
    
    })
      .then((response) => {
        if (response.ok) {
        } else {
        }
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });
  };
  const handleSearch = () => {
    // Filter bookings based on searchPhone
    const results = bookings.filter((booking) => booking.phone === searchPhone);
    setFilteredBookings(results);
  };

  const handleEdit = (booking) => {
    // Set up modal for editing a booking
    setEditingBooking(booking);
    setBookingDetails(booking);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (booking) => {
    // Show modal to confirm deletion of a booking
    setBookingToDelete(booking);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    // Close modal for deleting a booking
    setBookingToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    // Confirm and delete a booking
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingToDelete.id);

      if (error) {
        console.error("Error deleting booking:", error.message);
      } else {
        setBookings(
          bookings.filter((booking) => booking.id !== bookingToDelete.id)
        );
        setFilteredBookings(
          filteredBookings.filter(
            (booking) => booking.id !== bookingToDelete.id
          )
        );
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting booking:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .update(bookingDetails)
        .eq("id", editingBooking.id)
        .select();

      if (error) {
        console.error("Error updating booking:", error.message);
      } else if (!data || data.length === 0) {
        console.error("No booking found with the specified ID.");
      } else {
        setBookings(
          bookings.map((booking) =>
            booking.id === editingBooking.id ? data[0] : booking
          )
        );
        setFilteredBookings(
          filteredBookings.map((booking) =>
            booking.id === editingBooking.id ? data[0] : booking
          )
        );
        setShowEditModal(false);
        setBookingDetails({
          name: "",
          phone: "",
          people: "2",
          date: "",
          time: "",
          notes: "",
        });

        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 3000);
      }
    } catch (error) {
      console.error("Error updating booking:", error.message);
    }
  };

  return (
    <div>
      <Container className="booking-container my-3">
        <h1 className="booking-header">Đặt Bàn</h1>
        <Form onSubmit={handleSubmit} className="booking-form">
          <Row>
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={bookingDetails.name}
                  onChange={handleChange}
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
                <Form.Label>Yêu cầu riêng của bạn</Form.Label>
                <Form.Control
                  as="textarea"
                  name="notes"
                  value={bookingDetails.notes}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            type="submit"
            className="mt-3 booking-button"
          >
            Đặt bàn
          </Button>
          <h6 className="text-center mt-4 ">
          Cảm ơn bạn. Dúng sẽ sớm liên hệ lại với bạn theo thông tin cung cấp. Chỉ khi Dúng gọi điện xác nhận, yêu cầu của bạn mới được coi là đặt bàn thành công.
          </h6>
        </Form>
        <div className="search-container mt-4">
          <h2 className="search-header">Tra cứu đặt bàn</h2>
          <Form className="search-form">
            <Row>
              <Col>
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
                <Button
                  variant="secondary"
                  className="search-button"
                  onClick={handleSearch}
                >
                  Tra cứu
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        {filteredBookings.length === 0 && searchPhone === "" && (
          <div className="text-center mt-4 d-none d-md-block">
            <p style={{ paddingTop: "2.5em" }}>
              Lịch sử đặt bàn của bạn sẽ được hiện thị ở đây nha!
            </p>
          </div>
        )}
        {filteredBookings.length > 0 && (
          <div className="table-container">
            <h2 className="mt-3">Lịch sử đặt bàn</h2>
            <Table
              striped
              bordered
              hover
              responsive
              className="booking-table mt-3"
            >
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
                    <td>{booking.status}</td>
                    <td>
                      {booking.status === "Chờ duyệt" && (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleEdit(booking)}
                          >
                            Sửa
                          </Button>{" "}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleShowDeleteModal(booking)}
                          >
                            Xóa
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {/* Modal thông báo thành công */}
        <Modal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Đặt bàn thành công!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Cảm ơn bạn đã đặt bàn tại Dúng. Chúng mình sẽ sớm liên lạc với bạn
            để xác nhận.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowSuccessModal(false)}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
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

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn xóa thông tin đặt bàn này không?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Hủy
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Booking;

