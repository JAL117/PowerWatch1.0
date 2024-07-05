import React from 'react';
import NavbarPanel from '../Components/Panel/NavbarPanel';
import Sidebar from '../Components/Panel/SideBar';
import { Outlet } from "react-router-dom";

const Panel = () => {
    return (
        <div>
            <NavbarPanel />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ marginLeft: '200px', padding: '20px', width: '100%' }}>
                  <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Panel;
