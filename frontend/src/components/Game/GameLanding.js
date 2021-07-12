const GameLanding = ({ setGameStarted, setRoundCounter }) => {
  function toggleStart() {
    setGameStarted((state) => !state);
    // setRoundCounter((round) => round + 1);
  }

  return (
    <div className="game-landing">
      <div className="button-container">
        <button
          className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={toggleStart}
        >
          Start!
        </button>
      </div>
      <div className="how-to-play">
        <h2 className="text-4xl font-normal leading-normal mt-0 mb-2 text-black-800">
          How to play
        </h2>
        <ul>
          <li className="text-lg font-light  text-black-800">
            Each game consists of ten rounds.
          </li>
          <li className="text-lg font-light  text-black-800">
            Each round you will be shown an artwork or artifact.
          </li>
          <li className="text-lg font-light  text-black-800">
            You will be asked to guess the date or artist for each art piece.
          </li>
          <li className="text-lg font-light  text-black-800">
            You will have multiple choices displayed to you to select as an
            answer.
          </li>
          <li className="text-lg font-light  text-black-800">
            You have to answer within the time limit.
          </li>
          <li className="text-lg font-light  text-black-800">
            Each correct answer will be added to your score.
          </li>
          <li className="text-lg font-light  text-black-800">
            After each answer, you can take your time to explore the artwork in
            detail and go through its information before continuing to the next
            guessing round.
          </li>
        </ul>
      </div>
      <div className="demo-image">
        <img src="/images/demo-game.gif" alt="" />
      </div>
    </div>
  );
};

export default GameLanding;
