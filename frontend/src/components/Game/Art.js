import { useEffect } from "react";
import Magnifier from "react-magnifier";
//import { Prompt } from "react-router-dom";
import {
  ComponentTransition,
  AnimationTypes,
} from "react-component-transition";

function Art({ art, correctArt }) {
  console.log("correctArt: ", correctArt);
  console.log(art);

  // const [image, setImage] = useState(null);
  const promptMsg =
    "Are you sure you want to quit? Game progress is saved and will be loaded the next time you play.";

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
      <ComponentTransition
        enterAnimation={AnimationTypes.slideLeft.enter}
        exitAnimation={AnimationTypes.slideRight.exit}
      >
        <Magnifier
          className="artwork"
          src={correctArt.src}
          height={"max-content"}
          width={"max-content"}
          mgShowOverflow={false}
        />
      </ComponentTransition>
      {/* <Prompt message={() => promptMsg} /> */}
    </div>
  );
}

export default Art;
