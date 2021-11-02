import React from "react";
import { useState, useEffect } from "react";
import GameInfoCardText from "./GameInfoCardText";
import ReactDOM from "react-dom";
import {
  GiBurningSkull,
  GiRomanToga,
  GiVikingLonghouse,
  GiMedievalGate,
  GiTwoCoins,
  GiSwordman,
  GiBowman,
} from "react-icons/gi";

const Backdrop = (props) => {
  const closeModal = () => {
    if (
      props.selectedInfoTypeId === 5 ||
      props.selectedInfoTypeId === 6 ||
      props.selectedInfoTypeId === 7 ||
      props.selectedInfoTypeId === 8
    ) {
      return;
    }
    props.onCloseModal();
  };
  return <div className="backdrop" onClick={closeModal}></div>;
};

const ModalOverlay = (props) => {
  const formatNumber = (number) => {
    return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const getDefenseStrength = () => {
    return formatNumber(
      props.knights * 10 + props.archers * 30 + props.villagers
    );
  };

  const getGoldLeftTillWin = () => {
    return formatNumber(1000000 - props.gold);
  };

  const getWarriorsLeftTillWin = () => {
    return formatNumber(10000 - props.knights - props.archers);
  };

  const getEnemyAtackStrength = () => {
    return formatNumber(props.strengthOfEnemy);
  };

  const getDaysTillAttack = () => {
    return;
  };

  var defenseStrength = getDefenseStrength();
  var goldTillWin = getGoldLeftTillWin();
  var warriorstillWin = getWarriorsLeftTillWin();
  var enemyAtackStrength = getEnemyAtackStrength();
  var daysTillAttack = getDaysTillAttack();

  const [gameInfoTypes, setGameInfoTypes] = useState([
    {
      id: 1,
      type: "enemiesNearby",
      header: "Enemies Nearby",
      text: `${daysTillAttack} days till siege!`,
      secondText: `Enemy's Attack Strength: ${enemyAtackStrength}`,
      thirdText: `Your Defense Strength: ${defenseStrength}`,
      icon: "",
    },
    {
      id: 2,
      type: "gameStatus",
      header: "To Win The Game",
      text: "",
      secondText: (
        <React.Fragment>
          <div className="d-flex flex-wrap w-100 justify-content-center">
            <h4>
              Collect <b>1 million </b> gold!{" "}
            </h4>
            <span className="w-100 text-center">
              Till victory: &nbsp;
              <GiTwoCoins size="0.8em" color="rgb(242, 232, 36)" />
              <GiTwoCoins size="1.5em" color="rgb(255, 243, 0)" />
              <GiTwoCoins size="1.0em" color="rgb(235, 200, 45)" />{" "}
              {goldTillWin}{" "}
            </span>
          </div>
        </React.Fragment>
      ),
      thirdText: (
        <React.Fragment>
          <div className="w-100 d-flex flex-wrap justify-content-center mt-2">
            <h4>... or Train 10,000 Warriors!</h4>
            <span className="w-100 text-center pt-2">
              Till victory: &nbsp; <GiSwordman size="1.5em" /> <GiBowman />{" "}
              {warriorstillWin}
            </span>
          </div>
        </React.Fragment>
      ),
      icon: "",
    },
    {
      id: 3,
      type: "playersStats",
      header: "Game statistics",
      text: "",
      secondText: `Battles Won: ${props.battlesWon}`,
      thirdText: `Defense Strength: ${defenseStrength}`,
      icon: "",
    },
    {
      id: 4,
      type: "settings",
      header: "Settings",
      text: "At the moment no game settings can be changed",
      secondText: "",
      icon: "",
    },
    {
      id: 5,
      type: "gameWon",
      header: "Congratulations! You Won The Game!!!",
      text: "You proved that You have strong strategy skills!",
      secondText:
        "I hope that You did enjoy the game and I welcome You to play it again :)",
      icon: (
        <React.Fragment>
          <GiVikingLonghouse size="2.2em" className="mb-0" />
          <GiRomanToga size="3.4em" />
          <GiMedievalGate size="2.2em" className="mb-1" />
        </React.Fragment>
      ),
    },

    {
      id: 6,
      type: "gameLost",
      header: "Oh no... You lost",
      text: "Enemy conquered Your village and killed all Your warriors and villagers...",
      secondText: "",
      icon: <GiBurningSkull size="4.2em" />,
    },
    {
      id: 7,
      type: "wonEnemyAttack",
      header: "Enemy attacked Your village!",
      text: "You defended Your village. Great job! You received some gold:",
      secondText: "",
      icon: "",
    },
    {
      id: 8,
      type: "lostEnemyAttack",
      header: "Enemy attacked Your village!",
      text: "Enemy was very strong and delt you great damage. ",
      secondText: "Next time be more prepared for the battles.",
      icon: "",
    },
  ]);
  useEffect(() => {
    setGameInfoTypes(
      gameInfoTypes.map((infoType) => {
        return infoType.id === 1
          ? {
              ...infoType,
              text: `${props.daysTillAttack} days till siege!`,
            }
          : infoType.id === 2
          ? {
              ...infoType,
              secondText: (
                <React.Fragment>
                  <div className="d-flex flex-wrap w-100 justify-content-center">
                    <h4>
                      Collect <b>1 million </b> gold!{" "}
                    </h4>
                    <span className="w-100 text-center">
                      Till victory: &nbsp;
                      <GiTwoCoins size="0.8em" color="rgb(242, 232, 36)" />
                      <GiTwoCoins size="1.5em" color="rgb(255, 243, 0)" />
                      <GiTwoCoins size="1.0em" color="rgb(235, 200, 45)" />{" "}
                      {goldTillWin}{" "}
                    </span>
                  </div>
                </React.Fragment>
              ),
            }
          : infoType;
      })
    );
  }, [props.gold, props.daysTillAttack, goldTillWin]);
  const filteredgameInfo = gameInfoTypes.filter((infoType) => {
    return infoType.id === props.selectedInfoTypeId;
  });

  const closeModal = () => {
    props.onCloseModal();
  };

  return (
    <div className="modalBox">
      <div className="d-flex flex-wrap justify-content-start h-100">
        <div className="d-flex align-items-start flex-column h-100 w-100">
          {filteredgameInfo.map((type) => (
            <GameInfoCardText
              key={type.id}
              type={type}
              productionPerDay={props.productionPerDay}
              wonBattleGold={props.wonBattleGold}
              lostBattleGold={props.lostBattleGold}
              lostBattleKnights={props.lostBattleKnights}
              lostBattleArchers={props.lostBattleArchers}
              icon={type.icon}
            />
          ))}
          {props.gamePlay === 1 && (
            <div className="mt-auto">
              {" "}
              <button
                className="btn btn-danger btn-sm m-4"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          )}
          {(props.selectedInfoTypeId === 7 ||
            props.selectedInfoTypeId === 8) && (
            <div className="mt-auto text-center w-100 mb-3">
              {" "}
              <button
                className="btn btn-success btn-sm"
                onClick={props.proceedGame}
              >
                OK
              </button>
            </div>
          )}
          {(props.selectedInfoTypeId === 5 ||
            props.selectedInfoTypeId === 6) && (
            <div className="mt-auto mx-auto mb-3 text-center">
              {" "}
              <button
                className="btn btn-success btn-sm m-3"
                onClick={props.onPlayAgain}
              >
                Play Again
              </button>
              <button
                className="btn btn-danger btn-sm m-3"
                onClick={props.onExitGame}
              >
                Exit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GameInfoModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          selectedInfoTypeId={props.selectedInfoTypeId}
          onCloseModal={props.onCloseModal}
        />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          selectedInfoTypeId={props.selectedInfoTypeId}
          onCloseModal={props.onCloseModal}
          battlesWon={props.battlesWon}
          knights={props.warriors[0].knights}
          archers={props.warriors[0].archers}
          villagers={props.warriors[0].villagers}
          gold={props.warriors[0].gold}
          productionPerDay={props.productionPerDay}
          onExitGame={props.onExitGame}
          onPlayAgain={props.onPlayAgain}
          gamePlay={props.gamePlay}
          daysTillAttack={props.daysTillAttack}
          strengthOfEnemy={props.strengthOfEnemy}
          proceedGame={props.proceedGame}
          wonBattleGold={props.wonBattleGold}
          lostBattleGold={props.lostBattleGold}
          lostBattleKnights={props.lostBattleKnights}
          lostBattleArchers={props.lostBattleArchers}
        />,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default GameInfoModal;
