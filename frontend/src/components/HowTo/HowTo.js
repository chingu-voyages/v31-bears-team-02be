import * as React from "react";
import "./HowTo.css";

const HowTo = () => (
  <section className="container mt-16 space-y-8 mx-auto max-w-6xl">
    <h2>How to play</h2>
    <section className="flex flex-row items-center flex-wrap space-y-8 sm:flex-nowrap sm:space-y-0 lg:w-max mx-auto">
      <div className="relative mx-auto howto pb-2/3">
        <img
          className="absolute h-full w-full object-cover"
          src="/images/demo-game.webp"
          height="360px"
          width="204px"
          alt=""
        />
      </div>

      <ul className="p-4 sm:ml-6 list-disc items-center space-y-4 max-w-prose">
        <li>Each game consists of ten rounds.</li>
        <li>Each round you will be shown an artwork or artifact.</li>
        <li>
          You will be asked to guess the date or artist for each art piece.
        </li>
        <li>
          You will have multiple choices displayed to you to select as an
          answer.
        </li>
        <li>You have to answer within the time limit.</li>
        <li>Each correct answer will be added to your score.</li>
        <li>
          After each answer, you can take your time to explore the artwork in
          detail and go through its information before continuing to the next
          guessing round.
        </li>
      </ul>
    </section>
  </section>
);

export default HowTo;
