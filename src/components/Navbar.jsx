import React, { useState, useEffect } from "react";
import { GoTriangleLeft } from "react-icons/go";
import LogoWhite from "../assets/logo360white.png";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// icons navbar
import { CiMail } from "react-icons/ci";
import { TfiPackage } from "react-icons/tfi";
import { BsBuilding } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { Modal, Button } from "antd";

const Navbar = ({ tipo, apt, bloco }) => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "https://supabase-api-express.vercel.app"
      : `https://supabase-api-express.vercel.app`;
  //   const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const fetchConversas = async () => {
    try {
      const response = await fetch(`${apiUrl}/conversas`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data) {
        setConversas(data);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const [conversas, setConversas] = useState([]);

  const mouseOn = () => {
    setHover(true);
  };
  const mouseOut = () => {
    setHover(false);
  };
  const showModal = () => {
    console.log("modal user");
    setIsModalOpen(true);
    // fetchUsers();
  };
  const showModalConversa = () => {
    console.log("modal conversa");
    setIsModalConversaOpen(true);
    fetchConversas();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConversaOpen, setIsModalConversaOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalConversaOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalConversaOpen(false);
  };
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    console.log("fetched");
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${apiUrl}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data) {
        setUsers(data);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (user) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${apiUrl}/user/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "ativo" }),
      });
      if (!response.ok) {
        throw new Error("Erro ao ativar usuário");
      }
      const data = await response.json();
      console.log("Usuário ativado com sucesso: ", data);
      window.alert("Usuário ativado com sucesso!");
      await fetchUsers();
    } catch (error) {
      console.error("Erro ao ativar usuário: ", error);
    }
  };
  const [formData, setFormData] = useState({
    mensagem: "",
    autor: `${localStorage.getItem("apt")} - ${localStorage.getItem("bloco")}`,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    try {
      console.log("Dados submetidos: ", formData);
      const response = await fetch(`${apiUrl}/conversa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar mensagem");
      }
      const data = await response.json();
      console.log("Mensagem cadastrada com sucesso: ", data);
      window.alert("Mensagem enviada com sucesso!");
      await fetchConversas();
    } catch (error) {
      console.error("Erro ao cadastrar mensagem: ", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <nav
      className={hover ? "nav-bar ativo" : "nav-bar"}
      onMouseOver={mouseOn}
      onMouseOut={mouseOut}
    >
      <Modal
        title="Usuários aguardando ativação"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="lista-usuarios">
          {users.map((user) => {
            return (
              <>
                <div className={"usuario " + user.status}>
                  <div className="infos-usuario">
                    <h2>{user.email}</h2>
                    <h3>
                      Apt. {user.apartamento} - Bloco {user.bloco}
                    </h3>
                  </div>
                  {user.status === "inativo" ? (
                    <button
                      onClick={() => {
                        updateUser(user);
                      }}
                    >
                      Ativar
                    </button>
                  ) : (
                    <span>Usuário ativado</span>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </Modal>
      <Modal
        title={
          localStorage.getItem("tipo") === "admin"
            ? "Mensagens dos usuários"
            : "Envie sua mensagem pra a administração!"
        }
        className="modal-conversas"
        open={isModalConversaOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          localStorage.getItem("tipo") === "admin" ? null : (
            <Button
              className="btn-submit-form"
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={() => {
                submitForm();
                handleOk();
              }}
            >
              Enviar
            </Button>
          )
        }
      >
        {localStorage.getItem("tipo") === "admin" ? (
          <div className="conversas">
            {conversas.map((conversa) => {
              return (
                <div className="mensagem">
                  <h2>Apt {conversa.autor}</h2>
                  <p>
                    {conversa.mensagem}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <form
            action=""
            className="conversas"
            onSubmit={(e) => {
              e.preventDefault();
              submitForm;
            }}
          >
            <textarea
              placeholder="Envie sua mensagem aqui"
              name="mensagem"
              id="mensagem"
              onChange={handleInputChange}
            ></textarea>
          </form>
        )}
      </Modal>
      <div className="nav-mini">
        <GoTriangleLeft size={70} color="#FFF" />
      </div>
      <div className="nav-logo">
        <div className="tipo-user">
          <h2>Logado como:</h2>
          <div className="sessao">
            {localStorage.getItem("tipo") === "admin" ? (
              <h2>Administrador</h2>
            ) : (
              <h2>
                Apt. {localStorage.getItem("apt")} -{" "}
                {localStorage.getItem("bloco")}
              </h2>
            )}
          </div>
        </div>
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
        <Link to={"/admin/reservas"}>
          <FaRegCalendarAlt size={40} color="#FFF" />
          <span>Reservas de Locais</span>
        </Link>
        {localStorage.getItem("tipo") === "admin" ? (
          <a onClick={showModal}>
            <FaUserLarge size={40} />
            Usuários
          </a>
        ) : (
          <></>
        )}
        {localStorage.getItem("tipo") === "admin" ? (
          <a onClick={showModalConversa}>
            <FaRegMessage size={40} />
            Mensagens dos Usuários
          </a>
        ) : (
          <a onClick={showModalConversa}>
            <FaRegMessage size={40} />
            Mensagem direta
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
