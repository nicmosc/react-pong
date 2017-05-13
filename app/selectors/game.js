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


export function getIsGameStarted(state) {
  return state.game.started;
}


export function getWinner(state) {
  return state.game.winner;
}
