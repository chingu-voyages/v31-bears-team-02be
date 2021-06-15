import * as React from 'react';
import './Hero.css';

const Hero = () => {
  const [backgroundImg, setBackgroundImg] = React.useState(null);
  const [bigImgLoaded, setBigImgLoaded] = React.useState(false);

  /* Adding an experiment as a proof of concept for loading
  and exploring hd images provided by api */

  // Load hero background image on component count
  React.useEffect(() => {
    // When small image loads it will be used for the hero background
    const imgSmall = new Image();
    imgSmall.src = 'https://images.metmuseum.org/CRDImages/ep/web-large/DT1567.jpg';
    imgSmall.onload = () => setBackgroundImg(imgSmall);

    // When the larger image loads it will replace the small one and set class to animate
    const imgBig = new Image();
    imgBig.src = 'https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg';
    imgBig.onload = () => {
      setBackgroundImg(imgBig);
      setBigImgLoaded(true);
    };
  }, []);

  return (
    <section className="hero">
      <div className={`centered frame ${bigImgLoaded ? 'animate' : ''}`}>
        {backgroundImg && (
          <img src={backgroundImg.src} alt="test" />
        )}
        <div className="hero-caption">
          <h1>Art lovers wanted!</h1>
          <p>
            Join our community of art explorers and participate to put your
            knowledge to the test. Will you accept the challenge? You can play
            right away, and if you want to save your score you can sign up and
            create an account. Let&apos;s get art-guessing!
          </p>
          <button type="button">Let&apos;s Play</button>
          <button type="button">Sign up</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
