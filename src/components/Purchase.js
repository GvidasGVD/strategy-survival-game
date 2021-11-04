import ReactTooltip from "react-tooltip";
import {
  GiTwoCoins,
  GiMetalBar,
  GiWoodPile,
  GiStoneStack,
  GiRomanToga,
} from "react-icons/gi";
const Purchase = (props) => {
  const clickHandler = () => {
    props.onClick(props.purchase);
  };

  return (
    <div>
      {props.purchase.show && (
        <div
          onClick={clickHandler}
          className="d-flex flex-wrap pt-2 px-2 pb-1 mx-3 my-2 purchase-box"
        >
          <ReactTooltip place="bottom" delayUpdate={1000} />
          <div className="w-50 my-auto">
            <div className="d-flex flex-wrap w-100 justify-content-center mb-1">
              <span data-delay-show="100" data-tip={props.purchase.tooltip}>
                {props.purchase.icon1}
              </span>
              <span>{props.purchase.icon2}</span>

              <p className="w-100 text-center p-1 purchase-title mb-0">
                {props.purchase.title}
              </p>
            </div>
            <span
              className="w-100 text-center"
              data-delay-show="100"
              data-tip={props.purchase.tooltip}
            >
              {props.purchase.text}
            </span>
          </div>
          <div className="w-50 my-auto">
            <div className="d-flex justify-content-around text-center w-100">
              <span data-delay-show="400" data-tip="Villagers">
                <GiRomanToga size="1.2em" /> {props.purchase.workersNeeded}
              </span>
              <span data-delay-show="400" data-tip="Gold">
                <GiTwoCoins size="1.2em" color="yellow" />{" "}
                {props.purchase.priceInGold}
              </span>
            </div>
            <div className="d-flex justify-content-around text-center w-100 mt-2">
              <span data-delay-show="400" data-tip="Lumber">
                <GiWoodPile size="1.5em" color="rgb(236 171 51)" />{" "}
                {props.purchase.priceInWood}
              </span>
              {props.purchase.priceInStone ? (
                <span data-delay-show="400" data-tip="Stone">
                  <GiStoneStack size="1.5em" color="grey" />{" "}
                  {props.purchase.priceInStone}
                </span>
              ) : null}
              {props.purchase.priceInIron ? (
                <span data-delay-show="400" data-tip="Iron">
                  <GiMetalBar size="1.2em" /> {props.purchase.priceInIron}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
