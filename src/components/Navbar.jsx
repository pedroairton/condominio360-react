import React, { useState } from "react";
import { GoTriangleLeft } from "react-icons/go";
import LogoWhite from "../assets/logo360white.png";
// import { useNavigate } from "react-router-dom";

// icons navbar
import { CiMail } from "react-icons/ci";
import { TfiPackage } from "react-icons/tfi";
import { BsBuilding } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";

const Navbar = () => {
  //   const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const mouseOn = () => {
    setHover(true);
  };
  const mouseOut = () => {
    setHover(false);
  };
  return (
    <nav
      className={hover ? "nav-bar ativo" : "nav-bar"}
      onMouseOver={mouseOn}
      onMouseOut={mouseOut}
    >
      <div className="nav-mini">
        <GoTriangleLeft size={70} color="#FFF" />
      </div>
      <div className="nav-logo">
        <img className="logo-navbar" src={LogoWhite} alt="" />
      </div>
      <div className="nav-links">
        <a>
          <CiMail size={50} color="#FFF" />
          <span>Mensagens do Condomínio</span>
        </a>
        <a>
          <TfiPackage size={40} color="#FFF" />
          <span>Encomendas</span>
        </a>
        <a>
          <BsBuilding size={40} color="#FFF" />
          <span>Moradores</span>
        </a>
        <a>
          <FaRegCalendarAlt size={40} color="#FFF" />
          <span>Reservas de Locais</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
