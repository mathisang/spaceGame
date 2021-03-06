import React, { useEffect, useState } from "react";
import "./App.scss";
import StartCard from "./components/Cards/StartCard";
import GameOn from "./components/GameOn";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SceneDesktop from "./components/Three/DesktopGame/Scene/index";
import { isBrowser } from "react-device-detect";
import MoonGame from "./components/Three/MoonGame";

function App() {
  const [isGameOn, setGameStatus] = useState(false);
  const [isTutorialOn, setTutorialStatus] = useState(false);
  const handleChange = () => setGameStatus(true);
  const tutorialChange = () => (setTutorialStatus(true), setGameStatus(true));
  const [cardsData, setCardsData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [stepData, setStepData] = useState([]);
  const [tutorialData, setTutorialData] = useState([]);
  useEffect(() => {
    fetch("https://mathisangibaud.fr/api/cards", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
      },
    })
      .then((response) => response.json())
      .then((data) => setCardsData(data));

    fetch("https://mathisangibaud.fr/api/games", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
      },
    })
      .then((response) => response.json())
      .then((data) => setGameData(data));

    fetch("https://mathisangibaud.fr/api/step_cards", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
      },
    })
      .then((response) => response.json())
      .then((data) => setStepData(data));

    fetch("https://mathisangibaud.fr/api/step_tutorials", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
      },
    })
      .then((response) => response.json())
      .then((data) => setTutorialData(data));
  }, []);

  return (
    <Switch>
      <Route path="/">
        <div className="App">
          {isGameOn ? (
            <GameOn
              tutorialStatus={isTutorialOn}
              setTutorialStatus={setTutorialStatus}
              cardsData={cardsData}
              gameData={gameData}
              stepData={stepData}
              tutorialData={tutorialData}
            />
          ) : (
            <StartCard
              onChangeStatus={handleChange}
              startTutoriel={tutorialChange}
            />
          )}
          {isBrowser && <SceneDesktop />}
        </div>
      </Route>
    </Switch>
  );
}

export default () => (
  <Router>
    <App />
  </Router>
);
