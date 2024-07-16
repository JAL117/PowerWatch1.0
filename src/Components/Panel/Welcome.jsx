import React from 'react';
import styled from 'styled-components';
import img from "../../Img/Detective.png";
import { Button } from 'react-bootstrap';
import { FaBolt, FaMobileAlt, FaChartLine, FaTools, FaMoneyBillWave } from 'react-icons/fa';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;

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
  color: #00126E;
`;

const Description = styled.p`
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
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

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 1rem;
`;

const Feature = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #00126E;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #00126E;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const DeviceSection = styled.div`
  background-color: #f0f4ff;
  padding: 2rem;
  border-radius: 10px;
  margin-top: 3rem;
  text-align: center;
`;

const DeviceTitle = styled.h2`
  font-size: 2rem;
  color: #00126E;
  margin-bottom: 1rem;
`;

const DeviceDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
`;

const DeviceOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const DeviceOption = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 250px;
  max-width: 300px;
`;

const DeviceOptionTitle = styled.h3`
  font-size: 1.5rem;
  color: #00126E;
  margin-bottom: 1rem;
`;

const DeviceOptionPrice = styled.p`
  font-size: 1.8rem;
  color: #FFB800;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const DeviceOptionDescription = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin-bottom: 1.5rem;
`;

const DeviceOptionFeature = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: #00126E;
  }
`;

const PurchaseButton = styled(Button)`
  background-color: #00126E;
  border: none;
  padding: 10px 20px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000c4a;
  }
`;

const Welcome = () => {
  return (
    <WelcomeContainer style={{marginTop:"8%"}}>
      <Content>
        <TextContent>
          <Title>Bienvenido a Powerwatch</Title>
          <Description>
            Gracias por unirte a nuestra plataforma de monitoreo de energía avanzada. Con PowerWatch, podrás supervisar y optimizar tu consumo energético de manera eficiente y sostenible. Estamos aquí para ayudarte a tomar el control y maximizar la eficiencia de tu uso de energía.
          </Description>
          <FeaturesContainer>
            <Feature>
              <FeatureIcon><FaBolt /></FeatureIcon>
              <FeatureTitle>Monitoreo en Tiempo Real</FeatureTitle>
              <FeatureDescription>Supervisa tu consumo de energía en tiempo real con datos precisos.</FeatureDescription>
            </Feature>
            <Feature>
              <FeatureIcon><FaChartLine /></FeatureIcon>
              <FeatureTitle>Análisis Detallado</FeatureTitle>
              <FeatureDescription>Obtén informes detallados y gráficos para entender mejor tu consumo.</FeatureDescription>
            </Feature>
            <Feature>
              <FeatureIcon><FaMobileAlt /></FeatureIcon>
              <FeatureTitle>Control Móvil</FeatureTitle>
              <FeatureDescription>Accede a tus datos y monitorea tu consumo energía desde cualquier lugar.</FeatureDescription>
            </Feature>
          </FeaturesContainer>
        </TextContent>
        <Image src={img} alt="Detective de energía" />
      </Content>
      <DeviceSection>
        <DeviceTitle>Dispositivos Power Watch</DeviceTitle>
        <DeviceDescription>
          Obtén el control total de tu consumo energético con nuestros dispositivos Power Watch. Elige la opción que mejor se adapte a tus necesidades.
        </DeviceDescription>
        <DeviceOptions>
          <DeviceOption>
            <DeviceOptionTitle>Dispositivo Power Watch</DeviceOptionTitle>
            <DeviceOptionPrice><FaMoneyBillWave /> $3,500 MXN</DeviceOptionPrice>
            <DeviceOptionDescription>
              <DeviceOptionFeature><FaMobileAlt /> Dispositivo Power Watch</DeviceOptionFeature>
              <DeviceOptionFeature><FaChartLine /> Monitoreo en tiempo real</DeviceOptionFeature>
            </DeviceOptionDescription>
            <PurchaseButton>Comprar Ahora</PurchaseButton>
          </DeviceOption>
          <DeviceOption>
            <DeviceOptionTitle>Dispositivo + Instalación</DeviceOptionTitle>
            <DeviceOptionPrice><FaMoneyBillWave /> $4,100 MXN</DeviceOptionPrice>
            <DeviceOptionDescription>
              <DeviceOptionFeature><FaMobileAlt /> Dispositivo Power Watch</DeviceOptionFeature>
              <DeviceOptionFeature><FaTools /> Instalación profesional</DeviceOptionFeature>
              <DeviceOptionFeature><FaChartLine /> Monitoreo en tiempo real</DeviceOptionFeature>
            </DeviceOptionDescription>
            <PurchaseButton>Comprar Ahora</PurchaseButton>
          </DeviceOption>
        </DeviceOptions>
      </DeviceSection>
    </WelcomeContainer>
  );
}

export default Welcome;