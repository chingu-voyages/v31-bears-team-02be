const ArtInfoDialog = ({
  setRoundCounter,
  setAnswerChosen,
  artInfo,
  setCorrectArt,
  setGameOver,
  roundCounter,
}) => {
  function handleClick(e) {
    setRoundCounter((round) => {
      localStorage.setItem("artRoundCounter", round + 1);
      return round + 1;
    });
    setAnswerChosen(false);
    setCorrectArt(null);
    if (roundCounter > 9) {
      setGameOver(true);
    }
  }
  return (
    <div className="art-info">
      <ul>
        <li>Title: {artInfo.title}</li>

        <li>
          Artist: {artInfo.artistDisplayName} ({artInfo.artistBeginDate} -
          {artInfo.artistEndDate})
        </li>

        {artInfo.objectDate && <li>Date: {artInfo.objectDate}</li>}

        <li>
          <a href={artInfo.objectURL} rel="noreferrer" target="_blank">
            More info
          </a>
        </li>
      </ul>
      <button onClick={handleClick}>next</button>
    </div>
  );
};

export default ArtInfoDialog;
