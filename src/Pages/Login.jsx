import React from 'react';
import FormularioLogin from '../Components/Login/FormularioLogin';
import Logos from '../Components/Login/logos';
import BackgroundImage from '../Img/descarga.png';
import { Container, Row, Col } from 'react-bootstrap';
import Animaciones from '../Components/common/animaciones';

const Login = () => {
    return (
        <Animaciones>
            <div className="min-vh-100 position-relative overflow-hidden">
                <img 
                    src={BackgroundImage} 
                    alt="Imagen de fondo" 
                    className="position-absolute w-100 h-100 object-fit-cover"
                    style={{
                        zIndex: '-1',
                        filter: 'blur(7px)'
                    }} 
                />

                <div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex"
                    style={{
                        background: 'linear-gradient(to right, rgba(0,19,111,0.95), rgba(0,68,255,0.5))'
                    }}
                >
                    <Container fluid className="p-0">
                        <Row className="h-100 g-0">
                            <Col md={6} className="d-flex align-items-center justify-content-center">
                                <Logos />
                            </Col>
                            <Col md={6} className="d-flex align-items-center justify-content-center">
                                <FormularioLogin />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Animaciones>
    );
}

export default Login;