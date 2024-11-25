import React, { useState, useEffect, useRef } from "react";
import { TfiPackage } from "react-icons/tfi";
import { PiPackageBold } from "react-icons/pi";

import { Button, Modal } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";

const Encomendas = () => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : `https://supabase-api-express.vercel.app`;
  const fetchEncomendas = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${apiUrl}/admin/encomendas`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data) {
        setEncomendas(data);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEncomendas();
  }, []);

  const [encomendas, setEncomendas] = useState([]);

  const [encomendaSelected, setEncomendaSelected] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalAsyncOpen, setIsModalAsyncOpen] = useState(false);

  const showModal = (encomenda) => {
    setEncomendaSelected(encomenda);
    setIsModalOpen(true);
  };

  const showModalAsync = () => {
    setEncomendaSelected(null);
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
    apt_vinculado: "",
    bloco_apartamento: "",
    transportadora: "",
    descricao: "",
    status: "",
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
      const response = await fetch(`${apiUrl}/admin/encomenda`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar encomenda");
      }
      const data = await response.json();
      console.log("Encomenda cadastrado com sucesso: ", data);
      await fetchEncomendas();
    } catch (error) {
      console.error("Erro ao cadastrar encomenda: ", error);
    }
  };
  return (
    <section className="page-encomendas">
      <Modal
        className="modal-form"
        title="Nova Mensagem"
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
          className="form-encomenda"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <div className="input">
            <label htmlFor="apt_vinculado">Apartamento:</label>
            <input
              type="text"
              id="apt_vinculado"
              name="apt_vinculado"
              placeholder="Apartamento vinculado à encomenda"
              value={formData.apt_vinculado}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="bloco_apartamento">Bloco:</label>
            <input
              type="text"
              id="bloco_apartamento"
              name="bloco_apartamento"
              placeholder="Bloco do apartamento"
              value={formData.bloco_apartamento}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="transportadora">Transportadora:</label>
            <input
              type="text"
              id="transportadora"
              name="transportadora"
              placeholder="Serviço de entrega da encomenda"
              value={formData.transportadora}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="descricao">Descrição: (opcional)</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              placeholder="Descrição da encomenda"
              value={formData.descricao}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <label htmlFor="status">
              Status atual da entrega da encomenda:
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Foi entregue ?
              </option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </form>
      </Modal>
      <Modal
        title="Detalhes da encomenda"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {encomendaSelected && (
          <>
            <div>
              <h3>Apartamento da encomenda: </h3>
              <h3>
                <b>
                  {encomendaSelected.apt_vinculado} - Bloco{" "}
                  {encomendaSelected.bloco_apartamento}
                </b>
              </h3>
            </div>
            <div>
              <h3>Entregue por: </h3>
              <h3>
                <b>{encomendaSelected.transportadora}</b>
              </h3>
            </div>
            <div>
              <h3>Descrição: </h3>
              <h3>
                {encomendaSelected.descricao === "" ? (
                  <b>Não especificado</b>
                ) : (
                  <b>{encomendaSelected.descricao}</b>
                )}
              </h3>
            </div>
            <div>
              <h3>Entregue ao morador: </h3>
              <h3>
                <b>{encomendaSelected.status}</b>
              </h3>
            </div>
          </>
        )}
      </Modal>
      <div className="widget">
        <div className="titulo-widget">
          <TfiPackage size={50} /> <h2>Encomendas</h2>
          <div className="add" onClick={showModalAsync}>
            <IoAddCircle size={60} color="#F6C233" />
          </div>
        </div>
        {encomendas.length > 0 ? (
          <div className="cards-widget">
            {encomendas.map((encomenda) => (
              <div
                className="card"
                key={encomenda.id}
                onClick={() => {
                  showModal(encomenda);
                }}
              >
                <div className="info-card-1">
                  <PiPackageBold size={30} />
                  <h3>{encomenda.created_at.split("T")[0]}</h3>
                  <h3>
                    {encomenda.created_at
                      .split("T")[1]
                      .split("+")[0]
                      .slice(0, 5)}
                  </h3>
                  <h4>
                    Entregue: <span>{encomenda.status}</span>
                  </h4>
                </div>
                <p className="desc-card">
                  Encomenda para o apt. {encomenda.apt_vinculado}-
                  {encomenda.bloco_apartamento}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="cards-widget">
            <div className="load">
              <AiOutlineLoading className="loading" size={90} />
              <span>Carregando Encomendas...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Encomendas;
