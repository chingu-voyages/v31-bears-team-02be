const GameOver = ({ roundHistory, allCorrectArt }) => {
  console.log("allCorrectArt: ", allCorrectArt);
  function reloadPage() {
    window.location.reload();
  }

  const allImages = allCorrectArt.map((art) => {
    return (
      <div key={art.objectID} className="image-container">
        <div className="frame">
          <a href={art.objectURL} target="_blank" rel="noreferrer">
            <img src={art.primaryImage} alt="correct art" />
          </a>
        </div>
      </div>
    );
  });

  return (
    <div className="game-over">
      <h3>Game Over</h3>
      <h3>Total Correct: {roundHistory.filter((x) => x === "✔").length}</h3>
      <div className="correct-art-container">{allImages}</div>
      <div className="button-container">
        <button onClick={reloadPage}>Play again</button>
      </div>
    </div>
  );
};

export default GameOver;
