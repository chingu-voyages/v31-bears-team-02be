const GameLanding = ({ setGameStarted, gameStarted }) => {
  function toggleStart() {
    setGameStarted((state) => !state);
  }
  return (
    <div className="game-landing-container">
      <div className="game-landing">
        <div className="how-to-play">
          <h2>How to play</h2>
          <ul>
            <li>Each game consists of ten rounds.</li>
            <li>Each round you will be shown an artwork or artifact.</li>
            <li>
              You will be asked to guess the date or artist for each art piece.
            </li>
            <li>
              You will have multiple choices displayed to you to select as an
              answer.
            </li>
            <li>You have to answer within the time limit.</li>
            <li>Each correct answer will be added to your score.</li>
            <li>
              After each answer, you can take your time to explore the artwork
              in detail and go through its information before continuing to the
              next guessing round.
            </li>
          </ul>
        </div>
        <div className="demo-image">
          <img src="https://i.imgur.com/Pk51a30.jpg" alt="" />
        </div>

        <div className="button-container">
          <button onClick={toggleStart}>Start!</button>
        </div>
      </div>
    </div>
  );
};

export default GameLanding;
