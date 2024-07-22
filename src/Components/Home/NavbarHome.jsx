import React, { useState } from "react";
import { Navbar, Nav, Button, Modal, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUsers, FaUserPlus, FaPhone } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../../Img/Logo.png";
import axios from "axios";
import Swal from 'sweetalert2';

const NavbarHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "", lastName: "", phone: "", email: "", password: "", confirmPassword: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: "", lastName: "", phone: "", email: "", password: "", confirmPassword: "" });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user`, {
        id: "",
        nombre: formData.name,
        apellidos: formData.lastName,
        email: formData.email,
        password: formData.password,
        telefono: formData.phone,
        fechaPlan: null,
      });
      if (response.status === 200) {
        console.log("Usuario registrado exitosamente");
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        showSuccessAlert(); 
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: '¡Registro Completo!',
      text: 'Para recibir notificaciones por WhatsApp, envía un mensaje con el texto "join saddle-neck" al número +1 415 523 8886.',
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#FFB800',
      customClass: {
        popup: 'swal2-popup',
        title: 'swal2-title',
        content: 'swal2-content',
        confirmButton: 'swal2-confirm-button'
      }
    });
  };

  const styles = {
    navbar: {
      background: 'linear-gradient(45deg, #00126E, #001F9C)',
      padding: '0.5rem 1rem',
    },
    brand: {
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: '600',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      width: '60px',
      height: '60px',
      marginRight: '10px',
    },
    navButton: {
      borderRadius: '10px',
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    modal: {
      header: {
        background: 'linear-gradient(45deg, #FFB800, #FFA000)',
        border: 'none',
      },
      title: {
        color: '#ffffff',
        fontSize: '1.5rem',
        fontWeight: '700',
      },
      body: {
        background: 'linear-gradient(45deg, #001F9C, #00126E)',
        color: '#ffffff',
        padding: '2rem',
      },
      input: {
        borderRadius: '10px',
        border: 'none',
        padding: '0.75rem',
        marginBottom: '1rem',
      },
      submitButton: {
        background: 'linear-gradient(45deg, #FFB800, #FFA000)',
        border: 'none',
        borderRadius: '20px',
        padding: '0.75rem 2rem',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
      },
    },
  };

  return (
    <>
      <Navbar expand="lg" style={styles.navbar}>
        <Container fluid>
          <Navbar.Brand style={styles.brand}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <span>PowerWatch</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Button
                variant="outline-light"
                onClick={handleShow}
                style={{...styles.navButton, marginRight: '1rem'}}
              >
                Registrarse <FaUserPlus />
              </Button>
              <Button
                variant="warning"
                as={Link}
                to="/login"
                style={styles.navButton}
              >
                Area clientes <FaUsers />
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton style={styles.modal.header}>
          <Modal.Title style={styles.modal.title}>
            <FaUserPlus /> Registro de Cliente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modal.body}>
          <Form onSubmit={handleRegisterSubmit}>
            {[
              { id: "name", label: "Nombres", icon: <MdOutlineDriveFileRenameOutline /> },
              { id: "lastName", label: "Apellidos", icon: <MdOutlineDriveFileRenameOutline /> },
              { id: "phone", label: "Teléfono", icon: <FaPhone /> },
              { id: "email", label: "Email", icon: <MdEmail /> },
              { id: "password", label: "Contraseña", icon: <RiLockPasswordFill />, type: "password" },
              { id: "confirmPassword", label: "Confirmar Contraseña", icon: <RiLockPasswordFill />, type: "password" },
            ].map((field) => (
              <Form.Group key={field.id} controlId={field.id}>
                <Form.Label>{field.icon} {field.label}</Form.Label>
                <Form.Control
                  type={field.type || "text"}
                  placeholder={`Ingrese ${field.label.toLowerCase()}`}
                  value={formData[field.id]}
                  onChange={handleInputChange}
                  required
                  style={styles.modal.input}
                />
              </Form.Group>
            ))}
            <Button type="submit" style={styles.modal.submitButton}>
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarHome;