import React, { useState, useEffect, useRef } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";

import { Button, Modal } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";

const Mensagens = () => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "https://supabase-api-express.vercel.app"
      : `https://supabase-api-express.vercel.app`;
  const fetchMensagens = async () => {
    try {
      const response = await fetch(`${apiUrl}/mensagens`);

      const data = await response.json();

      if (data) {
        setMensagens(data);
        // data.forEach(item => {
        //   console.log(item.mensagem)
        // })
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const mensagemReduzida = (message, limit = 95) => {
    return message.length > limit ? message.substring(0, limit) + '...' : message;
  };
  useEffect(() => {
    fetchMensagens();
  }, []);

  const [mensagens, setMensagens] = useState([]);

  const [mensagemSelected, setMensagemSelected] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalAsyncOpen, setIsModalAsyncOpen] = useState(false);

  const showModal = (mensagem) => {
    setMensagemSelected(mensagem);
    setIsModalOpen(true);
  };

  const showModalAsync = () => {
    setMensagemSelected(null);
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
    mensagem: "",
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
      const response = await fetch(`${apiUrl}/admin/mensagem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar mensagem");
      }
      const data = await response.json();
      console.log("Mensagem cadastrado com sucesso: ", data);
      await fetchMensagens();
    } catch (error) {
      console.error("Erro ao cadastrar mensagem: ", error);
    }
  };
  return (
    <section className="page-mensagens">
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
          className="form-mensagem"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <div className="input">
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea
              type="text"
              id="mensagem"
              name="mensagem"
              placeholder="Digite a mensagem para publicar"
              value={formData.mensagem}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
        </form>
      </Modal>
      <Modal
        title="Detalhes da mensagem"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {mensagemSelected && (
          <>
            <h3>
              <b>Mensagem completa:</b> <br /><p>{mensagemSelected.mensagem}</p>
            </h3>
          </>
        )}
      </Modal>
      <div className="widget">
        <div className="titulo-widget">
          <CiMail size={50} /> <h2>Mensagens</h2>
          <div className="add" onClick={showModalAsync}>
            <IoAddCircle size={60} color="#F6C233" />
          </div>
        </div>
        {mensagens.length > 0 ? (
          <div className="cards-widget">
            {mensagens.map((mensagem) => (
              <div className="card" key={mensagem.id} onClick={() => showModal(mensagem)}>
                <div className="info-card-1">
                  <FaRegClock size={30} /> <h3>{mensagem.created_at.split("T")[0]}</h3>
                  <h3>{mensagem.created_at.split("T")[1].split("+")[0].slice(0, 5)}</h3>
                </div>
                <p className="desc-card">{mensagemReduzida(mensagem.mensagem)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="cards-widget">
            <div className="load">
              <AiOutlineLoading className="loading" size={90} />
              <span>Carregando Mensagens...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Mensagens;
