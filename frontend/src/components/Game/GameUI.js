import Timer from "./Timer";
import ChoiceButton from "./ChoiceButton";

const GameUI = ({
  correctArt,
  roundCounter,
  setAnswerChosen,
  roundArt,
  roundHistory,
  setRoundHistory,
}) => {
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
      <Timer answerHandle={answerHandle}></Timer>
      <div className="multiple-choice">{artButtons}</div>
    </div>
  );
};

export default GameUI;
