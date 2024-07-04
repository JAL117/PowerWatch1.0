import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const BottomSection = () => {
  return (
    <Container className="my-5 mt-5">
      <h1>Licencia del software</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="bg-warning" style={{ height: '200px' }}>
              {/* Contenido de la primera tarjeta */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="bg-warning" style={{ height: '200px' }}>
              {/* Contenido de la segunda tarjeta */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="bg-warning" style={{ height: '200px' }}>
              {/* Contenido de la tercera tarjeta */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12} className="text-center">
          {/* Imagen y contenido adicional aquí */}
        </Col>
      </Row>
    </Container>
  );
}

export default BottomSection;
