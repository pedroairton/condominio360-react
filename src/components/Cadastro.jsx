import React, { useState } from "react";
import LogoWhite from "../assets/logo360white.png";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();

  const apiUrl =
    window.location.hostname === "localhost"
      ? "https://supabase-api-express.vercel.app"
      : `https://supabase-api-express.vercel.app`;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    apartamento: "",
    bloco: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    console.log("Registro enviado: ", formData);
    try {
      console.log(`${apiUrl}/user/register`)
      const response = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        window.alert("Erro ao tentar registrar")
        throw new Error('Erro na requisição');
      }
      else{
        const data = await response.json();
        const token = data.token;
        // Armazenando o token no localStorage
        localStorage.setItem('authToken', token);
        console.log('Token armazenado no localStorage:', token);
        window.alert('Registrado com sucesso, agora aguarde aprovação da administração do seu condomínio!')
        setTimeout(() => {
          navigate('/')
        }, "1500");
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
        {/* <div className="input">
          <label htmlFor="tipologin" className="texto-input">
            SOU UM:
          </label>
          <select
            name="tipologin"
            id="tipologin"
            onChange={handleInputChange}
            required
          >
            <option value="morador">Morador</option>
            <option value="administrador">Administrador</option>
          </select>
        </div> */}
        <div className="input">
          <label htmlFor="email" className="texto-input">
            EMAIL (Será usado como seu login)
          </label>
          <input
            type="text"
            placeholder="Digite seu Login"
            name="email"
            id="email"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="user" className="texto-input">
            APARTAMENTO
          </label>
          <input
            type="text"
            placeholder="Digite seu Apartamento"
            name="apartamento"
            id="apartamento"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="bloco" className="texto-input">
            BLOCO
          </label>
          <select
            name="bloco"
            id="bloco"
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione seu Bloco</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
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
        Cadastrar-se
        </button>
        <a className="btn-cadastro" onClick={() => navigate('/')}>
          Login
        </a>
      </form>
    </section>
  );
};

export default Cadastro;
