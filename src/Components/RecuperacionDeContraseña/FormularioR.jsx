import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const FormularioR = () => {
 
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const email = query.get("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForm, setShowForm] = useState(true); 
 

console.log(token,email);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showErrorAlert("Las contraseñas no coinciden");
      return;
    }
    const response = await fetch("http://3.226.18.117/user/passrecover", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email,passnew:password }),
    });

    if (response.ok) {
      showSuccessAlert("Contraseña restablecida con éxito");
      history.push("/");
    } else {
      showErrorAlert("Error al restablecer la contraseña");
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: message,
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div className="text-center">
            <h2>Restablecer Contraseña</h2>
          </div>
          {showForm && (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formPassword">
                <Form.Label>Nueva Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirmar Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="btn-block">
                Restablecer Contraseña
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioR;
