const ChoiceButton = ({ artistName, handleClick }) => {
  return <input type="button" onClick={handleClick} value={artistName}></input>;
};

export default ChoiceButton;
