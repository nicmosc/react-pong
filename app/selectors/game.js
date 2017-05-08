export function getLeftPaddlePosition(state) {
  return state.game.yLeft;
}


export function getRightPaddlePosition(state) {
  return state.game.yRight;
}


export function getIsGamePaused(state) {
  return state.game.paused;
}
