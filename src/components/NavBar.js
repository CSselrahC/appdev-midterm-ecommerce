import React, { useState } from 'react';
import { Offcanvas, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure CSS hover effect is loaded

function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Sidebar for desktop (fixed, always visible) */}
      <div className="sidebar d-none d-md-block bg-dark text-white">
        <div className="p-4">
          <div className="fs-5 fw-bold text-info mb-4">
            Docker Motorsports
          </div>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" className="sidebar-link mb-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="sidebar-link mb-2">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="sidebar-link mb-2">
              Cart
            </Nav.Link>
          </Nav>
        </div>
      </div>

      {/* Toggle button for mobile */}
      <Button
        variant="dark"
        className="d-md-none position-fixed top-0 start-0 m-3"
        onClick={handleShow}
        style={{ zIndex: 1045 }}
        aria-label="Open menu"
      >
        ☰
      </Button>

      {/* Offcanvas version for mobile */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        className="bg-dark text-white d-md-none"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="text-info fw-bold">
            Docker Motorsports
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose} className="sidebar-link mb-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={handleClose} className="sidebar-link mb-2">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" onClick={handleClose} className="sidebar-link mb-2">
              Cart
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;
