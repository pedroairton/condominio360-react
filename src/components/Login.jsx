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
    tipologin: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const submitForm = async () => {
    console.log(formData.tipologin);
    if (formData.tipologin === "administrador") {
      console.log("Login enviado como ADMINISTRADOR: ", formData);
      try {
        console.log(`${apiUrl}/admin/login`);
        const response = await fetch(`${apiUrl}/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          window.alert("Credenciais incorretas");
          throw new Error("Erro na requisição");
        } else {
          const data = await response.json();
          const token = data.token;
          // Armazenando o token no localStorage
          localStorage.setItem("authToken", token);
          console.log("Token armazenado no localStorage:", token);
          window.alert("Login bem sucecido, aguarde alguns segundos...");
          localStorage.setItem("tipo", "admin");
          localStorage.setItem("apt", "Administrador");
          localStorage.setItem("bloco", "");
          setTimeout(() => {
            navigate("/admin", {
              state: { tipo: "admin", apt: "Administrador", bloco: "" },
            });
          }, "1500");
        }
      } catch (error) {
        console.log("Erro ao fazer login:", error);
      }
    } else if (formData.tipologin === "morador") {
      console.log("Login enviado como MORADOR: ", formData);
      try {
        formData.email = formData.user;
        console.log(`${apiUrl}/user/login`);
        const response = await fetch(`${apiUrl}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          window.alert("Credenciais incorretas");
          throw new Error("Erro na requisição");
        } else {
          const data = await response.json();
          console.log('status: '+data.status)
          if(data.status === 'inativo') {
            return window.alert('Seu login ainda não está ativado! aguarde ativação.')
          }
          const token = data.token;
          // Armazenando o token no localStorage
          localStorage.setItem("authToken", token);
          console.log("Token armazenado no localStorage:", token);
          window.alert("Login bem sucecido, aguarde alguns segundos...");
          localStorage.setItem("tipo", "user");
          localStorage.setItem("apt", data.userapt);
          localStorage.setItem("bloco", data.userbloco);
          setTimeout(() => {
            navigate("/admin", {
              state: {
                tipo: "user",
                apt: data.userapt,
                bloco: data.userbloco,
              },
            });
          }, "1500");
        }
      } catch (error) {
        console.log("Erro ao fazer login:", error);
      }
    } else {
      window.alert(
        "Tipo de login não identificado, especifique Administrador ou Morador"
      );
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
          submitForm();
        }}
      >
        <div className="input">
          <label htmlFor="tipologin" className="texto-input">
            SOU UM:
          </label>
          <select
            name="tipologin"
            id="tipologin"
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione o tipo de login</option>
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
        <a className="btn-cadastro" onClick={() => navigate("/cadastro")}>
          Cadastrar-se
        </a>
      </form>
    </section>
  );
};

export default Login;
