import * as actionTypes from "./types";

let runSessionInterval; // used with setInterval to count down
export const incBreak = () => ({
  type: actionTypes.INC_BREAK
});
export const decBreak = () => ({
  type: actionTypes.DEC_BREAK
});
export const incSession = () => ({
  type: actionTypes.INC_SESSION
});
export const decSession = () => ({
  type: actionTypes.DEC_SESSION
});
export const reset = () => (dispatch) => {
  clearInterval(runSessionInterval);
  dispatch({
    type: actionTypes.RESET
  });
};

export const start = () => (dispatch) => {
  runSessionInterval = setInterval(() => {
    dispatch({
      type: actionTypes.START
    });
  }, 1000);
};
export const stop = () => (dispatch) => {
  clearInterval(runSessionInterval);
  dispatch({
    type: actionTypes.STOP
  });
};
