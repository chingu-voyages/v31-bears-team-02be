import { useEffect, useState } from "react";
import Art from "./Art";
import "./Game.scss";
import GameUI from "./GameUI";
import ArtInfoDialog from "./ArtInfoDialog";
import GameOver from "./GameOver";
import GameLanding from "./GameLanding";
import { shuffleArray, fetchArt } from "./helper";

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
  const [gameInProgress, setGameInProgress] = useState(false);
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
      setGameInProgress(gameState.gameInProgress);
    } else {
      const url =
        "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&departmentId=11&q=painting";
      const artFetch = async () => {
        const randomArt = await fetchArt(url);
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
      artImg.src = newCorrectArt.primaryImageSmall;
      artImg.onload = () => setArtImgLoaded(true);

      const newAllCorrectArt = [...allCorrectArt];
      newAllCorrectArt[roundCounter - 1] = newCorrectArt;
      setAllCorrectArt(newAllCorrectArt);

      setCorrectArt(newCorrectArt);
    }

    const newGameState = {
      art,
      correctArt,
      roundCounter,
      answerChosen,
      roundArt,
      roundHistory,
      gameOver,
      allCorrectArt,
      gameInProgress,
    };

    setGameState(newGameState);

    localStorage.setItem("gameState", JSON.stringify(newGameState));

    console.log("game state:", JSON.parse(localStorage.getItem("gameState")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundCounter]);

  if (gameOver) {
    return (
      <GameOver allCorrectArt={allCorrectArt} roundHistory={roundHistory} />
    );
  }

  if (!gameStarted) {
    return (
      <GameLanding
        setGameStarted={setGameStarted}
        gameInProgress={gameInProgress}
        setGameInProgress={setGameInProgress}
      />
    );
  }

  return (
    <div className="game-screen">
      {roundArt && correctArt && <Art correctArt={correctArt} art={art} />}
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
      {art && <div className="round-history">{roundHistory.join(" - ")}</div>}
    </div>
  );
};

export default Game;
