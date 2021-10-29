import React from "react";

const AskIfExitModal = ({onGetAnswer}) => {

  const onSetAnswer = (answer) => {
    onGetAnswer(answer);
  };

  return (
    <div className="askUserBox">
      <div className="d-flex flex-wrap justify-content-center">
        <label className="p-4">
          Do you really want to exit the game? (All your achievements will be
          lost)
        </label>
        <br />
        <br />
        <button
          type="button"
          className="m-4 btn btn-primary btn-sm "
          onClick={() => onSetAnswer(true)}
        >
          Yes
        </button>
        <button
          type="button"
          className="m-4 btn btn-dark btn-sm "
          onClick={() => onSetAnswer(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default AskIfExitModal;
