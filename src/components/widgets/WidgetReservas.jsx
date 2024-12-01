import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";

import { Link } from "react-router-dom";

const WidgetReservas = () => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "https://supabase-api-express.vercel.app"
      : `https://supabase-api-express.vercel.app`;
  const fetchReservas = async () => {
    try {
      const response = await fetch(`${apiUrl}/reservas?limit=3`);

      const data = await response.json();

      if (data) {
        setReservas(data);
      }
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReservas();
  }, []);

  const [reservas, setReservas] = useState([]);
  return (
    <div className="widget widget-reservas">
      <div className="titulo-widget">
        <BsBuilding size={50} /> <h2>Reservas</h2>
      </div>
      {reservas.length > 0 ? (
        <div className="cards-widget">
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
      ) : (
        <div className="cards-widget">
          <div className="load">
            <AiOutlineLoading className="loading" size={90} />
            <span>Carregando Reservas...</span>
          </div>
        </div>
      )}
      <button className="btn-widget">
        <Link to={"/admin/reservas"}>Todas as reservas</Link>
      </button>
    </div>
  );
};

export default WidgetReservas;
