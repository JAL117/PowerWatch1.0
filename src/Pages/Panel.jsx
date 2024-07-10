import React, { useState } from "react";
import Sidebar from "../Components/Panel/SideBar";
import Welcome from "../Components/Panel/Welcome";


const Panel = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Welcome />
      </div>
    </div>
  );
};

export default Panel;
