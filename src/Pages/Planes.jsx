import React from "react";
import SideBar from "../Components/Panel/SideBar";
import Animaciones from "../Components/common/animaciones";
import PlanesBoard from "../Components/Panel/Planes/Planes";

const Planes = () => {
  return (
    <div>
      <SideBar />
      <Animaciones>
        <div style={{ marginTop: "5%" }}>
          <PlanesBoard/>
        </div>
      </Animaciones>
    </div>
  );
};

export default Planes;
