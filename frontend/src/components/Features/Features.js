import * as React from 'react';
import './Features.css';

const Features = () => (
  <section className="features">
    <h2>Are you ready to be an art explorer?</h2>
    <div className="features-cards-wrapper">
      {/* Each feature section can have a 'painting' image that ilustrates each feature */}
      <section>
        <h3>Play</h3>
        <figure>
          <img alt="placeholder" src="http://via.placeholder.com/250x250" />
          <figcaption>
            Each artwork is a puzzle to be solved.
            Can you guess who created it, or when?
            Simply hit play for a quick round or create an account
            and keep track of your score.
          </figcaption>
        </figure>
      </section>
      <section>
        <h3>Explore</h3>
        <figure>
          <img alt="placeholder" src="http://via.placeholder.com/300x185" />
          <figcaption>
            Thousands of art pieces and artifacts are waiting for you to discover them.
            Play and let the game surprise you with artworks to identify,
            or take your own route by looking through information about the
            artifacts and artists that you like.
          </figcaption>
        </figure>
      </section>
      <section>
        <h3>Learn</h3>
        <figure>

          <img alt="placeholder" src="http://via.placeholder.com/250x300" />
          <figcaption>
            Study every detail, get to know new artists,
            and learn new things about the ones you know.
            Play again and show the knowledge you&apos;ve gathered and get higher scores.
            Share your discoveries with friends and family.
          </figcaption>
        </figure>

      </section>
      {/* Another feature can be added here if leaderboards are implemented */}
    </div>
  </section>
);

export default Features;
