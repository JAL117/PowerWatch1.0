import React from "react";
import SideBar from "../Components/Panel/SideBar";
import Animaciones from "../Components/common/animaciones";
import Report from "../Components/Panel/Reportes/ReportesBoard";

const Reportes = () => {
  return (
    <div>
      <SideBar />
      <Animaciones>
        <div style={{ marginTop: "8%" }}>
         <Report/>
        </div>
      </Animaciones>
    </div>
  );
};

export default Reportes;
