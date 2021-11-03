import React from "react";
import NavBar from "./NavBar";
import TutorialBox from "./TutorialBox";
import PurchaseMenuBox from "./PurchaseMenuBox";
import GameInfoModal from "./GameInfoModal";
import { useState, useEffect } from "react";
import { FaWhmcs, FaTrophy } from "react-icons/fa";
import {
  GiHouse,
  GiAxeInStump,
  GiCrossedSwords,
  GiFactory,
  GiSwordsEmblem,
  GiWoodCabin,
  GiWoodAxe,
  GiHut,
  GiVikingLonghouse,
  GiMining,
  GiMetalBar,
  GiEgyptianTemple,
  GiSwordman,
  GiBowman,
  GiPointySword,
  GiPocketBow,
  GiShoulderArmor,
  GiMedievalGate,
  GiMedievalPavilion,
  GiBarracksTent,
  GiTripleGate,
} from "react-icons/gi";
import { BiStats } from "react-icons/bi";
import GameBuildingField from "./GameBuildingField";
import BuildingUpgradeCard from "./BuildingUpgradeCard";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modalBox">
      <div className="d-flex flex-wrap justify-content-start h-100">
        <div className="d-flex align-items-start flex-column h-100 w-100 ">
          <h3 className="text-center w-100 mt-5">Hello {props.playersName}!</h3>
          <p className="text-center w-100 mt-4">
            Welcome to the strategy game!
          </p>
          <p className="text-center w-100 mt-4">
            I hope You will enjoy the game and will have a great time!
          </p>
          <p className="d-flex justify-content-around w-50 mt-4 align-items-end mx-auto">
            <GiHut size="2.2em" className="mb-1" />
            <GiVikingLonghouse size="3.2em" className="mb-0" />
            <GiBarracksTent size="3.2em" className="mb-1"/>
            <GiMedievalGate size="3.2em" className="mb-1" />
          </p>
          <div className="mt-auto text-center w-100 mb-3">
            <button
              className="btn btn-success btn-sm px-5 mb-3"
              onClick={props.onCloseModal}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameModal = (props) => {
  const goldProvidedByHut = 10;
  const goldProvidedByHouse = goldProvidedByHut * 20;
  const lumberProvided = 5;
  const stoneProvided = 5;
  const ironProvided = 5;
  const defaultTimeSpeed = 4000; //4000

  const [strengthOfEnemy, setStrengthOfEnemy] = useState(50);
  const [daysTillAttack, setDaysTillAttack] = useState(50);
  const [battlesWon, setBattlesWon] = useState(0);

  const [showGameInfoModal, setGameInfoModal] = useState(false);
  const [showPurchaseMenu, setShowPurchaseMenu] = useState(false);
  const [showBuildingUpgrade, setShowBuildingUpgrade] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const [purchases, setPurchases] = useState([
    {
      id: 1,
      group: "villageBuildings",
      type: "House",
      title: "Hut",
      workersNeeded: 1,
      priceInGold: 50,
      priceInWood: 10,
      priceInStone: 0,
      priceInIron: 0,
      icon1: <GiHut size="3.2em" />,
      icon2: "",
      image: "",
      show: false,
      tooltip: "The Hut lets 20 people live in Your village",
      level1text: `Provides ${goldProvidedByHut} gold per day and 20 living places`,
      level2text: `Provides ${
        goldProvidedByHut * 2
      } gold per day and 40 living places`,
    },
    {
      id: 2,
      group: "villageBuildings",
      type: "Big House",
      title: "House",
      workersNeeded: 10,
      priceInGold: 2000,
      priceInWood: 400,
      priceInStone: 200,
      priceInIron: 100,
      image: "",
      icon1: <GiVikingLonghouse size="3.2em" />,
      icon2: "",
      show: false,
      tooltip: "The Big House lets 200 people live in Your village",
      level1text: `Provides ${goldProvidedByHouse} gold per day and 200 living places`,
      level2text: `Provides ${
        goldProvidedByHouse * 2
      } gold per day and 400 living places`,
    },
    {
      id: 3,
      group: "warBuildings",
      type: "Knights Academy",
      title: "Knights Academy",
      workersNeeded: 10,
      priceInGold: 2000,
      priceInWood: 200,
      priceInStone: 200,
      priceInIron: 200,
      image: "",
      icon1: <GiBarracksTent size="3.2em" />,
      icon2: <GiSwordman size="2.2em" />,
      show: false,
      tooltip: "You will be able to train your villagers to become knights",
      level1text: "Train knights. Knight has 10 defense strength.",
      level2text: "",
    },
    {
      id: 4,
      group: "warBuildings",
      type: "Archers Academy",
      title: "Archers Academy",
      workersNeeded: 30,
      priceInGold: 6000,
      priceInWood: 600,
      priceInStone: 600,
      priceInIron: 600,
      image: "",
      icon1: <GiMedievalPavilion size="3.2em" />,
      icon2: <GiBowman size="2.2em" />,
      show: false,
      tooltip: "You will be able to train your villagers to become archers",
      level1text: "Train archers. Archer has 30 defense strength.",
      level2text: "",
    },
    {
      id: 5,
      group: "resources",
      type: "Lumber Camp",
      title: "Lumber Camp",
      workersNeeded: 2,
      priceInGold: 100,
      priceInWood: 20,
      priceInStone: 0,
      priceInIron: 0,
      image: "",
      icon1: <GiWoodCabin size="3.2em" color="rgb(227, 0, 0)" />,
      icon2: <GiWoodAxe size="2.2em" />,
      show: false,
      tooltip: "The Lumber Camp produces 5 wood every day",
      level1text: "Provides 5 lumber per day",
      level2text: "Provides 10 lumber per day",
    },
    {
      id: 6,
      group: "resources",
      type: "Stone Camp",
      title: "Stone Camp",
      workersNeeded: 4,
      priceInGold: 200,
      priceInWood: 240,
      priceInStone: 0,
      priceInIron: 0,
      image: "",
      icon1: <GiWoodCabin size="3.2em" color="rgb(178 181 171)" />,
      icon2: <GiMining size="2.2em" />,
      show: false,
      tooltip: "The Stone Camp produces 5 stones per day",
      level1text: `Provides 5 stones per day`,
      level2text: "Provides 10 stones per day",
    },
    {
      id: 7,
      group: "resources",
      type: "Metal Camp",
      title: "Metal Camp",
      workersNeeded: 10,
      priceInGold: 400,
      priceInWood: 350,
      priceInStone: 100,
      priceInIron: 0,
      image: "",
      icon1: <GiWoodCabin size="3.2em" color="rgb(19, 139, 1)" />,
      icon2: <GiMetalBar size="2.2em" />,
      show: false,
      tooltip: "The Metal Camp produces 5 Iron per day",
      level1text: "Provides 5 metal bars per day",
      level2text: "Provides 10 metal bars per day",
    },
    {
      id: 8,
      group: "factories",
      type: "Armor forge",
      title: "Armor forge",
      workersNeeded: 5,
      priceInGold: 1000,
      priceInWood: 300,
      priceInStone: 100,
      priceInIron: 100,
      image: "",
      icon1: <GiMedievalGate size="3.2em" />,
      icon2: <GiShoulderArmor size="2.2em" />,
      show: false,
      tooltip: "The Armor forge is needed for Knights and Archers academies",
      level1text:
        "Needed for Knights and Archers Academies. Provides armor for warriors",
      level2text: "",
    },
    {
      id: 9,
      group: "factories",
      type: "Swords forge",
      title: "Swords forge",
      workersNeeded: 5,
      priceInGold: 1000,
      priceInWood: 300,
      priceInStone: 100,
      priceInIron: 100,
      image: "",
      icon1: <GiEgyptianTemple size="3.2em" />,
      icon2: <GiPointySword size="2.2em" />,
      show: false,
      tooltip: "The Swords forge is needed for Knights academy",
      level1text: "Needed for Knights Academy. Provides swords for knights.",
      level2text: "",
    },
    {
      id: 10,
      group: "factories",
      type: "Arrows forge",
      title: "Arrows forge",
      workersNeeded: 5,
      priceInGold: 1000,
      priceInWood: 300,
      priceInStone: 100,
      priceInIron: 100,
      image: "",
      icon1: <GiTripleGate size="3.2em" />,
      icon2: <GiPocketBow size="2.2em" />,
      show: false,
      tooltip: "The Arrows forge is needed for Archers academy",
      level1text:
        "Needed for Archers Academy. Provides arrows and bows for archers.",
      level2text: "",
    },
  ]);
  const [isFieldSelected, setIsFieldSelected] = useState(false);
  const [hasBuilding, setHasBuilding] = useState(false);
  const [buildingAreas, setB] = useState([
    {
      id: 0,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 1,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 2,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 3,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 4,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 5,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 6,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 7,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 8,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 9,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 10,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 11,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 12,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 13,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 14,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 15,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 16,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 17,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 18,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 19,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 20,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 21,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 22,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 23,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 24,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 25,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 26,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 27,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 28,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 29,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 30,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 31,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 32,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 33,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 34,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 35,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 36,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 37,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 38,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 39,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 40,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
    {
      id: 41,
      value: 0,
      selected: false,
      building: -1,
      buildingLevel: 0,
      group: "",
    },
  ]);
  const [selectedInfoTypeId, setSelectedInfoTypeId] = useState(-1);
  const [selectedBuildingType, setSelectedBuildingType] = useState(-1);
  const [selectedBuildingLevel, setSelectedBuildingLevel] = useState(0);
  const [selectedBuildingArea, setSelectedBuildingArea] = useState(0);
  const [selectedBuildingGroup, setSelectedBuildingGroup] = useState();
  const [selectedBuildingTitle, setSelectedBuildingTitle] = useState();
  const [selectedBuildingText, setSelectedBuildingText] = useState();
  const [assets, setAssets] = useState([
    {
      // happinessOfVillagers: 80,
      villagers: 10,
      knights: 0,
      archers: 0,
      lumber: 100,
      stone: 0,
      iron: 0,
      gold: 1000,
      // villagers: 10000,
      // knights: 0,
      // archers: 0,
      // lumber: 10000,
      // stone: 10000,
      // iron: 10000,
      // gold: 900000,
    },
  ]);
  //#region Start

  const buildingNeeded = (buildingType) => {
    switch (buildingType) {
      case 3:
        return [8, 9];
      case 4:
        return [8, 10];
        default:
          return [8, 9];
    }
  };

  const checkIfHasBuilding = (buildingType) => {
    var hasBuilding = false;
    var neededBuilding = buildingNeeded(buildingType);
    var proceedCheck = true;
    neededBuilding.forEach((element) => {
      if (proceedCheck) {
        if (buildingAreas.findIndex((obj) => obj.building === element) >= 0) {
          hasBuilding = true;
        } else {
          proceedCheck = false;
          hasBuilding = false;
        }
      }
    });
    return hasBuilding;
  };
  const onTrainWarriors = (amount) => {
    if (gamePlay === 1) {
      if (selectedBuildingType === 3) {
        setAssets(
          assets.map((asset) => {
            return {
              ...asset,
              knights: asset.knights + amount,
              iron: asset.iron - amount,
              gold: asset.gold - amount * 100,
              villagers: asset.villagers - amount,
            };
          })
        );
      } else {
        setAssets(
          assets.map((asset) => {
            return {
              ...asset,
              archers: asset.archers + amount,
              iron: asset.iron - amount * 3,
              gold: asset.gold - amount * 300,
              villagers: asset.villagers - amount,
            };
          })
        );
      }
    }
  };
  const closePurchaseBox = () => {
    setShowPurchaseMenu(false);
  };

  const setPurchasegroup = (group) => {
    setPurchases(
      purchases.map((purchase) =>
        purchase.group === group
          ? { ...purchase, show: true }
          : { ...purchase, show: false }
      )
    );
    setShowPurchaseMenu(true);
  };

  const deselectField = () => {
    var indexOfSelected = buildingAreas.findIndex(
      (obj) => obj.selected === true
    );
    if (indexOfSelected >= 0) {
      buildingAreas[indexOfSelected].selected = false;
    }
  };

  const handleDeselectFieldEvent = () => {
    deselectField();
    setIsFieldSelected(false);
    closePurchaseBox();
    setHasBuilding(false);
    setSelectedBuildingArea(-1);
  };

  const handleBuildingBuyingEvent = (building) => {
    if (gamePlay === 1) {
      var indexOfSelected = buildingAreas.findIndex(
        (obj) => obj.selected === true
      );
      if (indexOfSelected >= 0) {
        var workersIncrementor = 0;
        if (building.id === 1) {
          workersIncrementor = 20;
        } else if (building.id === 2) {
          workersIncrementor = 200;
        }
        if (
          (building.id === 3 || building.id === 4) &&
          !checkIfHasBuilding(building.id)
        ) {
          return;
        }
        setAssets(
          assets.map((asset) => {
            return {
              ...asset,
              iron: asset.iron - purchases[building.id - 1].priceInIron,
              gold: asset.gold - purchases[building.id - 1].priceInGold,
              lumber: asset.lumber - purchases[building.id - 1].priceInWood,
              stone: asset.stone - purchases[building.id - 1].priceInStone,
              villagers:
                asset.villagers -
                purchases[building.id - 1].workersNeeded +
                workersIncrementor,
            };
          })
        );
        buildingAreas[indexOfSelected].building = building.id;
        buildingAreas[indexOfSelected].group = building.group;
        onClickEventHandler(indexOfSelected);
      }
    }
  };

  const setBuildingTitle = (field) => {
    var indexOfSelectedBuilding;
    if (field >= 0) {
      indexOfSelectedBuilding = buildingAreas[field].building;
    }
    if (indexOfSelectedBuilding >= 0) {
      setSelectedBuildingTitle(purchases[indexOfSelectedBuilding - 1].title);
    }
  };

  const setBuildingText = (field) => {
    var indexOfSelectedBuilding;
    if (field >= 0) {
      indexOfSelectedBuilding = buildingAreas[field].building;
    }
    if (
      indexOfSelectedBuilding >= 0 &&
      buildingAreas[field].buildingLevel === 0
    ) {
      setSelectedBuildingText(
        purchases[indexOfSelectedBuilding - 1].level1text
      );
    } else if (
      indexOfSelectedBuilding >= 0 &&
      buildingAreas[field].buildingLevel === 1
    ) {
      setSelectedBuildingText(
        purchases[indexOfSelectedBuilding - 1].level2text
      );
    }
  };

  const onClickEventHandler = (selectedField) => {
    if (gamePlay === 1) {
      if (buildingAreas[selectedField].building >= 0) {
        setHasBuilding(true);
        setShowBuildingUpgrade(true);
        closePurchaseBox();
        setSelectedBuildingType(buildingAreas[selectedField].building);
        setSelectedBuildingLevel(buildingAreas[selectedField].buildingLevel);
        setSelectedBuildingGroup(buildingAreas[selectedField].group);
      } else {
        setHasBuilding(false);
        setShowBuildingUpgrade(false);
        setSelectedBuildingType(-1);
        setSelectedBuildingLevel(0);
        setSelectedBuildingGroup();
      }
      setSelectedBuildingArea(selectedField);
      setIsFieldSelected(true);
      setB(
        buildingAreas.map((buildingArea) =>
          buildingArea.id === selectedField
            ? { ...buildingArea, selected: true }
            : { ...buildingArea, selected: false }
        )
      );
      setBuildingTitle(selectedField);
      setBuildingText(selectedField);
    }
  };

  const handleGameInfoTypeSelection = (id) => {
    if (id === 3) {
      updateProductionPerDay();
    }
    setSelectedInfoTypeId(id);
    setGameInfoModal(true);
  };

  const onCloseGameInfoModal = () => {
    setGameInfoModal(false);
  };

  const upgradeBuilding = (buildingId) => {
    if (gamePlay === 1) {
      var indexOfSelected = buildingAreas.findIndex(
        (obj) => obj.selected === true
      );
      if (indexOfSelected >= 0) {
        var updatedHousePeople = 0;
        if (buildingId === 1) {
          updatedHousePeople = 20;
        } else if (buildingId === 2) {
          updatedHousePeople = 200;
        }
        setAssets(
          assets.map((asset) => {
            return {
              ...asset,
              iron: asset.iron - purchases[buildingId - 1].priceInIron * 2,
              gold: asset.gold - purchases[buildingId - 1].priceInGold * 2,
              lumber: asset.lumber - purchases[buildingId - 1].priceInWood * 2,
              stone: asset.stone - purchases[buildingId - 1].priceInStone * 2,
              villagers: asset.villagers + updatedHousePeople,
            };
          })
        );
        buildingAreas[indexOfSelected].buildingLevel = 1;
        setSelectedBuildingLevel(1);
        setBuildingText(indexOfSelected);
      }
    }
  };

  const onCloseUpgradeModal = () => {
    setShowBuildingUpgrade(false);
    handleDeselectFieldEvent();
  };

  const onDestroyBuildingHandler = (buildingId) => {
    if (gamePlay === 1) {
      var indexOfSelected = buildingAreas.findIndex(
        (obj) => obj.selected === true
      );
      var villagersCount = 0;
      if (buildingId === 1) {
        villagersCount =
          20 * (buildingAreas[indexOfSelected].buildingLevel + 1);
      } else if (buildingId === 2) {
        villagersCount =
          200 * (buildingAreas[indexOfSelected].buildingLevel + 1);
      }

      if (indexOfSelected >= 0) {
        setAssets(
          assets.map((asset) => {
            return {
              ...asset,
              iron: asset.iron + purchases[buildingId - 1].priceInIron / 2,
              gold: asset.gold + purchases[buildingId - 1].priceInGold / 2,
              lumber: asset.lumber + purchases[buildingId - 1].priceInWood / 2,
              stone: asset.stone + purchases[buildingId - 1].priceInStone / 2,
              villagers:
                asset.villagers +
                (purchases[buildingId - 1].workersNeeded - villagersCount),
            };
          })
        );
        buildingAreas[indexOfSelected].buildingLevel = 0;
        buildingAreas[indexOfSelected].building = -1;
        buildingAreas[indexOfSelected].group = "";
        setHasBuilding(false);
        setShowBuildingUpgrade(false);
        setSelectedBuildingType(-1);
        setSelectedBuildingLevel(0);
        setSelectedBuildingGroup();
      }
    }
  };

  const checkIfEnoughResourcesToBuy = (buildingId, incrementor) => {
    var priceInGold = purchases[buildingId - 1].priceInGold * incrementor;
    var priceInWood = purchases[buildingId - 1].priceInWood * incrementor;
    var priceInIron = purchases[buildingId - 1].priceInIron * incrementor;
    var priceInStone = purchases[buildingId - 1].priceInStone * incrementor;
    var villagersNeeded = purchases[buildingId - 1].workersNeeded * incrementor;
    if (
      priceInGold > assets[0].gold ||
      priceInWood > assets[0].lumber ||
      priceInIron > assets[0].iron ||
      priceInStone > assets[0].stone ||
      villagersNeeded > assets[0].villagers
    ) {
      return false;
    } else {
      return true;
    }
  };

  const checkIfEnoughResourcesToUpgrade = (buildingId, incrementor) => {
    var priceInGold = purchases[buildingId - 1].priceInGold * incrementor;
    var priceInWood = purchases[buildingId - 1].priceInWood * incrementor;
    var priceInIron = purchases[buildingId - 1].priceInIron * incrementor;
    var priceInStone = purchases[buildingId - 1].priceInStone * incrementor;
    if (
      priceInGold > assets[0].gold ||
      priceInWood > assets[0].lumber ||
      priceInIron > assets[0].iron ||
      priceInStone > assets[0].stone
    ) {
      return false;
    } else {
      return true;
    }
  };

  const checkIfCanDestroyHouse = (buildingType, buildingLevel) => {
    var hutPeopleCount = 0;
    var bigHousesPeopleCount = 0;
    var deductor;
    var workersNeeded = 0;
    if (buildingType === 1) {
      deductor = 20 * (buildingLevel + 1);
      workersNeeded = 1;
    } else {
      deductor = 200 * (buildingLevel + 1);
      workersNeeded = 10;
    }
    buildingAreas.map((area) => {
      if (area.building === 1) {
        hutPeopleCount += 20 * (area.buildingLevel + 1);
      }
      if (area.building === 2) {
        bigHousesPeopleCount += 200 * (area.buildingLevel + 1);
      }
      return 1;
    });

    if (
      hutPeopleCount + bigHousesPeopleCount - deductor + workersNeeded <
        assets[0].knights + assets[0].archers ||
      assets[0].villagers - deductor < 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const reload = () => window.location.reload();

  const [countDays, setCountDays] = useState(0);
  const [timeSpeed, setTimeSpeed] = useState(defaultTimeSpeed);

  const countProduction = (buildingId, production) => {
    const building1Lev = buildingAreas.filter(
      (item) => item.building === buildingId && item.buildingLevel === 0
    );
    const building2Lev = buildingAreas.filter(
      (item) => item.building === buildingId && item.buildingLevel === 1
    );

    return (
      building1Lev.length * production + building2Lev.length * production * 2
    );
  };

  const [productionPerDay, setProductionPerDay] = useState([
    {
      lumberPerDay: 0,
      goldPerDay: 0,
      ironPerDay: 0,
      stonePerDay: 0,
    },
  ]);

  const updateProductionPerDay = () => {
    setProductionPerDay(
      productionPerDay.map((products) => {
        return {
          ...products,
          lumberPerDay: countProduction(5, lumberProvided),
          goldPerDay:
            countProduction(1, goldProvidedByHut) +
            countProduction(2, goldProvidedByHouse),
          ironPerDay: countProduction(7, ironProvided),
          stonePerDay: countProduction(6, stoneProvided),
        };
      })
    );
  };
  //#endregion

  const [gamePlay, setGamePlay] = useState(1);

  const checkIfGameWon = () => {
    if (
      assets[0].gold >= 1000000 ||
      assets[0].knights + assets[0].archers >= 10000
    ) {
      handleGameInfoTypeSelection(5);
      setGamePlay(0);
    }
  };

  const updateResources = () => {
    var hutsProduction = countProduction(1, goldProvidedByHut);
    var housesProduction = countProduction(2, goldProvidedByHouse);
    var lumberProduction = countProduction(5, lumberProvided);
    var stoneProduction = countProduction(6, stoneProvided);
    var ironProduction = countProduction(7, ironProvided);

    setAssets(
      assets.map((asset) => {
        return {
          ...asset,
          gold: asset.gold + hutsProduction + housesProduction,
          lumber: asset.lumber + lumberProduction,
          stone: asset.stone + stoneProduction,
          iron: asset.iron + ironProduction,
        };
      })
    );
    setCountDays((prev) => prev + 1);
    setDaysTillAttack((prev) => prev - 1);
  };

  const calculateDefenseStrength = () => {
    return (
      assets[0].knights * 10 + assets[0].archers * 30 + assets[0].villagers
    );
  };

  const [wonBattleGold, setWonBattleGold] = useState(0);
  const [lostBattleGold, setLostBattleGold] = useState(0);
  const [lostBattleKnights, setLostBattleKnights] = useState(0);
  const [lostBattleArchers, setLostBattleArchers] = useState(0);

  const lossesAfterBattle = (statusOfBattle) => {
    if (statusOfBattle === "lost") {
      let severityMultiplier;
      let severityOfLoss =
        strengthOfEnemy / calculateDefenseStrength().toFixed(0);
      if (severityOfLoss > 1.5) {
        severityMultiplier = 0.9;
      } else if (severityOfLoss <= 1.5 && severityOfLoss > 1.25) {
        severityMultiplier = 0.5;
      } else {
        severityMultiplier = 0.25;
      }

      var lostGold =
        assets[0].gold >= 100
          ? parseInt((assets[0].gold * severityMultiplier).toFixed(0), 10)
          : 0;
      setAssets(
        assets.map((asset) => {
          return {
            ...asset,
            gold: asset.gold - lostGold,
            knights: 0,
            archers: 0,
          };
        })
      );
      setLostBattleKnights(assets[0].knights);
      setLostBattleArchers(assets[0].archers);
      handleGameInfoTypeSelection(8);
      setLostBattleGold(lostGold);
    } else {
      let earnedGold = calculateDefenseStrength() - strengthOfEnemy;
      let severityMultiplierKnights;
      let severityMultiplierArchers;
      let severityOfWin = (
        calculateDefenseStrength() / strengthOfEnemy
      ).toFixed(2);
      let wonBattleLostKnights;
      let wonBattleLostArchers;

      if (severityOfWin >= 2) {
        severityMultiplierKnights = 0;
        severityMultiplierArchers = 0;
      } else if (severityOfWin >= 1.5 && severityOfWin < 2) {
        severityMultiplierKnights = 0.25;
        severityMultiplierArchers = 0.12;
      } else {
        severityMultiplierKnights = 0.5;
        severityMultiplierArchers = 0.25;
      }

      wonBattleLostKnights = (
        assets[0].knights * severityMultiplierKnights
      ).toFixed(0);
      wonBattleLostArchers = (
        assets[0].archers * severityMultiplierArchers
      ).toFixed(0);

      setAssets(
        assets.map((asset) => {
          return {
            ...asset,
            gold: asset.gold + earnedGold,
            knights: asset.knights - wonBattleLostKnights,
            archers: asset.archers - wonBattleLostArchers,
          };
        })
      );
      setWonBattleGold(earnedGold);
      setLostBattleKnights(wonBattleLostKnights);
      setLostBattleArchers(wonBattleLostArchers);
      handleGameInfoTypeSelection(7);
    }
  };

  const checkIfWonBattle = () => {
    if (strengthOfEnemy > calculateDefenseStrength() * 2) {
      //lost the game
      handleGameInfoTypeSelection(6);
      setGamePlay(0);
      return;
    }
    if (strengthOfEnemy > calculateDefenseStrength()) {
      // lost the battle
      lossesAfterBattle("lost");
    } else {
      // won the battle
      setBattlesWon((prev) => prev + 1);
      lossesAfterBattle("won");
    }
  };

  const checkIfEnemyAttackDay = () => {
    if (daysTillAttack <= 2) {
      setGamePlay(0);
      checkIfWonBattle();
    }
  };

  const initGameGoing = () => {
    updateResources();
    checkIfEnemyAttackDay();
    checkIfGameWon();
  };

  const calculateStrengthOfEnemy = () => {
    if (countDays <= 1) {
      setStrengthOfEnemy(50);
    } else {
      let strength =
        countDays * (countDays / 4).toFixed(0) +
        parseInt((Math.random() * 100).toFixed(0), 10);
      setStrengthOfEnemy(strength);
    }
  };

  const calculateDaysTillAttack = () => {
    var customAdditionalDays = 10;
    if (countDays <= 1) {
      setDaysTillAttack(50);
    } else {
      var daysTillAttackCalculated =
        parseInt((Math.random() * 100).toFixed(0), 10) + customAdditionalDays;
      setDaysTillAttack(daysTillAttackCalculated);
    }
  };

  const startTheGame = () => {
    setGamePlay(1);
    setCountDays(1);
    calculateStrengthOfEnemy();
    calculateDaysTillAttack();
  };

  useEffect(() => {
    if (countDays <= 0) {
      return;
    }

    if (gamePlay === 1) {
      const id = setInterval(initGameGoing, timeSpeed);
      return () => clearInterval(id);
    }
  }, [countDays, assets, gamePlay, timeSpeed]);

  const handleDefaultTimeSpeed = () => {
    setTimeSpeed(defaultTimeSpeed);
  };

  const handleDoubleTimeSpeed = () => {
    setTimeSpeed(defaultTimeSpeed / 2);
  };

  const proceedWithTheGame = () => {
    setGameInfoModal(false);
    setGamePlay(1);
    calculateStrengthOfEnemy();
    calculateDaysTillAttack();
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    startTheGame();
  };

  return (
    <div className="containerModal gameModal">
      {showWelcomeModal && (
        <React.Fragment>
          {ReactDOM.createPortal(
            <Backdrop onCloseModal={handleCloseWelcomeModal} />,
            document.getElementById("backdrop-root")
          )}
          {ReactDOM.createPortal(
            <ModalOverlay
              onCloseModal={handleCloseWelcomeModal}
              playersName={props.playersName}
            />,
            document.getElementById("modal-root")
          )}{" "}
        </React.Fragment>
      )}
      {showGameInfoModal && (
        <div className="gameInfoModal">
          <GameInfoModal
            selectedInfoTypeId={selectedInfoTypeId}
            battlesWon={battlesWon}
            warriors={assets}
            onCloseModal={onCloseGameInfoModal}
            productionPerDay={productionPerDay}
            gamePlay={gamePlay}
            onPlayAgain={props.onExitGame}
            onExitGame={reload}
            daysTillAttack={daysTillAttack}
            strengthOfEnemy={strengthOfEnemy}
            proceedGame={proceedWithTheGame}
            wonBattleGold={wonBattleGold}
            lostBattleGold={lostBattleGold}
            lostBattleKnights={lostBattleKnights}
            lostBattleArchers={lostBattleArchers}
          />
        </div>
      )}
      <NavBar
        assets={assets}
        days={countDays}
        onSetDefaultTimeSpeed={handleDefaultTimeSpeed}
        onSetDoubleTimeSpeed={handleDoubleTimeSpeed}
      />
      <div className="gameContainer">
        <div className="leftGameSide">
          {showBuildingUpgrade && (
            <BuildingUpgradeCard
              handleClickEvent={handleDeselectFieldEvent}
              selectedBuildingType={selectedBuildingType}
              selectedBuildingLevel={selectedBuildingLevel}
              selectedBuildingGroup={selectedBuildingGroup}
              selectedBuildingText={selectedBuildingText}
              buildingArea={selectedBuildingArea}
              onUpgrade={upgradeBuilding}
              onCloseModal={onCloseUpgradeModal}
              onDestroyBuilding={onDestroyBuildingHandler}
              onTrainWarriors={onTrainWarriors}
              assets={assets}
              checkIfHasBuilding={checkIfHasBuilding}
              checkForResources={checkIfEnoughResourcesToBuy}
              checkForResourcesToUpgrade={checkIfEnoughResourcesToUpgrade}
              checkIfCanDestroyHouse={checkIfCanDestroyHouse}
              buildingTitle={selectedBuildingTitle}
              building={purchases[selectedBuildingType - 1]}
            />
          )}
          {!showPurchaseMenu && !showBuildingUpgrade && (
            <TutorialBox handleClickEvent={handleDeselectFieldEvent} />
          )}
          {showPurchaseMenu && (
            <PurchaseMenuBox
              purchases={purchases}
              onClose={closePurchaseBox}
              onBuild={handleBuildingBuyingEvent}
              onCheckIfHasBuildings={checkIfHasBuilding}
              selectedBuildingArea={selectedBuildingArea}
              checkForResources={checkIfEnoughResourcesToBuy}
            />
          )}
          <div className="btnsCluster">
            <div className="d-flex flex-wrap">
              <button
                className="btn btn-dark btn-sm m-1"
                disabled={!isFieldSelected || hasBuilding}
                onClick={() => setPurchasegroup("resources")}
              >
                <GiAxeInStump size="1.5em" />
              </button>
              <button
                className="btn btn-dark btn-sm m-1"
                disabled={!isFieldSelected || hasBuilding}
                onClick={() => setPurchasegroup("villageBuildings")}
              >
                <GiHouse size="1.5em" />
              </button>
              <button
                className="btn btn-dark btn-sm m-1"
                disabled={!isFieldSelected || hasBuilding}
                onClick={() => setPurchasegroup("warBuildings")}
              >
                <GiSwordsEmblem size="1.5em" />
              </button>
              <button
                className="btn btn-dark btn-sm m-1"
                disabled={!isFieldSelected || hasBuilding}
                onClick={() => setPurchasegroup("factories")}
              >
                <GiFactory size="1.5em" />
              </button>
              <button
                className="btn btn-dark btn-sm m-1"
                data-delay-show="400"
                data-tip="Any enemies nearby?"
                onClick={() => handleGameInfoTypeSelection(1)}
              >
                <GiCrossedSwords size="1.5em" />
              </button>
              <button
                className="btn btn-dark btn-sm m-1"
                data-delay-show="400"
                data-tip="Your game status"
                onClick={() => handleGameInfoTypeSelection(2)}
              >
                <FaTrophy size="1.5em" />
              </button>
              <button
                className="btn btn-dark btn-sm m-1"
                data-delay-show="400"
                data-tip="Settings"
                onClick={() => handleGameInfoTypeSelection(4)}
              >
                <FaWhmcs size="1.5em" />
              </button>
              <button
                className="btn btn-dark btn-sm m-1"
                data-delay-show="400"
                data-tip="Your Stats"
                onClick={() => handleGameInfoTypeSelection(3)}
              >
                <BiStats size="1.5em" />
              </button>
            </div>
            <div className="d-flex justify-content-center align-content-end exit-game-btn-box">
              <button
                className="btn btn-danger btn-sm"
                onClick={props.onShowExitModal}
              >
                Exit game
              </button>
            </div>
          </div>
        </div>
        <div className="rightGameSide">
          <GameBuildingField
            buildingAreas={buildingAreas}
            onClickEventHandler={onClickEventHandler}
          />
        </div>
        <div className="w-100 strategy-game-author-text">
          <p className="text-center">
            Strategy Game created by Gvidas Pilelis ©2021
          </p>
        </div>
      </div>
    </div>
  );
};
export default GameModal;
