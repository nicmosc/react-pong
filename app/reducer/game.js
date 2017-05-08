import * as GameActions from 'actions/game';

const initialState = {
  yRight: 0,
  yLeft: 0,
  paused: true,
  player1: 0,
  player2: 0,
};


export default function game(state = initialState, action) {
  switch(action.type) {
    case GameActions.UPDATE_RIGHT_PADDLE_POSITION: {
      const { y } = action.payload;
      return {
        ...state,
        yRight: y,
      };
    }
    case GameActions.UPDATE_LEFT_PADDLE_POSITION: {
      const { y } = action.payload;
      return {
        ...state,
        yLeft: y,
      }
    }
    case GameActions.TOGGLE_PAUSE_GAME: {
      const { paused } = state;
      return {
        ...state,
        paused: ! paused,
      }
    }
    case GameActions.INCREASE_PLAYER_SCORE: {
      const { player } = action.payload;
      const { player1, player2 } = state;
      if (player === 1) {
        return {
          ...state,
          player1: player1 + 1,
        }
      } else {
        return {
          ...state,
          player2: player2 + 1,
        }
      }
    }
    default:
      return state;
  }
};
