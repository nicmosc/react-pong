import * as GameActions from 'actions/game';

const initialState = {
  yRight: 0,
  yLeft: 0,
  paused: true,
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
    default:
      return state;
  }
};
