import { useEffect, useState } from "react";
import Art from "./Art";
import "./Game.scss";
import GameUI from "./GameUI";
import ArtInfoDialog from "./ArtInfoDialog";
import GameOver from "./GameOver";
import GameLanding from "./GameLanding";
import { shuffleArray, fetchArt } from "./helper";
import RoundHistory from "./RoundHistory";
import {
  ComponentTransition,
  AnimationTypes,
} from "react-component-transition";

const Game = () => {
  const [art, setArt] = useState(null);
  const [correctArt, setCorrectArt] = useState(null);
  const [roundCounter, setRoundCounter] = useState(0);
  const [answerChosen, setAnswerChosen] = useState(false);
  const [roundArt, setRoundArt] = useState(null);
  const [roundHistory, setRoundHistory] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [artImgLoaded, setArtImgLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [allCorrectArt, setAllCorrectArt] = useState([]);
  const [gameState, setGameState] = useState(
    JSON.parse(localStorage.getItem("gameState")) || null
  );

  useEffect(() => {
    if (gameState) {
      setArt(gameState.art);
      setCorrectArt(gameState.correctArt);
      setRoundCounter(gameState.roundCounter);
      setAnswerChosen(gameState.answerChosen);
      setRoundArt(gameState.roundArt);
      setRoundHistory(gameState.roundHistory);
      setGameOver(gameState.gameOver);
      setAllCorrectArt(gameState.allCorrectArt);
      setGameStarted(gameState.gameStarted);

      for (let i = 0; i < gameState.art.length; i += 4) {
        const preLoadImg = new Image();
        preLoadImg.src = gameState.art[i].primaryImage;
        preLoadImg.onload = () => {};
      }
    } else {
      const url =
        "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&departmentId=11&q=painting";
      const artFetch = async () => {
        const randomArt = await fetchArt(url);

        for (let i = 0; i < randomArt.length; i += 4) {
          const preLoadImg = new Image();
          preLoadImg.src = randomArt[i].primaryImage;
          preLoadImg.onload = () => {};
        }

        setArt(randomArt);
        setRoundCounter((round) => round + 1);
      };
      artFetch();
    }
  }, []);

  useEffect(() => {
    if (art) {
      if (art.length === 0) return;

      setArtImgLoaded(false);
      const newRoundArt = art.slice(0, 4);
      const newCorrectArt = newRoundArt[0];
      shuffleArray(newRoundArt);
      setRoundArt(newRoundArt);
      setArt((art) => art.slice(4));

      // Preload image before rendering game ui
      const artImg = new Image();
      artImg.src = newCorrectArt.primaryImage;
      artImg.onload = () => setArtImgLoaded(true);

      const newAllCorrectArt = [...allCorrectArt];
      newAllCorrectArt[roundCounter - 1] = newCorrectArt;
      setAllCorrectArt(newAllCorrectArt);

      setCorrectArt(newCorrectArt);
      console.log("newCorrectArt: ", newCorrectArt);
      const newGameState = {
        art,
        correctArt,
        roundCounter,
        answerChosen,
        roundArt,
        roundHistory,
        gameOver,
        allCorrectArt,
        gameStarted,
      };

      setGameState(newGameState);

      localStorage.setItem("gameState", JSON.stringify(newGameState));

      console.log("game state:", JSON.parse(localStorage.getItem("gameState")));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundCounter]);

  function resetGame() {
    localStorage.removeItem("gameState");
    window.location.reload();
  }

  if (gameOver) {
    return (
      <GameOver allCorrectArt={allCorrectArt} roundHistory={roundHistory} />
    );
  }

  if (!gameStarted) {
    return (
      <GameLanding
        setGameStarted={setGameStarted}
        setRoundCounter={setRoundCounter}
      />
    );
  }

  return (
    <div className="game-screen">
      {roundArt && correctArt && <Art correctArt={correctArt} art={art} />}

      <ComponentTransition
        enterAnimation={AnimationTypes.scale.enter}
        exitAnimation={AnimationTypes.fade.exit}
      >
        {roundArt &&
          art &&
          (answerChosen ? (
            <ArtInfoDialog
              setAnswerChosen={setAnswerChosen}
              setRoundCounter={setRoundCounter}
              artInfo={correctArt}
              setCorrectArt={setCorrectArt}
              setGameOver={setGameOver}
              roundCounter={roundCounter}
            />
          ) : (
            artImgLoaded && (
              <GameUI
                correctArt={correctArt}
                roundArt={roundArt}
                roundCounter={roundCounter}
                setAnswerChosen={setAnswerChosen}
                roundHistory={roundHistory}
                setRoundHistory={setRoundHistory}
              />
            )
          ))}
      </ComponentTransition>
      {artImgLoaded && (
        <>
          {/* <div className="round-history">{roundHistory.join(" - ")}</div> */}
          <RoundHistory roundHistory={roundHistory} />
          <div className="reset-game-container">
            <button
              className="text-amber-500 bg-transparent border border-solid border-amber-500 hover:bg-amber-500 hover:text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={resetGame}
            >
              Reset Game
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
