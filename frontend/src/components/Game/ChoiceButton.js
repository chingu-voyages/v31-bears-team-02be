const ChoiceButton = ({ artistName, handleClick }) => {
  return (
    <input
      className="choice-button"
      type="button"
      onClick={handleClick}
      value={artistName}
    ></input>
  );
};

export default ChoiceButton;
