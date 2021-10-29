import { useState } from "react";
import "./App.scss";
import AskNameModal from "./components/IntroPage/AskNameModal";
import IntroPage from "./components/IntroPage/IntroPage";
import GameModal from "./components/GameModal";
import AskIfExitModal from "./components/AskIfExitModal";


function App() {
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [showGameModal, setShowGameModal] = useState(false);
  const [showAskNameModal, setAskNameModal] = useState(true);
  const [playersName, setPlayersName] = useState('Nice Player');
  const [showAskIfExitModal, setShowExitModal] = useState(false);
  // Get/Set Player's Name
  const setName = (player) => {
    var name = '';
    !player.playersName || player.playersName.trim().length === 0?name = 'Nice Player':name = player.playersName; 
    setPlayersName(name);
  }

  const handleExitGame = () => {
    setShowIntroModal(!showIntroModal);
    setShowGameModal(!showGameModal);
  }

  return (
    <div className='h-100'>
      {showAskNameModal && (
      <div className="askUserSomeInfoModal">
        <AskNameModal onGetName={(player) => {
          setName(player);
          setAskNameModal(false)
          }}/>
      </div>)}
      {showAskIfExitModal && (
        <div className="askUserSomeInfoModal">
          <AskIfExitModal onGetAnswer={(answer) => {
            setShowExitModal(false)
            if(answer){
              setShowIntroModal(!showIntroModal);
              setShowGameModal(!showGameModal);
            }
          }} />
        </div>)}
      <div className="mainPage">
        {showIntroModal && (
          <IntroPage
            playersName={playersName}
            onGotIt={() => {
              setShowIntroModal(!showIntroModal);
              setShowGameModal(!showGameModal);
            }}
          />
        )}
        {showGameModal && (
          <GameModal
            onShowExitModal={() => {
              setShowExitModal(true)
            }}
            onExitGame={handleExitGame}
            playersName={playersName}
          />
        )}
        <div className="containerModal lostGameModal d-none">
          <button className="btn btn-dark btn-sm">Start</button>
        </div>
      </div>
    </div>
  );
}

export default App;
