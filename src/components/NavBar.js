import ReactTooltip from "react-tooltip";
import {
  GiTwoCoins,
  GiMetalBar,
  GiWoodPile,
  GiStoneStack,
  GiSwordman,
  GiBowman,
  GiRomanToga,
} from "react-icons/gi";

import React from "react";

export const NavBar = (props) => {
  return (
    <div>
      <ReactTooltip place="bottom" delayUpdate={1000} />
      <div className="navBar">
        {/* <span data-delay-show="400" data-tip="Happiness of your people">
          <FaRegGrinBeam size="1.2em" /> {props.assets[0].happinessOfVillagers}%
        </span> */}
        <div className="nav-bar-people-block">
          <span
            className="nav-bar-people"
            data-delay-show="400"
            data-tip="Villagers"
          >
            <GiRomanToga size="1.2em" /> {props.assets[0].villagers}
          </span>
          <span
            className="nav-bar-people"
            data-delay-show="400"
            data-tip="Knights"
          >
            <GiSwordman size="1.2em" />
            {props.assets[0].knights}
          </span>
          <span
            className="nav-bar-people"
            data-delay-show="400"
            data-tip="Archers"
          >
            <GiBowman size="1.2em" />
            {props.assets[0].archers}
          </span>
        </div>
        <div className="nav-bar-time">
          {" "}
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="option1"
            autoComplete="off"
            defaultChecked
          />
          <label
            className="btn btn-secondary mx-3"
            htmlFor="option1"
            data-delay-show="400"
            data-tip="Set to default time speed"
            onClick={props.onSetDefaultTimeSpeed}
          >
            x 1
          </label>
          <div className="nav-bar-time-days w-100">
            <span className="w-50 pl-1 nav-bar-time-days-label">Days</span>
            <span className="w-50 nav-bar-time-days-number pr-1">
              {props.days}
            </span>
          </div>
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="option2"
            autoComplete="off"
          />
          <label
            className="btn btn-secondary mx-3"
            htmlFor="option2"
            data-delay-show="400"
            data-tip="Set double time speed"
            onClick={props.onSetDoubleTimeSpeed}
          >
            x 2
          </label>
        </div>
        <div className="nav-bar-resources-block">
          <span
            className="nav-bar-resources"
            data-delay-show="400"
            data-tip="Lumber"
          >
            <GiWoodPile size="1.5em" color="rgb(236 171 51)" />
            {props.assets[0].lumber}
          </span>
          <span
            className="nav-bar-resources"
            data-delay-show="400"
            data-tip="Stone"
          >
            <GiStoneStack size="1.5em" color="grey" />
            {props.assets[0].stone}
          </span>
          <span
            className="nav-bar-resources"
            data-delay-show="400"
            data-tip="Iron"
          >
            <GiMetalBar size="1.2em" />
            {props.assets[0].iron}
          </span>
          <span
            className="nav-bar-resources"
            data-delay-show="400"
            data-tip="Gold"
          >
            <GiTwoCoins size="1.2em" color="yellow" />
            {props.assets[0].gold}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
