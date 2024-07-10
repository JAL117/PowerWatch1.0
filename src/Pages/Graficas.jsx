import React from 'react';
import SideBar from "../Components/Panel/SideBar"
import Grafica from '../Components/Panel/Graficas/Grafica';
import Animaciones from '../Components/common/animaciones';

const Graficas = () => {
    return (
        <div>
            <SideBar/>
            <Animaciones>
                 <div style={{marginTop:"5%"}}>
                <Grafica/>
            </div>
            </Animaciones>
           
        </div>
    );
}

export default Graficas;
