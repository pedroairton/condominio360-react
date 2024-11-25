import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { TfiPackage } from "react-icons/tfi";
import { PiPackageBold } from "react-icons/pi";
import {Link} from 'react-router-dom'

const WidgetEncomendas = () => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : `https://supabase-api-express.vercel.app/`;
  const fetchEncomendas = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${apiUrl}/admin/encomendas?limit=3`, {
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
  return (
    <div className="widget">
      <div className="titulo-widget">
        <TfiPackage size={50} /> <h2>Encomendas</h2>
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
      <button className="btn-widget">
        <Link to={"/admin/encomendas"}>Todas as encomendas</Link>
      </button>
    </div>
  );
};

export default WidgetEncomendas;
