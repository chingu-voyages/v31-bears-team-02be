import Timer from "./Timer";
import RoundCounter from "./RoundCounter";
import ChoiceButton from "./ChoiceButton";
import { useEffect, useState } from "react";
const GameUI = ({
  correctArt,
  roundCounter,
  setRoundCounter,
  setAnswerChosen,
  answerChosen,
  setArt,
  roundArt,
  roundHistory,
  setRoundHistory,
}) => {
  const [timer, setTimer] = useState(10);

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

  useEffect(() => {
    if (timer === 0) {
      setAnswerChosen(true);
      const newRoundHistory = [...roundHistory];
      newRoundHistory[roundCounter - 1] = "❌";
      setRoundHistory(newRoundHistory);
    }
  }, [timer, setAnswerChosen]);

  const handleClick = (e) => {
    if (e.target.value === correctArt.artistDisplayName) {
      console.log("correct!", e.target.value);

      // replace roundHistory[roundCounter] with 'correct'
      const newRoundHistory = [...roundHistory];
      newRoundHistory[roundCounter - 1] = "✔";
      setRoundHistory(newRoundHistory);
    } else {
      console.log("wrong!", e.target.value);
      // replace roundHistory[roundCounter] with 'wrong'
      const newRoundHistory = [...roundHistory];
      newRoundHistory[roundCounter - 1] = "❌";
      setRoundHistory(newRoundHistory);
    }
    setAnswerChosen((answer) => !answer);
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
      <RoundCounter roundCounter={roundCounter}></RoundCounter>
    </div>
  );
};

export default GameUI;
