import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importa o CSS padrão
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { Modal, Button } from "antd";
// updel
import { FaRegTrashAlt } from "react-icons/fa";

const Reservas = () => {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [reservaSelected, setReservaSelected] = useState(null);

  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [local, setLocal] = useState("");
  const [reservas, setReservas] = useState([]);
  const [reservasDia, setReservasDia] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalAsyncOpen, setIsModalAsyncOpen] = useState(false);

  const showModal = (reserva) => {
    setReservaSelected(reserva);
    setIsModalOpen(true);
  };

  const showModalAsync = () => {
    setDataSelecionada(new Date());
    setIsModalAsyncOpen(true);
    handleDateChange;
  };

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalAsyncOpen(false);
  };

  const handleOkAsync = () => {
    setConfirmLoading(true);
    // reajustar futuramente
    setTimeout(() => {
      setIsModalAsyncOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchReservas(); // Carrega reservas ao montar o componente
  }, []);
  useEffect(() => {
    fetchReservasPorData(dataSelecionada);
  }, [dataSelecionada]);

  const fetchReservas = async () => {
    const response = await fetch(
      "https://supabase-api-express.vercel.app/reservas"
    );
    const data = await response.json();
    setReservas(data);
  };
  const delReserva = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://supabase-api-express.vercel.app/admin/reserva/del/${reservaSelected.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao deletar reserva");
      }
      const data = await response.json();
      console.log("Reserva deletada com sucesso: ", data);
      alert("Reserva deletada");
      await fetchReservas();
    } catch (error) {
      console.error("Erro ao deletar reserva: ", error);
    }
  };
  //   reservas por data
  const fetchReservasPorData = async (data) => {
    const dataFormatada = data.toISOString().split("T")[0]; // Formato: 'YYYY-MM-DD'

    try {
      const response = await fetch(
        `https://supabase-api-express.vercel.app/reservas/${dataFormatada}`
      );
      const data = await response.json();
      setReservasDia(data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      alert("Erro ao buscar reservas.");
    }
  };
  const handleDateChange = (date) => {
    setDataSelecionada(date); // Atualiza a data selecionada e dispara o fetch
  };

  const handleReservar = async () => {
    setConfirmLoading(true);
    // reajustar futuramente
    if (!horaInicio || !horaFim || !local) {
      //   alert("Por favor, preencha todos os campos.");
      alert("Erro ao fazer reserva.");
      setConfirmLoading(false);
      return;
    }

    const horarioInicial = `${
      dataSelecionada.toISOString().split("T")[0]
    } ${horaInicio}:00`;
    const horarioFinal = `${
      dataSelecionada.toISOString().split("T")[0]
    } ${horaFim}:00`;

    const novaReserva = {
      local_reservado: local,
      horario_inicial: horarioInicial,
      horario_final: horarioFinal,
      apt_responsavel: localStorage.getItem("apt"),
      bloco_apt: localStorage.getItem("bloco"),
    };
    console.log(novaReserva);
    // Validação 1: Horário de início antes do fim
    if (new Date(horarioInicial) >= new Date(horarioFinal)) {
      alert("O horário de início deve ser antes do horário final.");
      setConfirmLoading(false);
      return;
    }
    // Validação 2: Duração máxima de 8 horas
    const diferencaHoras =
      (new Date(horarioFinal) - new Date(horarioInicial)) / (1000 * 60 * 60);
    if (diferencaHoras > 8) {
      alert("A reserva não pode exceder 8 horas.");
      setConfirmLoading(false);
      return;
    }
    try {
      const response = await fetch("https://supabase-api-express.vercel.app/admin/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaReserva),
      });

      const result = await response.json();

      if (!response.ok) {
        // Mostra o erro retornado pelo back-end como alerta
        alert(result.message || "Erro ao criar a reserva.");
        setConfirmLoading(false);
      } else {
        alert("Reserva criada com sucesso!");
        fetchReservas(); // Atualiza a lista de reservas
        setLocal("");
        setHoraInicio("");
        setHoraFim("");
        setTimeout(() => {
          setIsModalAsyncOpen(false);
          setConfirmLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setIsModalAsyncOpen(false);
        setConfirmLoading(false);
      }, 2000);
    }
  };

  return (
    <div>
      <Modal
        className="modal-reservas"
        title="Nova Reserva"
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
            onClick={handleReservar}
          >
            Enviar
          </Button>,
        ]}
      >
        <div className="reserva">
          <Calendar onChange={handleDateChange} value={dataSelecionada} />

          <div className="input" style={{ marginTop: "10px" }}>
            <label>
              Local:
              <select
                name="select"
                id="select"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              >
                <option value="Churrasqueira">Churrasqueira</option>
                <option value="Quadra">Quadra</option>
                <option value="Campo">Campo</option>
                <option value="Salão de Jogos">Salão de Jogos</option>
                <option value="Salão de Festas">Salão de Festas</option>
              </select>
            </label>
          </div>

          <div className="input" style={{ marginTop: "10px" }}>
            <label>
              Hora de Início:
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input" style={{ marginTop: "10px" }}>
            <label>
              Hora de Fim:
              <input
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="data-selecionada">
            <h3>Reservas para {dataSelecionada.toLocaleDateString()}:</h3>
            {reservasDia.length > 0 ? (
              <ul>
                {reservasDia.map((reserva) => (
                  <li key={reserva.id}>
                    <b>{reserva.local_reservado}: </b>
                    {new Date(
                      reserva.horario_inicial
                    ).toLocaleTimeString()} -{" "}
                    {new Date(reserva.horario_final).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Não há reservas feitas para esta data.</p>
            )}
          </div>
        </div>
      </Modal>
      <Modal
        title="Detalhes da reserva"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {reservaSelected && (
          <>
            {(localStorage.getItem("apt") === reservaSelected.apt_responsavel &&
              localStorage.getItem("bloco") === reservaSelected.bloco_apt) ||
            localStorage.getItem("tipo") === "admin" ? (
              <div className="updel">
                <button
                  onClick={() => {
                    if (confirm("Deletar esta reserva ?") == true) {
                      delReserva();
                    } else {
                      console.log("cancelado");
                    }
                  }}
                >
                  <FaRegTrashAlt size={25} color="red" />
                </button>
              </div>
            ) : (
              <></>
            )}
            <div>
              <h3>Reserva: </h3>
              <h3>
                <b>{reservaSelected.local_reservado}</b>
              </h3>
            </div>
            <div>
              <h3>Reservado por: </h3>
              <h3>
                <b>
                  {reservaSelected.apt_responsavel} - {" "}
                  {reservaSelected.bloco_apt}
                </b>
              </h3>
            </div>
            <div>
              <h3>Data de início: </h3>
              <h3>
                <b>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(reservaSelected.horario_inicial)
                  )}{" "}
                  - {reservaSelected.horario_inicial.split("T")[1]}
                </b>
              </h3>
            </div>
            <div>
              <h3>Data de término: </h3>
              <h3>
                <b>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(reservaSelected.horario_final)
                  )}{" "}
                  - {reservaSelected.horario_final.split("T")[1]}
                </b>
              </h3>
            </div>
          </>
        )}
      </Modal>
      {/* <h3>Reservas Feitas:</h3>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.local_reservado} -{" "}
            {new Date(reserva.horario_inicial).toLocaleString()} até{" "}
            {new Date(reserva.horario_final).toLocaleString()}
          </li>
        ))}
      </ul> */}
      <div className="widget">
        <div className="titulo-widget">
          <FaRegCalendarAlt size={50} /> <h2>Reservas de Locais</h2>
          <div className="add" onClick={showModalAsync}>
            <IoAddCircle size={60} color="#F6C233" />
          </div>
        </div>
        {reservas.length > 0 ? (
          <div className="cards-widget">
            {reservas.map((reserva) => (
              <div
                className="card"
                key={reserva.id}
                onClick={() => {
                  showModal(reserva);
                }}
              >
                <div className="info-card-1">
                  <h3>{reserva.local_reservado}</h3>
                  <div className="horarios">
                    <div className="info-card-2">
                      <IoCalendarOutline size={30} />
                      <h3>
                        {
                          new Date(reserva.horario_inicial)
                            .toLocaleString()
                            .split(",")[0]
                        }
                      </h3>
                    </div>
                    <div className="info-card-2">
                      <FaRegClock size={30} />
                      <span>
                        {
                          new Date(reserva.horario_inicial)
                            .toLocaleString()
                            .split(" ")[1]
                        }{" "}
                        -{" "}
                        {
                          new Date(reserva.horario_final)
                            .toLocaleString()
                            .split(" ")[1]
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <div className="desc-icon">
                  <p className="desc-card">
                    Reservado por {reserva.apt_responsavel} -{" "}
                    {reserva.bloco_apt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cards-widget">
            <div className="load">
              <AiOutlineLoading className="loading" size={90} />
              <span>Carregando Reservas...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservas;
