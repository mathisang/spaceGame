import React from "react";

export default function ({ money, opinion, search }) {
  // Si une jauge tombe à 0
  // DEFINIR LES ECRAN DE FIN POUR CHAQUE JAUGE
  const looseText = {
    moneyText: "Votre argent est tombé à 0, vous êtes fauché !",
    opinionText: "Votre opinion est tombé à 0, la population vous rejette !",
    searchText: "Votre recherche est tombé à 0, l'URSS à 100 ans d'avance !",
  };

  const Text = () => (
    <p>
      {money === 0
        ? looseText.moneyText
        : opinion === 0
        ? looseText.opinionText
        : looseText.searchText}
    </p>
  );

  return (
    <div>
      <Text />
    </div>
  );
}
