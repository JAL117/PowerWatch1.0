import React from 'react';
import NavbarInstrucciones from '../Components/Instrucciones/NavbarInstrucciones.jsx';
import Animaciones from '../Components/common/animaciones.jsx';
import CardGrid from '../Components/Instrucciones/Cards.jsx';
import Promocional from '../Components/Instrucciones/Promocional.jsx';
import Footer from '../Components/Instrucciones/FooterI.jsx';


const Instrucciones = () => {
    return (
        <Animaciones>
            <NavbarInstrucciones/>
            <Promocional/>
            <CardGrid/>
            <Footer/>
        </Animaciones>
    );
}

export default Instrucciones;
