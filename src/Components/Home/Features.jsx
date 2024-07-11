import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import empresario from "../../Img/DetectiveMonitor.png";
import { AiOutlineAlert } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";

const Features = () => {
  const features = [
    {
      icon: <AiOutlineAlert />,
      title: "Aplicaciones Críticas",
      description: "Ideal para monitorear áreas críticas dentro de una empresa, PowerWatch es especialmente útil en sectores de alta demanda energética, asegurando que todos los sistemas funcionen de manera óptima y segura."
    },
    {
      icon: <RiMoneyDollarCircleLine />,
      title: "Optimización de Costos",
      description: "Nuestro sistema proporciona herramientas para analizar y optimizar el consumo energético, permitiendo a las empresas reducir costos significativamente."
    },
    {
      icon: <BsGraphUp />,
      title: "Visualización y Análisis",
      description: "Gráficos interactivos muestran el comportamiento del consumo de energía a lo largo del tiempo, facilitando la comparación con facturas y la identificación de discrepancias."
    },
    {
      icon: <IoNotificationsOutline />,
      title: "Alarma y Prevención",
      description: "Sistema de alertas en tiempo real para prevenir problemas y optimizar el uso de energía, permitiendo una respuesta rápida ante cualquier anomalía."
    }
  ];

  const styles = {
    featureSection: {
      backgroundColor: "#f8f9fa",
      padding: "3rem 0",
      Width:"80%"
    },
    header: {
      fontSize: "clamp(2rem, 5vw, 4rem)",
      color: "#00126E",
      marginBottom: "2rem",
    },
    subHeader: {
      fontSize: "clamp(1.5rem, 5vw, 3rem)",
      color: "#ffc107",
      marginBottom: "2rem",
    },
    paragraph: {
      fontSize: "clamp(1rem, 5vw, 2rem)",
      color: "#6c757d",
      textAlign: "justify",
    },
    image: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "50%",
      boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
    },
    card: {
      height: "100%",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
      },
    },
    featureIcon: {
      backgroundColor: "#e9ecef",
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1rem",
    },
  };

  return (
    <Container fluid style={styles.featureSection} className="p-5 mt-5">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} className="text-center mb-5">
          <h2 style={styles.header}>¿Qué es PowerWatch?</h2>
          <Row className="align-items-center">
            <Col md={8}>
              <p style={styles.paragraph}>
                PowerWatch es un servicio integral de monitoreo de energía
                diseñado para empresas y sus sectores de producción. Este
                sistema está preparado para medir y analizar el consumo de
                energía desde el primer momento, ofreciendo herramientas
                esenciales para la gestión eficiente de los recursos
                energéticos.
              </p>
            </Col>
            <Col md={4}>
              <img
                src={empresario}
                alt="Detective de energía"
                style={styles.image}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col xs={12} className="text-center mb-5">
          <h3 style={styles.subHeader}>Funciones</h3>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        {features.map((feature, index) => (
          <Col key={index} xs={12} md={6} lg={3} className="mb-4">
            <Card style={styles.card}>
              <Card.Body className="d-flex flex-column">
                <div style={styles.featureIcon}>
                  {React.cloneElement(feature.icon, { size: 40 })}
                </div>
                <Card.Title className="h4 mb-3">{feature.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;