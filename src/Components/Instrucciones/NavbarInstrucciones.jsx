import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../Img/Logo.png";
import { ImExit } from "react-icons/im";
import { FaUser } from "react-icons/fa";

const NavbarPanel = () => {
  return (
    <Navbar 
      variant="dark" 
      expand="lg" 
      className="py-3"
      style={{ 
        background: "linear-gradient(to right, #00126E, #001f9c)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center">
          <img 
            alt="Logo" 
            src={logo} 
            width="60" 
            height="60" 
            className="d-inline-block align-top me-3"
          />
          <span style={{ 
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: "700",
            letterSpacing: "-1px"
          }}>
            PowerWatch
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
         
            <Button 
              as={Link} 
              to="/" 
              variant="warning" 
              className="d-flex align-items-center"
              style={{
                borderRadius: "10px",
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
            >
              <ImExit className="me-2"/> Salir
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPanel;