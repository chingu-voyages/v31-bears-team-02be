import Magnifier from "react-magnifier";

function Art({ art, correctArt }) {
  console.log("correctArt: ", correctArt);
  console.log(art);

  return (
    <div className="art-container">
      <Magnifier
        src={correctArt.primaryImageSmall}
        zoomImgSrc={correctArt.primaryImage}
        alt={"art file"}
      />
      <p>{correctArt.artistDisplayName}</p>
    </div>
  );
}

export default Art;
