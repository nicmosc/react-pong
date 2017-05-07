import { combineReducers } from 'redux';

import ui from './ui';
import game from './game';


export default combineReducers({
  ui,
  game,
});
