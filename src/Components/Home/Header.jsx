import React from 'react';
import { Container } from 'react-bootstrap';
import manufacturingImg from "../../Img/manufacturing.jpg"; 

const Header = () => {
  const styles = {
    header: {
      backgroundImage: `url(${manufacturingImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(5px)',
    },
    content: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      padding: '2rem',
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 5rem)',
      fontWeight: '700',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
      fontWeight: '400',
      maxWidth: '800px',
      margin: '0 auto',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.overlay}></div>
      <Container style={styles.content}>
        <h1 style={styles.title}>Control energético sin pérdida de tiempo</h1>
        <p style={styles.subtitle}>
          Optimiza tu consumo de energía y mejora la eficiencia de tu negocio con nuestras soluciones inteligentes.
        </p>
      </Container>
    </header>
  );
}

export default Header;