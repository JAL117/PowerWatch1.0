import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styled, { keyframes } from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 184, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 184, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 184, 0, 0);
  }
`;

const GraficaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 80px);
  margin-left: 80px;
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: calc(96vh - 60px);
  margin-top: 20px;

  @media (max-width: 768px) {
    width: calc(100% - 90px);
    margin-left: 20px;
  }
`;

const GraficaTitle = styled.h1`
  font-size: 2.5rem;
  color: #00126E;
  margin-bottom: 1rem;
  text-align: center;
`;

const GraficaWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

const GraficaItem = styled.div`
  flex: 1 1 calc(33% - 2rem);
  min-width: 300px;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const LiveIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  background-color: #FFB800;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const HistogramContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#00126E'
      }
    },
    title: {
      display: true,
      text: 'Mediciones en Tiempo Real',
      color: '#00126E',
      font: {
        size: 16,
        weight: 'bold'
      }
    },
  },
  scales: {
    x: {
      ticks: { color: '#00126E' },
      grid: { color: 'rgba(0, 18, 110, 0.1)' }
    },
    y: {
      ticks: { color: '#00126E' },
      grid: { color: 'rgba(0, 18, 110, 0.1)' }
    }
  },
  maintainAspectRatio: false
};

const histogramOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#00126E'
      }
    },
    title: {
      display: true,
      text: 'Historial de kWh Consumidos',
      color: '#00126E',
      font: {
        size: 16,
        weight: 'bold'
      }
    },
  },
  scales: {
    x: {
      ticks: { color: '#00126E' },
      grid: { color: 'rgba(0, 18, 110, 0.1)' }
    },
    y: {
      ticks: { color: '#00126E' },
      grid: { color: 'rgba(0, 18, 110, 0.1)' }
    }
  },
  maintainAspectRatio: false
};

const Grafica = () => {
  const [corrienteData, setCorrienteData] = useState({
    labels: [],
    datasets: [{
      label: 'Corriente',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  });

  const [voltajeData, setVoltajeData] = useState({
    labels: [],
    datasets: [{
      label: 'Voltaje',
      data: [],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }],
  });

  const [amperajeData, setAmperajeData] = useState({
    labels: [],
    datasets: [{
      label: 'Amperaje',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }],
  });

  const [kwhHistorialData, setKwhHistorialData] = useState({
    labels: [],
    datasets: [{
      label: 'kWh Consumidos',
      data: [],
      backgroundColor: 'rgba(255, 184, 0, 0.6)',
      borderColor: 'rgba(255, 184, 0, 1)',
      borderWidth: 1
    }],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulación de datos en tiempo real
      const newTime = new Date().toLocaleTimeString();
      const newCorriente = Math.random() * 100;
      const newVoltaje = Math.random() * 200;
      const newAmperaje = Math.random() * 50;

      setCorrienteData(prevData => ({
        labels: [...prevData.labels.slice(-9), newTime],
        datasets: [{
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data.slice(-9), newCorriente]
        }]
      }));

      setVoltajeData(prevData => ({
        labels: [...prevData.labels.slice(-9), newTime],
        datasets: [{
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data.slice(-9), newVoltaje]
        }]
      }));

      setAmperajeData(prevData => ({
        labels: [...prevData.labels.slice(-9), newTime],
        datasets: [{
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data.slice(-9), newAmperaje]
        }]
      }));
    }, 2000);

    // Simulación de datos históricos de kWh
    const historialKwh = Array.from({length: 12}, () => Math.floor(Math.random() * 500) + 100);
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    setKwhHistorialData({
      labels: meses,
      datasets: [{
        label: 'kWh Consumidos',
        data: historialKwh,
        backgroundColor: 'rgba(255, 184, 0, 0.6)',
        borderColor: 'rgba(255, 184, 0, 1)',
        borderWidth: 1
      }],
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <GraficaContainer>
      <GraficaTitle>Consumo de Energía en Tiempo Real</GraficaTitle>
      <GraficaWrapper>
        <GraficaItem>
          <LiveIndicator />
          <Line options={options} data={corrienteData} height={300} />
        </GraficaItem>
        <GraficaItem>
          <LiveIndicator />
          <Line options={options} data={voltajeData} height={300} />
        </GraficaItem>
        <GraficaItem>
          <LiveIndicator />
          <Line options={options} data={amperajeData} height={300} />
        </GraficaItem>
      </GraficaWrapper>
      <HistogramContainer>
        <Bar options={histogramOptions} data={kwhHistorialData} height={300} />
      </HistogramContainer>
    </GraficaContainer>
  );
}

export default Grafica;