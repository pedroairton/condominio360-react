import React from "react";
import WidgetMoradores from './widgets/WidgetMoradores'
import WidgetMensagens from './widgets/WidgetMensagens'
// icons mensagens
import { CiMail } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";

// icons encomendas
import { TfiPackage } from "react-icons/tfi";
import { PiPackageBold } from "react-icons/pi";

// icons moradores

// icons reservas
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
// FaRegClock

const AdminWidgets = () => {
  return (
    <>
    <div className="widgets">
      {/* componentizar widgets no futuro */}
      {/* mensagens */}
      <WidgetMensagens/>
      {/* encomendas */}
      <div className="widget">
        <div className="titulo-widget">
          <TfiPackage size={50} /> <h2>Encomendas</h2>
        </div>
        <div className="cards-widget">
          <div className="card">
            <div className="info-card-1">
              <PiPackageBold size={30} />
              <h3>20/11/2024</h3>
              <h3>11:50</h3>
              <h4>
                Entregue: <span>Não</span>
              </h4>
            </div>
            <p className="desc-card">Encomenda para o apt. 202-A</p>
          </div>
          <div className="card">
            <div className="info-card-1">
              <PiPackageBold size={30} />
              <h3>20/11/2024</h3>
              <h3>11:50</h3>
              <h4>
                Entregue: <span>Não</span>
              </h4>
            </div>
            <p className="desc-card">Encomenda para o apt. 202-A</p>
          </div>
          <div className="card">
            <div className="info-card-1">
              <PiPackageBold size={30} />
              <h3>20/11/2024</h3>
              <h3>11:50</h3>
              <h4>
                Entregue: <span>Não</span>
              </h4>
            </div>
            <p className="desc-card">Encomenda para o apt. 202-A</p>
          </div>
        </div>
        <button className="btn-widget">Todas as encomendas</button>
      </div>
      <WidgetMoradores/>
      {/* reservas */}
      <div className="widget">
        <div className="titulo-widget">
          <FaRegCalendarAlt size={50} /> <h2>Reservas de Locais</h2>
        </div>
        <div className="cards-widget">
          <div className="card">
            <div className="info-card-1">
              <h3>Churrasqueira</h3>
              <div className="horarios">
                <div className="info-card-2">
                  <IoCalendarOutline size={30} />
                  <h3>20/11/2024</h3>
                </div>
                <div className="info-card-2">
                  <FaRegClock size={30} />
                  <span>08:00 - 14:00</span>
                </div>
              </div>
            </div>
            <div className="desc-icon">
              <p className="desc-card">Reservado por 202-A</p>
            </div>
          </div>
        </div>
        <button className="btn-widget">Todas as reservas</button>
      </div>
    </div>
    </>
  );
};

export default AdminWidgets;
