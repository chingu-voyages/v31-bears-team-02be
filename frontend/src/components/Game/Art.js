import { useEffect, useState } from "react";
import Magnifier from "react-magnifier";
// import ReactImageMagnify from "react-image-magnify";

function Art({ art, correctArt }) {
  console.log("correctArt: ", correctArt);
  console.log(art);

  const [image, setImage] = useState(null);

  useEffect(() => {
    const smallImg = new Image();
    smallImg.src = correctArt.primaryImageSmall;
    smallImg.onload = () => setImage(smallImg);
    const largeImg = new Image();
    largeImg.src = correctArt.primaryImage;
    largeImg.onload = () => setImage(largeImg);
  }, [correctArt]);

  return (
    <div className="art-container">
      {/* <div className="image-wrapper"> */}
      {/*image && <img src={image.src} alt="artwork" className="artwork" /> */}
      {image && (
        <Magnifier
          className="artwork"
          src={image.src}
          height={"max-content"}
          width={"max-content"}
          mgShowOverflow={false}
        />
      )}
      {/* </div> */}
      {/* <span>{correctArt.artistDisplayName}</span> */}
    </div>
  );
}

export default Art;
