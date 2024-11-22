import React from "react";
import Logo from "../assets/logo360.png";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AdminWidgets from "./AdminWidgets";
import Moradores from "./Moradores";

const Admin = () => {
  return (
    <section className="page-admin">
      <img className="logo" src={Logo} alt="" />
      <hr />
        <Navbar />
        <Outlet/>
    </section>
  );
};

export default Admin;
