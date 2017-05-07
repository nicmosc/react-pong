import * as PaddleActions from 'actions/paddle';

const initialState = {
};


export default function paddle(state = initialState, action) {
  switch(action.type) {
    case PaddleActions.UPDATE_RIGHT_PADDLE_POSITION: {
      const { y } = action.payload;
      return {
        ...state,
        yRight: y,
      }
    }
    case PaddleActions.UPDATE_LEFT_PADDLE_POSITION: {
      const { y } = action.payload;
      return {
        ...state,
        yLeft: y,
      }
    }
    default:
      return initialState;
  }
};
