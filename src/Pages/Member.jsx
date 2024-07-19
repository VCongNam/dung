import React, { useState } from "react";
import { Container, Form, Button, Table, Alert, Modal } from "react-bootstrap";
import "../Pages/Css/Member.css";
import supabase from '../services/supabaseConfig'; // Import supabase client


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
      // eslint-disable-next-line
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
    <Container className="member-container " >
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
        <Button className="custom-button"   onClick={handleSearch}>
          Tra cứu
        </Button>
      </Form>
      {customer && (
        <div className="customer-info">
          <h2>Thông tin khách hàng</h2>
          <p >
            <strong>Tên:</strong> {customer.name}
          </p>
          <p >
            <strong>Số điện thoại:</strong> {customer.phone}
          </p>
          <p >
            <strong>Số lần đặt bàn:</strong> {customer.booking_count}
          </p>
          <p >
            <strong>Điểm thành viên:</strong> {customer.loyalty_points}
          </p>
          <Button
            className="custom-button" variant="secondary"
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
                <tr key={booking.id}  >
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
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Đóng
          </Button>
          <Button variant="secondary" className="custom-button" onClick={handleUpdateCustomer}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Member;









// import React, { useState } from "react";
// import { Container, Form, Button, Table, Alert, Modal } from "react-bootstrap";
// import "../Pages/Css/Member.css";
// import supabase from '../services/supabaseConfig'; // Import supabase client
// import * as XLSX from 'xlsx'; // Import xlsx for Excel export

// const Member = () => {
//   const [phone, setPhone] = useState("");
//   const [customer, setCustomer] = useState(null);
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editedCustomer, setEditedCustomer] = useState({
//     name: "",
//     phone: "",
//     booking_count: 0,
//     loyalty_points: 0,
//   });

//   const handleSearch = async () => {
//     try {
//       // Fetch customer data
//       const { data: customerData, error: customerError } = await supabase
//         .from("customers")
//         .select("*")
//         .eq("phone", phone)
//         .single();

//       if (customerError) throw customerError;

//       if (customerData) {
//         setCustomer(customerData);
//         setEditedCustomer(customerData);
//         setErrorMessage("");

//         // Fetch booking history
//         const { data: bookingData, error: bookingError } = await supabase
//           .from("bookings")
//           .select("*")
//           .eq("phone", phone)
//           .order("date", { ascending: false });

//         if (bookingError) throw bookingError;

//         setBookingHistory(bookingData);
//       } else {
//         setErrorMessage("Số điện thoại không tồn tại trong hệ thống.");
//         setCustomer(null);
//         setBookingHistory([]);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setErrorMessage("Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại sau.");
//     }
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedCustomer({
//       ...editedCustomer,
//       [name]: value,
//     });
//   };

//   const handleUpdateCustomer = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("customers")
//         .update(editedCustomer)
//         .eq("id", customer.id);

//       if (error) throw error;

//       setCustomer(editedCustomer);
//       setShowEditModal(false);
//     } catch (error) {
//       console.error("Error updating customer:", error);
//     }
//   };

//   const handleExportToExcel = () => {
//     // Define Excel headers and data
//     const headers = [
//       "Ngày",
//       "Giờ",
//       "Số người",
//       "Ghi chú",
//       "Trạng thái",
//       "Giá"
//     ];

//     const data = bookingHistory.map(booking => ({
//       Ngày: booking.date,
//       Giờ: booking.time,
//       "Số người": booking.people,
//       "Ghi chú": booking.notes,
//       "Trạng thái": booking.status,
//       Giá: booking.price
//     }));

//     // Create a new workbook
//     const workbook = XLSX.utils.book_new();
//     // Convert data to worksheet
//     const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
//     // Add worksheet to workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Booking History");
//     // Export workbook to Excel file
//     XLSX.writeFile(workbook, "booking_history.xlsx");
//   };

//   return (
//     <Container className="member-container">
//       <h1 className="member-header">Tra cứu thông tin khách hàng</h1>
//       {errorMessage && (
//         <Alert variant={errorMessage.includes("lỗi") ? "danger" : "warning"}>
//           {errorMessage}
//         </Alert>
//       )}
//       <Form className="search-form">
//         <Form.Group controlId="searchPhone">
//           <Form.Label>Số điện thoại</Form.Label>
//           <Form.Control
//             style={{ fontFamily: "Roboto Mono" }}
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Nhập số điện thoại"
//           />
//         </Form.Group>
//         <Button className="custom-button" style={{ fontFamily: "Roboto Mono" }} onClick={handleSearch}>
//           Tra cứu
//         </Button>
//       </Form>
//       {customer && (
//         <div className="customer-info">
//           <h2>Thông tin khách hàng</h2>
//           <p style={{ fontFamily: "Roboto Mono" }}>
//             <strong>Tên:</strong> {customer.name}
//           </p>
//           <p style={{ fontFamily: "Roboto Mono" }}>
//             <strong>Số điện thoại:</strong> {customer.phone}
//           </p>
//           <p style={{ fontFamily: "Roboto Mono" }}>
//             <strong>Số lần đặt bàn:</strong> {customer.booking_count}
//           </p>
//           <p style={{ fontFamily: "Roboto Mono" }}>
//             <strong>Điểm thành viên:</strong> {customer.loyalty_points}
//           </p>
//           <Button
//             className="custom-button"
//             variant="secondary"
//             onClick={() => setShowEditModal(true)}
//           >
//             Cập nhật thông tin
//           </Button>
//         </div>
//       )}
//       {bookingHistory.length > 0 && (
//         <div className="booking-history">
//           <h2>Lịch sử đặt bàn</h2>
//           <Table striped bordered hover className="booking-table">
//             <thead>
//               <tr>
//                 <th>Ngày</th>
//                 <th>Giờ</th>
//                 <th>Số người</th>
//                 <th>Ghi chú</th>
//                 <th>Trạng thái</th>
//                 <th>Giá</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookingHistory.map((booking) => (
//                 <tr key={booking.id} style={{ fontFamily: "Roboto Mono" }}>
//                   <td>{booking.date}</td>
//                   <td>{booking.time}</td>
//                   <td>{booking.people}</td>
//                   <td>{booking.notes}</td>
//                   <td>{booking.status}</td>
//                   <td>{booking.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <Button className="custom-button" style={{fontFamily: "Roboto Mono"}} variant="success" onClick={handleExportToExcel}>
//             Xuất dữ liệu đặt bàn 
//           </Button>
//         </div>
//       )}

//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Cập nhật thông tin khách hàng</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formEditName">
//               <Form.Label>Tên</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={editedCustomer.name}
//                 onChange={handleEditChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formEditPhone">
//               <Form.Label>Số điện thoại</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="phone"
//                 value={editedCustomer.phone}
//                 onChange={handleEditChange}
//                 required
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//             Đóng
//           </Button>
//           <Button
//             variant="secondary"
//             className="custom-button"
//             onClick={handleUpdateCustomer}
//           >
//             Lưu thay đổi
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Member;
