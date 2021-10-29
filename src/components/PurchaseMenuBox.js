import Purchase from "./Purchase";
import { useState, useEffect } from "react";
const PurchaseMenuBox = (props) => {
  const [canBuildArchersAcademy, setCanBuildArchersAcademy] = useState(true);
  const [canBuildKnightsAcademy, setCanBuildKnightsAcademy] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [enoughResources, setEnoughResources] = useState(true);
  const [selectedPurchase, setSelectedPurchase] = useState(-1);

  const closePurchaseBox = () => {
    props.onClose();
  };

  const checkIfEnoughResources = (buildingId) => {
    return props.checkForResources(buildingId, 1);
  };
  const setBuildingPurchased = (building) => {
    setSelectedPurchase(building.id);
    if (building.id === 3) {
      setCanBuildArchersAcademy(true);
      if (!props.onCheckIfHasBuildings(building.id)) {
        setErrorMessage("Firstly build Armor and Swords Forges");
        setCanBuildKnightsAcademy(false);
      }
    }

    if (building.id === 4) {
      if (!props.onCheckIfHasBuildings(building.id)) {
        setErrorMessage("Firstly build Armor and Arrows Forges");
        setCanBuildArchersAcademy(false);
      } 
        setCanBuildKnightsAcademy(true);
    }

    if (checkIfEnoughResources(building.id)) {
      props.onBuild(building);
      setEnoughResources(true);
    } else {
      setEnoughResources(false);
    }
  };

  useEffect(() => {
    setErrorMessage("");
    setEnoughResources(true);
    setCanBuildArchersAcademy(true);
    setCanBuildKnightsAcademy(true);
  }, [props.selectedBuildingArea, props.purchases]);

  const errorMessages = (purchaseId) => {
    return (
      <div>
        {!canBuildArchersAcademy && selectedPurchase === purchaseId && (
          <div className={`errorMessage mx-3 my-1`}>{errorMessage}</div>
        )}
        {!canBuildKnightsAcademy && selectedPurchase === purchaseId && (
          <div className={`errorMessage mx-3 my-1`}>{errorMessage}</div>
        )}
        {!enoughResources && selectedPurchase === purchaseId && (
          <div className={`errorMessage mx-3`}>Not enough resources</div>
        )}
      </div>
    );
  };

  return (
    <div className="leftUpperBox d-flex flex-wrap p-2">
      {(!canBuildArchersAcademy ||
        !enoughResources ||
        !canBuildKnightsAcademy) && <div className="w-100"></div>}

      <div className="tutorialBoxText w-100">
        {props.purchases.map((purchase) => (
          <div key={purchase.id}>
            {errorMessages(purchase.id)}
            <Purchase
              onClick={setBuildingPurchased}
              purchase={purchase}
            ></Purchase>
          </div>
        ))}
      </div>

      <div className="tutorialBoxTextNav d-flex w-100 justify-content-end align-items-end">
        <button
          className="introBtnPrevious btn btn-dark btn-sm mr-3"
          onClick={closePurchaseBox}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PurchaseMenuBox;
