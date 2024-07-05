import React, { useState } from "react";
import { Navbar, Nav, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import logo from "../../Img/Logo.png";



const NavbarInstrucciones = () => {
  return (
    <div>
      <Navbar variant="dark" expand="" style={{ backgroundColor: "#00126E"}}>
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
          <span style={{ marginLeft: "10px", fontSize:"clamp(2rem , 5vw , 3.5rem)" }}>PowerWatch</span>
        </Navbar.Brand>
        <Nav>
          <Button as={Link} to="/" variant="warning"  className="btn-lg" style={{marginRight:"20px" , color:"#ffff"}}><FaArrowLeft/> Regresar</Button>
        </Nav>
       
      </Navbar>

     
    </div>
  );
};

export default NavbarInstrucciones;
