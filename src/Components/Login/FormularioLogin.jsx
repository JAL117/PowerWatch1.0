import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { MdOutlineEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

function FormularioLogin() {
  const [showModalR, setShowModalR] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleShow = () => setShowModalR(true);
  const handleClose = () => {
    setShowModalR(false);
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
      const response = await axios.post("URL_DE_TU_API/registro", formData);
      if (response.status === 200) {
        console.log("Usuario registrado exitosamente");
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("URL_DE_TU_API/login", {
        email,
        password,
      });
      console.log(response.data);
      // Maneja la respuesta de la API (ej. guardar token, redirigir usuario, etc.)
    } catch (error) {
      console.error("Error en la autenticación", error);
      // Maneja el error (ej. mostrar mensaje de error al usuario)
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true); // Muestra el modal al hacer clic en "¿Ha olvidado su contraseña?"
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
  };

  const handleSendEmail = () => {
    axios
      .post("URL_DE_TU_API/forgot-password", { email })
      .then((response) => {
        MySwal.fire(
          "Correo enviado",
          "Revisa tu bandeja de entrada para más instrucciones",
          "success"
        );
        setShowModal(false); // Cierra el modal después de enviar el correo
      })
      .catch((error) => {
        MySwal.fire("Error", "No se pudo enviar el correo", "error");
      });
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: "90%", padding: "0.5rem", color: "#ffff" }}
    >
      <h1
        className="mb-4"
        style={{ color: "#ffff", fontSize: "clamp(2rem , 5vw, 4rem)" }}
      >
        Inicio de sesión
      </h1>
      <Form onSubmit={handleLogin} style={{ width: "100%" }}>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label style={{ fontSize: "1.5rem" }}>
            <MdOutlineEmail /> Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            style={{ height: "20px" }}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label style={{ fontSize: "1.5rem" }}>
            <RiLock2Fill /> Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            style={{ height: "20px" }}
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            variant="dark"
            as={Link}
            to="/AreaCliente"
            style={{
              backgroundColor: "#00126E",
              width: "70%",
              fontSize: "20pt",
              padding: "1rem",
            }}
          >
            Aceptar
          </Button>
        </div>
      </Form>

      {/* Modal para recuperar contraseña */}
      <Modal show={showModal} onHide={handleCloseModal}  size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton  style={{ backgroundColor: "#FFB800", textAlign: "center" }}>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#00126E", color: "white", padding: "5%", fontSize: "15pt" }}>
          <Form.Group controlId="formBasicEmailModal">
            <Form.Label>Ingrese su email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#00126E", color: "white", padding: "5%", fontSize: "15pt" }}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={handleSendEmail} disabled={!email}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para registro */}
      <Modal
        show={showModalR}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#FFB800", textAlign: "center" }}
        >
          <Modal.Title>Registro de Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#00126E", color: "white", padding: "5%", fontSize: "15pt" }}>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese sus nombres"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="mt-2">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese sus apellidos"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="phone" className="mt-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Ingrese su teléfono"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirme su contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="warning" type="submit" className="mt-3" style={{ display: "block", margin: "0 auto", fontSize: "15pt" }}>
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div>
        <Button
          className="mt-3 mr-3"
          variant="link"
          style={{ color: "#ffff", fontSize: "1rem" }}
          onClick={handleShow} // Mostrar el modal de registro
        >
          Registrarse
        </Button>
        <Button
          className="mt-3"
          variant="link"
          style={{ color: "#ffff", fontSize: "1rem" }}
          onClick={handleForgotPassword}
        >
          ¿Ha olvidado su contraseña?
        </Button>
      </div>
    </div>
  );
}

export default FormularioLogin;
