import React, { useState, useEffect, useRef } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import styled, { createGlobalStyle } from 'styled-components';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
`;


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#00126E',
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    color: '#333333',
  },
  image: {
    marginVertical: 35,
    width:"500px",
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#00126E',
  },
  summary: {
    fontSize: 14,
    margin: 10,
    color: '#555555',
  },
  suggestions: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00126E',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  tableContainer: {
    marginVertical: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 5,
  },
  tableHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00126E',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: '#333333',
  },
});



const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 50px;
  background-color: #00126E;
  box-sizing: border-box;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ReportTitle = styled.h1`
  color: #ffffff;
  font-size: 2em;
  margin: 0;
`;

const DownloadButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const ReportContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const ReportSection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  color: #34495e;
  font-size: 1.5em;
  margin-bottom: 15px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #3498db;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ecf0f1;
`;

const Report = () => {
  const [reportData, setReportData] = useState(null);
  const [damageProbs, setDamageProbs] = useState(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [lineChartImage, setLineChartImage] = useState(null);
  const [pieChartImage, setPieChartImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        equipmentName: "Equipo A",
        consumptionType: "Medio",
        averageConsumption: 450,
        monthlyConsumption: [420, 440, 460, 430, 470, 450],
        disconnectionEvents: 3,
        powerSpikeEvents: 2,
        observationMonths: 6
      };
      setReportData(data);

      const lambdaD = data.disconnectionEvents / data.observationMonths;
      const lambdaP = data.powerSpikeEvents / data.observationMonths;

      const calculateDamageProb = (a, b) => {
        const F = a * lambdaD + b * lambdaP;
        return 1 - Math.exp(-F);
      };

      const probs = {
        low: calculateDamageProb(0.5, 0.3),
        medium: calculateDamageProb(1, 0.7),
        high: calculateDamageProb(1.5, 1)
      };

      setDamageProbs(probs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (lineChartRef.current && pieChartRef.current) {
      setLineChartImage(lineChartRef.current.toBase64Image());
      setPieChartImage(pieChartRef.current.toBase64Image());
    }
  }, [reportData, damageProbs]);

  if (!reportData || !damageProbs) {
    return <div>Cargando...</div>;
  }

  const consumptionChartData = {
    labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'],
    datasets: [
      {
        label: 'Consumo Mensual (kWh)',
        data: reportData.monthlyConsumption,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const probChartData = {
    labels: ['Bajo Consumo', 'Consumo Medio', 'Alto Consumo'],
    datasets: [
      {
        data: [damageProbs.low, damageProbs.medium, damageProbs.high],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <div style={{marginLeft:"5%"}}>
      <GlobalStyle />
      <ReportContainer style={{borderRadius:"25px"}}>
        <ReportHeader>
          <ReportTitle>Reporte de Consumo</ReportTitle>
          <PDFDownloadLink document={<ReportPDF data={reportData} damageProbs={damageProbs} lineChartImage={lineChartImage} pieChartImage={pieChartImage} />} fileName="reporte_equipo.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Generando PDF...' : <DownloadButton>Descargar PDF</DownloadButton>
            }
          </PDFDownloadLink>
        </ReportHeader>
        <ReportContent>
          <ReportSection>
            <SectionTitle>Información General</SectionTitle>
            <p>Tipo de Consumo: {reportData.consumptionType}</p>
            <p>Consumo Promedio: {reportData.averageConsumption} kWh/mes</p>
          </ReportSection>
          <ReportSection>
            <SectionTitle>Consumo Mensual</SectionTitle>
            <div style={{ height: '200px' }}>
              <Line ref={lineChartRef} data={consumptionChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </ReportSection>
          <ReportSection>
            <SectionTitle>Probabilidades de Daño</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <Th>Tipo de Consumo</Th>
                  <Th>Probabilidad de Daño</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>Bajo Consumo</Td>
                  <Td>{(damageProbs.low * 100).toFixed(2)}%</Td>
                </tr>
                <tr>
                  <Td>Consumo Medio</Td>
                  <Td>{(damageProbs.medium * 100).toFixed(2)}%</Td>
                </tr>
                <tr>
                  <Td>Alto Consumo</Td>
                  <Td>{(damageProbs.high * 100).toFixed(2)}%</Td>
                </tr>
              </tbody>
            </Table>
          </ReportSection>
          <ReportSection>
            <SectionTitle>Gráfico de Probabilidades</SectionTitle>
            <div style={{ height: '200px' }}>
              <Pie ref={pieChartRef} data={probChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </ReportSection>
        </ReportContent>
      </ReportContainer>
    </div>
  );
};

const ReportPDF = ({ data, damageProbs, lineChartImage, pieChartImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Reporte del Equipo</Text>
        <Text style={styles.text}>Tipo de Consumo: {data.consumptionType}</Text>
        <Text style={styles.text}>Consumo Promedio: {data.averageConsumption} kWh/mes</Text>
        
        <Text style={styles.header}>Probabilidades de Daño</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Tipo de Consumo</Text>
            <Text style={styles.tableHeader}>Probabilidad de Daño</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Bajo Consumo</Text>
            <Text style={styles.tableCell}>{(damageProbs.low * 100).toFixed(2)}%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Consumo Medio</Text>
            <Text style={styles.tableCell}>{(damageProbs.medium * 100).toFixed(2)}%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Alto Consumo</Text>
            <Text style={styles.tableCell}>{(damageProbs.high * 100).toFixed(2)}%</Text>
          </View>
        </View>

        {pieChartImage && <Image style={styles.image} src={pieChartImage} />}

        <Text style={styles.header}>Sugerencias de Mejora</Text>
        <View style={styles.suggestions}>
          <Text style={styles.text}>1. Realizar mantenimiento preventivo regular para reducir la probabilidad de fallos en el equipo.</Text>
          <Text style={styles.text}>2. Capacitar al personal sobre la importancia del uso eficiente de la energía y las mejores prácticas para el mantenimiento del equipo.</Text>
        </View>
      </View>
    </Page>
  </Document>
);




export default Report;
