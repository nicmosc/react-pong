import * as GameActions from 'actions/game';

const paddleState = {
  yRight: 0,
  yLeft: 0,
};


export default function paddle(state = paddleState, action) {
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
    default:
      return state;
  }
};
