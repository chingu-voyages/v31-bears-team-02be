import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModalOpen, setModalContent } from "../Modal/modalSlice";
import "./Hero.css";

const Hero = () => {
  const [backgroundImg, setBackgroundImg] = React.useState(null);
  const [bigImgLoaded, setBigImgLoaded] = React.useState(false);

  const dispatch = useDispatch();

  // Load hero background image on component count
  React.useEffect(() => {
    // When small image loads it will be used for the hero background
    const imgSmall = new Image();
    imgSmall.src =
      "https://images.metmuseum.org/CRDImages/ep/web-large/DT1567.jpg";
    imgSmall.onload = () => setBackgroundImg(imgSmall);

    // When the larger image loads it will replace the small one and set class to animate
    const imgBig = new Image();
    imgBig.src =
      "https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg";
    imgBig.onload = () => {
      setBackgroundImg(imgBig);
      setBigImgLoaded(true);
    };
  }, []);

  return (
    <section className="container mx-auto mt-4">
      <div className="relative lg:max-h-96 overflow-hidden">
        {backgroundImg && (
          <img
            className={`${
              bigImgLoaded ? "animate-img-slide object-none" : "object-fit"
            } min-h-600`}
            src={backgroundImg.src}
            alt="Van Gogh's"
          />
        )}
        <div className="w-full sm:w-5/6 lg:w-1/2 absolute object-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 bg-opacity-75 backdrop-filter backdrop-blur-sm space-y-6 p-6">
          <h1>Art lovers wanted!</h1>
          <p className="lg:text-xl">
            Join our community of art explorers and participate to put your
            knowledge to the test. Will you accept the challenge? You can play
            right away, and if you want to save your score you can sign up and
            create an account. Let&apos;s get art-guessing!
          </p>
          <div className="space-x-4">
            <Link to="/game">
            <button className="text-xl ssf font-semibold" type="button" >
              Let&apos;s Play
            </button>
            </Link>
            <button
              className="text-xl ssf font-semibold"
              type="button"
              onClick={() => {
                dispatch(setModalContent("SIGNUPFORM"));
                dispatch(setModalOpen());
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
