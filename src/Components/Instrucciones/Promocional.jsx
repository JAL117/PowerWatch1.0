import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBolt, FaBell, FaChartLine, FaDesktop } from 'react-icons/fa';

const Promocional = () => {
    const styles = {
        container: {
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '50px 20px',
            borderRadius: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            width:"95%"
        },
        title: {
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#ff8c00',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center',
        },
        subtitle: {
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#ff8c00',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '20px',
        },
        paragraph: {
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            color: '#333',
            lineHeight: '1.6',
            textAlign: 'center',
            marginBottom: '40px',
        },
        card: {
            border: 'none',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            height: '100%',
            '&:hover': {
                transform: 'translateY(-5px)',
            },
        },
        cardTitle: {
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: 'bold',
            color: '#ff8c00',
        },
        cardText: {
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#555',
        },
        icon: {
            fontSize: '2.5rem',
            color: '#ff8c00',
            marginBottom: '15px',
        },
    };

    const features = [
        { icon: <FaBolt />, title: "Detección Inteligente", text: "Identifica al instante eventos críticos como 'Desconexión del suministro' y 'Picos energéticos'." },
        { icon: <FaBell />, title: "Alertas Inmediatas", text: "Mantente siempre informado con notificaciones instantáneas vía correo electrónico ante cualquier anomalía." },
        { icon: <FaChartLine />, title: "Control de Consumo", text: "Compara tu consumo energético con el reportado por tu proveedor para asegurar la precisión de tus gastos." },
        { icon: <FaDesktop />, title: "Visualización en Tiempo Real", text: "Accede a gráficas dinámicas y detalladas que muestran el consumo eléctrico al momento." },
    ];

    return (
        <Container fluid style={styles.container} className='p-5 mt-5'>
            <h1 style={styles.title}>¡Descubre "PowerWatch v1"!</h1>
            <p style={styles.paragraph}>
                ¡Lleva el control total de tu energía con PowerWatch v1! Nuestro software de monitoreo y alerta temprana, diseñado especialmente para la industria, te brinda todas las herramientas que necesitas para mantener tu operación sin interrupciones y optimizar tu consumo energético.
            </p>

            <h2 style={styles.subtitle}>Funciones Destacadas:</h2>
            <Row>
                {features.map((feature, index) => (
                    <Col key={index} md={6} lg={3} className="mb-4">
                        <Card style={styles.card}>
                            <Card.Body className="text-center">
                                <div style={styles.icon}>{feature.icon}</div>
                                <Card.Title style={styles.cardTitle}>{feature.title}</Card.Title>
                                <Card.Text style={styles.cardText}>{feature.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h2 style={styles.subtitle}>¿Por qué elegir PowerWatch v1?</h2>
            <Row>
                <Col md={4} className="mb-4">
                    <Card style={styles.card}>
                        <Card.Body className="text-center">
                            <Card.Title style={styles.cardTitle}>Plataforma Web Intuitiva</Card.Title>
                            <Card.Text style={styles.cardText}>Gestiona todo desde una interfaz fácil de usar.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card style={styles.card}>
                        <Card.Body className="text-center">
                            <Card.Title style={styles.cardTitle}>Módulo de Datos Avanzado</Card.Title>
                            <Card.Text style={styles.cardText}>Potente herramienta para la lectura y manejo de datos energéticos.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card style={styles.card}>
                        <Card.Body className="text-center">
                            <Card.Title style={styles.cardTitle}>Enfoque en la Precisión</Card.Title>
                            <Card.Text style={styles.cardText}>Nos centramos en la medición de la corriente para detectar desconexiones, asegurando datos precisos y confiables.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Promocional;