import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  height: 80vh;
  display: flex;
  align-items: center;
  background: #f5f5f5;
`;

const StyledCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const StyledTitle = styled.h2`
  color: #4a4a4a;
  margin-bottom: 30px;
  font-weight: 700;
`;

const StyledForm = styled(Form)`
  .form-group {
    margin-bottom: 25px;
  }

  .form-control {
    border-radius: 10px;
    border: 1px solid #ced4da;
    padding: 12px;
    transition: all 0.3s ease;

    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(106, 142, 251, 0.25);
      border-color: #6a8efb;
    }
  }

  .btn-primary {
    background-color: #6a8efb;
    border-color: #6a8efb;
    border-radius: 10px;
    padding: 12px;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background-color: #5a7ee9;
      border-color: #5a7ee9;
    }
  }
`;

const FormularioR = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const email = query.get("email");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showErrorAlert("Las contraseñas no coinciden");
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/passrecover`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, passnew: password }),
    });

    if (response.ok) {
      showSuccessAlert("Contraseña restablecida con éxito");
      navigate("/");
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
    <StyledContainer fluid>
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <StyledCard>
            <div className="text-center">
              <StyledTitle>Restablecer Contraseña</StyledTitle>
            </div>
            <StyledForm onSubmit={handleSubmit}>
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
              <Button variant="primary" type="submit" className="w-100 mt-4">
                Restablecer Contraseña
              </Button>
            </StyledForm>
          </StyledCard>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default FormularioR;
