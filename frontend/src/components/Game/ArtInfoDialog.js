import { BiLinkExternal } from "react-icons/bi";
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
        <li>
          <strong>Title:</strong> {artInfo.title}
        </li>

        <li>
          <strong>Artist:</strong> {artInfo.artistDisplayName} (
          {artInfo.artistBeginDate} -{artInfo.artistEndDate})
        </li>

        {artInfo.objectDate && (
          <li>
            <strong>Date:</strong> {artInfo.objectDate}
          </li>
        )}

        <li>
          <a
            className="underline"
            href={artInfo.objectURL}
            rel="noreferrer"
            target="_blank"
          >
            <BiLinkExternal
              style={{ display: "inline", fill: "rebeccapurple" }}
            />
            More info
          </a>
        </li>
      </ul>
      <div>
        <button
          className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={handleClick}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default ArtInfoDialog;
