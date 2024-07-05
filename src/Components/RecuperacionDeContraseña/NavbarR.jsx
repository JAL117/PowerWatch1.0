import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../../Img/Logo.png";

const NavbarR = () => {
  return (
    <Navbar variant="dark" expand="md" style={{ backgroundColor: "#00126E" }}>
      <Navbar.Brand
        style={{
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          alt="Logo"
          src={logo}
          width="95px"
          height="90px"
          className="d-inline-block align-top"
        />
        <span style={{ marginLeft: "10px", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          PowerWatch
        </span>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Button as={Link} to="/" variant="warning" className="btn-lg" style={{ marginRight: "20px", color: "#ffff" }}>
          <FaArrowLeft /> Regresar
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavbarR;
