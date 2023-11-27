import React, { useState } from "react";

const ModalMenssagem = (props: { nome: string }) => {
  const [menssagemBox, setMenssagemBox] = useState();

  const modalMenssagem = () => {
    console.log("vai abrir para mandar messagem para todos do grupo");
  };
  return <div>{props.nome}</div>;
};

export default ModalMenssagem;
