import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas, Form, Badge } from "react-bootstrap";
import { FaChartBar, FaBalanceScale, FaBars, FaUser, FaSignOutAlt, FaBell } from "react-icons/fa";
import { HiDocumentDownload } from "react-icons/hi";
import { IoInformationCircle, IoWarning } from "react-icons/io5";
import styled from 'styled-components';
import img from "../../Img/Logo.png";
import { Link } from 'react-router-dom';
import { PiSubtitlesFill } from "react-icons/pi";
import axios from 'axios';
import Swal from 'sweetalert2';
import io from 'socket.io-client';

const TopNavbar = styled(Navbar)`
  background-color: #00126E;
  padding: 10px 25px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
`;

const SidebarContainer = styled.div`
  background: linear-gradient(180deg, #00126E 0%, #001E9C 100%);
  color: white;
  height: calc(100vh - 56px);
  width: ${props => props.isExpanded ? '250px' : '80px'};
  position: fixed;
  top: 100px;
  left: 0;
  transition: all 0.3s ease;
  overflow-x: hidden;
  z-index: 1020;

  @media (max-width: 768px) {
    width: ${props => props.isExpanded ? '250px' : '0'};
    left: ${props => props.isExpanded ? '0' : '-70px'};
  }
`;

const LogoContainer = styled.div`
  padding: 0px;
  text-align: center;
`;

const Logo = styled.img`
  max-width: ${props => props.isExpanded ? '60%' : '90%'};
  height: auto;
  margin-top: 10px;
  transition: max-width 0.3s ease;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover, &:focus {
    color: #FFB800;
  }
`;

const StyledNav = styled(Nav)`
  margin-top: 20px;
  width: 100%;
`;

const StyledButton = styled.button`
  color: white;
  background: transparent;
  border: 2px solid #FFB800;
  border-radius: 30px;
  padding: ${props => props.isExpanded ? '10px 20px' : '10px'};
  margin-bottom: 20px;
  transition: all 0.3s ease;
  width: ${props => props.isExpanded ? '100%' : '50px'};
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: ${props => props.isExpanded ? 'flex-start' : 'center'};
  cursor: pointer;

  &:hover, &:focus {
    background: #FFB800;
    color: #00126E;
  }

  svg {
    margin-right: ${props => props.isExpanded ? '10px' : '0'};
    font-size: 1.2rem;
  }
`;

const ButtonText = styled.span`
  margin-left: 10px;
  opacity: ${props => props.isExpanded ? 1 : 0};
  transition: opacity 0.3s ease;
  display: ${props => props.isExpanded ? 'inline' : 'none'};
`;

const StyledOffcanvas = styled(Offcanvas)`
  .offcanvas-header, .offcanvas-body {
    background: linear-gradient(180deg, #00126E 0%, #001E9C 100%);
    color: white;
  }

  .btn-close {
    filter: invert(1) grayscale(100%) brightness(200%);
  }
`;

const StyledOffcanvasTitle = styled(Offcanvas.Title)`
  color: #FFFF;
  font-size: 1.5rem;
`;

const StyledForm = styled(Form)`
  label {
    color: #FFFF;
  }

  input {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid #FFFF;
    color: white;

    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      box-shadow: 0 0 0 0.25rem rgba(255, 184, 0, 0.25);
    }
  }

  button[type="submit"] {
    background-color: #FFB800;
    border-color: #FFB800;
    color: #00126E;

    &:hover, &:focus {
      background-color: #e6a600;
      border-color: #e6a600;
    }
  }
`;

const NotificationButton = styled(Button)`
  position: relative;
`;

const NotificationBadge = styled(Badge)`
  position: absolute;
  top: -5px;
  right: -5px;
`;

const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const SideBar = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(localStorage.getItem('user')).id;

    if (token && userId) {
      const newSocket = io(`${import.meta.env.VITE_API_URL_WS}`, {
        auth: { token },
        query: { id_user: userId }
      });

      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Conectado al servidor de WebSocket');
      });

      newSocket.on('notification-alerts', (notification) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification
        ]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  const userData = JSON.parse(localStorage.getItem('user'));

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
    if (isMobile) {
      document.body.style.overflow = sidebarExpanded ? 'auto' : 'hidden';
    }
  };

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  const handleNotificationsClose = () => setShowNotifications(false);
  const handleNotificationsShow = () => setShowNotifications(true);

  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas nuevas no coinciden',
      });
      return;
    }

    try {
      const token = getToken();
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/pass`, {
        email: userData.email,
        password: currentPassword,
        password2: newPassword,
      }, {
        headers: {
          'x-token-access': `${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: '¡Contraseña cambiada!',
        text: 'Tu contraseña ha sido actualizada correctamente.',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al cambiar la contraseña. Por favor, inténtalo de nuevo.',
      });
    }
  };

  return (
    <>
      <TopNavbar expand="lg" variant="dark">
        <Container fluid>
          <ToggleButton onClick={toggleSidebar}>
            <FaBars />
          </ToggleButton>
          <Navbar.Brand href="/AreaCliente" style={{ fontSize: "clamp(1.5rem , 5vw , 3rem)", marginLeft: "20px" }}>PowerWatch</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <NotificationButton variant='outline-warning' onClick={handleNotificationsShow}>
                  <FaBell size={30} />
                  {notifications.length > 0 && (
                    <NotificationBadge bg="danger">{notifications.length}</NotificationBadge>
                  )}
                </NotificationButton>
              </Nav.Link>
              <Nav.Link><Button variant='outline-warning' onClick={handleOffcanvasShow}><FaUser size={30} /></Button></Nav.Link>
              <Nav.Link><Button variant='outline-warning' onClick={() => localStorage.clear()} as={Link} to="/"><FaSignOutAlt size={30} /></Button></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </TopNavbar>

      <SidebarContainer isExpanded={sidebarExpanded}>
        <LogoContainer className='mt-5' as={Link} to="/AreaCliente">
          <Logo src={img} alt="Logo" isExpanded={sidebarExpanded} />
        </LogoContainer>

        <StyledNav className="flex-column p-3">
          <StyledButton isExpanded={sidebarExpanded} as={Link} to="/AreaCliente/Graficas">
            <FaChartBar />
            <ButtonText isExpanded={sidebarExpanded}>Gráficas</ButtonText>
          </StyledButton>
          <StyledButton isExpanded={sidebarExpanded} as={Link} to="/AreaCliente/Comparativa">
            <FaBalanceScale />
            <ButtonText isExpanded={sidebarExpanded}>Comparativas</ButtonText>
          </StyledButton>
          <StyledButton isExpanded={sidebarExpanded} as={Link} to="/AreaCliente/Reportes">
            <HiDocumentDownload />
            <ButtonText isExpanded={sidebarExpanded}>Reportes</ButtonText>
          </StyledButton>
          <StyledButton isExpanded={sidebarExpanded} as={Link} to="/AreaCliente/Planes">
            <PiSubtitlesFill />
            <ButtonText isExpanded={sidebarExpanded}>Planes</ButtonText>
          </StyledButton>
        </StyledNav>
      </SidebarContainer>

      {isMobile && sidebarExpanded && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1010
          }}
          onClick={toggleSidebar}
        />
      )}

      <StyledOffcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="end">
        <Offcanvas.Header closeButton>
          <StyledOffcanvasTitle>Información del Usuario</StyledOffcanvasTitle>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {userData && (
            <>
              <h4 style={{ color: '#FFB800' }}>Datos del Usuario</h4>
              <p>Nombre: {userData.nombre + " " + userData.apellidos}</p>
              <p>Email: {userData.email}</p>
            </>
          )}

          <h4 className="mt-4" style={{ color: '#FFB800' }}>Cambiar Contraseña</h4>
          <StyledForm onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña Actual</Form.Label>
              <Form.Control
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Cambiar Contraseña
            </Button>
          </StyledForm>
        </Offcanvas.Body>
      </StyledOffcanvas>

      <StyledOffcanvas show={showNotifications} onHide={handleNotificationsClose} placement="end">
        <Offcanvas.Header closeButton>
          <StyledOffcanvasTitle>Notificaciones</StyledOffcanvasTitle>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {notifications.length === 0 ? (
            <p>No tienes notificaciones</p>
          ) : (
            notifications.map((notification) => (
              <NotificationItem key={notification.id}>
                {notification.type === 'info' ? (
                  <IoInformationCircle color="#3498db" />
                ) : (
                  <IoWarning color="#e74c3c" />
                )}
                <span>{notification.message}</span>
              </NotificationItem>
            ))
          )}
        </Offcanvas.Body>
      </StyledOffcanvas>
    </>
  );
};

export default SideBar;