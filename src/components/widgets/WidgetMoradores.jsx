import React, {useEffect, useState} from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";

const WidgetMoradores = () => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : `${window.location.origin}`;
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
    <div className="widget">
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
        <button className="btn-widget">Todos os moradores</button>
      </div>
  );
};

export default WidgetMoradores;
