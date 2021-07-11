const ChoiceButton = ({ artistName, handleClick }) => {
  return (
    // <input
    //   className="choice-button"
    //   type="button"
    //   onClick={handleClick}
    //   value={artistName}
    // ></input>
    <button
      onClick={handleClick}
      className="choice-button h-12 bg-transparent border border-solid font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      value={artistName}
    >
      {artistName.length > 60
        ? artistName.substring(0, 60) + "..."
        : artistName}
    </button>
  );
};

export default ChoiceButton;
