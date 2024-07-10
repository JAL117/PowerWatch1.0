import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import powerWatchImage from "../../Img/MonitorDeEnergia.png";
import { IoCartOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const PowerWatch = () => {
  const styles = {
    container: {
      background: "linear-gradient(45deg, #FF8C00, #FFA500)",
      borderRadius: "20px",
      padding: "2rem",
      maxWidth: "800px",
      margin: "2rem auto",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
      fontWeight: "bold",
      color: "white",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
      color: "white",
      marginBottom: "1.5rem",
    },
    image: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "10px",
    },
    button: {
      padding: "0.5rem 1rem",
      fontSize: "0.9rem",
      margin: "0.25rem",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
  };

  return (
    <Container style={styles.container}>
      <Row className="align-items-center">
        <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
          <h2 style={styles.title}>PowerWatch 2.0</h2>
          <p style={styles.subtitle}>
            La última versión del sistema de monitoreo está aquí.
            ¡Inicie su servicio hoy mismo!
          </p>
          <Button
            variant="light"
            as={Link}
            to="/Login"
            style={styles.button}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          >
            <IoCartOutline className="me-1" /> Comprar
          </Button>
          <Button
            variant="outline-light"
            as={Link}
            to="/instrucciones"
            style={styles.button}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          >
            <MdKeyboardArrowRight className="me-1" /> Saber más
          </Button>
        </Col>
        <Col md={6}>
          <img
            src={powerWatchImage}
            alt="PowerWatch"
            style={styles.image}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PowerWatch;