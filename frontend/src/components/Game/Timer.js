import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Timer({ answerHandle }) {
  function timeEnd() {
    answerHandle(false);
  }

  return (
    <CountdownCircleTimer
      size={50}
      strokeWidth={5}
      isPlaying
      duration={100}
      onComplete={timeEnd}
      colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
}

export default Timer;
