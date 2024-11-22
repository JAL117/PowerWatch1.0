import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 90%;
    margin: 0px;
    padding: 0px;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f4f8;
  }
`;

const ComparativaContainer = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 20px;
  width: 80%;
  height: 83vh; 
  max-width: 1600px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 18, 110, 0.1);
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    height: auto;
    padding: 30px;
  }

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 18, 110, 0.3);
  }
`;

const TitleMain = styled.h2`
  font-size: 3rem;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 700;
  color: #00126E;

  @media (max-width: 768px) {
    font-size: 2.5rem;
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
  flex: 1;
  background-color: #ffffff;
  padding: 0px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 45px;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  background-color: #ffffff;
  padding: 35px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  font-size: 1.1rem;
  flex: 1;
  font-weight: 600;
  color: #00126E;
`;

const Input = styled.input`
  padding: 14px;
  border-radius: 12px;
  border: none;
  flex: 2;
  background-color: rgba(240, 244, 248, 0.6);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #00126E;
    background-color: rgba(240, 244, 248, 0.9);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: #00126E;
  color: white;
  padding: 16px 32px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 18, 110, 0.1);

  &:hover {
    background-color: #000d4d;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 18, 110, 0.2);
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
  const [chartData, setChartData] = useState({
    labels: ['Comparativa'],
    datasets: [
      {
        label: 'Costo Calculado',
        data: [0],
        backgroundColor: '#FF6384',
      },
      {
        label: 'Costo en Recibo',
        data: [0],
        backgroundColor: '#36A2EB',
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#00126E',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Comparativa de gastos',
        color: '#00126E',
        font: {
          size: 20,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#00126E', font: { size: 14 } },
        grid: { color: 'rgba(0, 18, 110, 0.1)' }
      },
      x: {
        ticks: { color: '#00126E', font: { size: 14 } },
        grid: { color: 'rgba(0, 18, 110, 0.1)' }
      },
    },
  };

  const handleCalcular = async () => {
   
    const id_user = JSON.parse(localStorage.getItem("user")).id;
    const token = localStorage.getItem("token");

    if (!id_user || !startDate || !endDate || !costePorKw) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
    
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/data/date/${id_user}/${startDate}/${endDate}`,{
        headers: {
          "x-token-access": token,
        },
      });



      let consumo = 0; 
      if (response.data) {
        consumo = response.data; 
      }

      const costoCalculado = consumo.data * parseFloat(costePorKw);

      
      setChartData({
        labels: ['Comparativa'],
        datasets: [
          {
            label: 'Costo Calculado',
            data: [costoCalculado],
            backgroundColor: '#FF6384',
          },
          {
            label: 'Costo en Recibo',
            data: [parseFloat(totalCobro)],
            backgroundColor: '#36A2EB',
          },
        ],
      });

   
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
      alert('Error al obtener los datos de la API.');
    }
  };

  return (
    <>
      <GlobalStyle />
      <ComparativaContainer>
        <TitleMain>Total: kWh</TitleMain>
        <ContentContainer>
          <ChartContainer>
            <Bar data={chartData} options={options} style={{ flexGrow: 1 }} />
          </ChartContainer>
          <FormContainer>
            <h3 style={{ color: '#00126E', fontSize: '1.5rem', marginBottom: '20px' }}>Gastos por periodo</h3>
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
    </>
  );
};

export default ComparativaBoard;