import {combineReducers} from 'redux';
import courses from './courses';
import authors from './author';
import ajaxCallsInProgress from './ajaxStatus';

const rootReducer = combineReducers({
  authors,
  courses,
  ajaxCallsInProgress
});

export default rootReducer;
