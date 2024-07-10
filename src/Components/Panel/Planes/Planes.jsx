import React, { useState } from 'react';
import { Card, Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCreditCard, FaRegClock, FaChartLine, FaFileAlt, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

const PlanesContainer = styled(Container)`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 50px;
  background-color: #f8f9fa;
`;

const PlanActual = styled(Card)`
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    width: 95%;
  }
`;
const PlanesGrid = styled(Row)`
  justify-content: center;
`;

const PlanCard = styled(Card)`
  background-color: #fff;
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const PlanTitle = styled(Card.Title)`
  color: #00126E;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PlanPrice = styled.h2`
  color: #FFB800;
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const PlanFeature = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    color: #00126E;
  }
`;

const StyledButton = styled(Button)`
  background-color: #00126E;
  border: none;
  padding: 10px 20px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000c4a;
  }
`;

const Planes = () => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleCompra = (plan) => {
        setSelectedPlan(plan);
        setShowPaymentForm(true);
    };

    const handleClosePaymentForm = () => {
        setShowPaymentForm(false);
    };

    const handleSubmitPayment = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para procesar el pago
        alert('Pago procesado con éxito');
        setShowPaymentForm(false);
    };

    return (
        <PlanesContainer fluid>
            <h1 className="text-center mb-5">Planes de Suscripción</h1>

            <PlanActual>
                <Row>
                    <Col md={6}>
                        <h2><FaRegClock /> Plan Actual</h2>
                        <p>Plan Mensual</p>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <p><FaCalendarAlt /> Vence: 31 de Agosto, 2024</p>
                    </Col>
                </Row>
            </PlanActual>

            <PlanesGrid>
                <Col md={6} lg={5} xl={4} className="mb-4">
                    <PlanCard>
                        <Card.Body className="d-flex flex-column">
                            <PlanTitle>Plan Mensual</PlanTitle>
                            <PlanPrice><FaMoneyBillWave /> $2,000 / mes</PlanPrice>
                            <Card.Text>
                                <ul className="list-unstyled">
                                    <PlanFeature><FaChartLine /> Acceso a gráficas detalladas</PlanFeature>
                                    <PlanFeature><FaFileAlt /> Generación de reportes</PlanFeature>
                                </ul>
                            </Card.Text>
                            <StyledButton className="mt-auto" onClick={() => handleCompra('mensual')}>Comprar Ahora</StyledButton>
                        </Card.Body>
                    </PlanCard>
                </Col>

                <Col md={6} lg={5} xl={4} className="mb-4">
                    <PlanCard>
                        <Card.Body className="d-flex flex-column">
                            <PlanTitle>Plan Anual</PlanTitle>
                            <PlanPrice><FaMoneyBillWave /> $20,000 / año</PlanPrice>
                            <Card.Text>
                                <ul className="list-unstyled">
                                    <PlanFeature><FaChartLine /> Acceso a gráficas detalladas</PlanFeature>
                                    <PlanFeature><FaFileAlt /> Generación de reportes</PlanFeature>
                                    <PlanFeature><FaMoneyBillWave /> Ahorra 2 meses comparado con el plan mensual</PlanFeature>
                                </ul>
                            </Card.Text>
                            <StyledButton className="mt-auto" onClick={() => handleCompra('anual')}>Comprar Ahora</StyledButton>
                        </Card.Body>
                    </PlanCard>
                </Col>
            </PlanesGrid>

            <Modal show={showPaymentForm} onHide={handleClosePaymentForm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Formulario de Pago - {selectedPlan === 'mensual' ? 'Plan Mensual' : 'Plan Anual'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitPayment}>
                        <Form.Group className="mb-3">
                            <Form.Label><FaCreditCard /> Número de Tarjeta</Form.Label>
                            <Form.Control type="text" placeholder="1234 5678 9012 3456" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre en la Tarjeta</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" required />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha de Expiración</Form.Label>
                                    <Form.Control type="text" placeholder="MM/AA" required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="text" placeholder="123" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <StyledButton type="submit" className="w-100">
                            Procesar Pago
                        </StyledButton>
                    </Form>
                </Modal.Body>
            </Modal>
        </PlanesContainer>
    );
}

export default Planes;