import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function FormularioLogin() {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('URL_DE_TU_API/login', {
        email,
        password,
      });
      console.log(response.data);
      // Maneja la respuesta de la API (ej. guardar token, redirigir usuario, etc.)
    } catch (error) {
      console.error('Error en la autenticación', error);
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
    axios.post('URL_DE_TU_API/forgot-password', { email })
      .then(response => {
        MySwal.fire('Correo enviado', 'Revisa tu bandeja de entrada para más instrucciones', 'success');
        setShowModal(false); // Cierra el modal después de enviar el correo
      })
      .catch(error => {
        MySwal.fire('Error', 'No se pudo enviar el correo', 'error');
      });
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ width:"90%" , padding:"0.5rem" , color:"#ffff" }}>
      <h1 className="mb-4" style={{color:"#ffff", fontSize: 'clamp(2rem , 5vw, 4rem)'}}>Inicio de sesión</h1>
      <Form onSubmit={handleLogin} style={{ width: '100%' }}>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label style={{ fontSize: '1.5rem' }}><MdOutlineEmail /> Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            style={{ height: '70px', fontSize: '1rem' }}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label style={{ fontSize: '1.5rem' }}><RiLock2Fill /> Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            style={{ height: '70px', fontSize: '1rem' }}
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button type="submit" variant="dark" style={{ backgroundColor: "#00126E", width: '70%', fontSize: '20pt', padding: '1rem' }}>
            Aceptar
          </Button>
        </div>
      </Form>

      {/* Modal para recuperar contraseña */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSendEmail} disabled={!email}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>

      <Button className="mt-3" variant="link" style={{color:"#ffff", fontSize: '1rem'}} onClick={handleForgotPassword}>
        ¿Ha olvidado su contraseña?
      </Button>
    </div>
  );
}

export default FormularioLogin;
