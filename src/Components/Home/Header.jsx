import React from 'react';
import { Container } from 'react-bootstrap';
import manufacturingImg from "../../Img/manufacturing.jpg"; 

const Header = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${manufacturingImg})`,
    backgroundSize: 'cover',
    color: 'white',
    padding: '15rem 0',
    textAlign: 'center',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    zIndex: 1,
  };

  const headerTextStyle = {
    position: 'relative',
    zIndex: 2,
    fontSize: 'clamp(40px, 8vw, 100px)', 
    fontWeight: '700',
  };

  return (
    <div style={backgroundImageStyle}>
      <div style={overlayStyle}></div>
      <Container style={headerTextStyle}>
        Control energético sin pérdida de tiempo
      </Container>
    </div>
  );
}

export default Header;
