import React from "react";
import { Button } from "react-bootstrap";
import logo from "../../Img/Logo.png";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Logos = () => {
  return (
    <div>
      <Button
        variant="outline-light"
        as={Link}
        to="/"
        style={{ alignSelf: "flex-start", border: "none" }}
      >
        <IoMdArrowRoundBack size={40} />
      </Button>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ padding: "10px" }}
      >
        <div
          className="d-flex flex-column align-items-center"
          style={{ color: "#ffff" }}
        >
          <img src={logo} alt="Logo" style={{ maxWidth: "70%" }} />
          <h1 style={{ fontSize: "clamp(3rem , 5vw , 7rem)" }}>PowerWatch</h1>
          <h2>by Piweb</h2>
        </div>
      </div>
    </div>
  );
};

export default Logos;
