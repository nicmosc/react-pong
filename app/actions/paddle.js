export const UPDATE_RIGHT_PADDLE_POSITION = 'UPDATE_RIGHT_PADDLE_POSITION';


export function updateRightPaddle(y) {
  return {
    type: UPDATE_RIGHT_PADDLE_POSITION,
    payload: {
      y,
    }
  }
};


export const UPDATE_LEFT_PADDLE_POSITION = 'UPDATE_RIGHT_PADDLE_POSITION';


export function updateLeftPaddle(y) {
  return {
    type: UPDATE_LEFT_PADDLE_POSITION,
    payload: {
      y,
    }
  }
};
