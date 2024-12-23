import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import {Link} from 'react-router-dom'


const WidgetMensagens = () => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "https://supabase-api-express.vercel.app"
      : `https://supabase-api-express.vercel.app`;
  const fetchMensagens = async () => {
    try {
      const response = await fetch(`${apiUrl}/mensagens?limit=3`);

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
    return message.length > limit
      ? message.substring(0, limit) + "..."
      : message;
  };
  useEffect(() => {
    fetchMensagens();
  }, []);

  const [mensagens, setMensagens] = useState([]);
  return (
    <div className="widget">
      <div className="titulo-widget">
        <CiMail size={50} /> <h2>Mensagens</h2>
      </div>
      {mensagens.length > 0 ? (
        <div className="cards-widget">
          {mensagens.map((mensagem) => (
            <div
              className="card"
              key={mensagem.id}
              onClick={() => showModal(mensagem)}
            >
              <div className="info-card-1">
                <FaRegClock size={30} />{" "}
                <h3>{new Intl.DateTimeFormat('pt-BR').format(new Date(mensagem.created_at))}</h3>
                <h3>
                  {mensagem.created_at.split("T")[1].split("+")[0].slice(0, 5)}
                </h3>
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
      <button className="btn-widget">
        <Link to={"/admin/mensagens"}>Todas as mensagens</Link>
      </button>
    </div>
  );
};

export default WidgetMensagens;
