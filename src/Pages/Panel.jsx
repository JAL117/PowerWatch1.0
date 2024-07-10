import React, { useState } from "react";
import Sidebar from "../Components/Panel/SideBar";
import Welcome from "../Components/Panel/Welcome";

const Panel = () => {
  return (
    <div>
      <Sidebar />
      <div style={{marginLeft:"20%" , marginTop:"5%"}}>
        <Welcome />
      </div>
    </div>
  );
};

export default Panel;
