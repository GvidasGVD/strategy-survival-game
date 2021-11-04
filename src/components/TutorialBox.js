import React from "react";
import { useState } from "react";
import { GiCrossedSwords, GiSandsOfTime, GiBrokenShield, GiBowman, GiRomanToga} from "react-icons/gi";
import { FaTrophy } from "react-icons/fa";
import { WiSunrise } from "react-icons/wi";


const TutorialBox = (props) => {
  const iconSize = window.innerWidth < 500 || window.innerHeight < 500 ? "1.4em": "2.5em";
  const tutorialBoxTexts = [
    {
      text: "Be aware that any time enemies can attack You! You can check for any nearby enemies by clicking: ",
      image: <GiCrossedSwords size={iconSize} color="grey" />,
    },
    {
      text: "If You are curious of your achievements, You can check Your current game status by clicking: ",
      image: <FaTrophy size={iconSize} color="grey" />,
    },
    {
      text: "If Enemy is stronger than You more than twice, You will be defeated!",
      image: <GiBrokenShield size={iconSize} color="grey" />,
    },
    {
      text: "Your villagers can defend the Village too! Each villager has the defense strength of 1",
      image: <GiRomanToga size={iconSize} color="grey" />,
    },
    {
      text: "Archers are 3 times stronger than knights and more often survive the battles",
      image: <GiBowman size={iconSize} color="grey" />,
    },
    {
      text: "You can control the game speed by choosing the tempo of the game in the upper navigation bar",
      image: <GiSandsOfTime size={iconSize} color="grey" />,
    },
    {
      text: "The game success depends only on You! Believe in Yourself and never give up!",
      image: <WiSunrise size={iconSize} color="grey" />,
    },
  ];
  const [state, setState] = useState(() => 0);
  const [tutorialBoxText, setTutorialBoxText] = useState(
    tutorialBoxTexts[0].text
  );
  const [tutorialBoxImage, setTutorialBoxImage] = useState(
    tutorialBoxTexts[0].image
  );

  function toggleTutorialText(val) {
    if(state <= 0 && val < 0) {
      setTutorialBoxText(tutorialBoxTexts[tutorialBoxTexts.length - 1].text)
      setTutorialBoxImage(tutorialBoxTexts[tutorialBoxTexts.length - 1].image)
      setState(tutorialBoxTexts.length - 1);
      return
    }
    if(state >= tutorialBoxTexts.length - 1 && val > 0){
      setTutorialBoxText(tutorialBoxTexts[0].text)
      setTutorialBoxImage(tutorialBoxTexts[0].image)
      setState(0);
      return
    }
    setState(state + val);
    setTutorialBoxText(tutorialBoxTexts[state + val].text)
    setTutorialBoxImage(tutorialBoxTexts[state + val].image)
  }

  const handleClickEvent = () => {
    props.handleClickEvent();
  }
  return (
    <div className="leftUpperBox d-flex flex-wrap p-2" onClick={handleClickEvent}>
      <div className="tutorialBoxText w-100">
        <p className="tutorialBoxTextField text-center">{tutorialBoxText}</p>
        <p className="text-center">{tutorialBoxImage}</p>
      </div>
      <div className="tutorialBoxTextNav d-flex w-100 justify-content-end align-items-end">
        <button
          className="introBtnPrevious tutorial-intro-btn-previous btn btn-dark btn-sm"
          onClick={() => toggleTutorialText(-1)}
        >
          &laquo;
        </button>
        <button
          className="introBtnPrevious tutorial-intro-btn-next btn btn-dark btn-sm"
          onClick={() => toggleTutorialText(+1)}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default TutorialBox;
