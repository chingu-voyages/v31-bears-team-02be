import { useState } from "react";
import Magnifier from "react-magnifier";

function Art({ art, correctArt }) {
  console.log("correctArt: ", correctArt);
  console.log(art);

  const [largeImgLoaded, setLargeImgLoaded] = useState(false);
  const largeImg = new Image();
  largeImg.src = correctArt.primaryImage;
  largeImg.onload = () => setLargeImgLoaded(true);

  return (
    <div className="art-container">
      <Magnifier
        src={correctArt.primaryImageSmall}
        zoomImgSrc={
          largeImgLoaded
            ? correctArt.primaryImage
            : correctArt.primaryImageSmall
        }
        alt={"art file"}
      />
      <p>{correctArt.artistDisplayName}</p>
    </div>
  );
}

export default Art;
