import Timer from "./Timer";
import ChoiceButton from "./ChoiceButton";
import { useEffect, useState } from "react";
const GameUI = ({
  correctArt,
  roundCounter,
  setAnswerChosen,
  roundArt,
  roundHistory,
  setRoundHistory,
}) => {
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    let timerInterval;
    function startTimer() {
      timerInterval = setInterval(incrementTimer, 1000);
    }

    function incrementTimer() {
      setTimer((timer) => timer - 1);
    }

    startTimer();

    function endTimer() {
      clearInterval(timerInterval);
      setTimer(0);
    }

    return () => {
      endTimer();
    };
  }, []);

  function answerHandle(valid) {
    const newRoundHistory = [...roundHistory];
    if (valid) {
      newRoundHistory[roundCounter - 1] = "✔";
    } else {
      newRoundHistory[roundCounter - 1] = "❌";
    }
    setRoundHistory(newRoundHistory);
    setAnswerChosen(true);
  }

  useEffect(() => {
    if (timer === 0) {
      answerHandle(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, setAnswerChosen]);

  const handleClick = (e) => {
    if (e.target.value === correctArt.artistDisplayName) {
      console.log("correct!", e.target.value);
      answerHandle(true);
    } else {
      console.log("wrong!", e.target.value);
      answerHandle(false);
    }
  };

  const artButtons = roundArt.map((art, index) => {
    return (
      <ChoiceButton
        key={art.artistDisplayName + index}
        artistName={art.artistDisplayName}
        handleClick={handleClick}
      />
    );
  });

  return (
    <div className="gameui-container">
      <Timer timer={timer}></Timer>
      <div className="multiple-choice">{artButtons}</div>
    </div>
  );
};

export default GameUI;
