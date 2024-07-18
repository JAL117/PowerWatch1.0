import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCreditCard, FaRegClock, FaChartLine, FaFileAlt, FaCalendarAlt, FaMoneyBillWave, FaMobile, FaTools, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

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
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [planDate, setPlanDate] = useState('');
    const [address, setAddress] = useState({
        street: '',
        number: '',
        city: '',
        state: '',
        zipCode: '',
        references: '',
    });
    const [formData, setFormData] = useState({
        tarjeta: '',
        cvv: '',
        fecha: '',
        metodoPago: 'tarjeta',
        monto: 0,
        paquete: 1,
        direccion: ''
    });

    useEffect(() => {
        const savedValue = JSON.parse(localStorage.getItem('user'));
        if (savedValue && savedValue.plan != null) {
            setPlanDate(savedValue.plan.split("T")[0]);
        }
    }, []);

    const handleCompra = async (plan) => {
        setSelectedPlan(plan);
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        const planId = plan === 'mensual' ? 1 : plan === 'anual' ? 2 : 1;

        try {
            await axios.put('https://api-piweb.piweb.lat/plan/assignPlan', {
                email: user.email,
                plan: planId
            }, {
                headers: {
                    'x-token-access': token
                }
            });

            if (plan === 'dispositivo' || plan === 'dispositivo-instalacion') {
                setShowAddressForm(true);
            } else {
                setShowPaymentForm(true);
            }
        } catch (error) {
            console.error('Error al asignar el plan:', error);
        }
    };

    const handleCloseForm = () => {
        setShowAddressForm(false);
        setShowPaymentForm(false);
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setShowAddressForm(false);
        setShowPaymentForm(true);
    };

    const handleSubmitPayment = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        const monto = selectedPlan === 'mensual' ? 221.33 : selectedPlan === 'anual' ? 2400 : 3500;
        const fecha = new Date().toISOString().split('T')[0];

        try {
            await axios.post('https://api-piweb.piweb.lat/payments/generate', {
                ...formData,
                fecha: fecha,
                email: user.email,
                monto: monto,
                paquete: selectedPlan === 'mensual' ? 1 : selectedPlan === 'anual' ? 2 : 1,
                direccion: ''
            }, {
                headers: {
                    'x-token-access': token
                }
            });

            alert('Pago procesado con éxito');
            handleCloseForm();
        } catch (error) {
            console.error('Error al procesar el pago:', error);
        }
    };

    return (
        <PlanesContainer fluid>
            <h1 className="text-center mb-5 mt-5">Planes de Suscripción</h1>

            <PlanActual>
                <Row>
                    <Col md={6}>
                        <h2><FaRegClock /> Plan Actual</h2>
                        <p>Plan Mensual</p>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <p><FaCalendarAlt />{" " + planDate}</p>
                    </Col>
                </Row>
            </PlanActual>

            <h2 className="text-center mb-4">Planes de Servicio</h2>
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

            <h2 className="text-center mb-4 mt-5">Dispositivos Power Watch</h2>
            <PlanesGrid>
                <Col md={6} lg={5} xl={4} className="mb-4">
                    <PlanCard>
                        <Card.Body className="d-flex flex-column">
                            <PlanTitle>Dispositivo Power Watch</PlanTitle>
                            <PlanPrice><FaMoneyBillWave /> $3,500 MXN</PlanPrice>
                            <Card.Text>
                                <ul className="list-unstyled">
                                    <PlanFeature><FaMobile /> Dispositivo Power Watch</PlanFeature>
                                    <PlanFeature><FaChartLine /> Monitoreo en tiempo real</PlanFeature>
                                </ul>
                            </Card.Text>
                            <StyledButton className="mt-auto" onClick={() => handleCompra('dispositivo')}>Comprar Ahora</StyledButton>
                        </Card.Body>
                    </PlanCard>
                </Col>

                <Col md={6} lg={5} xl={4} className="mb-4">
                    <PlanCard>
                        <Card.Body className="d-flex flex-column">
                            <PlanTitle>Dispositivo + Instalación</PlanTitle>
                            <PlanPrice><FaMoneyBillWave /> $4,100 MXN</PlanPrice>
                            <Card.Text>
                                <ul className="list-unstyled">
                                    <PlanFeature><FaMobile /> Dispositivo Power Watch</PlanFeature>
                                    <PlanFeature><FaTools /> Instalación profesional</PlanFeature>
                                    <PlanFeature><FaChartLine /> Monitoreo en tiempo real</PlanFeature>
                                </ul>
                            </Card.Text>
                            <StyledButton className="mt-auto" onClick={() => handleCompra('dispositivo-instalacion')}>Comprar Ahora</StyledButton>
                        </Card.Body>
                    </PlanCard>
                </Col>
            </PlanesGrid>

            <Modal show={showAddressForm} onHide={handleCloseForm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Dirección de Envío - {selectedPlan === 'dispositivo' ? 'Dispositivo Power Watch' : 'Dispositivo + Instalación'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddressSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label><FaMapMarkerAlt /> Calle</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Calle" 
                                required 
                                value={address.street}
                                onChange={(e) => setAddress({...address, street: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Número</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Número" 
                                required 
                                value={address.number}
                                onChange={(e) => setAddress({...address, number: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ciudad" 
                                required 
                                value={address.city}
                                onChange={(e) => setAddress({...address, city: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Estado" 
                                required 
                                value={address.state}
                                onChange={(e) => setAddress({...address, state: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Código Postal" 
                                required 
                                value={address.zipCode}
                                onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Referencias</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3}
                                placeholder="Referencias para la entrega" 
                                value={address.references}
                                onChange={(e) => setAddress({...address, references: e.target.value})}
                            />
                        </Form.Group>
                        <StyledButton type="submit" className="w-100">
                            Continuar al Pago
                        </StyledButton>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showPaymentForm} onHide={handleCloseForm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Formulario de Pago - {selectedPlan === 'mensual' ? 'Plan Mensual' : selectedPlan === 'anual' ? 'Plan Anual' : selectedPlan === 'dispositivo' ? 'Dispositivo Power Watch' : 'Dispositivo + Instalación'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitPayment}>
                        <Form.Group className="mb-3">
                            <Form.Label><FaCreditCard /> Número de Tarjeta</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="1234 5678 9012 3456" 
                                required 
                                value={formData.tarjeta}
                                onChange={(e) => setFormData({...formData, tarjeta: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre en la Tarjeta</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" required />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha de Expiración</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="MM/AA" 
                                        required 
                                        value={formData.fecha}
                                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="123" 
                                        required 
                                        value={formData.cvv}
                                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                                    />
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
