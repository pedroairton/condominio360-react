import React, {useEffect} from "react";
import Logo from "../assets/logo360.png";
import Navbar from "./Navbar";
import { Outlet, useNavigate, } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate()
  
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
        <Navbar />
        <Outlet/>
    </section>
  );
};

export default Admin;
