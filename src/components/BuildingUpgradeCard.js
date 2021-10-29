import { useState, useEffect } from "react";
import {
  GiSwordman,
  GiBowman,
  GiMetalBar,
  GiTwoCoins,
  GiWoodPile,
  GiStoneStack,
} from "react-icons/gi";
import ReactTooltip from "react-tooltip";
import ImagesOfBuildings from "./ImagesOfBuildings";
const BuildingUpgradeCard = (props) => {
  let displayUpgradeBtn = true;
  const cannotDestroyHouseMessage =
    "Cannot destroy the house since workers and warriors need a place to live";
  const [buildingUpgraded, setBuildingUpgraded] = useState(false);
  const [number, setNumber] = useState(0);
  const [incrementorForPrice, setIncrementorForPrice] = useState(1);
  const [isForge, setIsForge] = useState(false);
  const [enoughResources, setEnoughResources] = useState(true);
  const [cannotDestroyHouse, setCannotDestroyHouse] = useState(false);
  const [canTrain, setCanTrain] = useState(true);

  const checkIfEnoughResources = (buildingId) => {
    return props.checkForResourcesToUpgrade(buildingId, 2);
  };
  const upgradeBuilding = () => {
    setCannotDestroyHouse(false);
    if (checkIfEnoughResources(props.selectedBuildingType)) {
      setBuildingUpgraded(true);
      props.onUpgrade(props.selectedBuildingType);
      setEnoughResources(true);
    } else {
      setEnoughResources(false);
    }
  };

  const destroyBuidling = () => {
    if (props.selectedBuildingType === 1 || props.selectedBuildingType === 2) {
      if (
        !props.checkIfCanDestroyHouse(
          props.selectedBuildingType,
          props.selectedBuildingLevel
        )
      ) {
        setCannotDestroyHouse(true);
        setEnoughResources(true);
        return;
      }
    }
    setCannotDestroyHouse(false);

    props.onDestroyBuilding(
      props.selectedBuildingType,
      props.selectedBuildingLevel
    );
  };

  const closeModal = () => {
    props.onCloseModal();
  };

  const decreaseNo = () => {
    if (number === 0) {
      return;
    }
    setNumber((prevNo) => prevNo - 1);
  };

  const increaseNr = () => {
    if (
      props.assets[0].iron < (number + 1) * incrementorForPrice ||
      props.assets[0].gold < (number + 1) * incrementorForPrice * 100 ||
      props.assets[0].villagers < number + 1
    ) {
      return;
    }
    setNumber((prevNo) => prevNo + 1);
  };

  const setMaxNr = () => {
    if (
      props.assets[0].iron < (number + 1) * incrementorForPrice ||
      props.assets[0].gold < (number + 1) * incrementorForPrice * 100 ||
      props.assets[0].villagers < number + 1
    ) {
      return;
    } else {
      let ironCountNo = Math.floor(props.assets[0].iron / incrementorForPrice);
      let goldCountNo = Math.floor(
        props.assets[0].gold / (incrementorForPrice * 100)
      );
      let villagersCountNo = props.assets[0].villagers;
      let values = [ironCountNo, goldCountNo, villagersCountNo];
      let minValue = Math.min.apply(
        Math,
        values.map(function (o) {
          return o;
        })
      );
      setNumber(minValue);
    }
  };

  const trainWarriors = () => {
    if (props.checkIfHasBuilding(props.selectedBuildingType)) {
      setCanTrain(true);
      props.onTrainWarriors(number);
      setNumber(0);
    } else {
      setCanTrain(false);
    }
  };

  let warriorImage = <GiSwordman size="3.2em" />;
  let toolTipWarriorStrength = "Warrior strength: 10";
  let errorMessage = "Check if You have built Armor & Swords Forges";

  if (props.selectedBuildingType === 3 || props.selectedBuildingType === 4) {
    displayUpgradeBtn = false;
    if (props.selectedBuildingType === 4) {
      warriorImage = <GiBowman size="3.2em" />;
      toolTipWarriorStrength = "Warrior strength: 30";
      errorMessage = "Check if You have built Armor & Arrows Forges";
    }
  }

  useEffect(() => {
    setNumber(0);
    setCanTrain(true);
    setBuildingUpgraded(false);
    props.selectedBuildingType === 3
      ? setIncrementorForPrice(1)
      : setIncrementorForPrice(3);
    setEnoughResources(true);
    setCannotDestroyHouse(false);
    props.building.group === "factories"
      ? setIsForge(true)
      : setIsForge(false);
  }, [props.buildingArea, props.selectedBuildingType, props.building.group]);

  return (
    <div>
      <ReactTooltip place="bottom" delayUpdate={1000} />
      <div className="leftUpperBox d-flex flex-wrap w-100 p-2 justify-content-center">
        <div className="d-flex flex-wrap align-items-start building-card">
          <span className="building-title">{props.buildingTitle}</span>
          {!displayUpgradeBtn && (
            <div className="d-flex flex-wrap w-100 justify-content-center mb-auto">
              <p className="mb-3">
                Cost:{" "}
                <span data-delay-show="400" data-tip="Iron">
                  <GiMetalBar size="1.4em" color="white" />{" "}
                  {incrementorForPrice}{" "}
                </span>
                <span data-delay-show="400" data-tip="Gold">
                  <GiTwoCoins
                    size="1.4em"
                    className="ml-3 mr-1"
                    color="yellow"
                  />
                  {incrementorForPrice * 100}
                </span>
              </p>
              <span
                className="d-flex flex-wrap w-100 justify-content-center"
                data-delay-show="100"
                data-tip={toolTipWarriorStrength}
              >
                {warriorImage}
              </span>
              <div className="d-flex flex-nowrap w-100 justify-content-center my-2">
                <div className="d-flex flex-nowrap align-content-center text-right">
                  {" "}
                  <button
                    className="btn btn-dark btn-xs m-1"
                    onClick={decreaseNo}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-dark btn-xs my-1"
                    onClick={increaseNr}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-dark btn-xs my-1 ml-1"
                    onClick={setMaxNr}
                  >
                    max
                  </button>
                </div>
                <div className="d-flex flex-wrap align-content-center justify-content-center train-warriors-number ml-2">
                  {number}
                </div>
              </div>

              <div className="d-flex flex-wrap justify-content-center">
                <span className="w-100 text-center">Total Cost: </span>
                <span data-delay-show="400" data-tip="Iron">
                  <GiMetalBar size="1.4em" color="white" className="mx-2" />
                  {number * incrementorForPrice}{" "}
                </span>{" "}
                <span className="ml-4" data-delay-show="400" data-tip="Gold">
                  <GiTwoCoins size="1.4em" color="yellow" />{" "}
                  {number * incrementorForPrice * 100}{" "}
                </span>
              </div>
              <button
                className="btn btn-success btn-sm my-1 w-75"
                disabled={number === 0}
                onClick={trainWarriors}
              >
                Train
              </button>
              {!canTrain && (
                <div className="errorMessage px-2 text-center m-3">
                  {errorMessage}
                </div>
              )}
            </div>
          )}

          {displayUpgradeBtn && (
            <div className="d-flex mb-auto justify-content-center flex-wrap w-100">
              <div className="w-100 text-center mb-2">
                <ImagesOfBuildings
                  buildingId={props.selectedBuildingType}
                  biggerImageSize={"3.2em"}
                  smallerImageSize={"2.2em"}
                />
                <p className="building-info-text">
                  {props.selectedBuildingText}
                </p>
              </div>
              {props.selectedBuildingGroup !== "factories" ? (
                <span className="building-level-text w-100 text-center mx-5 mb-1">
                  {" "}
                  {props.selectedBuildingLevel + 1} Level{" "}
                </span>
              ) : null}
            </div>
          )}
        </div>
        {displayUpgradeBtn && !isForge && (
          <div className="d-flex mb-auto justify-content-center flex-wrap w-100">
            {!enoughResources && (
              <div className="errorMessage w-100 mx-2 mb-2">
                Not enough resources
              </div>
            )}
            {props.selectedBuildingLevel === 0 ? (
              <div className="w-100 text-center upgrade-building-box mb-2">
                <div className="d-flex flex-wrap justify-content-around w-100 px-2">
                  <span data-delay-show="400" data-tip="Gold">
                    <GiTwoCoins size="1.2em" color="yellow" /> &nbsp;
                    {props.building.priceInGold * 2}
                  </span>
                  <span data-delay-show="400" data-tip="Lumber">
                    <GiWoodPile size="1.5em" color="rgb(236 171 51)" /> &nbsp;
                    {props.building.priceInWood * 2}
                  </span>
                  {props.building.priceInStone ? (
                    <span data-delay-show="400" data-tip="Stone">
                      <GiStoneStack size="1.5em" color="grey" /> &nbsp;
                      {props.building.priceInStone * 2}
                    </span>
                  ) : null}
                  {props.building.priceInIron ? (
                    <span data-delay-show="400" data-tip="Iron">
                      <GiMetalBar size="1.2em" /> &nbsp;{" "}
                      {props.building.priceInIron * 2}
                    </span>
                  ) : null}
                </div>

                <button
                  className="btn btn-success btn-sm m-2 py-0 px-3"
                  onClick={upgradeBuilding}
                  data-delay-show="400"
                  data-tip="Double the production"
                  disabled={props.selectedBuildingLevel > 0 || buildingUpgraded}
                >
                  Upgrade
                </button>
              </div>
            ) : null}

            {cannotDestroyHouse && (
              <div className="errorMessage m-3">
                {" "}
                {cannotDestroyHouseMessage}
              </div>
            )}
          </div>
        )}

        <div className="d-flex justify-content-center mt-auto flex-wrap">
          <button
            className="btn btn-warning btn-sm m-1"
            onClick={destroyBuidling}
            data-delay-show="100"
            data-tip="You will receive the half of the cost of 1st level building"
          >
            Destroy Building
          </button>
          <button className="btn btn-dark btn-sm m-1" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildingUpgradeCard;
