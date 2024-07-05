import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../Img/Logo.png";
import { ImExit } from "react-icons/im";

const NavbarPanel = () => {
  return (
    <Navbar variant="dark" expand="" style={{ backgroundColor: "#00126E", width: "100%" }}>
      <Navbar.Brand style={{ fontWeight: "600", display: "flex", alignItems: "center" }}>
        <img alt="Logo" src={logo} width="95px" height="90px" className="d-inline-block align-top" />
        <span style={{ marginLeft: "10px", fontSize: "clamp(2rem , 5vw , 3.5rem)" }}>PowerWatch</span>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Button >
          Usuario
        </Button>
        <Button as={Link} to="/" variant="warning" className="btn-lg" style={{ marginRight: "20px", color: "#ffff" }}>
          <ImExit/> Salir
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavbarPanel;
