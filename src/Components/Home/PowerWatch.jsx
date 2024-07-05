import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import powerWatchImage from "../../Img/MonitorDeEnergia.png";
import { IoCartOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const PowerWatch = () => {
  return (
    <Container
      style={{
        backgroundColor: "orange",
        padding: "1%",
        borderRadius: "35px",
        marginTop: "10%",
      }}
    >
      <h2
        className="text-center"
        style={{ fontSize: "clamp(2rem, 5vw, 5rem)", color: "#ffff" }}
      >
        PowerWatch 2.0
      </h2>
      <p
        className="text-center"
        style={{
          fontSize: "clamp(1rem , 5vw , 3.2rem)",
          padding: "5px",
          color: "#ffff",
        }}
      >
        La última versión del sistema de monitoreo está aquí.
        ¡Inicie su servicio hoy mismo!
      </p>
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <img
            src={powerWatchImage}
            alt="PowerWatch"
            className="img-fluid"
            style={{ width: "100%", maxWidth: "60vh" }}
          />
        </Col>
        <Col md={5} className="text-center">
          <Button variant="warning" className="mx-1 my-1 btn-lg">
            Contratar <IoCartOutline size={30} />
          </Button>
          <Button variant="primary" className="mx-1 my-1 btn-lg" as={Link} to="/instrucciones">
            Saber más <MdKeyboardArrowRight size={30} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PowerWatch;
