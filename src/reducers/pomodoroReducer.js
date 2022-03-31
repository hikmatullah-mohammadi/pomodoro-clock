import * as actionTypes from "./../actions/types";

const initialState = {
  isRunning: false,
  sessionLength: 25,
  breakLength: 5,
  period: "session",
  timeLeft: {
    minutes: 25,
    seconds: 0
  }
};

const pomodoroReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INC_BREAK:
      return {
        ...state,
        breakLength:
          state.breakLength < 60 ? state.breakLength + 1 : state.breakLength
      };
    case actionTypes.DEC_BREAK:
      return {
        ...state,
        breakLength:
          state.breakLength > 1 ? state.breakLength - 1 : state.breakLength
      };
    case actionTypes.INC_SESSION:
      return {
        ...state,
        sessionLength:
          state.sessionLength < 60
            ? state.sessionLength + 1
            : state.sessionLength,
        timeLeft: {
          minutes:
            state.sessionLength < 60
              ? state.sessionLength + 1
              : state.sessionLength,
          seconds: 0
        }
      };
    case actionTypes.DEC_SESSION:
      return {
        ...state,
        sessionLength:
          state.sessionLength > 1
            ? state.sessionLength - 1
            : state.sessionLength,
        timeLeft: {
          minutes:
            state.sessionLength > 1
              ? state.sessionLength - 1
              : state.sessionLength,
          seconds: 0
        }
      };
    case actionTypes.RESET:
      return {
        ...initialState
      };
    case actionTypes.START:
      return {
        ...state,
        // change the period when the timer reaches zero(e.g. session to break)
        timeLeft:
          state.timeLeft.minutes === 0 && state.timeLeft.seconds === 0
            ? {
                minutes:
                  state.period === "session"
                    ? state.breakLength
                    : state.sessionLength,
                seconds: 0
              }
            : {
                // decrement by a value of one every one second
                minutes:
                  state.timeLeft.seconds === 0
                    ? state.timeLeft.minutes - 1
                    : state.timeLeft.minutes,
                seconds:
                  state.timeLeft.seconds === 0 ? 59 : state.timeLeft.seconds - 1
              },
        period:
          state.timeLeft.minutes === 0 && state.timeLeft.seconds === 0
            ? state.period === "session"
              ? "break"
              : "session"
            : state.period,
        isRunning: true
      };
    case actionTypes.STOP:
      return {
        ...state,
        isRunning: false
      };
    default:
      return state;
  }
};

export default pomodoroReducer;
