import { combineReducers } from 'redux';

import ui from './ui';
import paddle from './paddle';


export default combineReducers({
  ui,
  paddle,
});
