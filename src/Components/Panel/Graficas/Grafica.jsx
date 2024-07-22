import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled, { keyframes } from "styled-components";
import io from "socket.io-client";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  background-color: #f0f4f8;
  min-height: calc(96vh - 60px);
  margin-top: 20px;

  @media (max-width: 768px) {
    width: calc(100% - 90px);
    margin-left: 20px;
  }
`;

const GraficaTitle = styled.h1`
  font-size: 2.5rem;
  color: #00126e;
  margin-bottom: 1rem;
  text-align: center;
`;

const GraficaWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;
`;

const GraficaItem = styled.div`
  flex: 1 1 calc(33% - 1rem);
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

  @media (max-width: 1200px) {
    flex: 1 1 calc(50% - 1rem);
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
  background-color: #ffb800;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const WarningMessage = styled.div`
  font-size: 1.2rem;
  color: red;
  margin-top: 20px;
`;

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#00126E",
      },
    },
    title: {
      display: true,
      text: "Mediciones en Tiempo Real",
      color: "#00126E",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#00126E" },
      grid: { color: "rgba(0, 18, 110, 0.1)" },
    },
    y: {
      ticks: { color: "#00126E" },
      grid: { color: "rgba(0, 18, 110, 0.1)" },
    },
  },
  maintainAspectRatio: false,
};

const histogramOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#00126E",
      },
    },
    title: {
      display: true,
      text: "Historial de kWh Consumidos",
      color: "#00126E",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#00126E" },
      grid: { color: "rgba(0, 18, 110, 0.1)" },
    },
    y: {
      ticks: { color: "#00126E" },
      grid: { color: "rgba(0, 18, 110, 0.1)" },
    },
  },
  maintainAspectRatio: false,
};

const Grafica = () => {
  const [corrienteData, setCorrienteData] = useState({
    labels: [],
    datasets: [
      {
        label: "Corriente",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const [voltajeData, setVoltajeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Voltaje",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const [amperajeData, setAmperajeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Amperaje",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  });

  const [kwhHistorialData, setKwhHistorialData] = useState({
    labels: [],
    datasets: [
      {
        label: "kWh Consumidos",
        data: [],
        backgroundColor: "rgba(255, 184, 0, 0.6)",
        borderColor: "rgba(255, 184, 0, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [kwhSemanalData, setKwhSemanalData] = useState({
    labels: [],
    datasets: [
      {
        label: "kWh Consumidos por Día",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("user")).id;

    if (userId) {
      const newSocket = io(`${import.meta.env.VITE_API_URL_WS}`, {
        auth: { token },
        query: { id_user: userId },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Conectado al servidor de WebSocket Datas");
        setIsConnected(true);
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
      });

      newSocket.on("datas", (data) => {
        const newTime = new Date().toLocaleTimeString();
        setLastUpdateTime(Date.now());
        console.log(data);

        setCorrienteData((prevData) => ({
          labels: [...prevData.labels.slice(-9), newTime],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data.slice(-9), data.whs],
            },
          ],
        }));

        setVoltajeData((prevData) => ({
          labels: [...prevData.labels.slice(-9), newTime],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data.slice(-9), data.voltaje],
            },
          ],
        }));

        setAmperajeData((prevData) => ({
          labels: [...prevData.labels.slice(-9), newTime],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data.slice(-9), data.ampers],
            },
          ],
        }));
      });

      return () => {
        newSocket.disconnect();
        newSocket.off("connect");
        newSocket.off("disconnect");
        newSocket.off("datas");
      };
    }
  }, []);

  const id_user = JSON.parse(localStorage.getItem("user")).id;
  const token = localStorage.getItem("token");

  useEffect(() => {

    const translateMonthToSpanish = (monthInEnglish) => {
      const monthMap = {
        January: 'Enero',
        February: 'Febrero',
        March: 'Marzo',
        April: 'Abril',
        May: 'Mayo',
        June: 'Junio',
        July: 'Julio',
        August: 'Agosto',
        September: 'Septiembre',
        October: 'Octubre',
        November: 'Noviembre',
        December: 'Diciembre',
      };
    
      return monthMap[monthInEnglish] || monthInEnglish; 
    };
    
    const fetchHistorialData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/data/consumoMes/${id_user}`, {
          headers: {
            "x-token-access": token,
          },
        });
    

        const data = response.data.data;
 
        const labels = data.map((item) => translateMonthToSpanish(item.mes));
        const consumoKwh = data.map((item) => parseFloat(item.total_consumokwh));
    
        setKwhHistorialData({
          labels: labels,
          datasets: [
            {
              label: "kWh Consumidos",
              data: consumoKwh,
              backgroundColor: "rgba(255, 184, 0, 0.6)",
              borderColor: "rgba(255, 184, 0, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };
    
    

    const translateDayToSpanish = (dayInEnglish) => {
      const dayMap = {
        Monday: 'Lunes',
        Tuesday: 'Martes',
        Wednesday: 'Miércoles',
        Thursday: 'Jueves',
        Friday: 'Viernes',
        Saturday: 'Sábado',
        Sunday: 'Domingo',
      };
    
      return dayMap[dayInEnglish] || dayInEnglish; 
    };
    
    const fetchSemanalData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/data/${id_user}`,
          {
            headers: {
              "x-token-access": token,
            },
          }
        );
    
        if (!Array.isArray(response.data.data)) {
          throw new Error("Se esperaba que response.data.data fuera un array");
        }
    
    
        const labels = response.data.data.map((item) => translateDayToSpanish(item.dia_semana));
        const data = response.data.data.map((item) =>
          parseFloat(item.total_consumokwh)
        );
    
        setKwhSemanalData({
          labels: labels,
          datasets: [
            {
              label: "kWh Consumidos por Día",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error al obtener los datos semanales:", error);
      }
    };
    

    fetchHistorialData();
    fetchSemanalData();
  }, []);

  return (
    <GraficaContainer>
      <GraficaTitle>Consumo de Energía en Tiempo Real</GraficaTitle>
      {!isConnected && (
        <WarningMessage>
          No se están recibiendo datos en tiempo real.
        </WarningMessage>
      )}
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
      <GraficaWrapper>
        <GraficaItem>
          <Bar
            options={{
              ...histogramOptions,
              plugins: {
                ...histogramOptions.plugins,
                title: {
                  ...histogramOptions.plugins.title,
                  text: "kWh Consumidos por Mes",
                },
              },
            }}
            data={kwhHistorialData}
            height={300}
          />
        </GraficaItem>
        <GraficaItem>
          <Bar
            options={{
              ...histogramOptions,
              plugins: {
                ...histogramOptions.plugins,
                title: {
                  ...histogramOptions.plugins.title,
                  text: "kWh Consumidos por Día (Última Semana)",
                },
              },
            }}
            data={kwhSemanalData}
            height={300}
          />
        </GraficaItem>
      </GraficaWrapper>
    </GraficaContainer>
  );
};

export default Grafica;
