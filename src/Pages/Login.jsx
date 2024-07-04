import React from 'react';
import FormularioLogin from '../Components/Login/FormularioLogin';
import Logos from '../Components/Login/logos';
import BackgroundImage from '../Img/descarga.png';
import { Container, Row, Col } from 'react-bootstrap';
import Animaciones from '../Components/common/animaciones';

const Login = () => {
    return (

        <Animaciones>
            <div style={{
            position: 'relative',
            minHeight: '100vh', // Usamos minHeight para asegurar altura mínima
            overflow: 'hidden',
        }}>
            <img src={BackgroundImage} alt="Imagen de fondo" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: '-1',
                filter: 'blur(7px)'
            }} />

            <div className="overlay" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(0,19,111,0.95), rgba(0,68,255,0.5))',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Container fluid style={{ padding: 0 }}>
                    <Row className="h-100">
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
