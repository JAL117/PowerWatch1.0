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
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUsers, FaUserPlus, FaPhone } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const MySwal = withReactContent(Swal);

function FormularioLogin() {
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalForgotPassword, setShowModalForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleShowRegister = () => setShowModalRegister(true);
  const handleCloseRegister = () => {
    setShowModalRegister(false);
    setFormData({
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleShowForgotPassword = () => setShowModalForgotPassword(true);
  const handleCloseForgotPassword = () => setShowModalForgotPassword(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    handleCloseRegister();

    try {
      const response = await axios.post("https://api-piweb.piweb.lat/user", {
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
        localStorage.setItem("token", response.data.token);
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://api-piweb.piweb.lat/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);
        const token = response.headers["x-token-access"];
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/AreaCliente");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        MySwal.fire(
          "Error de autenticación",
          "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
          "error"
        );
      } else {
        MySwal.fire(
          "Error",
          "Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo más tarde.",
          "error"
        );
      }
    }
  };

  const handleSendEmail = () => {
    axios
      .post("https://api-piweb.piweb.lat/user/recoverpass", { email })
      .then((response) => {
        console.log(response.data);
        MySwal.fire(
          "Correo enviado",
          "Revisa tu bandeja de entrada para más instrucciones",
          "success"
        );
        setShowModalForgotPassword(false);
      })
      .catch((error) => {
        MySwal.fire("Error", error.response.data.messages);
      });
  };

  const styles = {
    navbar: {
      background: "linear-gradient(45deg, #00126E, #001F9C)",
      padding: "0.5rem 1rem",
    },
    brand: {
      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
      fontWeight: "600",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
    },
    logo: {
      width: "60px",
      height: "60px",
      marginRight: "10px",
    },
    navButton: {
      borderRadius: "10px",
      padding: "0.5rem 1rem",
      fontSize: "0.9rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    modal: {
      header: {
        background: "linear-gradient(45deg, #FFB800, #FFA000)",
        border: "none",
      },
      title: {
        color: "#ffffff",
        fontSize: "1.5rem",
        fontWeight: "700",
      },
      body: {
        background: "linear-gradient(45deg, #001F9C, #00126E)",
        color: "#ffffff",
        padding: "2rem",
      },
      input: {
        borderRadius: "10px",
        border: "none",
        padding: "0.75rem",
        marginBottom: "1rem",
      },
      submitButton: {
        background: "linear-gradient(45deg, #FFB800, #FFA000)",
        border: "none",
        borderRadius: "20px",
        padding: "0.75rem 2rem",
        fontSize: "1rem",
        fontWeight: "600",
        transition: "all 0.3s ease",
      },
    },
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: "90%", padding: "0.5rem", color: "#ffff" }}>
      <Button
        variant="outline-light"
        as={Link}
        to="/"
        className="align-self-start m-3"
        style={{ border: "none" }}>
        <IoMdArrowRoundBack size={30} />
      </Button>

      <h1
        className="mb-4"
        style={{ color: "#ffff", fontSize: "clamp(2rem , 5vw, 4rem)" }}>
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
            style={{
              backgroundColor: "#00126E",
              width: "70%",
              fontSize: "20pt",
              padding: "1rem",
            }}>
            Aceptar
          </Button>
        </div>
      </Form>

      {/* Modal para recuperar contraseña */}
      <Modal
        show={showModalForgotPassword}
        onHide={handleCloseForgotPassword}
        size="lg"
        centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#FFB800", textAlign: "center" }}>
          <Modal.Title style={{ color: "#ffff" }}>
            Recuperar Contraseña
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#00126E",
            color: "white",
            padding: "5%",
            fontSize: "15pt",
          }}>
          <Form.Group controlId="formBasicEmailModal">
            <Form.Label>
              {" "}
              <MdEmail /> Ingrese su email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#00126E",
            color: "white",
            padding: "5%",
            fontSize: "15pt",
          }}>
          <Button variant="secondary" onClick={handleCloseForgotPassword}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={handleSendEmail} disabled={!email}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para registro */}
      <Modal
        show={showModalRegister}
        onHide={handleCloseRegister}
        centered
        size="lg">
        <Modal.Header closeButton style={styles.modal.header}>
          <Modal.Title style={styles.modal.title}>
            <FaUserPlus /> Registro de Cliente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modal.body}>
          <Form onSubmit={handleRegisterSubmit}>
            {[
              {
                id: "name",
                label: "Nombres",
                icon: <MdOutlineDriveFileRenameOutline />,
              },
              {
                id: "lastName",
                label: "Apellidos",
                icon: <MdOutlineDriveFileRenameOutline />,
              },
              { id: "phone", label: "Teléfono", icon: <FaPhone /> },
              { id: "email", label: "Email", icon: <MdEmail /> },
              {
                id: "password",
                label: "Contraseña",
                icon: <RiLockPasswordFill />,
                type: "password",
              },
              {
                id: "confirmPassword",
                label: "Confirmar Contraseña",
                icon: <RiLockPasswordFill />,
                type: "password",
              },
            ].map((field) => (
              <Form.Group key={field.id} controlId={field.id}>
                <Form.Label>
                  {field.icon} {field.label}
                </Form.Label>
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

      <div>
        <Button
          className="mt-3 mr-3"
          variant="link"
          style={{ color: "#ffff", fontSize: "1rem" }}
          onClick={handleShowRegister} // Mostrar el modal de registro
        >
          Registrarse
        </Button>
        <Button
          className="mt-3"
          variant="link"
          style={{ color: "#ffff", fontSize: "1rem" }}
          onClick={handleShowForgotPassword}>
          ¿Ha olvidado su contraseña?
        </Button>
      </div>
    </div>
  );
}

export default FormularioLogin;
