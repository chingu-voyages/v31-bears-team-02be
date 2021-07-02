import { useEffect, useState } from "react";
import Art from "./Art";
import "./Game.scss";
import GameUI from "./GameUI";
import ArtInfoDialog from "./ArtInfoDialog";
import GameOver from "./GameOver";
import GameLanding from "./GameLanding";

const Game = () => {
  const [art, setArt] = useState(
    JSON.parse(localStorage.getItem("art")) || null
  );
  const [correctArt, setCorrectArt] = useState(null);
  const [roundCounter, setRoundCounter] = useState(
    Number(localStorage.getItem("artRoundCounter")) || 0
  );
  const [answerChosen, setAnswerChosen] = useState(false);
  const [roundArt, setRoundArt] = useState(null);
  const [roundHistory, setRoundHistory] = useState(
    JSON.parse(localStorage.getItem("artRoundHistory")) || [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]
  );
  const [gameOver, setGameOver] = useState(false);
  const [artImgLoaded, setArtImgLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [allCorrectArt, setAllCorrectArt] = useState(
    JSON.parse(localStorage.getItem("artAllCorrectArt")) || []
  );
  const [gameState, setGameState] = useState({});

  useEffect(() => {
    if (localStorage.getItem("art") === null) {
      const url =
        "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&departmentId=11&q=painting";
      const artFetch = async () => {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        const objectIds = [];

        for (let i = 0; i < 40; i++) {
          // makes sure all object ids are unique
          const objectID = data.objectIDs.splice(
            Math.floor(Math.random() * data.objectIDs.length),
            1
          )[0];
          objectIds.push(objectID);
        }
        console.log("objectIds:", objectIds);

        const randomArt = await Promise.all(
          objectIds.map(async (id) => {
            const res = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            const data = await res.json();
            return data;
          })
        );

        setArt(randomArt);
        localStorage.setItem("art", JSON.stringify(randomArt));
        setRoundCounter((round) => round + 1);
        localStorage.setItem("artRoundCounter", "1");
      };
      artFetch();
    }
  }, []);

  useEffect(() => {
    if (art) {
      if (art.length === 0) return;

      // save art array to localStorage
      const artStorage = [...art];
      localStorage.setItem("art", JSON.stringify(artStorage));

      setArtImgLoaded(false);
      const newRoundArt = art.slice(0, 4);
      setRoundArt(newRoundArt);
      setArt((art) => art.slice(4));
      const newCorrectArt = newRoundArt[Math.floor(Math.random() * 4)];

      // Preload image before rendering game ui
      const artImg = new Image();
      artImg.src = newCorrectArt.primaryImageSmall;
      artImg.onload = () => setArtImgLoaded(true);

      const newAllCorrectArt = [...allCorrectArt];
      newAllCorrectArt[roundCounter - 1] = newCorrectArt;
      setAllCorrectArt(newAllCorrectArt);
      localStorage.setItem(
        "artAllCorrectArt",
        JSON.stringify(newAllCorrectArt)
      );

      setCorrectArt(newCorrectArt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundCounter]);

  if (gameOver) {
    return (
      <GameOver allCorrectArt={allCorrectArt} roundHistory={roundHistory} />
    );
  }

  if (!gameStarted) {
    return <GameLanding setGameStarted={setGameStarted} />;
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
