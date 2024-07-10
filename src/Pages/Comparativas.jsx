import React from "react";
import SideBar from "../Components/Panel/SideBar";
import ComparativaBoard from "../Components/Panel/ComparativasC/ComparativaBoard";
import Animaciones from "../Components/common/animaciones";

const Comparativas = () => {
  return (
    <div>
      <SideBar />
      <Animaciones>
        <div style={{ marginTop: "8%" }}>
          <ComparativaBoard />
        </div>
      </Animaciones>
    </div>
  );
};

export default Comparativas;
