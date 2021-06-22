import * as React from 'react';
// import './Features.css';

const Features = () => (
  <section className="mt-16 container mx-auto">
    <h2>Are you ready to be an art explorer?</h2>
    <div className="flex flex-auto flex-wrap md:flex-nowrap mt-8 md:space-x-12 space-y-8 md:space-y-0">
      {/* Each feature section can have a 'painting' image that ilustrates each feature */}
      <section className="flex-auto space-y-8">
        <h3>Play</h3>
        <figure className="space-y-8 flex flex-col space-around">
          <img
            className="shadow-xl max-h-96 md:max-h-52 mx-auto"
            alt="placeholder"
            src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/435868/800382/main-image" />
          <figcaption>
            Each artwork is a puzzle to be solved.
            Can you guess who created it, or when?
            Simply hit play for a quick round or create an account
            and keep track of your score.
          </figcaption>
        </figure>
      </section>

      <section className="flex-auto space-y-8">
        <h3>Learn</h3>
        <figure className="space-y-8">
          <img
            className="shadow-xl max-h-96 md:max-h-52 mx-auto"
            alt="placeholder"
            src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/436529/795979/main-image" />
          <figcaption>
            Study every detail, get to know new artists,
            and learn new things about the ones you know.
            Play again and show the knowledge you&apos;ve gathered and get higher scores.
            Share your discoveries with friends and family.
          </figcaption>
        </figure>

      </section>

      <section className="flex-auto space-y-8">
        <h3>Explore</h3>
        <figure className="space-y-8">
          <img
            className="shadow-xl max-h-96 md:max-h-52 mx-auto"
            alt="placeholder"
            src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/10150/35243/main-image" />
          <figcaption>
            Thousands of art pieces and artifacts are waiting for you to discover them.
            Play and let the game surprise you with artworks to identify,
            or take your own route by looking through information about the
            artifacts and artists that you like.
          </figcaption>
        </figure>
      </section>

      {/* Another feature can be added here if leaderboards are implemented */}
    </div>
  </section>
);

export default Features;
