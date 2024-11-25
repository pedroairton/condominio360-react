import React, { useState } from "react";
import { GoTriangleLeft } from "react-icons/go";
import LogoWhite from "../assets/logo360white.png";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <Link to={"/admin"}>
          <img className="logo-navbar" src={LogoWhite} alt="" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to={"/admin/mensagens"}>
          <CiMail size={50} color="#FFF" />
          <span>Mensagens do Condomínio</span>
        </Link>
        <Link to={"/admin/encomendas"}>
          <TfiPackage size={40} color="#FFF" />
          <span>Encomendas</span>
        </Link>
        <Link to={"/admin/moradores"}>
          <BsBuilding size={40} color="#FFF" />
          <span>Moradores</span>
        </Link>
        <a>
          <FaRegCalendarAlt size={40} color="#FFF" />
          <span>Reservas de Locais</span>
        </a>
        {/* <Link to={"/"}>
        <span>login (debug)</span>
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
