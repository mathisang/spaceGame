import React from "react";
import EndText from "./EndContent/endText";
import LooseText from "./EndContent/looseGauge";
import Badges from "./EndBadges";
import "./endCard.scss";
import { iconMessenger, iconTwitter, iconLink } from "../../../assets/images";

export default function ({ money, opinion, search, gameBadge }) {
  // Bouton "Rejouer"
  const RestartButton = () => {
    function restartGame() {
      window.location.reload(false);
    }
    return (
      <button className="small" onClick={restartGame}>
        Revenir au menu
      </button>
    );
  };

  // Variable en attendant, de fixer la condition de victoire finale
  let winner = gameBadge.moonGame === "usa" ? "usa" : "urss";

  const SocialShare = () => {
    return (
      <div className="socialShare">
        <div className="iconSocial">
          <img src={iconMessenger} alt="" />
        </div>
        <div className="iconSocial">
          <img src={iconTwitter} alt="" />
        </div>
        <div className="iconSocial">
          <img src={iconLink} alt="" />
        </div>
      </div>
    );
  };

  // Affichage de l'écran de fin
  return (
    <div
      className="endScreen"
      style={{
        background: `url("../../../assets/images/end/${
          winner === "usa" ? "end_usa" : "end_urss"
        }.png") 100% 140% no-repeat,
        url("../../../assets/images/cards/background_cards.png") top no-repeat,
        black`,
        backgroundSize: "100%",
      }}
    >
      <div>
        {money <= 0 || opinion <= 0 || search <= 0 ? (
          <LooseText money={money} opinion={opinion} search={search} />
        ) : (
          <EndText winner={winner} />
        )}
        <Badges gameBadge={gameBadge} />
      </div>
      <div>
        <h3 className="small">Défier vos amis</h3>
        <SocialShare />
        <RestartButton />
      </div>
    </div>
  );
}
