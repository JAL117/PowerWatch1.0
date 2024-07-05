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
      title:
        'Instala el dispositivo "PowerWatch" en la estación eléctrica deseada.',
      text: "2",
      image: cardImage2,
    },
    {
      title: "Ingresa a la web e inicia sesión",
      text: "3",
      image: cardImage3,
    },
    {
      title:
        "Ingresa el código de tu dispositivo y listo, podrás monitorear tu consumo de energía.",
      text: "4",
      image: cardImage4,
    },
  ];

  return (

    <div className="mt-4">
        <p style={{textAlign:"center", fontSize:"clamp(1rem , 5vw , 3rem)" , fontWeight:"600"}}>Instrucciones</p>
          <div className="d-flex justify-content-center align-items-center mt-5">
      <Container>
        <Row className="justify-content-center">
          {cardData.map((card, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card
                className="text-center h-100"
                style={{ backgroundColor: "#FFB800", color: "#fff", border: "none", display: "flex", flexDirection: "column", justifyContent: "space-between" , textAlign:"center" }}
              >
                <Card.Img
                  variant="top"
                  src={card.image}
                  className="mx-auto d-block mt-3"
                  style={{ width: "50%" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{fontSize: "clamp(1rem, 5vw, 15pt)"}}>{card.text}</Card.Title>
                  <Card.Text style={{fontSize: "clamp(1rem, 5vw, 20pt)"}}>{card.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </div>
  
  );
};

export default CardGrid;
