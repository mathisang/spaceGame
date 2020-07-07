import React, { useEffect, useState, Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import { Physics } from "use-cannon";
import Rocket from "./Rocket";
import Obstacle from "./Obstacle";
import BackgroundSpace from "./BackgroundSpace";
import "./miniGame.scss";
import Loading from "./Loading";
import Gauge from "./Gauge";
import ColorBackground from "./ColorBackground";
import StartCounter from "./StartCounter";
import LifePoints from "./LifePoints";

export default ({ setGameBadge, gameBadge, setResultGame }) => {
  const [isTouched, setTouched] = useState(false);
  const [lifePoints, setLifePoints] = useState(3);
  const [isGameOn, setGameStatus] = useState(false);
  const [asteroid, setAsteroid] = useState(1);
  const [globalAsteroid, setGlobalAsteroid] = useState(0);
  const [obstaclePart, setObstaclePart] = useState(0);
  const [waveMsg, setWaveMsg] = useState(false);

  useMemo(() => {
    obstaclePart !== 0 && setGlobalAsteroid(globalAsteroid + 30);
  }, [obstaclePart]);

  useEffect(() => {
    if (isTouched) {
      setLifePoints(lifePoints - 1);
      setTimeout(() => {
        setTouched(false);
      }, 1000);
    }
    if (lifePoints === 0) {
      /*setGameBadge((prevState) => {
        return {
          ...prevState,
          flightGame: "urss",
        };
      });
      setResultGame("loose");*/
      console.log("loose");
    }
  }, [isTouched]);

  useEffect(() => {
    if (obstaclePart === 2) {
      if (asteroid === 30) {
        /* setGameBadge((prevState) => {
          return {
            ...prevState,
            flightGame: "usa",
          };
        });
        setResultGame("win");*/
        console.log("win");
        //put set timeout
      }
    }
  }, [asteroid]);

  return (
    <div className="minigame-container">
      <LifePoints lifePoints={lifePoints} />
      {!isGameOn && <StartCounter setGameStatus={setGameStatus} />}
      {waveMsg && (
        <div className="wave-message">
          <h2>Vague numéro {obstaclePart + 1} à venir</h2>
        </div>
      )}
      <Gauge globalAsteroid={globalAsteroid} asteroid={asteroid} />
      <Canvas
        shadowMap
        sRGB
        gl={{ alpha: false }}
        camera={{ position: [0, 1, 10], near: 0.01, far: 10000 }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color("black"));
        }}
      >
        <ambientLight intensity={0.2} />
        <spotLight
          position={[30, 10, 10]}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        <ColorBackground globalAsteroid={globalAsteroid} asteroid={asteroid} />
        <BackgroundSpace pointCount={500} />
        <Physics>
          <Suspense fallback={<Loading />}>
            <Rocket isTouched={isTouched} setTouched={setTouched} />
            {isGameOn && (
              <Obstacle
                setWaveMsg={setWaveMsg}
                obstaclePart={obstaclePart}
                setObstaclePart={setObstaclePart}
                asteroid={asteroid}
                setAsteroid={setAsteroid}
                number={30}
              />
            )}
          </Suspense>
        </Physics>
      </Canvas>
    </div>
  );
};
