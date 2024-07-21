import React, { useState } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComparativaContainer = styled.div`
  background-color: #00126E;
  color: white;
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  height: 80vh; 
  max-width: 1500px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
  }

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  }
`;

const TitleMain = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 30px;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ChartContainer = styled.div`
  flex: 2;
  background-color: #001E9C;
  padding: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  flex: 1;
  font-weight: 300;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: none;
  flex: 2;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #FFB800;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: #FFB800;
  color: #00126E;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 184, 0, 0.3);

  &:hover {
    background-color: #FFA500;
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(255, 184, 0, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ComparativaBoard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [costePorKw, setCostePorKw] = useState('');
  const [totalCobro, setTotalCobro] = useState('');

  const chartData = {
    labels: ['Comparativa'],
    datasets: [
      {
        label: 'Periodo Actual',
        data: [65],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Periodo Anterior',
        data: [45],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Comparativa de gastos',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'white', font: { size: 14 } },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: 'white', font: { size: 14 } },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
    },
  };

  const handleCalcular = () => {
    console.log("Calculando...", { startDate, endDate, costePorKw, totalCobro });
    // Aquí iría la lógica para calcular y actualizar el gráfico
  };

  return (
    <ComparativaContainer style={{marginLeft:"14%"}}>
      <TitleMain style={{fontSize:"clamp(1rem , 5vw , 3rem)"}}>Total: kWh</TitleMain>
      <ContentContainer>
        <ChartContainer>
          {typeof Bar !== 'undefined' ? (
            <Bar data={chartData} options={options} style={{flexGrow: 1}} />
          ) : (
            <p>Cargando gráfico...</p>
          )}
        </ChartContainer>
        <FormContainer>
          <h3>Gastos por periodo</h3>
          <InputGroup>
            <Label>Inicio:</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <Label>Fin:</Label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <Label>Costo Por Kilovatio:</Label>
            <Input 
              type="number" 
              value={costePorKw} 
              onChange={(e) => setCostePorKw(e.target.value)} 
            />
          </InputGroup>
          <InputGroup>
            <Label>Total De Cobro En El Recibo:</Label>
            <Input 
              type="number" 
              value={totalCobro} 
              onChange={(e) => setTotalCobro(e.target.value)} 
            />
          </InputGroup>
          <Button onClick={handleCalcular}>Calcular</Button>
        </FormContainer>
      </ContentContainer>
    </ComparativaContainer>
  );
};

export default ComparativaBoard;