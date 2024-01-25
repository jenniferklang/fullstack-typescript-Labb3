import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import HeaderImage from "../assets/berry1.jpg";

const Header: React.FC = () => {
  return (
    <img
      className="card-img-top image header-image img-fluid"
      src={HeaderImage}
      alt="Header Image"
      loading="lazy"
    />
  );
};

export default Header;
