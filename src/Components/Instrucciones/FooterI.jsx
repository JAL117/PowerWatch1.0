import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../Img/LogotipoPiWeb.jpeg";
import { FaGithub } from "react-icons/fa"; 


const Footer = () => {
  return (
    <footer className="text-white py-5" style={{ backgroundColor: "#00126E" }}>
      <Container>
        <Row className="align-items-center">
          <Col lg={4} className="mb-4 mb-lg-0">
            <img
              src={logo}
              alt="Company Logo"
              className="mb-3"
              style={{ maxWidth: "100px", borderRadius: "50%" }}
            />
            <h5 className="mb-3">Piweb</h5>
            <p className="mb-1">Contacto: +52 9671941293</p>
            <p>Email: piwebsoft@gmail.com</p>
            <div className="mt-3">
              <a href="#" className="text-white me-3">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white me-3">
                <FaTwitter />
              </a>
              <a href="#" className="text-white me-3">
                <FaInstagram />
              </a>
              <a href="#" className="text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 className="mb-3">Desarrolladores</h5>
            <p>
              {" "}
              <Button variant="outline-warning" href="https://github.com/JAL117"> <FaGithub size={20} />   Jose Solorzano - Frontend</Button>
            </p>
            <p>
              <Button variant="outline-warning" href="https://github.com/JAL117"> <FaGithub size={20} />   Michel Vazquez - Backend</Button>
            </p>
            <p>
              <Button variant="outline-warning" href="https://github.com/JAL117"> <FaGithub size={20} />   Jose Gomez - Backend</Button>
            </p>
            <p><Button variant="outline-warning" href="https://github.com/JAL117"> <FaGithub size={20} />  Jesus Hernandez - Backend</Button></p>
          </Col>
          <Col lg={4}>
            <h5 className="mb-3">Enlaces rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Contacto
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Piweb. Todos los derechos
              reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
