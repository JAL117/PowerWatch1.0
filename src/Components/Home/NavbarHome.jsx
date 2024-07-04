import React, { useState } from "react";
import { Navbar, Nav, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import logo from "../../Img/Logo.png";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";


const NavbarHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    handleClose();

    try {
      const response = await fetch("url_de_tu_api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Usuario registrado exitosamente");
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div>
      <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#00126E"}}>
        <Navbar.Brand
          style={{
            fontSize: "30pt",
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
        <Navbar.Toggle className="ml-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="align-items-center" style={{marginLeft:"70%"}}>
            <Button
              variant="outline-warning"
              className="mb-2 mb-lg-0 m-1"
              onClick={handleShow}
            >
              Registrarse <FaUserPlus className="m-1 mb-2 btn-lg" />
            </Button>
            <Button
              variant="warning"
              as={Link}
              to="/login"
              className="text-white m-1 mb-2 mb-lg-0"
            >
              Area clientes <FaUsers className="m-1 mb-2 btn-lg" />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#FFB800", textAlign: "center" }}
        >
          <Modal.Title>
            <a
              style={{
                fontWeight: "700",
                textDecoration: "none",
                fontSize: "25pt",
              }}
            >
              <FaUserPlus className="m-2" size={45} />
              Registro de Cliente
            </a>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            backgroundColor: "#00126E",
            color: "white",
            padding: "5%",
            fontSize: "15pt",
          }}
        >
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group controlId="name">
              <Form.Label>
                <MdOutlineDriveFileRenameOutline className="m-2" />
                Nombres
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese sus nombres"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="lastName" className="mt-2">
              <Form.Label>
                <MdOutlineDriveFileRenameOutline className="m-2" />
                Apellidos
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese sus apellidos"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="phone" className="mt-3">
              <Form.Label>
                <FaPhone className="m-1" />
                Teléfono
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Ingrese su teléfono"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>
                <MdEmail className="m-1" />
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>
                <RiLockPasswordFill className="m-1" />
                Contraseña{" "}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>
                <RiLockPasswordFill className="m-1" />
                Confirmar Contraseña{" "}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirme su contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              className="mt-3"
              style={{ display: "block", margin: "0 auto" , fontSize:"15pt" }}
            >
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NavbarHome;
