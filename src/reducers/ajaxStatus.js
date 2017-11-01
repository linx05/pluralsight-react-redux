import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type === actionTypes.BEGIN_AJAX_CALL) {
    return state + 1;
  }
  else if (actionTypeEndsInSuccess(action.type) || action.type === actionTypes.AJAX_CALL_ERROR) {
    return state - 1;
  }
  else {
    return state;
  }
}
