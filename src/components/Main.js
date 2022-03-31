import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as pomodoroActions from "../actions/pomodoroActions";

const Main = (props) => {
  const beep = useRef();
  const startStopBtn = useRef();
  useEffect(() => {
    props.state.timeLeft.minutes === 0 &&
      props.state.timeLeft.seconds === 0 &&
      beep.current.play();
  });

  return (
    <main>
      <section id="display">
        <p id="session-label">Session Length</p>
        <p id="session-length">{props.state.sessionLength}</p>
        <p id="break-label">Break Length</p>
        <p id="break-length">{props.state.breakLength}</p>
        <p id="timer-label">
          {props.state.period === "session" ? "Session period" : "Break period"}
        </p>
        <p
          id="time-left"
          style={{ color: props.state.timeLeft.minutes < 1 && "red" }}
        >
          {props.state.timeLeft.minutes < 10 ? 0 : ""}
          {props.state.timeLeft.minutes}:
          {props.state.timeLeft.seconds < 10 ? 0 : ""}
          {props.state.timeLeft.seconds}
        </p>
      </section>

      <section id="control">
        <section id="session-control">
          <p>
            Session{" "}
            <button
              id="session-increment"
              onClick={() => !props.state.isRunning && props.incSession()}
            >
              +
            </button>
            <button
              id="session-decrement"
              onClick={() => !props.state.isRunning && props.decSession()}
            >
              -
            </button>
          </p>
        </section>
        <section id="break-control">
          <p>
            Break &nbsp;&nbsp;&nbsp;
            <button
              id="break-increment"
              onClick={() => !props.state.isRunning && props.incBreak()}
            >
              +
            </button>
            <button
              id="break-decrement"
              onClick={() => !props.state.isRunning && props.decBreak()}
            >
              -
            </button>
          </p>
        </section>
        <div id="general-control">
          <button
            id="reset"
            onClick={() => {
              beep.current.setAttribute("src", "");
              setTimeout(() => {
                beep.current.setAttribute("src", "./beep.mp3");
              }, 1);
              props.reset();
            }}
          >
            Reset
          </button>
          <button
            id="start_stop"
            ref={startStopBtn}
            onClick={() => {
              startStopBtn.current.disabled = true;
              props.state.isRunning ? props.stop() : props.start();
              setTimeout(() => {
                startStopBtn.current.disabled = false;
              }, 1000);
            }}
          >
            {props.state.isRunning ? "Stop" : "Start"}
          </button>
        </div>

        <audio ref={beep} id="beep" src="./beep.mp3" />
      </section>
    </main>
  );
};

const mapStateToProps = (state) => ({
  state: state.pomodoroReducer
});

export default connect(mapStateToProps, { ...pomodoroActions })(Main);
