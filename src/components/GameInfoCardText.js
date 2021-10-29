import {
  GiTwoCoins,
  GiMetalBar,
  GiWoodPile,
  GiStoneStack,
  GiSwordman,
  GiBowman,
  GiBurningForest,
  GiFireShield,
} from "react-icons/gi";

import React from "react";
const GameInfoCardText = (props) => {
  const iconsSize = "1.2em";

  if (
    props.type.type === "wonEnemyAttack" ||
    props.type.type === "lostEnemyAttack"
  ) {
    var lostWarriors = (
      <div>
        <p className="mt-4 text-center game-info-card__battle-losses">
          Losses after the battle:
        </p>
        <div className="d-flex flex-nowrap justify-content-around mx-5">
          {" "}
          {props.type.type === "lostEnemyAttack" && (
            <div>
              <GiTwoCoins size={"1.8em"} color="red" className="mr-2" />
              {props.lostBattleGold}
            </div>
          )}
          <div>
            <GiSwordman size={"1.8em"} color="red" className="mr-2" />
            {props.lostBattleKnights}
          </div>
          <div>
            <GiBowman size={"1.8em"} color="red" className="mr-2" />
            {props.lostBattleArchers}
          </div>
        </div>
      </div>
    );
  }

  if (props.type.id === 3) {
    var productionInfo = (
      <div className="game-info-card__production text-center pt-4 w-100">
        <p className="game-info-card__production-title">Production per day</p>
        <div className="d-flex flex-nowrap justify-content-around px-3 pt-2">
          <div>
            <GiTwoCoins size={iconsSize} color="yellow" />
            <span className="pl-1">{props.productionPerDay[0].goldPerDay}</span>
          </div>
          <div>
            <GiWoodPile size={iconsSize} color="rgb(236 171 51)" />
            <span className="pl-1">
              {props.productionPerDay[0].lumberPerDay}
            </span>
          </div>
          <div>
            <GiStoneStack size={iconsSize} color="grey" />
            <span className="pl-1">
              {props.productionPerDay[0].stonePerDay}
            </span>
          </div>
          <div>
            <GiMetalBar size={iconsSize} color="white" />
            <span className="pl-1">{props.productionPerDay[0].ironPerDay}</span>
          </div>
        </div>
      </div>
    );
  }

  if (props.type.type === "wonEnemyAttack") {
    var wonBattle = (
      <div>
        <div className="text-center w-100 icon-float icon-float__won-battle">
          <GiFireShield size="3.2em" />
        </div>
        <div className="text-center mb-2">
          <GiTwoCoins size={"1.6em"} color="yellow" className="mr-2" />
          {props.wonBattleGold
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        </div>
      </div>
    );
  }
  if (props.type.type === "lostEnemyAttack") {
    var lostBattle = (
      <div className="text-center w-100 icon-float icon-float__lost-battle">
        <GiBurningForest size="2.8em"/>
      </div>
    );
  }

  if (props.icon) {
    var icons = (
      <div className={`text-center w-100 icon-float ${props.type.type === "gameWon"? 'icon-float__won-game': 'icon-float__lost-game'}`}>
        {props.icon}
    </div>
    )
  }

  return (
    <div className="w-100 game-info-card">
      <h1 className="game-info-card-header w-100">{props.type.header}</h1>
      <div className="">
        {" "}
        {props.type.text && (
          <h4 className="text-center pt-1 px-3">{props.type.text}</h4>
        )}
        {props.type.secondText && (
          <div className="px-5 pt-3">{props.type.secondText}</div>
        )}
        <div className="px-5">{props.type.thirdText}</div>
        {icons}
        {productionInfo}
        {wonBattle}
        {lostBattle}
        {lostWarriors}
      </div>
    </div>
  );
};

export default GameInfoCardText;
