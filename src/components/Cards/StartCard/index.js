import React from "react";
import "./startCard.scss";
import { logo } from "../../../assets/images/index";

// Texte d'intro
const HeadTitle = () => (
  <div className="logo">
    <img src={logo} alt="" />
  </div>
);

// Bouton Tutoriel
const TutoButton = ({ startTutoriel }) => {
  return (
    <a onClick={startTutoriel} className="small">
      Comment jouer ?
    </a>
  );
};

// Bouton Démarrer
const StartButton = ({ onChangeStatus }) => {
  return <button onClick={onChangeStatus}>Jouer</button>;
};

// Affichage de l'écran d'accueil
export default ({ onChangeStatus, startTutoriel }) => (
  <div className="startGame">
    <HeadTitle />
    <div className="listButtons">
      <StartButton onChangeStatus={onChangeStatus} />
      <TutoButton startTutoriel={startTutoriel} />
    </div>
  </div>
);
