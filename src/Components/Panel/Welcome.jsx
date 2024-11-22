import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import { FaBolt, FaMobileAlt, FaChartLine, FaTools, FaMoneyBillWave, FaCreditCard, FaRegClock, FaFileAlt, FaCalendarAlt, FaMapMarkerAlt, FaMobile } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const TextContent = styled.div`
  flex: 1;
  text-align: left;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 5vw, 4.5rem);
  margin-bottom: 1rem;
  color: #00126E;
`;

const Description = styled.p`
  font-size: clamp(2rem, 5vw, 1.1rem);
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 1rem;
`;

const Feature = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #00126E;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 2rem;
  color: #00126E;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 1.5rem;
  color: #555;
`;

const DeviceSection = styled.div`
  background-color: #f0f4ff;
  padding: 2rem;
  border-radius: 10px;
  margin-top: 3rem;
  text-align: center;
`;

const DeviceTitle = styled.h2`
  font-size: 3rem;
  color: #00126E;
  margin-bottom: 1rem;
`;

const DeviceDescription = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 2rem;
`;

const DeviceOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const DeviceOption = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 250px;
  max-width: 300px;
`;

const DeviceOptionTitle = styled.h3`
  font-size: 1.5rem;
  color: #00126E;
  margin-bottom: 1rem;
`;

const DeviceOptionPrice = styled.p`
  font-size: 1.8rem;
  color: #FFB800;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const DeviceOptionDescription = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin-bottom: 1.5rem;
`;

const DeviceOptionFeature = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
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

const Welcome = () => {
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
    const planId = plan === 'dispositivo' ? 1 : plan === 'dispositivo-instalacion' ? 2 : 1;

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/plan/assignPlan`, {
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
    const monto = selectedPlan === 'dispositivo' ? 3500 : selectedPlan === 'dispositivo-instalacion' ? 4100 : 0; // Ajusta el monto según el plan
    const fecha = new Date().toISOString().split('T')[0];

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/payments/generate`, {
        ...formData,
        fecha: fecha,
        email: user.email,
        monto: monto,
        paquete: selectedPlan === 'dispositivo' ? 1 : selectedPlan === 'dispositivo-instalacion' ? 2 : 1,
        direccion: '' 
      }, {
        headers: {
          'x-token-access': token
        }
      });

      const newPlanDate = response.data.data[1];
      const updatedUser = { ...user, plan: newPlanDate };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setPlanDate(newPlanDate.split("T")[0]);

      Swal.fire({
        title: 'Pago procesado con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      handleCloseForm();
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      Swal.fire({
        title: 'Error al procesar el pago',
        text: 'Hubo un problema al procesar su pago. Por favor, intente nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <WelcomeContainer style={{ marginTop: "8%" }}>
      <Content>
        <TextContent>
          <Title>Bienvenido a Powerwatch</Title>
          <Description className='mt-5 mb-5'>
            Gracias por unirte a nuestra plataforma de monitoreo de energía avanzada. Con PowerWatch, podrás supervisar y optimizar tu consumo energético de manera eficiente y sostenible. Estamos aquí para ayudarte a tomar el control y maximizar la eficiencia de tu uso de energía.
          </Description>
          <FeaturesContainer>
            <Feature>
              <FeatureIcon><FaBolt /></FeatureIcon>
              <FeatureTitle>Monitoreo en Tiempo Real</FeatureTitle>
              <FeatureDescription>Supervisa tu consumo de energía en tiempo real con datos precisos.</FeatureDescription>
            </Feature>
            <Feature>
              <FeatureIcon><FaChartLine /></FeatureIcon>
              <FeatureTitle>Análisis Detallado</FeatureTitle>
              <FeatureDescription>Obtén informes detallados y gráficos para entender mejor tu consumo.</FeatureDescription>
            </Feature>
          </FeaturesContainer>
        </TextContent>
      </Content>
      <DeviceSection>
        <DeviceTitle>Dispositivos Power Watch</DeviceTitle>
        <DeviceDescription>
          Obtén el control total de tu consumo energético con nuestros dispositivos Power Watch. Elige la opción que mejor se adapte a tus necesidades.
        </DeviceDescription>
        <DeviceOptions>
          <DeviceOption>
            <DeviceOptionTitle>Dispositivo Power Watch</DeviceOptionTitle>
            <DeviceOptionPrice><FaMoneyBillWave /> $3,500 MXN</DeviceOptionPrice>
            <DeviceOptionDescription>
              <DeviceOptionFeature><FaMobileAlt /> Dispositivo Power Watch</DeviceOptionFeature>
              <DeviceOptionFeature><FaChartLine /> Monitoreo en tiempo real</DeviceOptionFeature>
            </DeviceOptionDescription>
            <StyledButton onClick={() => handleCompra('dispositivo')}>Comprar Ahora</StyledButton>
          </DeviceOption>
          <DeviceOption>
            <DeviceOptionTitle>Dispositivo + Instalación</DeviceOptionTitle>
            <DeviceOptionPrice><FaMoneyBillWave /> $4,100 MXN</DeviceOptionPrice>
            <DeviceOptionDescription>
              <DeviceOptionFeature><FaMobileAlt /> Dispositivo Power Watch</DeviceOptionFeature>
              <DeviceOptionFeature><FaTools /> Instalación profesional</DeviceOptionFeature>
              <DeviceOptionFeature><FaChartLine /> Monitoreo en tiempo real</DeviceOptionFeature>
            </DeviceOptionDescription>
            <StyledButton onClick={() => handleCompra('dispositivo-instalacion')}>Comprar Ahora</StyledButton>
          </DeviceOption>
        </DeviceOptions>
      </DeviceSection>

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
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                placeholder="Número"
                required
                value={address.number}
                onChange={(e) => setAddress({ ...address, number: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ciudad"
                required
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Estado"
                required
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código Postal"
                required
                value={address.zipCode}
                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Referencias</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Referencias para la entrega"
                value={address.references}
                onChange={(e) => setAddress({ ...address, references: e.target.value })}
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
          <Modal.Title>Formulario de Pago - {selectedPlan === 'dispositivo' ? 'Dispositivo Power Watch' : selectedPlan === 'dispositivo-instalacion' ? 'Dispositivo + Instalación' : null}</Modal.Title>
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
                onChange={(e) => setFormData({ ...formData, tarjeta: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
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
    </WelcomeContainer>
  );
};

export default Welcome;
