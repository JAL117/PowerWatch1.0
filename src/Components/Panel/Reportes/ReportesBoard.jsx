import React, { useState, useEffect, useRef } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import styled, { createGlobalStyle } from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 90%;
    margin: 0;
    padding: 30px;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f4f8;
  }
`;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  margin: 40px auto;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 18, 110, 0.1);
  border-radius: 20px;
  margin-left:100px;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0e6ed;
`;

const ReportTitle = styled.h1`
  color: #00126E;
  font-size: 2.5em;
  font-weight: 700;
  margin: 0;
`;

const DownloadButton = styled.button`
  background-color: #00126E;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
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
`;

const ReportContent = styled.div`
  display: flex;
  gap: 30px;
`;

const ReportSection = styled.div`
  flex: 1;
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  color: #00126E;
  font-size: 1.8em;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const Th = styled.th`
  background-color: #00126E;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  &:first-child {
    border-top-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
  }
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e0e6ed;
`;

const InfoText = styled.p`
  font-size: 1.1em;
  color: #4a5568;
  margin-bottom: 10px;
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-top: 20px;
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
    width: "300px",
    marginHorizontal:90,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#00126E',
    marginTop:10
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

const Report = () => {
  const [reportData, setReportData] = useState(null);
  const [damageProbs, setDamageProbs] = useState(null);
  const pieChartRef = useRef(null);
  const [pieChartImage, setPieChartImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
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
    if (pieChartRef.current) {
      const img = pieChartRef.current.toBase64Image();
      setPieChartImage(img);
    }
  }, [reportData, damageProbs]);

  if (!reportData || !damageProbs) {
    return <div>Cargando...</div>;
  }

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
    <>
      <GlobalStyle />
      <ReportContainer>
        <ReportHeader>
          <ReportTitle>Reporte de Consumo Mensual</ReportTitle>
          <PDFDownloadLink document={<ReportPDF data={reportData} damageProbs={damageProbs} pieChartImage={pieChartImage} />} fileName="reporte_equipo.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Generando PDF...' : <DownloadButton>Descargar PDF</DownloadButton>
            }
          </PDFDownloadLink>
        </ReportHeader>
        <ReportContent>
          <ReportSection>
            <SectionTitle>Información General</SectionTitle>
            <InfoText>Tipo de Consumo: {reportData.consumptionType}</InfoText>
            <InfoText>Consumo Promedio: {reportData.averageConsumption} kWh/mes</InfoText>
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
            <ChartContainer>
              <Pie ref={pieChartRef} data={probChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </ChartContainer>
          </ReportSection>
        </ReportContent>
      </ReportContainer>
    </>
  );
};

const ReportPDF = ({ data, damageProbs, pieChartImage }) => (
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