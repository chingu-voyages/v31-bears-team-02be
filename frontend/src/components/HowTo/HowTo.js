import * as React from 'react';
import './HowTo.css';

const HowTo = () => (
  <section className="how-to-play">
    <h2>How to play:</h2>
    <section>
      <ul>
        <li>
          Each game consists of ten rounds.
        </li>
        <li>
          Each round you will be shown an artwork or artifact.
        </li>
        <li>
          You will be asked to guess the date or artist for each art piece.
        </li>
        <li>
          You will have multiple choices displayed to you to select as an answer.
        </li>
        <li>
          You have to answer within the time limit.
        </li>
        <li>
          Each correct answer will be added to your score.
        </li>
        <li>
          After each answer,
          you can take your time to explore
          the artwork in detail and go through
          its information before continuing to the next guessing round.
        </li>
      </ul>
      <img alt="placeholder" src="http://via.placeholder.com/640x360" />
    </section>
  </section>
);

export default HowTo;
