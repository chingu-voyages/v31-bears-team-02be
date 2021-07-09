import { useEffect, useState } from "react";
import Magnifier from "react-magnifier";
import { Prompt } from "react-router-dom";

function Art({ art, correctArt }) {
  console.log("correctArt: ", correctArt);
  console.log(art);

  const [image, setImage] = useState(null);
  const promptMsg =
    "Are you sure you want to quit? Game progress is saved and will be loaded the next time you play.";

  useEffect(() => {
    const smallImg = new Image();
    smallImg.src = correctArt.primaryImageSmall;
    smallImg.onload = () => setImage(smallImg);
    const largeImg = new Image();
    largeImg.src = correctArt.primaryImage;
    largeImg.onload = () => setImage(largeImg);
  }, [correctArt]);

  useEffect(() => {
    const promptHandler = (e) => {
      e.preventDefault();
      e.returnvalue = promptMsg;
      return promptMsg;
    };

    window.addEventListener("beforeunload", promptHandler);

    return () => {
      window.removeEventListener("beforeunload", promptHandler);
    };
  }, []);

  return (
    <div className="art-container">
      {image && (
        <Magnifier
          className="artwork"
          src={image.src}
          height={"max-content"}
          width={"max-content"}
          mgShowOverflow={false}
        />
      )}
      {/* <Prompt message={() => promptMsg} /> */}
    </div>
  );
}

export default Art;
