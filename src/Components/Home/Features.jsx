import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import empresario from "../../Img/DetectiveMonitor.png";
import { AiOutlineAlert } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";

const Features = () => {
  return (
    <Container className="my-5 mb-5">
      <Row>
        <Col xs={12} className="text-center mt-5">
          <h2
            className="responsive-h2"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#00126E",
              textAlign: "justify",
              padding: "20px",
            }}
          >
            ¿Qué es PowerWatch?
          </h2>
          <div className="row">
            <div className="col-md-8">
              <p
                className="mb-5 responsive-p"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 2.5rem)",
                  textAlign: "justify",
                  padding: "20px",
                }}
              >
                PowerWatch es un servicio integral de monitoreo de energía
                diseñado para empresas y sus sectores de producción. Este
                sistema está preparado para medir y analizar el consumo de
                energía desde el primer momento, ofreciendo herramientas
                esenciales para la gestión eficiente de los recursos
                energéticos.
              </p>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <img
                src={empresario}
                alt="Detective de energía"
                className="img-fluid"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "40vh",
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <p style={{ fontSize: "35pt", color: "orange", fontWeight: "550" }}>
          Funciones
        </p>
        <Col md={3}>
          <Card
            className="text-center mt-2"
            style={{ backgroundColor: "rgb(169 ,169, 169, 0.2)" }}
          >
            <Card.Body>
              <AiOutlineAlert size={50} className="mb-3"/>
              <Card.Title style={{ fontSize: "20pt" }}>
                Aplicaciones Críticas
              </Card.Title>
              <Card.Text style={{ textAlign: "justify", fontSize: "15pt" }}>
                Ideal para monitorear áreas críticas dentro de una empresa,
                EnergyTrack es especialmente útil en sectores de alta demanda
                energética, asegurando que todos los sistemas funcionen de
                manera óptima y segura.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            className="text-center mt-2"
            style={{ backgroundColor: "rgb(169 ,169, 169, 0.2)" }}
          >
            <Card.Body>
              <RiMoneyDollarCircleLine size={50} className="mb-3" />
              <Card.Title style={{ fontSize: "20pt" }}>Optimización de Costos</Card.Title>
              <Card.Text style={{ textAlign: "justify", fontSize: "15pt" }}>
                El sistema proporciona gráficos interactivos que muestran el
                comportamiento del consumo de energía a lo largo del tiempo.
                Esto facilita la comparación con las facturas del proveedor y
                ayuda a identificar discrepancias.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            className="text-center mt-2"
            style={{ backgroundColor: "rgb(169 ,169, 169, 0.2)" }}
          >
            <Card.Body>
            <BsGraphUp size={50} className="mb-3" />
              <Card.Title style={{ fontSize: "20pt" }}>Visualización y Análisis</Card.Title>
              <Card.Text style={{ textAlign: "justify", fontSize: "15pt" }}>
                El sistema proporciona gráficos interactivos que muestran el
                comportamiento del consumo de energía a lo largo del tiempo.
                Esto facilita la comparación con las facturas del proveedor y
                ayuda a identificar discrepancias.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            className="text-center mt-2"
            style={{ backgroundColor: "rgb(169 ,169, 169, 0.2)" }}
          >
            <Card.Body>
            <IoNotificationsOutline size={50} className="mb-3" />
              <Card.Title style={{ fontSize: "20pt" }}>Alarma y Prevención</Card.Title>
              <Card.Text style={{ textAlign: "justify", fontSize: "15pt" }}>
                El sistema proporciona gráficos interactivos que muestran el
                comportamiento del consumo de energía a lo largo del tiempo.
                Esto facilita la comparación con las facturas del proveedor y
                ayuda a identificar discrepancias.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Features;
