import { useEffect, useState } from "react";
import Magnifier from "react-magnifier";
//import { Prompt } from "react-router-dom";
import {
  ComponentTransition,
  AnimationTypes,
  ComponentTransitionList,
} from "react-component-transition";

function Art({ preloadedImages, roundCounter }) {
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
      <ComponentTransitionList>
        {preloadedImages.map((item, index) => {
          if (index === roundCounter - 1) {
            return (
              <ComponentTransition
                enterAnimation={AnimationTypes.slideLeft.enter}
                exitAnimation={AnimationTypes.slideRight.exit}
                animateContainerDuration={600}
                animateContainer={true}
                key={index}
                animateOnMount={true}
              >
                <Magnifier
                  className="artwork"
                  src={item.src}
                  height={"max-content"}
                  width={"max-content"}
                  key={index}
                  mgShowOverflow={false}
                />
              </ComponentTransition>
            );
          }
          return <></>;
        })}
      </ComponentTransitionList>
      {/* <Prompt message={() => promptMsg} /> */}
    </div>
  );
}

export default Art;
