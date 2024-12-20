import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const WidgetMoradores = () => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "https://supabase-api-express.vercel.app"
      : `https://supabase-api-express.vercel.app`;
  const fetchMoradores = async () => {
    try {
      const response = await fetch(`${apiUrl}/moradores?limit=3`);

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
  return (
    <div className="widget widget-morador">
      <div className="titulo-widget">
        <BsBuilding size={50} /> <h2>Moradores</h2>
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
                <div className="icon-tit">
                  <FaUserLarge size={30} />
                  <h3>
                    Apt. {morador.apartamento} - Bloco {morador.bloco}
                  </h3>
                </div>
                <div className="info-card-2">
                  <FaBuildingCircleArrowRight size={30} />
                  <h4>Entrou em:</h4>
                  <span>
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(morador.created_at)
                    )}
                  </span>
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
      <button className="btn-widget">
        <Link to={"/admin/moradores"}>Todos os moradores</Link>
      </button>
    </div>
  );
};

export default WidgetMoradores;
