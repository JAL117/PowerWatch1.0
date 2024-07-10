import React from 'react';
import styled from 'styled-components';
import img from "../../Img/Detective.png";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  text-align: center;
  
`;

const Title = styled.h1`
  font-size: clamp(2rem , 5vw , 4.5rem);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 800px;
  

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Image = styled.img`
  max-width: 50%;
  height: 50%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Welcome = () => {
  return (
    <WelcomeContainer className='ms-5'>
      <Title className='mt-5'>Bienvenido a Powerwatch</Title>
      <Description style={{textAlign:"justify"}} className='mt-3 mb-5'>
        Gracias por unirte a nuestra plataforma de monitoreo de energía avanzada. Con PowerWatch, podrás supervisar y optimizar tu consumo energético de manera eficiente y sostenible. Estamos aquí para ayudarte a tomar el control y maximizar la eficiencia de tu uso de energía. ¡Comencemos a hacer una diferencia juntos!
      </Description>
      <Image src={img} alt="Detective de energía" />
    </WelcomeContainer>
  );
}

export default Welcome;