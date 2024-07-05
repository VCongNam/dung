import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        
          <Nav className="ms-auto"> {/* Align buttons to the right */}
            <Button variant="outline-info" className="me-2">
              Register
            </Button>
            <Button variant="outline-info">Login</Button>
          </Nav>
        
      </Container>
    </Navbar>
  );
}

export default Header;
