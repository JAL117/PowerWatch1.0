import React from 'react';
import { Button, Nav } from "react-bootstrap";
import { FaChartBar, FaBalanceScale } from "react-icons/fa";
import { HiDocumentDownload } from "react-icons/hi";

const Sidebar = () => {
    return (
        <div style={{ 
            backgroundColor: '#00126E',
            color: 'white',
            padding: '15px',
            height: '90vh', 
            width: '15%',
            position: '',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '40px'
        }}>
            <Nav className="flex-column" style={{ width: '100%' }}>
                <Button variant='outline-warning' className='btn-lg' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                  <FaChartBar style={{ marginRight: '10px' }} /> Gráficas
                </Button>
                <Button variant='outline-warning' className="btn-lg mt-5" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                  <FaBalanceScale style={{ marginRight: '10px' }} />Comparativas
                </Button>
                <Button variant='outline-warning' className="btn-lg mt-5" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                  <HiDocumentDownload style={{ marginRight: '10px' }} />Reportes
                </Button>
            </Nav>
        </div>
    );
}

export default Sidebar;
