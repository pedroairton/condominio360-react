import React from "react";
import { BsBuilding } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";

import { useState, useEffect } from "react";

import { Button, Modal } from 'antd';


const fetchMoradores = async () => {
  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : `${window.location.origin}`;

  try {
    const response = await fetch(`${apiUrl}/moradores`);

    const data = await response.json();

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const Moradores = () => {
  const [moradores, setMoradores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dados = await fetchMoradores();
      if (dados) {
        setMoradores(dados);
      }
      console.log(dados);
    };
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="page-moradores">
          <Modal title="Detalhes do Morador" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={(_, {CancelBtn}) => {
            <>
              <CancelBtn/>
            </>
          }}>
        <h3>Apartamento: <b>202</b></h3>
        <h3>Bloco: <b>A</b></h3>
        <h4>Responsável: <b>Pedro</b></h4>
        <h4>Email Registrado: <b>pedro@email.com</b></h4>
        <h4>Tipo de Residência: <b>Morador</b></h4>
      </Modal>
      <div className="widget">
        <div className="titulo-widget">
          <BsBuilding size={50} /> <h2>Moradores</h2>
          <div className="add">
            <IoAddCircle size={60} color="#F6C233" stroke="red" />
          </div>
        </div>
        <div className="cards-widget">
          {/* <div className="card">
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
          </div> */}
          {moradores.map((morador) => (
            <div className="card" key={morador.id} onClick={showModal}>
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
      </div>
    </section>
  );
};

export default Moradores;
