import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from "../../Img/LogotipoPiWeb.jpeg"

const Footer = () => {
  return (
    <footer className="text-white mt-5 p-4 text-center" style={{backgroundColor:"#00126E"}}>
      <Container>
        <Row>
          <Col md={3} className="text-left">
            <img src={logo} alt="Company Logo" style={{maxWidth: '100px' , borderRadius:"50%"}} />
            <p>Contacto: +52 9671941293</p>
            <p>Email: piwebsoft@gmail.com
            </p>
          </Col>
          <Col md={6} className="text-right mt-5">
            <p>&copy; {new Date().getFullYear()} Piweb. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
