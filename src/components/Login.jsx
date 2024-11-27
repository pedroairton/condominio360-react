import React, { useState } from "react";
import LogoWhite from "../assets/logo360white.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const apiUrl =
    window.location.hostname === "localhost"
      ? "https://supabase-api-express.vercel.app"
      : `https://supabase-api-express.vercel.app`;

  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    console.log("Login enviado: ", formData);
    try {
      console.log(`${apiUrl}/admin/login`)
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      else{
        const data = await response.json();
        const token = data.token;
        // Armazenando o token no localStorage
        localStorage.setItem('authToken', token);
        console.log('Token armazenado no localStorage:', token);
        window.alert('Login bem sucecido, aguarde alguns segundos...')
        setTimeout(() => {
          navigate('/admin')
        }, "3000");
      }
  
      
    } catch (error) {
      console.log('Erro ao fazer login:', error);
    }
  };
  return (
    <section className="page-login">
      <img className="logo" src={LogoWhite} alt="" />
      <hr />
      <form
        action=""
        className="form-login"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
          submitForm();
        }}
      >
        <div className="input">
          <label htmlFor="tipologin" className="texto-input">
            SOU UM:
          </label>
          <select
            name="tipo-login"
            id="tipologin"
            onChange={handleInputChange}
            required
          >
            <option value="morador">Morador</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="user" className="texto-input">
            LOGIN
          </label>
          <input
            type="text"
            placeholder="Digite seu Login"
            name="user"
            id="user"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="password" className="texto-input">
            SENHA
          </label>
          <input
            type="password"
            placeholder="Digite sua Senha"
            name="password"
            id="password"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn-login">
          FAZER LOGIN
        </button>
      </form>
    </section>
  );
};

export default Login;
