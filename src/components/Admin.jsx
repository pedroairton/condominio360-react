import React from "react";
import Logo from "../assets/logo360.png";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminWidgets from "./AdminWidgets";
import Moradores from "./Moradores";

const Admin = () => {
  return (
    <section className="page-admin">
      <img className="logo" src={Logo} alt="" />
      <hr />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AdminWidgets />}></Route>
          <Route path="/admin/moradores" element={<Moradores />}></Route>
        </Routes>
      </Router>
    </section>
  );
};

export default Admin;
