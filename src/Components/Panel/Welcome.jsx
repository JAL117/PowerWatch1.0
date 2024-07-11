import React from 'react';
import styled from 'styled-components';
import img from "../../Img/Detective.png";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const TextContent = styled.div`
  flex: 1;
  text-align: left;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4.5rem);
  margin-bottom: 1rem;
  color: #333;
`;

const Description = styled.p`
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.6;
  color: #555;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  @media (min-width: 768px) {
    max-width: 50%;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const Welcome = () => {
  return (
    <WelcomeContainer>
      <Content>
        <TextContent>
          <Title>Bienvenido a Powerwatch</Title>
          <Description>
            Gracias por unirte a nuestra plataforma de monitoreo de energía avanzada. Con PowerWatch, podrás supervisar y optimizar tu consumo energético de manera eficiente y sostenible. Estamos aquí para ayudarte a tomar el control y maximizar la eficiencia de tu uso de energía. ¡Comencemos a hacer una diferencia juntos!
          </Description>
        </TextContent>
        <Image src={img} alt="Detective de energía" />
      </Content>
    </WelcomeContainer>
  );
}

export default Welcome;