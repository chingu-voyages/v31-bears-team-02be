const GameOver = ({ roundHistory, allCorrectArt }) => {
  console.log("allCorrectArt: ", allCorrectArt);

  // clear all localStorage before starting a new game
  localStorage.removeItem("gameState");

  function reloadPage() {
    window.location.reload();
  }

  const allImages = allCorrectArt.map((art, i) => {
    return (
      <div key={art.objectID} className="image-container">
        <div
          className={
            roundHistory[i] === "✔"
              ? "art-frame correct"
              : "art-frame incorrect"
          }
        >
          <a href={art.objectURL} target="_blank" rel="noreferrer">
            <img src={art.primaryImage} alt="correct art" />
          </a>
        </div>
      </div>
    );
  });

  return (
    <div className="game-over">
      <h1 className="text-6xl font-normal leading-normal text-black-800">
        Game Over!
      </h1>
      <h3>You got {roundHistory.filter((x) => x === "✔").length} correct!</h3>
      <div className="button-container">
        <button
          className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={reloadPage}
        >
          Play again
        </button>
      </div>
      <div className="correct-art-container">{allImages}</div>
    </div>
  );
};

export default GameOver;
