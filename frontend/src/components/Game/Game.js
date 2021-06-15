import { useEffect, useState } from "react";
import Art from "./Art";
import "./Game.css";
import GameUI from "./GameUI";
import ArtInfoDialog from "./ArtInfoDialog";
import GameOver from "./GameOver";

const Game = () => {
  const [art, setArt] = useState(null);
  const [correctArt, setCorrectArt] = useState(null);
  const [roundCounter, setRoundCounter] = useState(0);
  const [answerChosen, setAnswerChosen] = useState(false);
  const [roundArt, setRoundArt] = useState(null);
  const [roundHistory, setRoundHistory] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
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
      setRoundCounter(1);
    };
    artFetch();
  }, []);

  useEffect(() => {
    if (art) {
      if (art.length === 0) console.log("game over");
      const newRoundArt = art.slice(0, 4);
      setRoundArt(newRoundArt);
      setArt((art) => art.slice(4));
      setCorrectArt(newRoundArt[Math.floor(Math.random() * 4)]);
    }
  }, [roundCounter]);

  if (gameOver) {
    return (
      <div className="game-screen">
        <GameOver roundHistory={roundHistory} />
      </div>
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
          <GameUI
            correctArt={correctArt}
            roundArt={roundArt}
            roundCounter={roundCounter}
            setRoundCounter={setRoundCounter}
            setAnswerChosen={setAnswerChosen}
            answerChosen={answerChosen}
            roundHistory={roundHistory}
            setRoundHistory={setRoundHistory}
          />
        ))}
      {art && <div>{roundHistory.join(" - ")}</div>}
    </div>
  );
};

export default Game;
