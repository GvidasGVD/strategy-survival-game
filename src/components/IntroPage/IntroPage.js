import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";

const IntroPage = ({ playersName, onGotIt }) => {
  const introTexts = [
    `In this strategy game You will be able to show your strategy skills! Build or destroy buildings, train villagers to become warriors to defend your Village. \nTo win the game You need to collect 1,000,000 gold, or to train 10,000 warriors. \nEvery Hut and House will provide you some gold as well as every won battle. \nBe aware of the enemies and be prepared for every siege.`,
    `Hope You will enjoy and win the game! \nSo, good luck to You ${playersName}! \n P.S. Please do not hesitate to write me if any errors occured during the game, or if You have any suggestions to improve the game. You can write me gvidaspilelis@gmail.com or find me on: `,
    `Special Thank You goes to: "React Icons" for the icons from the "game icons" project, license CC BY 3.0, for the icons from the "atisawd/boxicons"    project, license CC BY 4.0 License, for the icons from the "fontawesome" project license CC BY 4.0 License, "Weateher Icons" for the icons, license SIL OFL 1.1.`,
  ];
  const [introText, setIntroText] = useState(introTexts[0]);
  const [state, setState] = useState(0);
  const [existsPreviousText, setExistancePrevText] = useState(false);
  const [existsNextText, setExistanceNextText] = useState(true);
  const [showPreviousBtn, setShowPreviousBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);

  function toggleIntroText(val) {
    if (state <= 0 && val < 0) {
      setExistancePrevText(false);
      return;
    }
    if (state >= introTexts.length - 1 && val > 0) {
      setExistanceNextText(false);
      return;
    }
    if (state + val === 0) {
      setExistancePrevText(false);
      setShowPreviousBtn(false);
      setShowNextBtn(true);
    } else {
      setExistancePrevText(true);
      setShowPreviousBtn(true);
      setShowNextBtn(true);
    }

    if (state + val === 2) {
      setExistanceNextText(false);
      setShowPreviousBtn(true);
      setShowNextBtn(false);
    } else {
      setExistanceNextText(true);
    }

    setState(state + val);
    setIntroText(introTexts[state + val]);
  }

  function NewlineText(props) {
    const text = props.text;
    return text.split("\n").map((str) => <p key={Math.random()}>{str}</p>);
  }

  return (
    <div className="containerModal tutorialModal">
      <div className="introImage">
        <img
          src="https://gvidasgvd.github.io/strategy-survival-game/images/introPersonImg.PNG"
          alt="Ancient person drawing"
        />
        {/* <img alt="Ancient person drawing" /> */}
      </div>
      <div className="introTextBox d-flex justify-content-end align-content-between flex-wrap p-4">
        <div className="d-flex flex-wrap w-100 text-align-center ">
          <h3 className="pl-5 w-100">Hello {playersName},</h3>
          <div className="mt-4 introTextField">
            <NewlineText text={introText} />
            {state === 1 ? (
              <div>
                <a
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin
                    size="3.2em"
                    color="blue"
                    className="linkedin-link"
                  />
                </a>
                <div className="d-flex flex-nowrap mt-3 white-text align-items-center">
                  <p className='other-works-text my-auto'>You can find my other works here:</p>
                  <div className="GP-link-box ml-3">
                    <a
                      href="https://gvidasgvd.github.io/portfolioPage.github.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="GP-link"
                    >
                      GP
                    </a>
                  </div>{" "}
                </div>
              </div>
            ) : null}
            {state === 2 ? (
              <div className="d-flex flex-wrap">
                <p className="mt-3 white-text w-100">Links: </p>
                <br></br>
                <a
                  className="icons-links"
                  href="https://react-icons.github.io/react-icons/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://react-icons.github.io/react-icons/
                </a>
                <a
                  className="icons-links"
                  href="https://game-icons.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://game-icons.net/
                </a>
                <a
                  className="icons-links"
                  href="https://github.com/atisawd/boxicons"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/atisawd/boxicons
                </a>
                <a
                  className="icons-links"
                  href="https://fontawesome.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://fontawesome.com/
                </a>
                <a
                  className="icons-links"
                  href="https://erikflowers.github.io/weather-icons/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://erikflowers.github.io/weather-icons/
                </a>
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-auto">
          {showPreviousBtn && (
            <button
              className="introBtnPrevious btn btn-dark mr-1"
              onClick={() => toggleIntroText(-1)}
              disabled={!existsPreviousText}
            >
              Previous
            </button>
          )}
          {showNextBtn && (
            <button
              className="introBtnNext btn btn-dark mx-1"
              onClick={() => toggleIntroText(+1)}
              disabled={!existsNextText}
            >
              Next
            </button>
          )}

          <button className="btn btn-dark btn-sm ml-1 mt-0" onClick={onGotIt}>
            {" "}
            Got it!{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

IntroPage.defaultProps = {
  playersName: "Nice Player",
};

export default IntroPage;
