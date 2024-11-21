import React from "react";
import LogoWhite from "../assets/logo360white.png";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  return (
    <section className="page-login">
      <img className="logo" src={LogoWhite} alt="" />
      <hr />
      <form action="" className="form-login">
        <div className="input">
        <div className="texto-input">SOU UM:</div>
        <select name="tipo-login" id="">
          <option value="morador">Morador</option>
          <option value="administrador">Administrador</option>
        </select>
        </div>
        <div className="input">
          <span className="texto-input">LOGIN</span>
          <input type="text" placeholder="Digite seu Login" name="login" />
        </div>
        <div className="input">
          <span className="texto-input">SENHA</span>
          <input type="password" placeholder="Digite sua Senha" name="senha" />
        </div>
        <button className="btn-login" onClick={() => {navigate('/admin')}}>FAZER LOGIN</button>
      </form>
    </section>
  );
};

export default Login;
