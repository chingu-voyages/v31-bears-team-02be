const GameOver = ({ roundHistory }) => {
  function reloadPage() {
    window.location.reload();
  }

  return (
    <div className="game-over">
      <h3>Game Over</h3>
      <h3>Total Correct: {roundHistory.filter((x) => x === "✔").length}</h3>
      <div className="button-container">
        <button onClick={reloadPage}>Play again</button>
      </div>
    </div>
  );
};

export default GameOver;
