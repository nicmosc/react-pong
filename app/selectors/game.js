export function getLeftPaddlePosition(state) {
  return state.game.yLeft;
}


export function getRightPaddlePosition(state) {
  return state.game.yRight;
}


export function getIsGamePaused(state) {
  return state.game.paused;
}


export function getPlayerScores(state) {
  const { player1, player2 } = state.game;
  return {
    player1,
    player2,
  };
}
