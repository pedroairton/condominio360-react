import React, { useRef, useState, useEffect } from "react";

import { BsBuilding } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";

import { Button, Modal } from "antd";

const Moradores = () => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : `https://supabase-api-express.vercel.app`;
  const fetchMoradores = async () => {
    try {
      const response = await fetch(`${apiUrl}/moradores`);

      const data = await response.json();

      if (data) {
        setMoradores(data);
      }
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMoradores();
  }, []);

  const [moradores, setMoradores] = useState([]);

  const [moradorSelected, setMoradorSelected] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalAsyncOpen, setIsModalAsyncOpen] = useState(false);

  const showModal = (morador) => {
    setMoradorSelected(morador);
    setIsModalOpen(true);
  };

  const showModalAsync = () => {
    setMoradorSelected(null);
    setIsModalAsyncOpen(true);
  };

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const form = useRef(null);

  const handleOkAsync = () => {
    setConfirmLoading(true);
    if (form.current) {
      form.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
    // reajustar futuramente
    setTimeout(() => {
      setIsModalAsyncOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalAsyncOpen(false);
  };

  const [formData, setFormData] = useState({
    apartamento: "",
    bloco: "",
    responsavel: "",
    email: "",
    tipo_residente: "",
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
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${apiUrl}/admin/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
      const data = await response.json();
      console.log("Usuário cadastrado com sucesso: ", data);
      await fetchMoradores();
    } catch (error) {
      console.error("Erro ao cadastrar usuário: ", error);
    }
  };
  return (
    <section className="page-moradores">
      <Modal
        className="modal-form"
        title="Novo Morador"
        open={isModalAsyncOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"Confirmar"}
        cancelText={"Cancelar"}
        footer={[
          <Button
            className="btn-submit-form"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
            onClick={handleOkAsync}
          >
            Enviar
          </Button>,
        ]}
      >
        <form
          ref={form}
          className="form-morador"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <div className="input">
            <label htmlFor="apartamento">Apartamento:</label>
            <input
              type="text"
              id="apartamento"
              name="apartamento"
              placeholder="Apartamento do Morador"
              value={formData.apartamento}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="bloco">Bloco:</label>
            <select
              name="bloco"
              id="bloco"
              value={formData.bloco}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Selecione o Bloco
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="input">
            <label htmlFor="responsavel">Responsável:</label>
            <input
              type="text"
              id="responsavel"
              name="responsavel"
              placeholder="Responsável pelo Apartamento"
              value={formData.responsavel}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="email">Email Registrado:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail do Responsável"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="tipo_residente">Tipo de Residência:</label>
            <select
              name="tipo_residente"
              id="tipo_residente"
              value={formData.tipo_residente}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Selecione um tipo
              </option>
              <option value="Morador">Morador</option>
              <option value="Síndico">Síndico</option>
            </select>
          </div>
        </form>
      </Modal>
      <Modal
        title="Detalhes do Morador"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {moradorSelected && (
          <>
            <h3>
              Apartamento: <b>{moradorSelected.apartamento}</b>
            </h3>
            <h3>
              Bloco: <b>{moradorSelected.bloco}</b>
            </h3>
            <h4>
              Responsável: <b>{moradorSelected.responsavel}</b>
            </h4>
            <h4>
              Email Registrado: <b>{moradorSelected.email}</b>
            </h4>
            <h4>
              Tipo de Residência: <b>{moradorSelected.tipo_residente}</b>
            </h4>
          </>
        )}
      </Modal>
      <div className="widget">
        <div className="titulo-widget">
          <BsBuilding size={50} /> <h2>Moradores</h2>
          <div className="add" onClick={showModalAsync}>
            <IoAddCircle size={60} color="#F6C233" />
          </div>
        </div>
        {moradores.length > 0 ? (
          <div className="cards-widget">
            {moradores.map((morador) => (
              <div
                className="card"
                key={morador.id}
                onClick={() => showModal(morador)}
              >
                <div className="info-card-1">
                  <FaUserLarge size={30} />
                  <h3>
                    Apt. {morador.apartamento} - Bloco {morador.bloco}
                  </h3>
                  <div className="info-card-2">
                    <FaBuildingCircleArrowRight size={30} />
                    <h4>Entrou em:</h4>
                    <span>{morador.created_at.split("T")[0]}</span>
                  </div>
                </div>
                <div className="desc-icon">
                  <FaHouseUser size={30} />
                  <p className="desc-card">{morador.responsavel}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cards-widget">
            <div className="load">
              <AiOutlineLoading className="loading" size={90} />
              <span>Carregando Moradores...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Moradores;
