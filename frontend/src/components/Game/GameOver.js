const GameOver = ({ roundHistory }) => {
  function reloadPage() {
    window.location.reload();
  }

  return (
    <>
      <h3>Game Over</h3>
      <h3>Total Correct: {roundHistory.filter((x) => x === "✔").length}</h3>
      <button onClick={reloadPage}>Play again</button>
    </>
  );
};

export default GameOver;
