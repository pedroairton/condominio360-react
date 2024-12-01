import React, {useEffect} from "react";
import Logo from "../assets/logo360.png";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {tipo, apt, bloco} = location.state || {}
  console.log(tipo, apt, bloco)
  
  useEffect(()=>{
    if (!localStorage.getItem('authToken')) {
      console.log('token não identificado')
      navigate('/')
    }
    else{
      console.log('token identificado')
    }
  })
  

  return (
    <section className="page-admin">
      <img className="logo" src={Logo} alt="" />
      <hr />
        <Navbar tipo={tipo} apt={apt} bloco={bloco} />
        <Outlet context={{tipo,apt,bloco}}/>
    </section>
  );
};

export default Admin;
