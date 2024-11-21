import React from 'react'
// icons mensagens
import { CiMail } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";

// icons encomendas
import { TfiPackage } from "react-icons/tfi";
import { PiPackageBold } from "react-icons/pi";

// icons moradores
import { BsBuilding } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";

// icons reservas
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
// FaRegClock

const AdminWidgets = () => {
  return (
    <div className="widgets">
        {/* componentizar widgets no futuro */}
        <div className="widget">
          <div className="titulo-widget">
            <CiMail size={50} /> <h2>Mensagens do Condomínio</h2>
          </div>
          <div className="cards-widget">
            <div className="card">
              <div className="info-card-1">
                <FaRegClock size={30} /> <h3>20/11/2024</h3> <h3>00:57</h3>
              </div>
              <p className="desc-card">
                Manutenção agendada da caixa d'água do bloco A para próxima
                semana
              </p>
            </div>
            <div className="card">
              <div className="info-card-1">
                <FaRegClock size={30} /> <h3>20/11/2024</h3> <h3>00:57</h3>
              </div>
              <p className="desc-card">
                Manutenção agendada da caixa d'água do bloco A para próxima
                semana
              </p>
            </div>
            <div className="card">
              <div className="info-card-1">
                <FaRegClock size={30} /> <h3>20/11/2024</h3> <h3>00:57</h3>
              </div>
              <p className="desc-card">
                Manutenção agendada da caixa d'água do bloco A para próxima
                semana
              </p>
            </div>
          </div>
          <button className="btn-widget">Todas as mensagens</button>
        </div>
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
        <div className="widget">
          <div className="titulo-widget">
            <BsBuilding size={50} /> <h2>Moradores</h2>
          </div>
          <div className="cards-widget">
            <div className="card">
              <div className="info-card-1">
                <FaUserLarge size={30} />
                <h3>Apt. 202 - Bloco A</h3>
                <div className="info-card-2">
                  <FaBuildingCircleArrowRight size={30} />
                  <h4>Entrou em:</h4>
                  <span>11/11/2024</span>
                </div>
              </div>
              <div className="desc-icon">
                <FaHouseUser size={30} />
                <p className="desc-card">Pedro</p>
              </div>
            </div>
            <div className="card">
              <div className="info-card-1">
                <FaUserLarge size={30} />
                <h3>Apt. 202 - Bloco A</h3>
                <div className="info-card-2">
                  <FaBuildingCircleArrowRight size={30} />
                  <h4>Entrou em:</h4>
                  <span>11/11/2024</span>
                </div>
              </div>
              <div className="desc-icon">
                <FaHouseUser size={30} />
                <p className="desc-card">Pedro</p>
              </div>
            </div>
            <div className="card">
              <div className="info-card-1">
                <FaUserLarge size={30} />
                <h3>Apt. 202 - Bloco A</h3>
                <div className="info-card-2">
                  <FaBuildingCircleArrowRight size={30} />
                  <h4>Entrou em:</h4>
                  <span>11/11/2024</span>
                </div>
              </div>
              <div className="desc-icon">
                <FaHouseUser size={30} />
                <p className="desc-card">Pedro</p>
              </div>
            </div>
          </div>
          <button className="btn-widget">Todos os moradores</button>
        </div>
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
  )
}

export default AdminWidgets