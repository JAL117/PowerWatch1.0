import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import cardImage1 from "../../Img/_00194bb7-b45f-4c06-ba84-f3814cbe5259-Photoroom.png";
import cardImage2 from "../../Img/_4de2a2e0-b8be-4990-b06b-e3138f6deaed-Photoroom.png";
import cardImage3 from "../../Img/Captura de pantalla 2024-07-04 132155.png";
import cardImage4 from "../../Img/descarga.png";

const CardGrid = () => {
  const cardData = [
    {
      title: '¡Adquiere tu dispositivo de monitoreo "PowerWatch"!',
      text: "1",
      image: cardImage1,
    },
    {
      title: 'Instala el dispositivo "PowerWatch" en la estación eléctrica deseada.',
      text: "2",
      image: cardImage2,
    },
    {
      title: "Ingresa a la web e inicia sesión",
      text: "3",
      image: cardImage3,
    },
    {
      title: "Ingresa el código de tu dispositivo y listo, podrás monitorear tu consumo de energía.",
      text: "4",
      image: cardImage4,
    },
  ];

  const styles = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      padding: '2rem 0',
    },
    container: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      maxWidth: '1500px',
    },
    title: {
      fontSize: 'clamp(1.2rem, 4vw, 2rem)',
      fontWeight: '600',
      color: '#FF8C00',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    card: {
      backgroundColor: '#FF8C00',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      height: '100%',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      },
    },
    cardImg: {
      width: '50%',
      height: 'auto',
      margin: '0.5rem auto',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    cardNumber: {
      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
      fontWeight: 'bold',
      marginBottom: '0.3rem',
    },
    cardTitle: {
      fontSize: 'clamp(0.8rem, 2vw, 1rem)',
      lineHeight: '1.3',
    },
  };

  return (
    <div style={styles.outerContainer}>
      <Container style={styles.container}>
        <h2 style={styles.title}>Instrucciones</h2>
        <Row className="justify-content-center">
          {cardData.map((card, index) => (
            <Col key={index} xs={12} sm={6} md={3} className="mb-3">
              <Card style={styles.card}>
                <Card.Img
                  variant="top"
                  src={card.image}
                  style={styles.cardImg}
                />
                <Card.Body className="d-flex flex-column justify-content-center text-center">
                  <Card.Title style={styles.cardNumber}>{card.text}</Card.Title>
                  <Card.Text style={styles.cardTitle}>{card.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CardGrid;