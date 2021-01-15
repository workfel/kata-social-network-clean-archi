import * as actionCreators from './publish-message-to-timeline.actions';
import { CANNOT_PUBLISH_TIMELINE_MESSAGE, PUBLISH_TIMELINE_MESSAGE } from './publish-message-to-timeline.actions';
import { combineReducers } from 'redux';

const messages = (state: string[] = [],
                  action: actionCreators.Actions) => {
  if (action.type === PUBLISH_TIMELINE_MESSAGE) {
    return state.concat(action.payload.publishMessage);
  }
  return state;
};

const publishError = (state: string= '',
                      action: actionCreators.Actions) => {
  if (action.type === CANNOT_PUBLISH_TIMELINE_MESSAGE) {
    return action.payload.reason;
  }
  return state;
};


export default combineReducers({
  messages,
  publishError
});
