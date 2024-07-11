import React from "react";
import { Button } from "react-bootstrap";
import logo from "../../Img/Logo.png";


const Logos = () => {
  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-white">
        <img 
          src={logo} 
          alt="Logo" 
          className="img-fluid mb-4" 
          style={{ maxWidth: "300px" }}
        />
        <h1 className="display-4 fw-bold mb-2">PowerWatch</h1>
        <h2 className="h4 font-weight-light">by Piweb</h2>
      </div>
    </div>
  );
};

export default Logos;